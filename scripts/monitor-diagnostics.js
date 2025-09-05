#!/usr/bin/env node

/**
 * IDE Diagnostics Monitor for ras-UI Design System
 * Integrates with MCP IDE diagnostics to detect real-time errors
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

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

class DiagnosticsMonitor {
  constructor() {
    this.criticalFiles = [
      'packages/react/src/components/Button/Button.tsx',
      'packages/react/src/components/Badge/Badge.tsx', 
      'packages/react/src/components/Alert/Alert.tsx',
      'packages/react/src/index.ts',
      'packages/tokens/src/index.ts',
      'apps/showcase/src/App.tsx'
    ];
    this.lastCheck = Date.now();
    this.errorHistory = [];
  }

  log(message, color = 'white') {
    console.log(`${COLORS[color]}${message}${COLORS.reset}`);
  }

  async checkESLintReport() {
    const eslintReportPath = 'packages/react/eslint-report.json';
    
    if (!existsSync(eslintReportPath)) {
      this.log('⚠️  ESLint report not found - run ESLint MCP to generate', 'yellow');
      return { errors: [], warnings: [] };
    }

    try {
      const report = JSON.parse(readFileSync(eslintReportPath, 'utf8'));
      const errors = [];
      const warnings = [];
      
      report.forEach(file => {
        file.messages.forEach(message => {
          const issue = {
            file: file.filePath,
            line: message.line,
            column: message.column,
            message: message.message,
            ruleId: message.ruleId,
            severity: message.severity
          };
          
          if (message.severity === 2) {
            errors.push(issue);
          } else {
            warnings.push(issue);
          }
        });
      });
      
      return { errors, warnings };
    } catch (e) {
      this.log(`❌ Failed to parse ESLint report: ${e.message}`, 'red');
      return { errors: [], warnings: [] };
    }
  }

  generateErrorSummary(errors, warnings) {
    const timestamp = new Date().toISOString();
    
    const summary = {
      timestamp,
      totalErrors: errors.length,
      totalWarnings: warnings.length,
      errorsByFile: {},
      criticalIssues: [],
      recommendations: []
    };

    // Group errors by file
    [...errors, ...warnings].forEach(issue => {
      const fileName = issue.file.replace(process.cwd(), '');
      if (!summary.errorsByFile[fileName]) {
        summary.errorsByFile[fileName] = { errors: 0, warnings: 0, issues: [] };
      }
      
      if (issue.severity === 2) {
        summary.errorsByFile[fileName].errors++;
      } else {
        summary.errorsByFile[fileName].warnings++;
      }
      
      summary.errorsByFile[fileName].issues.push(issue);
    });

    // Identify critical issues
    errors.forEach(error => {
      if (this.criticalFiles.some(file => error.file.includes(file))) {
        summary.criticalIssues.push({
          file: error.file,
          message: error.message,
          location: `${error.line}:${error.column}`,
          rule: error.ruleId
        });
      }
    });

    // Generate recommendations
    if (summary.totalErrors > 0) {
      summary.recommendations.push('Run `pnpm lint --fix` to auto-fix ESLint errors');
    }
    if (summary.criticalIssues.length > 0) {
      summary.recommendations.push('Address critical issues in core component files immediately');
    }
    if (summary.totalWarnings > 10) {
      summary.recommendations.push('Consider addressing warnings to improve code quality');
    }

    return summary;
  }

  async saveReport(summary) {
    const reportPath = 'scripts/diagnostics-report.json';
    
    // Load existing history
    let history = [];
    if (existsSync(reportPath)) {
      try {
        history = JSON.parse(readFileSync(reportPath, 'utf8'));
      } catch (e) {
        // Start fresh if corrupted
        history = [];
      }
    }

    // Add current report
    history.unshift(summary);
    
    // Keep only last 50 reports
    if (history.length > 50) {
      history = history.slice(0, 50);
    }

    writeFileSync(reportPath, JSON.stringify(history, null, 2));
    return reportPath;
  }

  displayReport(summary) {
    this.log('\n🔍 IDE Diagnostics Report', 'cyan');
    this.log(`Generated: ${summary.timestamp}`, 'blue');
    
    if (summary.totalErrors === 0 && summary.totalWarnings === 0) {
      this.log('\n✅ No diagnostics issues found!', 'green');
      return;
    }

    this.log(`\n📊 Summary: ${summary.totalErrors} errors, ${summary.totalWarnings} warnings`, 'white');

    if (summary.criticalIssues.length > 0) {
      this.log('\n🚨 Critical Issues:', 'red');
      summary.criticalIssues.forEach((issue, index) => {
        this.log(`  ${index + 1}. ${issue.file}:${issue.location}`, 'white');
        this.log(`     ${issue.message} (${issue.rule})`, 'yellow');
      });
    }

    if (Object.keys(summary.errorsByFile).length > 0) {
      this.log('\n📁 Issues by File:', 'magenta');
      Object.entries(summary.errorsByFile)
        .sort(([,a], [,b]) => (b.errors + b.warnings) - (a.errors + a.warnings))
        .slice(0, 10) // Show top 10 files with issues
        .forEach(([file, stats]) => {
          const indicator = stats.errors > 0 ? '❌' : '⚠️ ';
          this.log(`  ${indicator} ${file}: ${stats.errors} errors, ${stats.warnings} warnings`, 'white');
        });
    }

    if (summary.recommendations.length > 0) {
      this.log('\n💡 Recommendations:', 'cyan');
      summary.recommendations.forEach((rec, index) => {
        this.log(`  ${index + 1}. ${rec}`, 'white');
      });
    }
  }

  async run() {
    this.log('🔍 Checking IDE diagnostics for ras-UI Design System...', 'cyan');
    
    const { errors, warnings } = await this.checkESLintReport();
    const summary = this.generateErrorSummary(errors, warnings);
    
    this.displayReport(summary);
    
    const reportPath = await this.saveReport(summary);
    this.log(`\n📄 Report saved to: ${reportPath}`, 'blue');
    
    // Return exit code based on critical issues
    return summary.criticalIssues.length === 0 ? 0 : 1;
  }
}

// CLI handling
const args = process.argv.slice(2);
const command = args[0];

if (command === '--help' || command === '-h') {
  console.log(`
IDE Diagnostics Monitor for ras-UI

Usage: node monitor-diagnostics.js [options]

Options:
  --help, -h     Show this help message
  --json         Output report in JSON format only
  --critical     Exit with error only if critical issues found

Examples:
  node monitor-diagnostics.js           # Full interactive report
  node monitor-diagnostics.js --json    # JSON output only
  node monitor-diagnostics.js --critical # Focus on critical issues
`);
  process.exit(0);
}

const monitor = new DiagnosticsMonitor();
monitor.run()
  .then(exitCode => {
    if (command === '--json') {
      // JSON mode - just output the report file path
      console.log('scripts/diagnostics-report.json');
    }
    process.exit(exitCode);
  })
  .catch(error => {
    console.error(`${COLORS.red}Diagnostics monitor failed:${COLORS.reset}`, error);
    process.exit(1);
  });