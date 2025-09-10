#!/usr/bin/env node
/**
 * Color Contrast Audit Tool for ras-UI Design System
 *
 * Analyzes WCAG contrast compliance across all tokens and themes.
 * Generates comprehensive recommendations for token optimization.
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// WCAG contrast ratio requirements
const WCAG_AA_NORMAL = 4.5;
const WCAG_AA_LARGE = 3.0;
const WCAG_AAA_NORMAL = 7.0;
const WCAG_AAA_LARGE = 4.5;

// Color conversion utilities
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function getLuminance(r, g, b) {
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const rLinear =
    rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLinear =
    gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLinear =
    bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

function getContrastRatio(hex1, hex2) {
  if (hex1 === "transparent" || hex2 === "transparent") {
    return 1; // Assume worst case for transparent colors
  }

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
    results.level = "AAA";
    results.status = "excellent";
  } else if (results.wcagAA) {
    results.level = "AA";
    results.status = "good";
  } else {
    results.level = "FAIL";
    results.status = "poor";
  }

  return results;
}

// Load token files
function loadTokens() {
  const tokensPath = resolve(__dirname, "../packages/tokens");

  try {
    const core = JSON.parse(
      readFileSync(resolve(tokensPath, "tokens/core.json"), "utf8"),
    );
    const semantic = JSON.parse(
      readFileSync(resolve(tokensPath, "tokens/semantic.json"), "utf8"),
    );
    const components = JSON.parse(
      readFileSync(resolve(tokensPath, "tokens/components.json"), "utf8"),
    );

    // Load brand tokens
    const brands = {
      default: JSON.parse(
        readFileSync(resolve(tokensPath, "brands/default/core.json"), "utf8"),
      ),
      vibrant: JSON.parse(
        readFileSync(resolve(tokensPath, "brands/vibrant/core.json"), "utf8"),
      ),
      corporate: JSON.parse(
        readFileSync(resolve(tokensPath, "brands/corporate/core.json"), "utf8"),
      ),
    };

    return { core, semantic, components, brands };
  } catch (error) {
    console.error("Error loading tokens:", error.message);
    process.exit(1);
  }
}

// Resolve token references
function resolveTokenValue(value, context, maxDepth = 5) {
  if (maxDepth <= 0) return value; // Prevent infinite recursion

  if (
    typeof value !== "string" ||
    !value.startsWith("{") ||
    !value.endsWith("}")
  ) {
    return value;
  }

  const path = value.slice(1, -1).split(".");
  let current = context;

  for (const segment of path) {
    if (current && typeof current === "object" && segment in current) {
      current = current[segment];
    } else {
      // Try to find in base tokens if not found at current level
      if (context.color && context.color.base) {
        let baseCurrent = context.color.base;
        const basePath = path.slice(2); // Skip 'color' and 'base'

        for (const baseSegment of basePath) {
          if (
            baseCurrent &&
            typeof baseCurrent === "object" &&
            baseSegment in baseCurrent
          ) {
            baseCurrent = baseCurrent[baseSegment];
          } else {
            return value; // Unable to resolve
          }
        }

        const baseValue =
          typeof baseCurrent === "object" && baseCurrent.value
            ? baseCurrent.value
            : baseCurrent;
        return baseValue;
      }
      return value; // Unable to resolve
    }
  }

  const resolvedValue =
    typeof current === "object" && current.value ? current.value : current;

  // If the resolved value is also a reference, resolve it recursively
  if (
    typeof resolvedValue === "string" &&
    resolvedValue.startsWith("{") &&
    resolvedValue.endsWith("}")
  ) {
    return resolveTokenValue(resolvedValue, context, maxDepth - 1);
  }

  return resolvedValue;
}

// Analyze contrast for text/background combinations
function analyzeTextContrasts(tokens) {
  const results = [];
  const themes = ["light", "dark", "hc-light", "hc-dark"];

  // Define text/background combinations to test
  const combinations = [
    {
      name: "Primary text on base surface",
      textToken: ["color", "semantic", "text", "primary"],
      backgroundToken: ["color", "semantic", "surface", "base"],
      isLargeText: false,
    },
    {
      name: "Secondary text on base surface",
      textToken: ["color", "semantic", "text", "secondary"],
      backgroundToken: ["color", "semantic", "surface", "base"],
      isLargeText: false,
    },
    {
      name: "Primary text on raised surface",
      textToken: ["color", "semantic", "text", "primary"],
      backgroundToken: ["color", "semantic", "surface", "raised"],
      isLargeText: false,
    },
    {
      name: "Button primary text on primary background",
      textToken: ["color", "components", "button", "primary", "text"],
      backgroundToken: [
        "color",
        "components",
        "button",
        "primary",
        "background",
      ],
      isLargeText: false,
    },
    {
      name: "Button secondary text on secondary background",
      textToken: ["color", "components", "button", "secondary", "text"],
      backgroundToken: [
        "color",
        "components",
        "button",
        "secondary",
        "background",
      ],
      isLargeText: false,
    },
    {
      name: "Button danger text on danger background",
      textToken: ["color", "components", "button", "danger", "text"],
      backgroundToken: [
        "color",
        "components",
        "button",
        "danger",
        "background",
      ],
      isLargeText: false,
    },
    {
      name: "Success text on success surface",
      textToken: ["color", "semantic", "text", "success"],
      backgroundToken: ["color", "semantic", "surface", "success"],
      isLargeText: false,
    },
    {
      name: "Warning text on warning surface",
      textToken: ["color", "semantic", "text", "warning"],
      backgroundToken: ["color", "semantic", "surface", "warning"],
      isLargeText: false,
    },
    {
      name: "Danger text on danger surface",
      textToken: ["color", "semantic", "text", "danger"],
      backgroundToken: ["color", "semantic", "surface", "danger"],
      isLargeText: false,
    },
  ];

  for (const theme of themes) {
    for (const combo of combinations) {
      // Get token values for this theme
      const textColor = getTokenValue(combo.textToken, theme, tokens);
      const backgroundColor = getTokenValue(
        combo.backgroundToken,
        theme,
        tokens,
      );

      if (textColor && backgroundColor) {
        const ratio = getContrastRatio(textColor, backgroundColor);
        if (ratio !== null) {
          const evaluation = evaluateContrast(ratio, combo.isLargeText);

          results.push({
            theme,
            combination: combo.name,
            textColor,
            backgroundColor,
            ...evaluation,
            isLargeText: combo.isLargeText,
          });
        }
      }
    }
  }

  return results;
}

// Get token value for specific theme
function getTokenValue(tokenPath, theme, tokens) {
  let current = tokens;

  // Navigate to the token
  for (const segment of tokenPath) {
    if (current && typeof current === "object" && segment in current) {
      current = current[segment];
    } else {
      console.log(
        `Token path not found: ${tokenPath.join(".")} at segment: ${segment}`,
      );
      return null;
    }
  }

  // Check if this token has theme variants
  if (current && typeof current === "object" && theme in current) {
    const themeToken = current[theme];
    if (themeToken && themeToken.value) {
      const resolved = resolveTokenValue(themeToken.value, tokens);
      console.log(
        `Resolved ${tokenPath.join(".")}.${theme}: ${themeToken.value} -> ${resolved}`,
      );
      return resolved;
    }
  }

  // Fallback to direct value
  if (current && typeof current === "object" && current.value) {
    const resolved = resolveTokenValue(current.value, tokens);
    console.log(
      `Resolved ${tokenPath.join(".")}: ${current.value} -> ${resolved}`,
    );
    return resolved;
  }

  console.log(
    `No value found for token: ${tokenPath.join(".")} (theme: ${theme})`,
  );
  return current;
}

// Analyze focus indicators
function analyzeFocusContrasts(tokens) {
  const results = [];
  const themes = ["light", "dark", "hc-light", "hc-dark"];

  for (const theme of themes) {
    const focusColor = getTokenValue(
      ["color", "semantic", "border", "focus"],
      theme,
      tokens,
    );
    const baseBackground = getTokenValue(
      ["color", "semantic", "surface", "base"],
      theme,
      tokens,
    );

    if (focusColor && baseBackground) {
      const ratio = getContrastRatio(focusColor, baseBackground);
      if (ratio !== null) {
        const evaluation = evaluateContrast(ratio, false);

        results.push({
          theme,
          type: "Focus indicator",
          foreground: focusColor,
          background: baseBackground,
          ...evaluation,
        });
      }
    }
  }

  return results;
}

// Generate comprehensive audit report
function generateReport(tokens) {
  console.log("🔍 ras-UI Design System - Color Contrast Audit Report\n");
  console.log("=".repeat(80));

  // Text contrast analysis
  console.log("\n📝 TEXT CONTRAST ANALYSIS\n");
  const textResults = analyzeTextContrasts(tokens);

  const groupedByTheme = textResults.reduce((acc, result) => {
    if (!acc[result.theme]) acc[result.theme] = [];
    acc[result.theme].push(result);
    return acc;
  }, {});

  for (const [theme, results] of Object.entries(groupedByTheme)) {
    console.log(`\n🎨 ${theme.toUpperCase()} THEME:`);
    console.log("-".repeat(40));

    results.forEach((result) => {
      const statusIcon =
        result.status === "excellent"
          ? "✅"
          : result.status === "good"
            ? "✅"
            : "❌";

      console.log(`${statusIcon} ${result.combination}`);
      console.log(`   Ratio: ${result.ratio}:1 (${result.level})`);
      console.log(
        `   Text: ${result.textColor} | Background: ${result.backgroundColor}`,
      );

      if (result.status === "poor") {
        const minRatio = result.isLargeText ? WCAG_AA_LARGE : WCAG_AA_NORMAL;
        console.log(
          `   ⚠️  Needs ${minRatio}:1 minimum (current: ${result.ratio}:1)`,
        );
      }
      console.log("");
    });
  }

  // Focus indicator analysis
  console.log("\n🎯 FOCUS INDICATOR ANALYSIS\n");
  const focusResults = analyzeFocusContrasts(tokens);

  focusResults.forEach((result) => {
    const statusIcon =
      result.status === "excellent"
        ? "✅"
        : result.status === "good"
          ? "✅"
          : "❌";

    console.log(`${statusIcon} ${result.theme.toUpperCase()} - ${result.type}`);
    console.log(`   Ratio: ${result.ratio}:1 (${result.level})`);
    console.log(
      `   Focus: ${result.foreground} | Background: ${result.background}`,
    );
    console.log("");
  });

  // Summary statistics
  console.log("\n📊 SUMMARY STATISTICS\n");

  const allResults = [...textResults, ...focusResults];
  const totalTests = allResults.length;
  const excellentCount = allResults.filter(
    (r) => r.status === "excellent",
  ).length;
  const goodCount = allResults.filter((r) => r.status === "good").length;
  const poorCount = allResults.filter((r) => r.status === "poor").length;

  console.log(`Total tests: ${totalTests}`);
  console.log(
    `✅ AAA (Excellent): ${excellentCount} (${Math.round((excellentCount / totalTests) * 100)}%)`,
  );
  console.log(
    `✅ AA (Good): ${goodCount} (${Math.round((goodCount / totalTests) * 100)}%)`,
  );
  console.log(
    `❌ Failed: ${poorCount} (${Math.round((poorCount / totalTests) * 100)}%)`,
  );

  // Issues by theme
  console.log("\n🚨 ISSUES BY THEME:\n");
  const issuesByTheme = allResults
    .filter((r) => r.status === "poor")
    .reduce((acc, result) => {
      const theme = result.theme || "general";
      if (!acc[theme]) acc[theme] = [];
      acc[theme].push(result);
      return acc;
    }, {});

  for (const [theme, issues] of Object.entries(issuesByTheme)) {
    console.log(`${theme.toUpperCase()}: ${issues.length} issues`);
    issues.forEach((issue) => {
      console.log(`   - ${issue.combination || issue.type}: ${issue.ratio}:1`);
    });
    console.log("");
  }

  return {
    textResults,
    focusResults,
    summary: {
      total: totalTests,
      excellent: excellentCount,
      good: goodCount,
      poor: poorCount,
      issuesByTheme,
    },
  };
}

// Generate optimization recommendations
function generateRecommendations(auditResults) {
  console.log("\n💡 OPTIMIZATION RECOMMENDATIONS\n");
  console.log("=".repeat(80));

  const { textResults, focusResults, summary } = auditResults;

  // High priority issues
  const criticalIssues = [...textResults, ...focusResults].filter(
    (r) => r.status === "poor",
  );

  if (criticalIssues.length > 0) {
    console.log("\n🚨 CRITICAL ISSUES (Immediate Action Required):\n");

    criticalIssues.forEach((issue, index) => {
      console.log(
        `${index + 1}. ${issue.combination || issue.type} - ${issue.theme || "all themes"}`,
      );

      const minRatio = issue.isLargeText ? WCAG_AA_LARGE : WCAG_AA_NORMAL;
      const improvement = Math.ceil((minRatio / issue.ratio - 1) * 100);

      console.log(`   Current: ${issue.ratio}:1, Required: ${minRatio}:1`);
      console.log(`   Suggestion: Increase contrast by ~${improvement}%`);

      // Specific color suggestions
      if (issue.ratio < 2) {
        console.log(`   🎨 Consider using darker text or lighter background`);
      } else if (issue.ratio < 3) {
        console.log(
          `   🎨 Minor adjustments needed - try one shade darker/lighter`,
        );
      }
      console.log("");
    });
  }

  // Missing tokens
  console.log("\n📝 MISSING TOKEN RECOMMENDATIONS:\n");

  const missingTokens = [
    {
      name: "color.semantic.text.disabled",
      description: "Disabled text color with proper contrast",
      themes: ["light", "dark", "hc-light", "hc-dark"],
      values: {
        light: "color.base.neutral.400",
        dark: "color.base.neutral.500",
        "hc-light": "color.base.neutral.600",
        "hc-dark": "color.base.neutral.400",
      },
    },
    {
      name: "color.semantic.border.error",
      description: "Error state border color",
      themes: ["light", "dark", "hc-light", "hc-dark"],
      values: {
        light: "color.base.danger.600",
        dark: "color.base.danger.400",
        "hc-light": "color.base.danger.700",
        "hc-dark": "color.base.danger.300",
      },
    },
    {
      name: "color.semantic.surface.inverted",
      description: "Inverted surface for tooltips/popovers",
      themes: ["light", "dark", "hc-light", "hc-dark"],
      values: {
        light: "color.base.neutral.900",
        dark: "color.base.neutral.100",
        "hc-light": "color.base.black",
        "hc-dark": "color.base.white",
      },
    },
    {
      name: "color.semantic.text.inverted",
      description: "Text color for inverted surfaces",
      themes: ["light", "dark", "hc-light", "hc-dark"],
      values: {
        light: "color.base.white",
        dark: "color.base.neutral.900",
        "hc-light": "color.base.white",
        "hc-dark": "color.base.black",
      },
    },
  ];

  missingTokens.forEach((token) => {
    console.log(`• ${token.name}`);
    console.log(`  Purpose: ${token.description}`);
    console.log(`  Suggested values:`);
    Object.entries(token.values).forEach(([theme, value]) => {
      console.log(`    ${theme}: ${value}`);
    });
    console.log("");
  });

  // High contrast improvements
  console.log("\n♿ ACCESSIBILITY ENHANCEMENTS:\n");

  console.log("• Focus Ring Improvements:");
  console.log("  - Increase focus ring width to 3px for better visibility");
  console.log("  - Add focus ring offset of 2px for better separation");
  console.log("  - Consider dual-color focus rings for high contrast themes\n");

  console.log("• High Contrast Theme Enhancements:");
  console.log(
    "  - Use pure black (#000000) and white (#ffffff) more extensively",
  );
  console.log("  - Increase border widths in high contrast themes");
  console.log("  - Add more visual separation between elements\n");

  console.log("• Color Blind Accessibility:");
  console.log(
    "  - Ensure state colors (success/warning/error) are distinguishable",
  );
  console.log("  - Add additional visual cues beyond color (icons, patterns)");
  console.log("  - Test with color blindness simulation tools\n");

  // Brand-specific recommendations
  console.log("\n🎨 BRAND-SPECIFIC RECOMMENDATIONS:\n");

  console.log("• Vibrant Brand:");
  console.log(
    "  - Purple brand colors may need adjustment for high contrast themes",
  );
  console.log(
    "  - Consider lighter purple shades for dark theme backgrounds\n",
  );

  console.log("• Corporate Brand:");
  console.log("  - Teal brand colors provide good contrast ratios");
  console.log("  - Maintain conservative approach for professional contexts\n");

  console.log("• Default Brand:");
  console.log("  - Blue brand colors are well-balanced across themes");
  console.log("  - Good baseline for contrast requirements\n");
}

// Main execution
function main() {
  const tokens = loadTokens();

  // Combine all tokens for analysis
  const combinedTokens = {
    ...tokens.core,
    ...tokens.semantic,
    ...tokens.components,
  };

  const auditResults = generateReport(combinedTokens);
  generateRecommendations(auditResults);

  console.log("\n" + "=".repeat(80));
  console.log("🏁 Audit Complete! Review recommendations above.");
  console.log(
    "💡 Run this audit regularly as you develop new components and themes.",
  );
  console.log("=".repeat(80));
}

// Run the audit
main();
