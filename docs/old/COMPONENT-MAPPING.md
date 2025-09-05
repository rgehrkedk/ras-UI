# ras-UI Design System Integration: sporty-book Migration

## Overview

This document outlines how sporty-book components will be adapted to use ras-UI design system components, following ras-UI's design principles and API patterns. **The goal is to enhance sporty-book with ras-UI's systematic design approach**, not to replicate shadcn/ui APIs.

## Phase 1: Foundation Components

### Button Component Integration

**Migration Status**: 🔄 Adaptation Required

#### ras-UI Button Design Philosophy

- **React Aria Foundation**: Superior keyboard navigation and accessibility
- **Design Token Integration**: Automatic brand/theme support through CSS custom properties
- **Enhanced Features**: Loading states, icon integration, better interaction feedback
- **Systematic Variants**: Semantic variant naming aligned with design system

#### sporty-book → ras-UI Adaptations

| Current Usage           | ras-UI Approach             | Enhancement                                      |
| ----------------------- | --------------------------- | ------------------------------------------------ |
| `variant="default"`     | `variant="primary"`         | Semantic naming, better design token integration |
| `variant="outline"`     | `variant="secondary"`       | Consistent with ras-UI design language           |
| `variant="ghost"`       | `variant="ghost"`           | Enhanced with React Aria hover/focus states      |
| Custom icon buttons     | `startIcon`/`endIcon` props | Systematic icon integration with proper sizing   |
| Loading states (custom) | `loading` prop              | Built-in loading spinner with accessibility      |

#### Migration Examples

```jsx
// Current sporty-book (shadcn/ui)
<Button variant="outline" size="sm" className="border-2 border-teal-500">
  <PlusIcon className="h-4 w-4 mr-2" />
  Add Facility
</Button>

// Enhanced with ras-UI
<Button
  variant="secondary"
  size="sm"
  startIcon={<PlusIcon />}
  onPress={handleAddFacility}
>
  Add Facility
</Button>

// ras-UI enhanced features
<Button
  variant="primary"
  loading={isSubmitting}
  loadingText="Creating..."
  startIcon={<CheckIcon />}
  fullWidth
>
  Create Club
</Button>
```

---

### Card Component Family Integration

**Migration Status**: ✅ Implemented with ras-UI Design Principles

#### ras-UI Card Design Philosophy

- **Design Token Foundation**: All styling through CSS custom properties from ras-UI tokens
- **Semantic Elevation System**: `flat`, `low`, `medium`, `high` elevation levels
- **Interactive States**: Built-in hover/focus states for actionable cards
- **Systematic Spacing**: `padding` prop with consistent spacing scale
- **Brand Compatibility**: Automatic adaptation across all ras-UI brand themes

#### sporty-book Enhancement Opportunities

| Current Pattern         | ras-UI Approach          | Benefits                                 |
| ----------------------- | ------------------------ | ---------------------------------------- |
| Custom gradient classes | `elevation` prop system  | Consistent visual hierarchy, brand-aware |
| Manual hover effects    | `interactive` prop       | Systematic interaction feedback          |
| Inconsistent spacing    | `padding` prop variants  | Design system consistency                |
| Custom shadow classes   | Design token integration | Automatic brand/theme adaptation         |

#### Migration Examples

```jsx
// Current sporty-book (complex custom styling)
<Card className="shadow-xl border-0 bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-2xl transition-shadow">
  <CardHeader className="pb-3">
    <CardTitle className="text-xl font-bold text-gray-900">
      Sports Facility
    </CardTitle>
    <CardDescription className="text-gray-600">
      Premium tennis court
    </CardDescription>
  </CardHeader>
  <CardContent className="pt-0">
    <div className="flex gap-2 mb-3">
      <Badge className="bg-teal-500 text-white">Tennis</Badge>
    </div>
    <p className="text-2xl font-bold text-gray-900">$45/hour</p>
  </CardContent>
  <CardFooter>
    <Button className="w-full bg-teal-500 hover:bg-teal-600">
      Book Now
    </Button>
  </CardFooter>
</Card>

// Enhanced with ras-UI design system
<Card elevation="high" interactive>
  <CardHeader>
    <CardTitle size="lg">Sports Facility</CardTitle>
    <CardDescription>Premium tennis court</CardDescription>
  </CardHeader>
  <CardContent>
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
      <Badge variant="primary">Tennis</Badge>
    </div>
    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>$45/hour</div>
  </CardContent>
  <CardFooter>
    <Button variant="primary" fullWidth>Book Now</Button>
  </CardFooter>
</Card>
```

---

### Badge Component

**Migration Status**: 🚧 In Progress

#### API Comparison

| Feature           | shadcn/ui                                        | ras-UI                              | Notes                   |
| ----------------- | ------------------------------------------------ | ----------------------------------- | ----------------------- |
| **Variants**      | `default`, `secondary`, `destructive`, `outline` | Same + `success`, `warning`, `info` | Extended variant set    |
| **Custom Colors** | className overrides                              | `color` prop with design tokens     | Systematic color system |
| **Sizes**         | Fixed size                                       | `sm`, `md`, `lg`                    | Multiple size options   |

#### Custom Color Migration

```jsx
// shadcn/ui - Custom gradient classes
<Badge className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
  Pro Plan
</Badge>

// ras-UI - Systematic color tokens (planned)
<Badge variant="default" color="teal">
  Pro Plan
</Badge>
```

## Phase 2: Form Components

### Input + Label Components

**Migration Status**: 🔴 Pending

#### API Mapping

| shadcn/ui | ras-UI  | Key Changes                               |
| --------- | ------- | ----------------------------------------- |
| `Input`   | `Input` | React Aria integration, better validation |
| `Label`   | `Label` | Automatic association with inputs         |

#### Enhanced Features (ras-UI)

- Automatic accessibility associations
- Built-in validation styling
- Icon integration
- Loading states

---

### Select Component Family

**Migration Status**: 🔴 Pending

#### Component Family Mapping

| shadcn/ui       | ras-UI          | Complexity                 |
| --------------- | --------------- | -------------------------- |
| `Select`        | `Select`        | High - Root component      |
| `SelectTrigger` | `SelectTrigger` | Medium                     |
| `SelectValue`   | `SelectValue`   | Low                        |
| `SelectContent` | `SelectContent` | High - Portal, positioning |
| `SelectItem`    | `SelectItem`    | Medium                     |

#### Migration Challenges

- Complex component interdependencies
- Portal rendering for dropdowns
- Keyboard navigation patterns
- Multiple selection support

---

### Textarea Component

**Migration Status**: 🔴 Pending

#### Simple Migration

- Direct 1:1 API mapping
- Enhanced with React Aria validation
- Auto-resize capabilities (enhancement)

## Phase 3: Specialized Components

### Checkbox Component

**Migration Status**: 🔴 Pending

#### Enhanced Features (ras-UI)

- Indeterminate state support
- Better keyboard navigation
- Group validation patterns

---

### Sidebar Navigation System

**Migration Status**: 🔴 Pending

#### Complex Component Family

| shadcn/ui             | ras-UI                | Migration Complexity      |
| --------------------- | --------------------- | ------------------------- |
| `Sidebar`             | `Sidebar`             | High - Root container     |
| `SidebarProvider`     | `SidebarProvider`     | High - Context management |
| `SidebarTrigger`      | `SidebarTrigger`      | Medium                    |
| `SidebarContent`      | `SidebarContent`      | Medium                    |
| `SidebarGroup`        | `SidebarGroup`        | Low                       |
| `SidebarGroupLabel`   | `SidebarGroupLabel`   | Low                       |
| `SidebarGroupContent` | `SidebarGroupContent` | Low                       |
| `SidebarMenu`         | `SidebarMenu`         | Medium                    |
| `SidebarMenuItem`     | `SidebarMenuItem`     | Medium                    |
| `SidebarMenuButton`   | `SidebarMenuButton`   | Medium                    |
| `SidebarHeader`       | `SidebarHeader`       | Low                       |

#### Migration Strategy

- Implement as complete system (not piecemeal)
- Maintain existing navigation patterns
- Enhanced accessibility with React Aria
- Mobile responsiveness improvements

---

### Toast/Toaster System

**Migration Status**: 🔴 Pending

#### System Components

- `Toast` - Individual notification component
- `Toaster` - Global toast container and manager
- Enhanced positioning and animation system

## Phase 4: Remaining Components

### Lower Priority Components

| Component   | Usage           | Migration Complexity |
| ----------- | --------------- | -------------------- |
| `Separator` | Layout spacing  | Low                  |
| `Skeleton`  | Loading states  | Low                  |
| `Sheet`     | Mobile overlays | Medium               |

## Migration Utilities

### Import Helper Script

```bash
# Find and replace import patterns
find packages/sporty-book/src -name "*.jsx" -exec sed -i '' 's/@\/components\/ui\/button/@ras-ui\/react/g' {} +
```

### Component Usage Finder

```bash
# Find all usages of specific shadcn component
grep -r "from.*@/components/ui/button" packages/sporty-book/src/
```

### Validation Commands

```bash
# Ensure no broken imports after migration
pnpm type-check
pnpm build
cd packages/sporty-book && npm run dev
```

## Design Token Integration

### Color System Migration

```jsx
// Before: Hardcoded Tailwind colors
className = "bg-blue-500 hover:bg-blue-600";

// After: Design token CSS custom properties (automatic)
// ras-UI components use tokens automatically through vanilla-extract
```

### Brand Theme Support

```jsx
// sporty-book theme switching (available after migration)
import { setBrand, setTheme } from "@ras-ui/tokens";

setBrand("vibrant"); // purple/pink brand palette
setTheme("dark"); // dark mode theme
```

## Testing Checklist

### Per Component Migration

- [ ] All variants implemented and working
- [ ] Props API matches or improves on shadcn/ui
- [ ] Visual parity with original designs
- [ ] Accessibility improvements validated
- [ ] All brand themes tested
- [ ] Performance benchmarks maintained

### Integration Testing

- [ ] No broken imports
- [ ] All pages load correctly
- [ ] Interactive features work
- [ ] Mobile responsiveness maintained
- [ ] Cross-browser compatibility

---

**Status Legend**:

- ✅ Complete
- 🚧 In Progress
- 🔴 Pending
- ⚠️ Blocked/Issues

**Last Updated**: Session 1 - Phase 1 Foundation Components
