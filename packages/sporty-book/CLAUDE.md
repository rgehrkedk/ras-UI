# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vite + React application for sports facility booking. The app allows users to browse clubs, book facilities, and manage bookings with an admin interface for club management.

## Common Commands

### Development

- `npm install` - Install dependencies
- `npm run dev` - Start development server (Vite dev server with HMR)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Testing

No test framework is currently configured.

## Architecture

### Core Technologies

- **Frontend**: React 18 with JSX (not TypeScript)
- **Build Tool**: Vite with React plugin
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React hooks and context
- **UI Components**: Radix UI primitives with custom styling

### Project Structure

```
src/
├── components/    # React components
│   ├── home/      # Home page specific components
│   └── ui/        # shadcn/ui components (auto-generated)
├── hooks/         # Custom React hooks
├── lib/           # Utility functions (cn helper for className merging)
├── pages/         # Page components and routing logic
└── utils/         # General utilities
```

### Key Architectural Patterns

**Page-Based Routing**: The app uses a custom routing system in `src/pages/index.jsx` that maps URL paths to page components. Pages include Home, Clubs, ClubDetail, MyBookings, BookFacility, ClubPricing, ClubOnboarding, ClubDashboard, BookingAdmin, ClubContent, ClubMembers, ClubSettings, and ResetUser.

**Layout Pattern**: All pages are wrapped in a shared Layout component that receives the current page name for navigation highlighting.

**shadcn/ui Components**: UI components follow the shadcn/ui pattern with Tailwind CSS and CSS variables for theming. Components are configured via `components.json` and use the "new-york" style variant.

## Code Style & Conventions

### File Extensions

- Use `.jsx` for React components (not `.tsx`)
- Use `.js` for utilities and non-React files

### Import Aliases

- `@/` maps to `src/`
- Components: `@/components`
- Utils: `@/lib/utils`
- UI Components: `@/components/ui`
- Hooks: `@/hooks`

### Component Patterns

- Functional components with hooks
- Use the `cn()` utility from `@/lib/utils` for conditional className merging
- Follow existing component structure when adding new UI components

### Styling

- Tailwind CSS with CSS variables for theming
- Dark mode support configured ("class" strategy)
- Custom color palette using HSL variables
- Use shadcn/ui components for consistent design system

## Development Notes

- Vite configuration includes path aliases and JSX handling for `.js` files
- ESLint configured for React development with standard rules
- No TypeScript - the project uses JavaScript with JSX
- Component auto-import and code completion work via jsconfig.json
