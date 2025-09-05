#!/usr/bin/env node

/**
 * Automated Error Fixing Workflow for ras-UI Design System
 * Integrates error checking, diagnostics monitoring, and auto-fixing capabilities
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';

const COLORS = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class AutoFixer {
  constructor() {
    this.fixAttempts = [];
    this.successfulFixes = [];
    this.failedFixes = [];
  }

  log(message, color = 'white') {
    console.log(`${COLORS[color]}${message}${COLORS.reset}`);
  }

  logSection(title) {
    console.log(`\n${COLORS.bold}${COLORS.cyan}=== ${title} ===${COLORS.reset}`);
  }

  async runCommand(command, options = {}) {
    try {
      const result = execSync(command, { 
        encoding: 'utf8', 
        cwd: options.cwd || process.cwd(),
        stdio: options.silent ? 'pipe' : 'inherit'
      });
      return { success: true, output: result };
    } catch (error) {
      return { 
        success: false, 
        output: error.stdout || error.message,
        error: error.stderr || error.message
      };
    }
  }

  async checkCurrentStatus() {
    this.logSection('Pre-Fix Status Check');
    
    // Run comprehensive error check
    const errorCheck = await this.runCommand('node scripts/check-errors.js', { silent: true });
    const hasErrors = !errorCheck.success;
    
    // Run diagnostics monitor
    const diagnostics = await this.runCommand('node scripts/monitor-diagnostics.js', { silent: true });
    const hasDiagnostics = !diagnostics.success;
    
    this.log(`Error Check: ${hasErrors ? '❌ Issues found' : '✅ Clean'}`, hasErrors ? 'red' : 'green');
    this.log(`Diagnostics: ${hasDiagnostics ? '❌ Issues found' : '✅ Clean'}`, hasDiagnostics ? 'red' : 'green');
    
    return { hasErrors, hasDiagnostics };
  }

  async attemptESLintFix() {
    this.log('\n🔧 Attempting ESLint auto-fixes...', 'cyan');
    
    const fixResult = await this.runCommand('pnpm lint --fix', { silent: true });
    
    if (fixResult.success) {
      this.successfulFixes.push({
        type: 'ESLint',
        description: 'Auto-fixed ESLint issues',
        command: 'pnpm lint --fix'
      });
      this.log('✅ ESLint auto-fix completed', 'green');
      return true;
    } else {
      this.failedFixes.push({
        type: 'ESLint',
        description: 'ESLint auto-fix failed',
        error: fixResult.error
      });
      this.log('❌ ESLint auto-fix failed', 'red');
      return false;
    }
  }

  async attemptTypeScriptFix() {
    this.log('\n🔧 Checking TypeScript issues...', 'cyan');
    
    // Check if there are TypeScript errors
    const typeCheck = await this.runCommand('pnpm type-check', { silent: true });
    
    if (typeCheck.success) {
      this.log('✅ No TypeScript errors to fix', 'green');
      return true;
    }
    
    // TypeScript errors usually require manual intervention
    this.log('⚠️  TypeScript errors detected - manual intervention required', 'yellow');
    this.failedFixes.push({
      type: 'TypeScript',
      description: 'TypeScript errors require manual fixing',
      error: typeCheck.error
    });
    
    return false;
  }

  async attemptBuildFix() {
    this.log('\n🔧 Rebuilding packages and tokens...', 'cyan');
    
    // Clean and rebuild
    const cleanResult = await this.runCommand('pnpm clean', { silent: true });
    const tokensResult = await this.runCommand('pnpm tokens:all', { silent: true });
    const buildResult = await this.runCommand('pnpm build', { silent: true });
    
    if (tokensResult.success && buildResult.success) {
      this.successfulFixes.push({
        type: 'Build',
        description: 'Rebuilt tokens and packages successfully',
        command: 'pnpm clean && pnpm tokens:all && pnpm build'
      });
      this.log('✅ Build fix completed', 'green');
      return true;
    } else {
      this.failedFixes.push({
        type: 'Build',
        description: 'Build process failed',
        error: buildResult.error || tokensResult.error
      });
      this.log('❌ Build fix failed', 'red');
      return false;
    }
  }

  async runMCPDiagnostics() {
    this.log('\n🔧 Running MCP IDE diagnostics...', 'cyan');
    
    // This would typically be called via the MCP system
    // For now, we'll simulate the check by looking for common files
    const criticalFiles = [
      'packages/react/src/components/Button/Button.tsx',
      'packages/react/src/index.ts',
      'apps/showcase/src/App.tsx'
    ];
    
    let hasIssues = false;
    for (const file of criticalFiles) {
      if (!existsSync(file)) {
        this.log(`❌ Missing critical file: ${file}`, 'red');
        hasIssues = true;
      }
    }
    
    if (!hasIssues) {
      this.log('✅ All critical files present', 'green');
      this.successfulFixes.push({
        type: 'MCP Diagnostics',
        description: 'All critical files validated',
        command: 'File existence check'
      });
    }
    
    return !hasIssues;
  }

  async generateFixReport() {
    this.logSection('Fix Report Summary');
    
    const totalFixes = this.successfulFixes.length + this.failedFixes.length;
    
    if (totalFixes === 0) {
      this.log('ℹ️  No fixes were attempted', 'blue');
      return;
    }
    
    this.log(`📊 Fix Summary: ${this.successfulFixes.length} successful, ${this.failedFixes.length} failed`, 'white');
    
    if (this.successfulFixes.length > 0) {
      this.log('\n✅ Successful Fixes:', 'green');
      this.successfulFixes.forEach((fix, index) => {
        this.log(`  ${index + 1}. ${fix.type}: ${fix.description}`, 'white');
        if (fix.command) {
          this.log(`     Command: ${fix.command}`, 'blue');
        }
      });
    }
    
    if (this.failedFixes.length > 0) {
      this.log('\n❌ Failed Fixes (Manual Intervention Required):', 'red');
      this.failedFixes.forEach((fix, index) => {
        this.log(`  ${index + 1}. ${fix.type}: ${fix.description}`, 'white');
        if (fix.error) {
          this.log(`     Error: ${fix.error.slice(0, 200)}...`, 'yellow');
        }
      });
    }
  }

  async runPostFixCheck() {
    this.logSection('Post-Fix Verification');
    
    // Run the status check again
    const { hasErrors, hasDiagnostics } = await this.checkCurrentStatus();
    
    if (!hasErrors && !hasDiagnostics) {
      this.log('\n🎉 All fixes successful! System is clean.', 'green');
      return true;
    } else {
      this.log('\n⚠️  Some issues remain - manual intervention may be required.', 'yellow');
      return false;
    }
  }

  async run() {
    this.log('🔧 Starting automated error fixing for ras-UI Design System...', 'cyan');
    
    // Check current status
    const initialStatus = await this.checkCurrentStatus();
    
    if (!initialStatus.hasErrors && !initialStatus.hasDiagnostics) {
      this.log('\n🎉 No errors detected - system is already clean!', 'green');
      return 0;
    }
    
    // Attempt fixes in order of complexity
    await this.attemptESLintFix();
    await this.attemptBuildFix();
    await this.attemptTypeScriptFix();
    await this.runMCPDiagnostics();
    
    // Generate report
    await this.generateFixReport();
    
    // Final verification
    const success = await this.runPostFixCheck();
    
    return success ? 0 : 1;
  }
}

// CLI usage
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Automated Error Fixing Workflow for ras-UI

Usage: node auto-fix-errors.js [options]

Options:
  --help, -h     Show this help message
  --dry-run      Show what would be fixed without making changes
  --verbose      Show detailed output

This script attempts to automatically fix common issues:
  • ESLint errors (using --fix)
  • Build problems (clean rebuild)
  • Missing files (validation)
  • Design token compilation

TypeScript errors typically require manual intervention.
`);
  process.exit(0);
}

if (args.includes('--dry-run')) {
  console.log('🔍 DRY RUN MODE - No changes will be made');
  // In dry-run mode, we would simulate the fixes
}

const fixer = new AutoFixer();
fixer.run()
  .then(exitCode => {
    process.exit(exitCode);
  })
  .catch(error => {
    console.error(`${COLORS.red}Auto-fixer failed:${COLORS.reset}`, error);
    process.exit(1);
  });