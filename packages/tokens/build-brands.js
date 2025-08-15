const StyleDictionary = require('style-dictionary');
const fs = require('fs');
const path = require('path');

// Get all brand directories
const brandsDir = path.join(__dirname, 'brands');
const brands = fs.readdirSync(brandsDir).filter(item => 
  fs.statSync(path.join(brandsDir, item)).isDirectory()
);

console.log(`Found brands: ${brands.join(', ')}`);

// Custom transforms for vanilla-extract
StyleDictionary.registerTransform({
  name: 'vanilla-extract/css-variable',
  type: 'name',
  transformer: function(token) {
    return `--${token.path.join('-')}`;
  }
});

StyleDictionary.registerTransform({
  name: 'vanilla-extract/shadow',
  type: 'value',
  matcher: function(token) {
    return token.type === 'shadow' && typeof token.value === 'object';
  },
  transformer: function(token) {
    if (token.value === 'none') return 'none';
    const { offsetX, offsetY, blur, spread, color } = token.value;
    return `${offsetX} ${offsetY} ${blur} ${spread} ${color}`;
  }
});

StyleDictionary.registerTransform({
  name: 'vanilla-extract/font-family',
  type: 'value',
  matcher: function(token) {
    return token.type === 'fontFamily';
  },
  transformer: function(token) {
    return Array.isArray(token.value) ? token.value.map(font => 
      font.includes(' ') ? `"${font}"` : font
    ).join(', ') : token.value;
  }
});

// Transform group for vanilla-extract
StyleDictionary.registerTransformGroup({
  name: 'vanilla-extract/css',
  transforms: [
    'attribute/cti',
    'name/cti/kebab',
    'vanilla-extract/css-variable',
    'vanilla-extract/shadow',
    'vanilla-extract/font-family',
    'size/px'
  ]
});

// Custom format for CSS variables with brand support
StyleDictionary.registerFormat({
  name: 'vanilla-extract/css-variables-brand',
  formatter: function(dictionary, config) {
    const brandName = config.brand || 'default';
    let output = `[data-brand="${brandName}"] {\n`;
    
    // Add core tokens (no theme variants)
    dictionary.allTokens.forEach(token => {
      if (!token.path.includes('light') && !token.path.includes('dark') && !token.path.includes('hc-light') && !token.path.includes('hc-dark')) {
        const cssVar = `--${token.path.join('-')}`;
        output += `  ${cssVar}: ${token.value};\n`;
      }
    });
    
    // Add light theme semantic tokens as defaults
    dictionary.allTokens.forEach(token => {
      if (token.path.includes('light') && !token.path.includes('hc-light')) {
        const tokenPath = token.path.slice(0, -1).join('-');
        const cssVar = `--${tokenPath}`;
        output += `  ${cssVar}: ${token.value};\n`;
      }
    });
    
    output += '}\n\n';
    
    // Dark theme overrides
    output += `[data-brand="${brandName}"][data-theme="dark"] {\n`;
    dictionary.allTokens.forEach(token => {
      if (token.path.includes('dark') && !token.path.includes('hc-dark')) {
        const tokenPath = token.path.slice(0, -1).join('-');
        const cssVar = `--${tokenPath}`;
        output += `  ${cssVar}: ${token.value};\n`;
      }
    });
    output += '}\n\n';
    
    // High contrast light theme
    output += `[data-brand="${brandName}"][data-theme="hc-light"] {\n`;
    dictionary.allTokens.forEach(token => {
      if (token.path.includes('hc-light')) {
        const tokenPath = token.path.slice(0, -1).join('-');
        const cssVar = `--${tokenPath}`;
        output += `  ${cssVar}: ${token.value};\n`;
      }
    });
    output += '}\n\n';
    
    // High contrast dark theme
    output += `[data-brand="${brandName}"][data-theme="hc-dark"] {\n`;
    dictionary.allTokens.forEach(token => {
      if (token.path.includes('hc-dark')) {
        const tokenPath = token.path.slice(0, -1).join('-');
        const cssVar = `--${tokenPath}`;
        output += `  ${cssVar}: ${token.value};\n`;
      }
    });
    output += '}\n';
    
    return output;
  }
});

// Build each brand
brands.forEach(brand => {
  console.log(`Building brand: ${brand}`);
  
  const config = {
    source: [
      'tokens/semantic.json', // Always include semantic tokens
      `brands/${brand}/core.json`,
      `brands/${brand}/components.json`
    ],
    platforms: {
      'vanilla-extract': {
        transformGroup: 'vanilla-extract/css',
        buildPath: `dist/brands/${brand}/`,
        brand: brand,
        files: [
          {
            destination: 'tokens.css',
            format: 'vanilla-extract/css-variables-brand'
          }
        ]
      }
    }
  };
  
  const styleDictionary = StyleDictionary.extend(config);
  styleDictionary.buildAllPlatforms();
});

// Also build a combined CSS file with all brands
console.log('Building combined brand CSS...');
let combinedCSS = '/* Combined Brand Styles */\n\n';

brands.forEach(brand => {
  const brandCSS = fs.readFileSync(`dist/brands/${brand}/tokens.css`, 'utf8');
  combinedCSS += `/* ${brand.toUpperCase()} BRAND */\n`;
  combinedCSS += brandCSS + '\n';
});

// Ensure the dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

fs.writeFileSync('dist/brands.css', combinedCSS);

console.log('✅ All brands built successfully!');
console.log(`Available brands: ${brands.join(', ')}`);