/**
 * Comprehensive contrast analysis for ras-UI button tokens
 * This script calculates contrast ratios and identifies WCAG compliance issues
 */

// Contrast ratio calculation functions (same as contrast-checker.ts)
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 1;
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

function getWCAGLevel(ratio) {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'A';
  return 'FAIL';
}

// Button token colors from tokens.css
const buttonColors = {
  light: {
    primary: { background: '#2563eb', text: '#ffffff' },
    secondary: { background: '#ffffff', text: '#374151' },
    ghost: { background: 'transparent', text: '#111827' },
    danger: { background: '#dc2626', text: '#ffffff' }
  },
  dark: {
    primary: { background: '#2563eb', text: '#ffffff' },
    secondary: { background: '#1f2937', text: '#e5e7eb' },
    ghost: { background: 'transparent', text: '#f3f4f6' },
    danger: { background: '#dc2626', text: '#ffffff' }
  },
  'hc-light': {
    primary: { background: '#1e40af', text: '#ffffff' },
    secondary: { background: '#ffffff', text: '#000000' },
    ghost: { background: 'transparent', text: '#000000' },
    danger: { background: '#b91c1c', text: '#ffffff' }
  },
  'hc-dark': {
    primary: { background: '#bfdbfe', text: '#000000' },
    secondary: { background: '#111827', text: '#ffffff' },
    ghost: { background: 'transparent', text: '#ffffff' },
    danger: { background: '#fca5a5', text: '#000000' }
  }
};

// Background colors for ghost buttons (from theme surface)
const surfaceColors = {
  light: '#ffffff',
  dark: '#111827',
  'hc-light': '#ffffff',
  'hc-dark': '#000000'
};

console.log('=== ras-UI Button Contrast Analysis ===\n');

Object.entries(buttonColors).forEach(([theme, variants]) => {
  console.log(`🎨 Theme: ${theme.toUpperCase()}`);
  console.log('─'.repeat(50));
  
  Object.entries(variants).forEach(([variant, colors]) => {
    let background = colors.background;
    
    // Handle transparent/ghost buttons
    if (background === 'transparent') {
      background = surfaceColors[theme];
    }
    
    const ratio = getContrastRatio(background, colors.text);
    const wcagLevel = getWCAGLevel(ratio);
    const status = ratio >= 4.5 ? '✅' : ratio >= 3 ? '⚠️' : '❌';
    
    console.log(`${status} ${variant.padEnd(10)} | ${ratio.toFixed(2)}:1 (${wcagLevel}) | ${background} → ${colors.text}`);
  });
  
  console.log('');
});

console.log('🔍 Key Issues Found:');
console.log('─'.repeat(50));

// Check specific problematic combinations
const issues = [];

// Check all combinations for WCAG AA compliance
Object.entries(buttonColors).forEach(([theme, variants]) => {
  Object.entries(variants).forEach(([variant, colors]) => {
    let background = colors.background;
    if (background === 'transparent') {
      background = surfaceColors[theme];
    }
    
    const ratio = getContrastRatio(background, colors.text);
    
    if (ratio < 4.5) {
      issues.push({
        theme,
        variant,
        background,
        text: colors.text,
        ratio,
        wcag: getWCAGLevel(ratio)
      });
    }
  });
});

if (issues.length === 0) {
  console.log('✅ All button variants meet WCAG AA standards (4.5:1)');
} else {
  issues.forEach(issue => {
    console.log(`❌ ${issue.theme}/${issue.variant}: ${issue.ratio.toFixed(2)}:1 (${issue.wcag}) - ${issue.background} → ${issue.text}`);
  });
}

console.log('\n📊 Brand Color Analysis:');
console.log('─'.repeat(50));
console.log('• brand.500 (#3b82f6) → white:', getContrastRatio('#3b82f6', '#ffffff').toFixed(2) + ':1');
console.log('• brand.600 (#2563eb) → white:', getContrastRatio('#2563eb', '#ffffff').toFixed(2) + ':1');
console.log('• Tokens use brand.600 (#2563eb) ✅');
console.log('• A11y addon may be detecting brand.500 (#3b82f6) due to CSS conflicts');