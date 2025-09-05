# ras-UI Design System Migration Guide

## Overview

This guide documents the systematic approach to migrating applications to use ras-UI design system components. **The migration follows ras-UI design principles** while providing functional improvements through unified design tokens, React Aria accessibility, and vanilla-extract styling.

## Migration Architecture

### New Apps-Based Approach ✅

Instead of directly migrating existing applications, we use a **reference-based approach**:

1. **Reference Application** (`packages/sporty-book`): Keep existing app as pattern reference for real-world usage
2. **Clean Showcase App** (`apps/ras-ui-showcase`): New clean implementation demonstrating proper ras-UI usage
3. **Component Enhancement**: Use reference patterns to expand ras-UI with domain-specific features

This approach ensures:

- **Maintainability**: Clean, minimal showcase without legacy code
- **Reference Preservation**: Original app patterns available for component development
- **Zero Risk**: No breaking changes to existing applications during migration
- **Best Practices**: New implementations follow ras-UI principles from the start

### ras-UI Design Principles First

- **Design System Consistency**: All components follow ras-UI's design language and token system
- **Accessibility by Default**: React Aria Components provide robust accessibility patterns
- **Design Token Integration**: CSS custom properties and vanilla-extract recipes for systematic styling
- **Multibrand Support**: Automatic theme switching across default/vibrant/corporate brands
- **Performance Focused**: Zero-runtime CSS-in-JS with build-time optimization

### Migration Strategy

The migration **uses existing apps as reference to expand ras-UI** rather than direct API replacement:

1. **Phase 1: Foundation** - Establish clean showcase app with core components
2. **Phase 2: Reference Analysis** - Extract patterns from existing applications
3. **Phase 3: Component Enhancement** - Expand ras-UI with domain-specific features
4. **Phase 4: Implementation Guide** - Document patterns for new applications

### Migration Principles

- **Follow ras-UI API**: Use ras-UI component APIs and design patterns
- **Reference-Driven Development**: Extract real-world patterns from existing apps
- **Clean Implementation**: Build new apps with ras-UI from the start
- **Systematic Enhancement**: Expand ras-UI capabilities based on usage patterns
- **Brand Integration**: Test all components across ras-UI's multibrand system

## Phase 1: Foundation Components

### Status: ✅ Completed - Clean Showcase App Established

#### Clean Showcase App ✅

- **Location**: `/apps/ras-ui-showcase`
- **Purpose**: Clean, maintainable demonstration of all ras-UI components
- **Features**: Brand/theme switching, comprehensive component testing, real-world examples
- **Live Testing**: http://localhost:3001/ for development validation
- **Architecture**: Minimal dependencies, zero legacy code, follows ras-UI principles

#### Complete Component Testing ✅

All ras-UI components successfully tested and integrated:

- **Button**: All variants (primary/secondary/ghost/destructive), sizes, states tested
- **Input**: Form inputs with validation, prefix icons, proper React Aria integration
- **Card Family**: Complete card system with all elevation levels and interactive states
- **Badge**: Sports-specific variants with domain utilities (tennis, basketball, etc.)
- **Dialog**: Modal dialogs and alert dialogs with proper accessibility
- **Switch**: Interactive toggle controls with state management
- **Alert**: Info and warning variants for user notifications
- **Tooltip**: Contextual help with proper positioning
- **Spinner**: Loading states integrated with buttons
- **Icon System**: Consistent iconography across all components

#### Domain-Specific Enhancements ✅

Based on sporty-book reference patterns:

- **BadgeUtils**: Sports variant mapping (`getSportVariant`, `getStatusVariant`)
- **Real-world Examples**: Tennis court booking scenario with all components integrated
- **Multibrand Testing**: All components tested across default/vibrant/corporate brands
- **Design Token Integration**: Proper CSS custom property usage throughout

## Phase 2: Form Infrastructure

### Status: 🔴 Pending

#### Input + Label Components

- **Usage**: 11 locations, always paired for accessibility
- **Features**: Search icons, placeholder patterns, validation styling
- **Dependencies**: Form validation, icon integration

#### Select Component Family

- **Components**: Select, SelectContent, SelectItem, SelectTrigger, SelectValue
- **Complexity**: High - complete dropdown system with multiple interdependent parts
- **Usage**: 9 locations for filtering, forms, time slots

#### Textarea Component

- **Usage**: 4 locations for multi-line text input
- **Integration**: Label pairing, validation styling

## Phase 3: Specialized Components

### Status: 🔴 Pending

#### Checkbox Component

- **Usage**: 3 locations, multi-select functionality
- **Patterns**: Sports/amenities selection arrays

#### Sidebar Navigation System

- **Components**: 9 subcomponents (Sidebar, SidebarContent, SidebarGroup, etc.)
- **Complexity**: High - complete navigation architecture
- **Critical**: Core app navigation system

#### Toast/Toaster System

- **Usage**: Notification infrastructure
- **Integration**: Global app notifications

## Phase 4: Final Components

### Status: 🔴 Pending

#### Remaining Components

- Separator, Skeleton, Sheet components
- Lower usage frequency but needed for completeness

#### Performance & Optimization

- Bundle analysis and tree-shaking validation
- Design token optimization
- Accessibility audit

## Testing Strategy

### Continuous Validation

1. **Component Development**: Test in Storybook with all variants
2. **Integration Testing**: Verify in sporty-book at each phase
3. **Visual Regression**: Before/after screenshots
4. **Accessibility Testing**: React Aria compliance validation
5. **Brand Testing**: Verify all 3 brands (default/vibrant/corporate) work correctly

### Testing Commands

```bash
# Component development and testing
pnpm storybook              # Visual component testing (port 6006)
cd apps/ras-ui-showcase && pnpm dev  # Clean showcase app testing (port 3001)

# Reference app (for pattern extraction)
cd packages/sporty-book && npm run dev  # Reference patterns (port 5174)

# Build validation
pnpm build                  # Ensure no breaking changes
pnpm tokens:all             # Rebuild all design tokens
pnpm type-check             # TypeScript validation
pnpm lint                   # Code quality checks
```

## Key Migration Patterns

### Import Updates

```jsx
// Before (shadcn/ui)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// After (ras-UI)
import { Button } from "@ras-ui/react";
import { Card, CardContent, CardHeader, CardTitle } from "@ras-ui/react";
```

### Clean App Implementation Pattern

```jsx
// New apps should be built with ras-UI from the start
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Badge,
  Input,
  Alert,
} from "@ras-ui/react";

// Import ras-UI design tokens
import "@ras-ui/tokens/dist/tokens.css";
import "@ras-ui/tokens/dist/brands.css";

function BookingApp() {
  return (
    <Card elevation="medium">
      <CardHeader>
        <CardTitle>Tennis Court Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant={BadgeUtils.getSportVariant("tennis")}>Tennis</Badge>
        <Input label="Preferred time" />
        <Alert variant="info">
          Booking confirmation will be sent via email
        </Alert>
      </CardContent>
    </Card>
  );
}
```

### Reference-Based Development

```jsx
// Extract patterns from sporty-book reference app
// Example: Sports facility selection patterns
const facilityTypes = ["tennis", "basketball", "football", "volleyball"];

// Transform into ras-UI components
{
  facilityTypes.map((sport) => (
    <Badge key={sport} variant={BadgeUtils.getSportVariant(sport)}>
      {sport.charAt(0).toUpperCase() + sport.slice(1)}
    </Badge>
  ));
}
```

### Design Token Integration

```jsx
// Automatic design token usage through CSS custom properties
// No manual color classes needed - design tokens handle all styling
// Brand switching: document.documentElement.setAttribute('data-brand', 'vibrant')
// Theme switching: document.documentElement.setAttribute('data-theme', 'dark')
```

## Migration Checklist

### Per Component Migration

- [ ] Implement component in ras-UI with required variants
- [ ] Create comprehensive Storybook stories
- [ ] Update component API documentation
- [ ] Test with all brand themes
- [ ] Update import statements in sporty-book
- [ ] Visual regression testing
- [ ] Accessibility validation

### Phase Completion Criteria

- [ ] All components in phase implemented and tested
- [ ] No visual regressions in sporty-book
- [ ] All brand themes working correctly
- [ ] Performance benchmarks maintained or improved
- [ ] Documentation updated

## Troubleshooting

### Common Issues

1. **CSS Conflicts**: Ensure only one component system loaded at a time
2. **Token Mismatches**: Verify `@ras-ui/tokens` CSS files are imported
3. **TypeScript Errors**: Update import paths and component prop types
4. **Brand Switching**: Verify `data-brand` attributes are set correctly

### Support Resources

- Component API docs in Storybook
- Design token reference in `/packages/tokens/dist/`
- Migration examples in this guide
- Test patterns in existing ras-UI components

---

**Next Update**: After Phase 1 completion with Button, Card, and Badge components.
