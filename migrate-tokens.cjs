#!/usr/bin/env node

/**
 * Token Migration Script
 * Converts theme.space['2'] to theme.space.xs patterns across the codebase
 */

const fs = require('fs');
const path = require('path');

// Token mapping from numeric/string keys to semantic names
const SPACE_MAPPING = {
  "['0']": ".none",
  "[0]": ".none",
  "['1']": "[1]",     // Keep as numeric, no semantic equivalent (2px)
  "[1]": "[1]",       // Keep as numeric, no semantic equivalent (2px)
  "['2']": ".xs",
  "[2]": ".xs",
  "['3']": ".sm", 
  "[3]": ".sm",
  "['4']": "[4]",     // Keep as numeric, no semantic equivalent (12px)
  "[4]": "[4]",       // Keep as numeric, no semantic equivalent (12px) 
  "['5']": ".md",
  "[5]": ".md",
  "['6']": "[6]",     // Keep as numeric, no direct semantic equivalent (20px)
  "[6]": "[6]",       // Keep as numeric, no direct semantic equivalent (20px)
  "['7']": ".lg",
  "[7]": ".lg",
  "['8']": ".xl",
  "[8]": ".xl",
  "['9']": ".2xl",
  "[9]": ".2xl",
  "['10']": ".3xl",
  "[10]": ".3xl"
};

const ELEVATION_MAPPING = {
  "['0']": ".none",
  "[0]": ".none", 
  "['1']": ".sm",
  "[1]": ".sm",
  "['2']": ".md", 
  "[2]": ".md",
  "['3']": ".lg",
  "[3]": ".lg"
};

// File patterns to search
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];
const SEARCH_DIRS = [
  'packages/react/src',
  'packages/docs/stories'
];

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (FILE_EXTENSIONS.some(ext => file.endsWith(ext))) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function migrateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  let changesMade = false;

  // Track changes for logging
  const changes = [];

  // Migrate space tokens
  Object.entries(SPACE_MAPPING).forEach(([oldPattern, newPattern]) => {
    const escapedPattern = oldPattern.replace(/[[\]']/g, '\\$&');
    const regex = new RegExp(`theme\\.space${escapedPattern}`, 'g');
    const matches = newContent.match(regex);
    
    if (matches) {
      newContent = newContent.replace(regex, `theme.space${newPattern}`);
      changes.push(`theme.space${oldPattern} → theme.space${newPattern} (${matches.length} times)`);
      changesMade = true;
    }
  });

  // Migrate elevation tokens  
  Object.entries(ELEVATION_MAPPING).forEach(([oldPattern, newPattern]) => {
    const escapedPattern = oldPattern.replace(/[[\]']/g, '\\$&');
    const regex = new RegExp(`theme\\.elevation${escapedPattern}`, 'g');
    const matches = newContent.match(regex);
    
    if (matches) {
      newContent = newContent.replace(regex, `theme.elevation${newPattern}`);
      changes.push(`theme.elevation${oldPattern} → theme.elevation${newPattern} (${matches.length} times)`);
      changesMade = true;
    }
  });

  if (changesMade) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ ${filePath}`);
    changes.forEach(change => console.log(`   ${change}`));
    return changes.length;
  }

  return 0;
}

function main() {
  console.log('🚀 Starting token migration...\n');

  let totalFiles = 0;
  let modifiedFiles = 0;
  let totalChanges = 0;

  SEARCH_DIRS.forEach(dir => {
    console.log(`📁 Searching ${dir}...`);
    const files = getAllFiles(dir);
    
    files.forEach(file => {
      totalFiles++;
      const changes = migrateFile(file);
      if (changes > 0) {
        modifiedFiles++;
        totalChanges += changes;
      }
    });
  });

  console.log('\n📊 Migration Summary:');
  console.log(`   Files searched: ${totalFiles}`);
  console.log(`   Files modified: ${modifiedFiles}`);
  console.log(`   Total changes: ${totalChanges}`);

  if (totalChanges > 0) {
    console.log('\n✨ Migration complete! Your tokens are now developer-friendly.');
    console.log('💡 Example: theme.space[\'2\'] → theme.space.xs');
  } else {
    console.log('\n✨ No legacy bracket notation found. Your tokens are already up to date!');
  }
}

if (require.main === module) {
  main();
}

module.exports = { migrateFile, SPACE_MAPPING, ELEVATION_MAPPING };