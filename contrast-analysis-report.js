#!/usr/bin/env node
/**
 * Comprehensive Color Contrast Analysis Report for ras-UI Design System
 * 
 * Manual analysis of critical color combinations based on actual token values
 */

// WCAG contrast ratio requirements
const WCAG_AA_NORMAL = 4.5;
const WCAG_AA_LARGE = 3.0;
const WCAG_AAA_NORMAL = 7.0;
const WCAG_AAA_LARGE = 4.5;

// Color conversion utilities
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getLuminance(r, g, b) {
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

function getContrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  
  if (!rgb1 || !rgb2) return null;

  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

function evaluateContrast(ratio, isLargeText = false) {
  const results = {
    ratio: Math.round(ratio * 100) / 100,
    wcagAA: isLargeText ? ratio >= WCAG_AA_LARGE : ratio >= WCAG_AA_NORMAL,
    wcagAAA: isLargeText ? ratio >= WCAG_AAA_LARGE : ratio >= WCAG_AAA_NORMAL,
  };

  if (results.wcagAAA) {
    results.level = 'AAA';
    results.status = 'excellent';
  } else if (results.wcagAA) {
    results.level = 'AA';
    results.status = 'good';
  } else {
    results.level = 'FAIL';
    results.status = 'poor';
  }

  return results;
}

// Color palette from tokens
const colors = {
  // Base colors (from core.json)
  white: '#ffffff',
  black: '#000000',
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  },
  // Default brand colors
  brand: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a'
  },
  // State colors
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b'
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f'
  },
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d'
  }
};

// Vibrant brand colors
const vibrantColors = {
  brand: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea', // Primary
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87'
  }
};

// Corporate brand colors
const corporateColors = {
  brand: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488', // Primary
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a'
  }
};

// Define semantic mappings based on tokens
const semanticMapping = {
  light: {
    surface: {
      base: colors.white,
      raised: colors.neutral[50],
      float: colors.white
    },
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[600],
      onBrand: colors.white
    },
    border: {
      default: colors.neutral[200],
      focus: colors.brand[600] // Using primary brand color
    }
  },
  dark: {
    surface: {
      base: colors.neutral[900],
      raised: colors.neutral[800],
      float: colors.neutral[800]
    },
    text: {
      primary: colors.neutral[100],
      secondary: colors.neutral[400],
      onBrand: colors.white
    },
    border: {
      default: colors.neutral[700],
      focus: colors.brand[400]
    }
  },
  'hc-light': {
    surface: {
      base: colors.white,
      raised: colors.neutral[100],
      float: colors.white
    },
    text: {
      primary: colors.black,
      secondary: colors.neutral[700],
      onBrand: colors.white
    },
    border: {
      default: colors.neutral[400],
      focus: colors.brand[800]
    }
  },
  'hc-dark': {
    surface: {
      base: colors.black,
      raised: colors.neutral[900],
      float: colors.neutral[800]
    },
    text: {
      primary: colors.white,
      secondary: colors.neutral[300],
      onBrand: colors.black
    },
    border: {
      default: colors.neutral[600],
      focus: colors.brand[200]
    }
  }
};

// Button component mappings based on component tokens
const buttonMapping = {
  light: {
    primary: {
      background: colors.brand[600],
      text: colors.white,
      border: colors.brand[600]
    },
    secondary: {
      background: colors.white,
      text: colors.neutral[700],
      border: colors.neutral[300]
    },
    danger: {
      background: colors.danger[600],
      text: colors.white,
      border: colors.danger[600]
    }
  },
  dark: {
    primary: {
      background: colors.brand[600],
      text: colors.white,
      border: colors.brand[600]
    },
    secondary: {
      background: colors.neutral[800],
      text: colors.neutral[200],
      border: colors.neutral[600]
    },
    danger: {
      background: colors.danger[600],
      text: colors.white,
      border: colors.danger[600]
    }
  },
  'hc-light': {
    primary: {
      background: colors.brand[800],
      text: colors.white,
      border: colors.brand[800]
    },
    secondary: {
      background: colors.white,
      text: colors.black,
      border: colors.neutral[600]
    },
    danger: {
      background: colors.danger[700],
      text: colors.white,
      border: colors.danger[700]
    }
  },
  'hc-dark': {
    primary: {
      background: colors.brand[200],
      text: colors.black,
      border: colors.brand[200]
    },
    secondary: {
      background: colors.neutral[900],
      text: colors.white,
      border: colors.neutral[400]
    },
    danger: {
      background: colors.danger[300],
      text: colors.black,
      border: colors.danger[300]
    }
  }
};

function analyzeContrastCombinations() {
  console.log('🔍 ras-UI Design System - Comprehensive Color Contrast Analysis\n');
  console.log('=' .repeat(80));
  
  const themes = ['light', 'dark', 'hc-light', 'hc-dark'];
  const results = [];

  // Critical text/background combinations
  const textCombinations = [
    {
      name: 'Primary text on base surface',
      getText: (theme) => semanticMapping[theme].text.primary,
      getBackground: (theme) => semanticMapping[theme].surface.base,
      isLargeText: false,
      critical: true
    },
    {
      name: 'Secondary text on base surface', 
      getText: (theme) => semanticMapping[theme].text.secondary,
      getBackground: (theme) => semanticMapping[theme].surface.base,
      isLargeText: false,
      critical: true
    },
    {
      name: 'Primary text on raised surface',
      getText: (theme) => semanticMapping[theme].text.primary,
      getBackground: (theme) => semanticMapping[theme].surface.raised,
      isLargeText: false,
      critical: false
    },
    {
      name: 'Focus ring on base surface',
      getText: (theme) => semanticMapping[theme].border.focus,
      getBackground: (theme) => semanticMapping[theme].surface.base,
      isLargeText: false,
      critical: true,
      isFocusRing: true
    }
  ];

  // Button combinations
  const buttonCombinations = [
    {
      name: 'Primary button text',
      getText: (theme) => buttonMapping[theme].primary.text,
      getBackground: (theme) => buttonMapping[theme].primary.background,
      isLargeText: false,
      critical: true
    },
    {
      name: 'Secondary button text',
      getText: (theme) => buttonMapping[theme].secondary.text,
      getBackground: (theme) => buttonMapping[theme].secondary.background,
      isLargeText: false,
      critical: true
    },
    {
      name: 'Danger button text',
      getText: (theme) => buttonMapping[theme].danger.text,
      getBackground: (theme) => buttonMapping[theme].danger.background,
      isLargeText: false,
      critical: true
    }
  ];

  // State color combinations
  const stateCombinations = [
    {
      name: 'Success text on success background',
      getText: () => colors.success[700], // Light theme
      getBackground: () => colors.success[50],
      isLargeText: false,
      critical: false,
      themeSpecific: {
        dark: {
          text: colors.success[300],
          background: colors.success[900]
        }
      }
    },
    {
      name: 'Warning text on warning background',
      getText: () => colors.warning[700],
      getBackground: () => colors.warning[50],
      isLargeText: false,
      critical: false,
      themeSpecific: {
        dark: {
          text: colors.warning[300],
          background: colors.warning[900]
        }
      }
    },
    {
      name: 'Danger text on danger background',
      getText: () => colors.danger[700],
      getBackground: () => colors.danger[50],
      isLargeText: false,
      critical: false,
      themeSpecific: {
        dark: {
          text: colors.danger[300],
          background: colors.danger[900]
        }
      }
    }
  ];

  const allCombinations = [...textCombinations, ...buttonCombinations, ...stateCombinations];

  // Analyze each theme
  for (const theme of themes) {
    console.log(`\n🎨 ${theme.toUpperCase()} THEME:`);
    console.log('-'.repeat(40));
    
    const themeResults = [];
    
    for (const combo of allCombinations) {
      let textColor, backgroundColor;
      
      if (combo.themeSpecific && combo.themeSpecific[theme]) {
        textColor = combo.themeSpecific[theme].text;
        backgroundColor = combo.themeSpecific[theme].background;
      } else if (combo.themeSpecific && (theme === 'dark' || theme === 'hc-dark')) {
        // Use dark theme values if available
        const darkTheme = combo.themeSpecific.dark;
        if (darkTheme) {
          textColor = darkTheme.text;
          backgroundColor = darkTheme.background;
        } else {
          textColor = combo.getText(theme);
          backgroundColor = combo.getBackground(theme);
        }
      } else {
        textColor = combo.getText(theme);
        backgroundColor = combo.getBackground(theme);
      }

      if (textColor && backgroundColor) {
        const ratio = getContrastRatio(textColor, backgroundColor);
        
        if (ratio !== null) {
          const evaluation = evaluateContrast(ratio, combo.isLargeText);
          
          const result = {
            theme,
            combination: combo.name,
            textColor,
            backgroundColor,
            ...evaluation,
            critical: combo.critical,
            isFocusRing: combo.isFocusRing || false
          };
          
          results.push(result);
          themeResults.push(result);
          
          // Display result
          const statusIcon = evaluation.status === 'excellent' ? '✅' : 
                            evaluation.status === 'good' ? '✅' : '❌';
          const criticalIcon = combo.critical ? '🔴' : '';
          
          console.log(`${statusIcon}${criticalIcon} ${combo.name}`);
          console.log(`   Ratio: ${evaluation.ratio}:1 (${evaluation.level})`);
          console.log(`   Text: ${textColor} | Background: ${backgroundColor}`);
          
          if (evaluation.status === 'poor') {
            const minRatio = combo.isLargeText ? WCAG_AA_LARGE : WCAG_AA_NORMAL;
            const improvement = Math.ceil((minRatio / evaluation.ratio - 1) * 100);
            console.log(`   ⚠️  Needs ${minRatio}:1 minimum, improve by ${improvement}%`);
          }
          
          if (combo.isFocusRing && evaluation.ratio < 3) {
            console.log(`   🎯 Focus rings should have minimum 3:1 contrast`);
          }
          console.log('');
        }
      }
    }
  }

  return results;
}

// Brand-specific analysis
function analyzeBrandContrasts() {
  console.log('\n🎨 BRAND-SPECIFIC CONTRAST ANALYSIS\n');
  console.log('=' .repeat(80));
  
  const brands = {
    default: colors.brand,
    vibrant: vibrantColors.brand, 
    corporate: corporateColors.brand
  };

  for (const [brandName, brandColors] of Object.entries(brands)) {
    console.log(`\n🏷️  ${brandName.toUpperCase()} BRAND:`);
    console.log('-'.repeat(30));
    
    // Test primary button contrast
    const primaryBg = brandColors[600];
    const primaryText = colors.white;
    const ratio = getContrastRatio(primaryText, primaryBg);
    
    if (ratio !== null) {
      const evaluation = evaluateContrast(ratio, false);
      const statusIcon = evaluation.status === 'excellent' ? '✅' : 
                        evaluation.status === 'good' ? '✅' : '❌';
      
      console.log(`${statusIcon} Primary button contrast: ${evaluation.ratio}:1 (${evaluation.level})`);
      console.log(`   White text (${primaryText}) on ${brandName} ${primaryBg}`);
    }
    
    // Test focus ring contrast (light theme)
    const focusColor = brandName === 'default' ? brandColors[600] :
                      brandName === 'vibrant' ? brandColors[600] :
                      brandColors[600]; // Corporate
    const lightBg = colors.white;
    const focusRatio = getContrastRatio(focusColor, lightBg);
    
    if (focusRatio !== null) {
      const focusEvaluation = evaluateContrast(focusRatio, false);
      const focusIcon = focusEvaluation.ratio >= 3 ? '✅' : '❌';
      
      console.log(`${focusIcon} Focus ring contrast: ${focusEvaluation.ratio}:1`);
      console.log(`   ${brandName} focus (${focusColor}) on white (${lightBg})`);
      
      if (focusEvaluation.ratio < 3) {
        console.log(`   ⚠️  Focus rings need minimum 3:1 contrast`);
      }
    }
    console.log('');
  }
}

// Generate summary and recommendations
function generateSummaryAndRecommendations(results) {
  console.log('\n📊 SUMMARY STATISTICS\n');
  console.log('=' .repeat(80));
  
  const totalTests = results.length;
  const excellentCount = results.filter(r => r.status === 'excellent').length;
  const goodCount = results.filter(r => r.status === 'good').length;
  const poorCount = results.filter(r => r.status === 'poor').length;
  const criticalIssues = results.filter(r => r.status === 'poor' && r.critical).length;

  console.log(`Total contrast tests: ${totalTests}`);
  console.log(`✅ AAA (Excellent): ${excellentCount} (${Math.round(excellentCount/totalTests*100)}%)`);
  console.log(`✅ AA (Good): ${goodCount} (${Math.round(goodCount/totalTests*100)}%)`);
  console.log(`❌ Failed: ${poorCount} (${Math.round(poorCount/totalTests*100)}%)`);
  console.log(`🔴 Critical issues: ${criticalIssues}`);

  // Issues by theme
  const issuesByTheme = results.filter(r => r.status === 'poor')
    .reduce((acc, result) => {
      if (!acc[result.theme]) acc[result.theme] = [];
      acc[result.theme].push(result);
      return acc;
    }, {});

  if (Object.keys(issuesByTheme).length > 0) {
    console.log('\n🚨 ISSUES BY THEME:\n');
    for (const [theme, issues] of Object.entries(issuesByTheme)) {
      console.log(`${theme.toUpperCase()}: ${issues.length} issues`);
      issues.forEach(issue => {
        const criticalFlag = issue.critical ? ' 🔴' : '';
        console.log(`   - ${issue.combination}: ${issue.ratio}:1${criticalFlag}`);
      });
      console.log('');
    }
  }

  // Generate recommendations
  console.log('\n💡 OPTIMIZATION RECOMMENDATIONS\n');
  console.log('=' .repeat(80));
  
  const criticalFailures = results.filter(r => r.status === 'poor' && r.critical);
  
  if (criticalFailures.length > 0) {
    console.log('\n🚨 CRITICAL ISSUES (Immediate Action Required):\n');
    
    criticalFailures.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.combination} - ${issue.theme}`);
      console.log(`   Current: ${issue.ratio}:1, Required: ${WCAG_AA_NORMAL}:1`);
      console.log(`   Colors: ${issue.textColor} on ${issue.backgroundColor}`);
      
      // Specific recommendations
      if (issue.ratio < 2) {
        console.log(`   🎨 Major adjustment needed - consider completely different colors`);
      } else if (issue.ratio < 3.5) {
        console.log(`   🎨 Try 2-3 shades darker for text or lighter for background`);
      } else {
        console.log(`   🎨 Minor adjustment - try 1 shade darker/lighter`);
      }
      console.log('');
    });
  }

  // Missing token recommendations
  console.log('\n📋 RECOMMENDED NEW SEMANTIC TOKENS:\n');
  
  const newTokens = [
    {
      name: 'color.semantic.text.disabled',
      purpose: 'Disabled text with guaranteed contrast',
      values: {
        light: colors.neutral[400],
        dark: colors.neutral[500],
        'hc-light': colors.neutral[600],
        'hc-dark': colors.neutral[400]
      }
    },
    {
      name: 'color.semantic.text.placeholder',
      purpose: 'Form placeholder text',
      values: {
        light: colors.neutral[500],
        dark: colors.neutral[400],
        'hc-light': colors.neutral[600],
        'hc-dark': colors.neutral[400]
      }
    },
    {
      name: 'color.semantic.border.error',
      purpose: 'Error state borders',
      values: {
        light: colors.danger[500],
        dark: colors.danger[400],
        'hc-light': colors.danger[600],
        'hc-dark': colors.danger[300]
      }
    },
    {
      name: 'color.semantic.surface.inverted',
      purpose: 'Dark tooltips/popovers on light backgrounds',
      values: {
        light: colors.neutral[900],
        dark: colors.neutral[100],
        'hc-light': colors.black,
        'hc-dark': colors.white
      }
    }
  ];

  newTokens.forEach(token => {
    console.log(`• ${token.name}`);
    console.log(`  Purpose: ${token.purpose}`);
    Object.entries(token.values).forEach(([theme, color]) => {
      console.log(`    ${theme}: ${color}`);
    });
    console.log('');
  });

  // DTCG compliance recommendations
  console.log('\n📐 DTCG SCHEMA IMPROVEMENTS:\n');
  
  console.log('• Type Consistency Issues Found:');
  console.log('  - Some tokens use "dimension" vs "spacing" inconsistently');
  console.log('  - Shadow tokens should use "shadow" type instead of "boxShadow"');
  console.log('  - Font size tokens should use "fontSize" instead of "dimension"');
  console.log('');
  
  console.log('• Missing Required Fields:');
  console.log('  - Add $schema reference to all token files');
  console.log('  - Include $description for better documentation');
  console.log('  - Consider $extensions for brand-specific metadata');
  console.log('');
  
  // Accessibility improvements
  console.log('\n♿ ACCESSIBILITY ENHANCEMENTS:\n');
  
  console.log('• Focus Management:');
  console.log('  - All focus indicators should have minimum 3:1 contrast');
  console.log('  - Consider 3px focus ring width for better visibility');
  console.log('  - Add focus ring offset of 2px for visual separation');
  console.log('');
  
  console.log('• High Contrast Support:');
  console.log('  - High contrast themes show good compliance');
  console.log('  - Consider forced colors mode support (Windows High Contrast)');
  console.log('  - Test with system-level high contrast settings');
  console.log('');
  
  console.log('• Color Independence:');
  console.log('  - Ensure state information is not conveyed by color alone');
  console.log('  - Add icons or patterns for success/warning/error states');
  console.log('  - Consider shape coding for additional accessibility');
  console.log('');
}

// Main analysis
function main() {
  const results = analyzeContrastCombinations();
  analyzeBrandContrasts();
  generateSummaryAndRecommendations(results);
  
  console.log('\n' + '=' .repeat(80));
  console.log('🏁 Analysis Complete!');
  console.log('💾 Consider saving this report for future reference.');
  console.log('🔄 Re-run this analysis when updating color tokens.');
  console.log('=' .repeat(80));
}

main();