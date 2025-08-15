/**
 * Validation script to test contrast checker fixes
 * Run this in browser console when viewing Button stories in Storybook
 */

(function contrastValidation() {
  console.log('🔍 Contrast Checker Validation');
  console.log('─'.repeat(50));
  
  // Check if contrast displays are properly excluded
  const contrastDisplays = document.querySelectorAll('[data-contrast-display]');
  console.log(`📊 Found ${contrastDisplays.length} contrast display(s)`);
  
  contrastDisplays.forEach((display, index) => {
    const attrs = {
      'aria-hidden': display.getAttribute('aria-hidden'),
      'data-a11y-ignore': display.getAttribute('data-a11y-ignore'),
      'data-contrast-display': display.getAttribute('data-contrast-display'),
      'role': display.getAttribute('role'),
      'class': display.className
    };
    
    console.log(`Display ${index + 1} attributes:`, attrs);
    
    // Check if properly positioned
    const rect = display.getBoundingClientRect();
    console.log(`Display ${index + 1} position: top=${rect.top}px, right=${window.innerWidth - rect.right}px`);
  });
  
  // Check button colors
  console.log('\n🎨 Button Color Analysis');
  console.log('─'.repeat(50));
  
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button, index) => {
    if (button.closest('[data-contrast-display]')) return; // Skip our own displays
    
    const computedStyle = window.getComputedStyle(button);
    const bgColor = computedStyle.backgroundColor;
    const textColor = computedStyle.color;
    
    console.log(`Button ${index + 1}:`);
    console.log(`  Background: ${bgColor}`);
    console.log(`  Text: ${textColor}`);
    
    // Convert to hex for validation
    const rgbToHex = (rgb) => {
      const match = rgb.match(/\d+/g);
      if (!match) return rgb;
      const [r, g, b] = match.map(Number);
      return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    };
    
    if (bgColor.startsWith('rgb')) {
      const hexBg = rgbToHex(bgColor);
      console.log(`  Background (hex): ${hexBg}`);
      
      // Check if it's the problematic brand.500 color
      if (hexBg === '#3b82f6') {
        console.warn(`⚠️  Button ${index + 1} uses brand.500 (#3b82f6) - this may cause a11y conflicts`);
      } else if (hexBg === '#2563eb') {
        console.log(`✅ Button ${index + 1} correctly uses brand.600 (#2563eb)`);
      }
    }
  });
  
  // Check theme application
  console.log('\n🎭 Theme Analysis');
  console.log('─'.repeat(50));
  
  const rootElement = document.documentElement;
  const currentTheme = rootElement.getAttribute('data-theme') || 'light';
  console.log(`Current theme: ${currentTheme}`);
  
  // Check CSS custom properties
  const buttonPrimaryBg = getComputedStyle(rootElement).getPropertyValue('--color-components-button-primary-background').trim();
  console.log(`Button primary background token: ${buttonPrimaryBg}`);
  
  if (buttonPrimaryBg === '#2563eb') {
    console.log('✅ Token correctly resolves to brand.600 (#2563eb)');
  } else if (buttonPrimaryBg === '#3b82f6') {
    console.warn('⚠️  Token incorrectly resolves to brand.500 (#3b82f6)');
  } else {
    console.log(`Token resolves to: ${buttonPrimaryBg}`);
  }
  
  console.log('\n🎯 Recommendations:');
  console.log('─'.repeat(50));
  console.log('1. Ensure all contrast displays have proper exclusion attributes');
  console.log('2. Verify buttons use correct token values');
  console.log('3. Check a11y panel for remaining contrast violations');
  console.log('4. Test theme switching to ensure consistent behavior');
  
})();