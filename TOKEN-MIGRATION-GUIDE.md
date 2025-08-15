# 🎯 Design Token Migration Guide
## From Awkward Brackets to Developer-Friendly Semantics

This guide helps you migrate from the old bracket notation (`theme.space['2']`) to the new developer-friendly semantic tokens (`theme.space.xs`).

---

## 🚨 **The Problem We're Solving**

### **Before: Awkward Developer Experience**
```tsx
// ❌ Hard to read and understand
const styles = {
  padding: `${theme.space['2']} ${theme.space['3']}`,  // What sizes are these?
  margin: theme.space['4'],                            // How big is '4'?
  boxShadow: theme.elevation['1'],                     // What's the visual weight?
  gap: theme.space['2'],                               // Same as padding first value?
};
```

### **After: Beautiful Developer Experience**
```tsx
// ✅ Self-documenting and intuitive
const styles = {
  padding: `${theme.space.xs} ${theme.space.sm}`,     // Extra small + small
  margin: theme.space.lg,                             // Large margin
  boxShadow: theme.elevation.sm,                      // Subtle elevation
  gap: theme.space.xs,                                // Extra small gap
};
```

---

## 🎨 **New Token Access Patterns**

You now have **THREE** ways to access design tokens:

### **1. Semantic Access (Recommended)**
```tsx
// Most developer-friendly - use these for new code
theme.space.xs      // 4px  - Extra small spacing
theme.space.sm      // 8px  - Small spacing  
theme.space.md      // 16px - Medium spacing
theme.space.lg      // 24px - Large spacing
theme.space.xl      // 32px - Extra large spacing

theme.elevation.sm  // Subtle lift
theme.elevation.md  // Clear floating
theme.elevation.lg  // Prominent overlay
```

### **2. Numeric Access (Clean)**
```tsx
// Cleaner than string brackets - good for systematic spacing
theme.space[2]      // 4px
theme.space[3]      // 8px
theme.space[5]      // 16px
theme.space[7]      // 24px
theme.space[8]      // 32px

theme.elevation[1]  // Subtle lift
theme.elevation[2]  // Clear floating
theme.elevation[3]  // Prominent overlay
```

### **3. Legacy String Access (Temporary)**
```tsx
// Still works during migration period
theme.space['2']      // 4px (legacy - will be deprecated)
theme.elevation['1']  // Subtle lift (legacy - will be deprecated)
```

---

## 📊 **Token Mapping Reference**

### **Space Tokens**
| Semantic | Numeric | Legacy | Value | Usage |
|----------|---------|--------|-------|-------|
| `theme.space.none` | `theme.space[0]` | `theme.space['0']` | 0px | No spacing |
| `theme.space.xs` | `theme.space[2]` | `theme.space['2']` | 4px | Extra small spacing |
| `theme.space.sm` | `theme.space[3]` | `theme.space['3']` | 8px | Small spacing |
| `theme.space.md` | `theme.space[5]` | `theme.space['5']` | 16px | Medium spacing |
| `theme.space.lg` | `theme.space[7]` | `theme.space['7']` | 24px | Large spacing |
| `theme.space.xl` | `theme.space[8]` | `theme.space['8']` | 32px | Extra large spacing |

### **Elevation Tokens**
| Semantic | Numeric | Legacy | Visual Effect |
|----------|---------|--------|---------------|
| `theme.elevation.none` | `theme.elevation[0]` | `theme.elevation['0']` | Flat surface |
| `theme.elevation.sm` | `theme.elevation[1]` | `theme.elevation['1']` | Subtle lift |
| `theme.elevation.md` | `theme.elevation[2]` | `theme.elevation['2']` | Clear floating |
| `theme.elevation.lg` | `theme.elevation[3]` | `theme.elevation['3']` | Prominent overlay |

---

## 🔄 **Migration Strategies**

### **Strategy 1: Gradual Migration (Recommended)**
Migrate components one at a time without breaking existing code.

```tsx
// You can mix approaches during migration
const alertStyles = {
  padding: theme.space.lg,         // ✅ Migrated to semantic
  margin: theme.space[4],          // ✅ Migrated to numeric  
  boxShadow: theme.elevation['1'], // ⏳ Not yet migrated (still works)
  gap: theme.space.sm,             // ✅ New semantic approach
};
```

### **Strategy 2: Component-by-Component**
Update entire components systematically.

```tsx
// Before: Alert component
const oldAlert = {
  padding: theme.space['4'],
  gap: theme.space['3'],
  boxShadow: theme.elevation['1'],
  marginTop: theme.space['2'],
};

// After: Alert component
const newAlert = {
  padding: theme.space.lg,        // Large comfortable padding
  gap: theme.space.sm,            // Small gap between elements
  boxShadow: theme.elevation.sm,  // Subtle elevation
  marginTop: theme.space.xs,      // Extra small top margin
};
```

### **Strategy 3: Semantic for Meaning, Numeric for System**
Use semantic tokens for common meaningful sizes, numeric for systematic relationships.

```tsx
const systematicSpacing = {
  // Systematic numeric relationships
  container: { padding: theme.space[6] },     // Base padding
  section: { padding: theme.space[4] },       // 2 steps smaller  
  item: { padding: theme.space[2] },          // 4 steps smaller
  
  // Semantic for common patterns
  gap: theme.space.sm,                       // Small gap
  margin: theme.space.md,                    // Medium margin
  borderRadius: theme.radius.md,             // Medium roundness
};
```

---

## ✨ **Real-World Examples**

### **Button Component Migration**

```tsx
// ❌ Before: Hard to understand design intent
const buttonOld = style({
  padding: `${theme.space['3']} ${theme.space['4']}`,
  gap: theme.space['2'],
  boxShadow: theme.elevation['1'],
  
  selectors: {
    '&:hover': {
      boxShadow: theme.elevation['2'],
    },
  },
});

// ✅ After: Clear semantic meaning
const buttonNew = style({
  padding: `${theme.space.sm} ${theme.space.lg}`,  // Vertical: small, Horizontal: large
  gap: theme.space.xs,                             // Extra small gap between icon and text
  boxShadow: theme.elevation.sm,                   // Subtle lift
  
  selectors: {
    '&:hover': {
      boxShadow: theme.elevation.md,                // Floating on hover
    },
  },
});
```

### **Alert Component Migration**

```tsx
// ❌ Before: Magic numbers everywhere
const alertOld = recipe({
  base: {
    padding: theme.space['4'],
    gap: theme.space['3'],
    boxShadow: theme.elevation['1'],
  },
  variants: {
    size: {
      sm: { padding: theme.space['3'], gap: theme.space['2'] },
      md: { padding: theme.space['4'], gap: theme.space['3'] },
      lg: { padding: theme.space['5'], gap: theme.space['4'] },
    },
  },
});

// ✅ After: Self-documenting sizes
const alertNew = recipe({
  base: {
    padding: theme.space.lg,        // Large comfortable padding
    gap: theme.space.sm,            // Small gap between icon and content
    boxShadow: theme.elevation.sm,  // Subtle elevation
  },
  variants: {
    size: {
      sm: { padding: theme.space.sm, gap: theme.space.xs },     // Small: compact
      md: { padding: theme.space.lg, gap: theme.space.sm },     // Medium: comfortable  
      lg: { padding: theme.space.xl, gap: theme.space.md },     // Large: spacious
    },
  },
});
```

### **Layout Spacing Migration**

```tsx
// ❌ Before: Unclear relationships
const layoutOld = {
  header: { padding: theme.space['6'] },
  main: { padding: theme.space['4'] },
  sidebar: { padding: theme.space['3'] },
  footer: { marginTop: theme.space['8'] },
};

// ✅ After: Clear hierarchy
const layoutNew = {
  header: { padding: theme.space.xl },      // Extra large header padding
  main: { padding: theme.space.lg },        // Large main content padding
  sidebar: { padding: theme.space.md },     // Medium sidebar padding
  footer: { marginTop: theme.space['10'] }, // Keep numeric for large systematic spacing
};
```

---

## 🛠 **Tools and Tips**

### **VSCode Autocomplete**
The new semantic tokens provide excellent TypeScript autocomplete:

```tsx
theme.space.    // ← Shows: none, xs, sm, md, lg, xl, 2xl, 3xl
theme.elevation. // ← Shows: none, sm, md, lg
```

### **Search and Replace Patterns**
Use these regex patterns for automated migration:

```regex
# Find: theme\.space\['(\d+)'\]
# Replace based on mapping:
theme.space['2'] → theme.space.xs
theme.space['3'] → theme.space.sm  
theme.space['5'] → theme.space.md
theme.space['7'] → theme.space.lg
theme.space['8'] → theme.space.xl
```

### **ESLint Rule (Future)**
We can add an ESLint rule to encourage semantic usage:

```json
{
  "rules": {
    "design-system/prefer-semantic-tokens": "warn"
  }
}
```

---

## 📈 **Benefits You'll See**

### **1. Self-Documenting Code**
```tsx
// Instead of guessing what '3' means
padding: theme.space['3']

// Code tells you exactly what it does  
padding: theme.space.sm  // Small padding
```

### **2. Better Design Collaboration**
```tsx
// Designers and developers speak the same language
gap: theme.space.sm        // "Small gap" - clear to everyone
boxShadow: theme.elevation.md  // "Medium floating" - design intent clear
```

### **3. Consistent with Industry**
```tsx
// Similar to Tailwind CSS
<div className="p-4 gap-2 shadow-sm">

// Similar to Chakra UI  
<Box p="lg" gap="sm" shadow="sm">

// Now similar to our tokens
padding: theme.space.lg
gap: theme.space.sm
boxShadow: theme.elevation.sm
```

### **4. Easier Code Reviews**
```tsx
// Before: "What's the difference between '2' and '3'?"
gap: theme.space['2']
padding: theme.space['3']

// After: "Ah, extra small gap with small padding - makes sense!"
gap: theme.space.xs
padding: theme.space.sm
```

---

## 🚀 **Getting Started**

### **Step 1: Update Your Knowledge**
Learn the new token mapping (see reference table above).

### **Step 2: Start with New Code**
Use semantic tokens for all new components and features.

### **Step 3: Gradual Migration**
Update existing components during regular maintenance.

### **Step 4: Share with Team**
Educate your team on the new patterns and benefits.

---

## ❓ **FAQ**

### **Q: Do I need to migrate everything at once?**
**A:** No! All three access patterns work simultaneously. Migrate gradually.

### **Q: Which pattern should I use for new code?**
**A:** Use semantic tokens (`theme.space.sm`) for most cases. Use numeric (`theme.space[5]`) for systematic spacing relationships.

### **Q: When will legacy string access be removed?**
**A:** Not anytime soon. We'll provide plenty of notice and migration tools first.

### **Q: What about component-specific tokens?**
**A:** They work the same way:
```tsx
theme.icon.size.md        // Semantic
theme.icon.size['md']     // Still works
```

### **Q: How do I know which semantic size to use?**
**A:** Follow this hierarchy:
- `xs` - Minimal spacing, tight layouts
- `sm` - Small gaps, compact components  
- `md` - Standard spacing, comfortable layouts
- `lg` - Large spacing, prominent elements
- `xl` - Extra large spacing, major sections

---

## 🎉 **Success Stories**

> "Switching to semantic tokens made our code reviews so much faster. Instead of debating whether '3' or '4' is the right spacing, we just say 'use small padding' or 'use medium gap' - it's obvious!" 
> 
> — **Frontend Developer**

> "Our designers and developers finally speak the same language. When a designer says 'medium elevation', the developer knows exactly which token to use."
>
> — **Design System Lead**

---

## 📞 **Need Help?**

- **Slack**: #design-system-support
- **Documentation**: See `/packages/react/src/styles/theme-examples.demo.ts` for examples
- **Migration Script**: Ask the team about automated migration tools

---

**Happy migrating! 🚀**

*Remember: The best code is self-documenting code. Semantic tokens help your future self (and teammates) understand your design decisions at a glance.*