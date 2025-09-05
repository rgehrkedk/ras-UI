# React Aria Starter Components Implementation Plan for ras-UI

## Executive Summary

Port 35 high-value components from react-aria-starter to ras-UI design system, adapting them to use vanilla-extract styling, Style Dictionary tokens, and multibrand support. Implementation will be done in 7 phases over 4 weeks with clear testing milestones and quality gates.

## Current Progress Summary 🚧

**Overall Status**: 🚧 **Phase 1 & 2 Complete, Phase 3 Partially Complete**

| Phase       | Status             | Components                        | Progress     |
| ----------- | ------------------ | --------------------------------- | ------------ |
| **Phase 1** | ✅ **COMPLETE**    | Form Components (5)               | 5/5 complete |
| **Phase 2** | ✅ **COMPLETE**    | Navigation Components (4)         | 4/4 complete |
| **Phase 3** | 🚧 **IN PROGRESS** | Data Display Components (3)       | 1/3 complete |
| **Phase 4** | ⏳ **PENDING**     | Advanced Input Components (6)     | 0/6 complete |
| **Phase 5** | ⏳ **PENDING**     | Date & Time Components (4)        | 0/4 complete |
| **Phase 6** | ⏳ **PENDING**     | Feedback & Overlay Components (4) | 0/4 complete |
| **Phase 7** | ⏳ **PENDING**     | Advanced UI Components (4)        | 0/4 complete |

**Total Components Implemented**: **10/35** (29% complete)

**Recent Achievements**:

- ✅ Fixed Menu React Aria compatibility issues (upgraded to v1.12.1)
- ✅ Implemented comprehensive Table component with isolated architecture
- ✅ Added minimal Storybook stories as requested (no multibrand examples)
- ✅ All components available in Storybook at http://localhost:6006

**Next Steps**:

- Complete Phase 3: ListBox and GridList components
- Begin Phase 4: Advanced Input Components (ComboBox, SearchField, etc.)

## Technical Stack Alignment

- **From**: Plain CSS with CSS custom properties
- **To**: vanilla-extract CSS-in-JS with Style Dictionary tokens
- **Accessibility**: React Aria Components (maintained)
- **Icons**: Convert from Lucide React to ras-UI Icon system
- **Brands**: Add support for default, vibrant, corporate themes
- **Testing**: Vitest, React Testing Library, Storybook, Playwright

## Agent Utilization Strategy

### When to Use Specialized Agents

#### component-developer Agent

- **Use for**: Each new component implementation
- **Tasks**:
  - Building components with React Aria integration
  - Creating vanilla-extract styles
  - Writing comprehensive tests
  - Developing Storybook stories

#### storybook-expert Agent

- **Use for**: Complex Storybook configurations
- **Tasks**:
  - Setting up controls for new components
  - Configuring component documentation
  - Resolving Storybook build issues
  - Optimizing story performance

#### accessibility-expert Agent

- **Use for**: Component accessibility review
- **Tasks**:
  - WCAG 2.2 compliance checking
  - Keyboard navigation validation
  - Screen reader testing guidance
  - ARIA attribute verification

#### design-token-engineer Agent

- **Use for**: Token integration challenges
- **Tasks**:
  - Creating new component tokens
  - Multibrand token configuration
  - Token transformation setup
  - Theme switching implementation

#### testing-orchestrator Agent

- **Use for**: Test strategy and CI setup
- **Tasks**:
  - Setting up component test suites
  - Visual regression test configuration
  - CI/CD pipeline updates
  - Test coverage optimization

#### pr-review-specialist Agent

- **Use for**: Code review after each phase
- **Tasks**:
  - Component implementation review
  - Design consistency checking
  - Performance optimization suggestions
  - Best practices validation

## Quality Gates & Checks

### Automated Checks (Run after each component)

```bash
# ESLint via MCP (preferred)
mcp__ide__getDiagnostics

# Compilation checks
pnpm type-check
pnpm build

# Token validation
pnpm tokens:all

# Comprehensive health check
pnpm health-check

# Automated error fixing
pnpm auto-fix
```

### Manual Testing Requirements

- Visual testing in Storybook (localhost:6006)
- Keyboard navigation verification
- Screen reader testing (recommended)
- Multibrand theme switching
- Responsive design validation

---

## Phase 1: Core Form Components ✅ COMPLETED

**Timeline**: Days 1-3  
**Components**: 5 essential form inputs
**Status**: ✅ **COMPLETE** - All components implemented and tested

### 1.1 Select Component ✅

**Path**: `/packages/react/src/components/Select/`
**Priority**: CRITICAL - Most requested missing component
**Status**: ✅ **IMPLEMENTED**

**Completed Implementation**:

- ✅ Ported Select and SelectItem from react-aria-starter
- ✅ Converted to vanilla-extract styling with theme tokens
- ✅ Added size variants (sm, md, lg)
- ✅ Integrated with Form utilities (Label, FieldError)
- ✅ Support async loading states
- ✅ Full Storybook documentation with interactive examples

### 1.2 Checkbox Component ✅

**Path**: `/packages/react/src/components/Checkbox/`
**Priority**: HIGH - Essential form control
**Status**: ✅ **IMPLEMENTED**

**Completed Implementation**:

- ✅ Simple checkbox with indeterminate state
- ✅ Custom SVG for check/indeterminate icons
- ✅ Size variants and form integration
- ✅ WCAG 2.2 compliant accessibility
- ✅ Comprehensive Storybook stories

### 1.3 RadioGroup Component ✅

**Path**: `/packages/react/src/components/RadioGroup/`
**Priority**: HIGH - Essential form control
**Status**: ✅ **IMPLEMENTED**

**Completed Implementation**:

- ✅ RadioGroup container with RadioOption items
- ✅ Orientation support (horizontal/vertical)
- ✅ Custom styling for selected state
- ✅ Keyboard navigation (arrow keys)
- ✅ Complex content support

### 1.4 TextField Component ✅

**Path**: `/packages/react/src/components/TextField/`
**Priority**: HIGH - Enhanced text input
**Status**: ✅ **IMPLEMENTED**

**Completed Implementation**:

- ✅ Enhanced text input with validation states
- ✅ Support input types (text, email, password, tel, url)
- ✅ Integrated Label, Description, FieldError
- ✅ Interactive form examples
- ✅ Password validation demo

### 1.5 NumberField Component ✅

**Path**: `/packages/react/src/components/NumberField/`
**Priority**: HIGH - Numeric input
**Status**: ✅ **IMPLEMENTED**

**Completed Implementation**:

- ✅ Increment/decrement stepper buttons
- ✅ Format options (currency, percent, decimal)
- ✅ Min/max/step validation
- ✅ Keyboard shortcuts (up/down arrows)
- ✅ Shopping cart integration example

### 🧪 Testing Milestone 1 ✅ PASSED

**When**: After completing all Phase 1 components
**Status**: ✅ **COMPLETED** - All tests passed, Storybook deployed at http://localhost:6007/

**Testing Results**:

- ✅ Select component with all size variants
- ✅ Select with placeholder and default value
- ✅ Checkbox in all states (unchecked, checked, indeterminate)
- ✅ RadioGroup keyboard navigation (arrow keys)
- ✅ TextField validation states (error, success)
- ✅ NumberField increment/decrement functionality
- ✅ All components in 3 brands × 4 themes (12 combinations)
- ✅ Keyboard navigation for all components
- ✅ Form submission with all components

**Quality Checks Passed**:

```bash
✅ pnpm build - All packages compile successfully
✅ pnpm type-check - Zero TypeScript errors
✅ pnpm storybook - Deployed at http://localhost:6007/
✅ All components exported properly
✅ Multibrand theming working correctly
```

**Deliverables**:

- ✅ 5 production-ready React Aria components
- ✅ Comprehensive Storybook documentation
- ✅ Full TypeScript support
- ✅ Multibrand theme compatibility
- ✅ WCAG 2.2 accessibility compliance
- ✅ Interactive demo examples

**Files Created**:

- All component implementations, styles, stories, and exports
- Enhanced semantic and core tokens for React Aria support

---

## Phase 2: Navigation & Layout Components ✅ COMPLETED

**Components**: 4 navigation patterns
**Status**: ✅ **COMPLETE** - All components implemented and tested

### 2.1 Tabs Component ✅

**Path**: `/packages/react/src/components/Tabs/`
**Priority**: HIGH - Common UI pattern
**Status**: ✅ **IMPLEMENTED**

**Completed Implementation**:

- ✅ TabList, Tab, TabPanel components using React Aria Components
- ✅ Orientation support (horizontal/vertical)
- ✅ Keyboard navigation (arrow keys, Home, End)
- ✅ Lazy loading panel content with shouldForceMount
- ✅ Size variants (sm, md, lg) with vanilla-extract styling
- ✅ Full Storybook documentation with brand showcase

### 2.2 Menu Component ✅

**Path**: `/packages/react/src/components/Menu/`
**Priority**: HIGH - Dropdown menus
**Status**: ✅ **IMPLEMENTED**

**Completed Implementation**:

- ✅ MenuTrigger, Menu, MenuItem components with React Aria
- ✅ Fixed React Aria compatibility (updated to v1.12.1)
- ✅ Icons and descriptions in menu items
- ✅ Keyboard shortcuts display
- ✅ Destructive action styling
- ✅ Size variants and comprehensive design tokens

### 2.3 Breadcrumbs Component ✅

**Path**: `/packages/react/src/components/Breadcrumbs/`
**Priority**: MEDIUM - Navigation aid
**Status**: ✅ **IMPLEMENTED**

**Completed Implementation**:

- ✅ Auto-collapse with ellipsis dropdown for long paths
- ✅ Custom separators (chevron-right, arrow-right, slash)
- ✅ Current page indication (non-clickable styling)
- ✅ Router integration ready (href and onPress support)
- ✅ Size variants and proper ARIA navigation landmarks
- ✅ Minimal Storybook stories as requested

### 2.4 Link Component ✅

**Path**: `/packages/react/src/components/Link/`
**Priority**: MEDIUM - Enhanced anchor
**Status**: ✅ **IMPLEMENTED**

**Completed Implementation**:

- ✅ Accessible link with variants (default, quiet, emphasized)
- ✅ External link indicators with automatic detection
- ✅ Router compatibility (href and onPress support)
- ✅ Size variants (sm, md, lg) with proper focus states
- ✅ Icon support (startIcon, endIcon) with proper sizing
- ✅ New design tokens for all link variants

### 🧪 Testing Milestone 2 ✅ PASSED

**When**: After completing all Phase 2 components
**Status**: ✅ **COMPLETED** - All tests passed, components functional in Storybook

**Testing Results**:

- ✅ Tabs with different orientations (horizontal/vertical)
- ✅ Tab keyboard navigation (arrow keys, Home, End)
- ✅ Menu dropdown functionality (fixed React Aria compatibility)
- ✅ Menu keyboard shortcuts working
- ✅ Breadcrumbs auto-collapse behavior with ellipsis menu
- ✅ Link variants (default, quiet, emphasized) and external indicators
- ✅ All components with multibrand theme support
- ✅ Focus management in Tabs and Menu working correctly

**Quality Checks Passed**:

```bash
✅ pnpm build - All packages compile successfully
✅ Storybook - All Phase 2 components available at http://localhost:6006
✅ react-aria-components updated to v1.12.1 - MenuTrigger issues resolved
✅ Design tokens - New link and navigation tokens integrated
```

**Deliverables**:

- ✅ 4 production-ready React Aria navigation components
- ✅ Minimal Storybook documentation (as requested)
- ✅ Full TypeScript support with proper React Aria type extensions
- ✅ Multibrand theme compatibility
- ✅ WCAG 2.2 accessibility compliance
- ✅ Router integration ready for all components

---

## Phase 3: Data Display Components 🚧 IN PROGRESS

**Components**: 3 complex data components  
**Status**: 🚧 **PARTIAL** - Table component completed, others pending

### 3.1 Table Component ✅

**Path**: `/packages/react/src/components/Table/`
**Priority**: CRITICAL - Data grid needs
**Status**: ✅ **IMPLEMENTED**

**Completed Implementation**:

- ✅ Table, Column, Row, Cell components with React Aria
- ✅ Sorting (single/multi column) with visual indicators
- ✅ Row selection (single/multiple) with keyboard support
- ✅ Size variants (sm, md, lg) affecting row height and padding
- ✅ Visual variants (striped, bordered, hoverable)
- ✅ Empty state handling with customizable messages
- ✅ Column features (alignment, sticky columns, flexible widths)
- ✅ Comprehensive design tokens for all table elements
- ✅ Isolated component structure for maintainability

**Component structure implemented**:

```
Table/
├── Table.tsx           # ✅ Main container
├── Table.css.ts        # ✅ Styles with design tokens
├── Column/             # ✅ Column with sort/resize
├── Row/                # ✅ Row with selection
├── Cell/               # ✅ Cell with alignment
├── TableHeader/        # ✅ Header with sorting
├── TableBody/          # ✅ Body with empty state
├── Table.stories.tsx   # ✅ Minimal Storybook stories
├── Table.test.tsx      # ✅ Comprehensive tests
└── index.ts            # ✅ All exports
```

### 3.2 ListBox Component ⏳

**Path**: `/packages/react/src/components/ListBox/`
**Priority**: HIGH - Selectable lists
**Status**: ⏳ **PENDING**

**Planned Implementation**:

- Single/multiple selection modes
- Sections with headers
- Keyboard navigation
- Loading states
- Empty states

### 3.3 GridList Component ⏳

**Path**: `/packages/react/src/components/GridList/`
**Priority**: MEDIUM - Grid layouts
**Status**: ⏳ **PENDING**

**Planned Implementation**:

- Responsive grid layout
- Selection support
- Keyboard grid navigation
- Drag and drop support

### 🧪 Testing Milestone 3

**When**: After completing all Phase 3 components
**What to test in Storybook**:

- [ ] Table sorting (click column headers)
- [ ] Table row selection (checkbox column)
- [ ] Table with 100+ rows performance
- [ ] ListBox single vs multiple selection
- [ ] ListBox keyboard navigation
- [ ] GridList responsive behavior
- [ ] GridList item selection
- [ ] Drag and drop in Table and GridList
- [ ] All components with real data examples

**Use testing-orchestrator agent** for performance testing setup

---

## Phase 4: Advanced Input Components

**Timeline**: Days 11-14
**Components**: 6 rich input controls

### 4.1 ComboBox Component

**Path**: `/packages/react/src/components/ComboBox/`
**Priority**: HIGH - Searchable select

**Implementation**:

- Search/filter functionality
- Async data loading
- Custom filtering logic
- Create new items option
- Loading states

### 4.2 SearchField Component

**Path**: `/packages/react/src/components/SearchField/`
**Priority**: HIGH - Search inputs

**Implementation**:

- Clear button
- Search icon
- Suggestions dropdown
- Recent searches
- Loading indicator

### 4.3 Slider Component

**Path**: `/packages/react/src/components/Slider/`
**Priority**: MEDIUM - Range inputs

**Implementation**:

- Single value slider
- Range slider (two thumbs)
- Step increments
- Value labels
- Custom track colors

### 4.4 TagGroup Component

**Path**: `/packages/react/src/components/TagGroup/`
**Priority**: MEDIUM - Tag management

**Implementation**:

- Add/remove tags
- Tag input field
- Keyboard navigation
- Max tags limit
- Tag validation

### 4.5 ToggleButton Component

**Path**: `/packages/react/src/components/ToggleButton/`
**Priority**: LOW - Toggle states

**Implementation**:

- Single toggle button
- ToggleButtonGroup
- Exclusive selection
- Icon support

### 4.6 ColorPicker Component (Optional)

**Path**: `/packages/react/src/components/ColorPicker/`
**Priority**: LOW - Specialized use

**Implementation**:

- ColorArea, ColorSlider, ColorWheel
- ColorSwatch, ColorField
- Multiple formats (hex, rgb, hsl)

### 🧪 Testing Milestone 4

**When**: After completing Phase 4 components
**What to test in Storybook**:

- [ ] ComboBox search filtering
- [ ] ComboBox async data loading
- [ ] SearchField with suggestions
- [ ] Slider single vs range mode
- [ ] Slider keyboard control (arrow keys)
- [ ] TagGroup add/remove operations
- [ ] TagGroup keyboard navigation
- [ ] ToggleButton group exclusive selection
- [ ] All components with different data sets

---

## Phase 5: Date & Time Components

**Timeline**: Days 15-17
**Components**: 4 date/time inputs

### 5.1 DatePicker Component

**Path**: `/packages/react/src/components/DatePicker/`
**Priority**: HIGH - Date selection

**Implementation**:

- Calendar popup
- Min/max date validation
- Date format localization
- Disabled dates
- Range selection option

### 5.2 DateField Component

**Path**: `/packages/react/src/components/DateField/`
**Priority**: MEDIUM - Date input

**Implementation**:

- Segment-based input
- Format validation
- Placeholder segments
- Keyboard navigation

### 5.3 TimeField Component

**Path**: `/packages/react/src/components/TimeField/`
**Priority**: MEDIUM - Time input

**Implementation**:

- 12/24 hour formats
- Step increments
- Segment navigation
- AM/PM selection

### 5.4 Calendar Component

**Path**: `/packages/react/src/components/Calendar/`
**Priority**: MEDIUM - Standalone calendar

**Implementation**:

- Month/year navigation
- Multiple month view
- Week numbers
- Event indicators

### 🧪 Testing Milestone 5

**When**: After completing Phase 5 components
**What to test in Storybook**:

- [ ] DatePicker calendar navigation
- [ ] DatePicker min/max date constraints
- [ ] DateField segment keyboard control
- [ ] TimeField 12 vs 24 hour format
- [ ] Calendar multi-month view
- [ ] Internationalization (different locales)
- [ ] All components with timezone handling

**Use accessibility-expert agent** for date/time accessibility review

---

## Phase 6: Feedback & Overlay Components

**Timeline**: Days 18-20
**Components**: 4 feedback patterns

### 6.1 ProgressBar Component

**Path**: `/packages/react/src/components/ProgressBar/`
**Priority**: HIGH - Loading states

**Implementation**:

- Determinate/indeterminate modes
- Value labels
- Custom colors for states
- Animation support

### 6.2 Meter Component

**Path**: `/packages/react/src/components/Meter/`
**Priority**: MEDIUM - Value display

**Implementation**:

- Segments/thresholds
- Warning/critical states
- Custom value formatting
- Vertical orientation

### 6.3 Modal Component

**Path**: `/packages/react/src/components/Modal/`
**Priority**: HIGH - Modal dialogs

**Implementation**:

- Focus trap
- Dismissible options
- Size variants
- Transition animations

### 6.4 Popover Component

**Path**: `/packages/react/src/components/Popover/`
**Priority**: HIGH - Floating content

**Implementation**:

- Placement options (12 positions)
- Arrow positioning
- Offset configuration
- Flip/shift behavior

### 🧪 Testing Milestone 6

**When**: After completing Phase 6 components
**What to test in Storybook**:

- [ ] ProgressBar animation smoothness
- [ ] ProgressBar indeterminate state
- [ ] Meter with different thresholds
- [ ] Modal focus management
- [ ] Modal escape key closing
- [ ] Popover placement positions
- [ ] Popover auto-repositioning
- [ ] All components in different viewport sizes

---

## Phase 7: Advanced UI Components

**Timeline**: Days 21-24
**Components**: 4 specialized patterns

### 7.1 Tree Component

**Path**: `/packages/react/src/components/Tree/`
**Priority**: MEDIUM - Hierarchical data

**Implementation**:

- Expand/collapse nodes
- Selection modes
- Keyboard navigation
- Async node loading
- Drag and drop nodes

### 7.2 Disclosure Component

**Path**: `/packages/react/src/components/Disclosure/`
**Priority**: MEDIUM - Collapsible content

**Implementation**:

- Single disclosure
- DisclosureGroup (accordion)
- Animation support
- Icon customization

### 7.3 Toolbar Component

**Path**: `/packages/react/src/components/Toolbar/`
**Priority**: LOW - Action groups

**Implementation**:

- Orientation options
- Overflow handling
- Separator support
- Keyboard navigation

### 7.4 Form Component

**Path**: `/packages/react/src/components/Form/`
**Priority**: MEDIUM - Form wrapper

**Implementation**:

- Validation handling
- Field error display
- Submit handling
- Reset functionality

### 🧪 Testing Milestone 7 (Final)

**When**: After completing all Phase 7 components
**What to test in Storybook**:

- [ ] Tree expand/collapse all nodes
- [ ] Tree keyboard navigation
- [ ] Disclosure accordion behavior
- [ ] Toolbar overflow menu
- [ ] Form validation flow
- [ ] All components integration test
- [ ] Full multibrand showcase

**Final quality gates**:

```bash
# Use pr-review-specialist agent for final review
pnpm health-check
pnpm test:visual
pnpm build
pnpm storybook:build
```

---

## Success Metrics

### Component Quality

- [ ] All components pass `pnpm type-check`
- [ ] Zero ESLint errors via MCP diagnostics
- [ ] 100% Storybook story coverage
- [ ] All components support 12 theme combinations
- [ ] Keyboard navigation working
- [ ] WCAG 2.2 Level AA compliance

### Performance Targets

- [ ] Bundle size < 150KB for all components
- [ ] Tree-shaking working correctly
- [ ] CSS-in-JS zero runtime overhead
- [ ] Storybook build time < 60 seconds

### Documentation

- [ ] Every component has Storybook stories
- [ ] Props documented with TypeScript
- [ ] Usage examples provided
- [ ] Accessibility notes included

## Risk Mitigation

### Potential Challenges

1. **CSS conversion complexity**
   - Solution: Use design-token-engineer agent for complex token mappings
2. **Multibrand conflicts**
   - Solution: Test each component in all 12 theme combinations
3. **Performance issues**
   - Solution: Use performance-specialist agent for optimization

4. **Accessibility gaps**
   - Solution: Use accessibility-expert agent for each phase review

## Rollback Strategy

- Each component in separate folder
- Can remove/revert individual components
- Git tags after each phase completion
- Storybook deployment for each milestone

## Communication Plan

- Daily progress updates via TodoWrite
- Testing milestones require user involvement
- PR review after each phase with pr-review-specialist
- Final demo of all components in Storybook

---

## Quick Start Commands

### Development Workflow

```bash
# Start development
pnpm dev

# Run checks after each component
mcp__ide__getDiagnostics
pnpm lint
pnpm type-check

# Build and test
pnpm build
pnpm test
pnpm storybook

# Comprehensive validation
pnpm health-check
```

### Testing in Storybook

1. Start Storybook: `pnpm storybook`
2. Navigate to: http://localhost:6006
3. Use brand switcher in toolbar
4. Test keyboard navigation
5. Check responsive behavior

## Appendix: Component Priority Matrix

| Priority | Components                     | Rationale               |
| -------- | ------------------------------ | ----------------------- |
| CRITICAL | Select, Table                  | Most requested, complex |
| HIGH     | Form inputs, DatePicker, Modal | Common use cases        |
| MEDIUM   | Navigation, Tree, Meter        | Nice to have            |
| LOW      | ColorPicker, Toolbar           | Specialized use         |

---

_This plan is a living document. Update progress, issues, and learnings as implementation proceeds._
