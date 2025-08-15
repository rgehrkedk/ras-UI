# Testing Guide

This document describes the testing strategy and setup for the ras-UI React components.

## Testing Stack

- **Test Runner**: [Vitest](https://vitest.dev/) - Fast unit test framework with Vite integration
- **Testing Library**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Simple and complete testing utilities
- **User Interactions**: [User Event](https://testing-library.com/docs/user-event/intro/) - Simulates real user interactions
- **Assertions**: [Jest DOM](https://github.com/testing-library/jest-dom) - Custom DOM element matchers
- **Environment**: [jsdom](https://github.com/jsdom/jsdom) - DOM implementation for Node.js

## Test Setup

### Configuration Files

- `vitest.config.ts` - Vitest configuration with jsdom environment
- `src/test/setup.ts` - Global test setup and mocks
- `src/test/test-utils.tsx` - Custom render function and utilities

### Running Tests

```bash
# Run tests in watch mode (development)
pnpm test

# Run tests once (CI/production)
pnpm test:run

# Run tests with UI interface
pnpm test:ui

# Run tests from the root (all packages)
pnpm run test
```

## Testing Approach

### Component Testing Philosophy

We follow the [Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications) approach:

1. **Integration Tests**: Focus on how components work together
2. **Unit Tests**: Test individual component behavior
3. **Accessibility Tests**: Ensure components are accessible
4. **User Interaction Tests**: Test real user workflows

### What We Test

✅ **Do Test:**
- Component renders correctly with different props
- User interactions (click, type, keyboard navigation)
- Accessibility features (ARIA attributes, focus management)
- Error states and loading states
- Form validation and submission
- Component composition and integration

❌ **Don't Test:**
- CSS styles and visual appearance (use visual regression tests)
- Implementation details (internal state, private methods)
- Third-party library internals
- Browser-specific behavior

### Test Structure

Each component should have comprehensive tests covering:

```typescript
describe('ComponentName', () => {
  // Basic rendering
  it('renders with default props', () => {});
  it('renders with different variants/sizes', () => {});
  
  // User interactions  
  it('handles click events', () => {});
  it('supports keyboard navigation', () => {});
  
  // States
  it('renders loading state', () => {});
  it('handles disabled state', () => {});
  it('handles error state', () => {});
  
  // Accessibility
  it('has correct ARIA attributes', () => {});
  it('maintains focus management', () => {});
  
  // Props and customization
  it('applies custom className', () => {});
  it('forwards ref correctly', () => {});
});
```

## Testing Utilities

### Custom Render Function

Use the custom `render` function from `test-utils.tsx` instead of the default:

```typescript
import { render, screen } from '../test/test-utils';

// This automatically wraps components with necessary providers
render(<Button>Click me</Button>);
```

### User Event

Always use `createUser()` for user interactions:

```typescript
import { createUser } from '../test/test-utils';

const user = createUser();
await user.click(button);
await user.type(input, 'Hello world');
await user.keyboard('{Enter}');
```

### Accessibility Testing

Test accessibility features explicitly:

```typescript
it('supports screen readers', () => {
  render(<Button aria-label="Save document">💾</Button>);
  
  const button = screen.getByRole('button', { name: 'Save document' });
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('aria-label', 'Save document');
});

it('manages focus correctly', async () => {
  const user = createUser();
  render(<Dialog title="Test">Content</Dialog>);
  
  // Dialog should trap focus
  await user.tab();
  expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();
});
```

### Testing Forms

Test form interactions thoroughly:

```typescript
it('validates form input', async () => {
  const user = createUser();
  const handleSubmit = vi.fn();
  
  render(
    <form onSubmit={handleSubmit}>
      <Input label="Email" type="email" isRequired />
      <Button type="submit">Submit</Button>
    </form>
  );
  
  const input = screen.getByRole('textbox', { name: 'Email' });
  const submit = screen.getByRole('button', { name: 'Submit' });
  
  // Test invalid input
  await user.type(input, 'invalid-email');
  await user.click(submit);
  
  expect(handleSubmit).not.toHaveBeenCalled();
  expect(input).toHaveAttribute('aria-invalid', 'true');
});
```

## Mocking

### CSS Files

CSS-in-JS files are automatically mocked during tests. If you need specific CSS behavior:

```typescript
// Mock specific styles
vi.mock('./Component.css', () => ({
  componentClass: 'mocked-class',
  componentVariant: () => 'mocked-variant'
}));
```

### External Dependencies

Mock external libraries when needed:

```typescript
// Mock API calls
vi.mock('../api/client', () => ({
  fetchData: vi.fn().mockResolvedValue({ data: 'test' })
}));

// Mock browser APIs
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
});
```

## Best Practices

### 1. Use Semantic Queries

Prefer semantic queries that match how users interact:

```typescript
// ✅ Good - semantic query
screen.getByRole('button', { name: 'Save' });
screen.getByLabelText('Email address');

// ❌ Avoid - implementation details
screen.getByTestId('save-button');
screen.getByClassName('email-input');
```

### 2. Test User Workflows

Test complete user interactions:

```typescript
it('completes form submission workflow', async () => {
  const user = createUser();
  
  // 1. User fills out form
  await user.type(screen.getByLabelText('Name'), 'John Doe');
  await user.type(screen.getByLabelText('Email'), 'john@example.com');
  
  // 2. User submits form
  await user.click(screen.getByRole('button', { name: 'Submit' }));
  
  // 3. Assert expected outcome
  expect(screen.getByText('Form submitted successfully')).toBeInTheDocument();
});
```

### 3. Async Testing

Always await async operations:

```typescript
it('handles async operations', async () => {
  const user = createUser();
  
  render(<AsyncComponent />);
  
  // Wait for loading to complete
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
  
  // Interact with loaded component
  await user.click(screen.getByRole('button'));
});
```

### 4. Error Boundaries

Test error states and boundaries:

```typescript
it('handles errors gracefully', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };
  
  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );
  
  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
});
```

## Debugging Tests

### Debug Output

Use `screen.debug()` to see current DOM:

```typescript
it('debugs component state', () => {
  render(<Component />);
  
  // Print current DOM to console
  screen.debug();
  
  // Print specific element
  screen.debug(screen.getByRole('button'));
});
```

### Log Queries

Enable query logging:

```typescript
import { logRoles } from '@testing-library/react';

it('shows available roles', () => {
  const { container } = render(<Component />);
  logRoles(container);
});
```

### Pause Execution

Use `user.pause()` to pause during interaction:

```typescript
it('pauses for inspection', async () => {
  const user = createUser();
  
  render(<Component />);
  
  await user.click(screen.getByRole('button'));
  
  // Pause here to inspect state
  await user.pause();
  
  // Continue testing...
});
```

## Coverage Reports

Generate coverage reports:

```bash
# Run tests with coverage
pnpm test:coverage

# View coverage report
open coverage/index.html
```

Target coverage thresholds:
- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

## Continuous Integration

Tests run automatically on:
- Pull requests
- Main branch pushes
- Release workflows

CI configuration ensures:
- All tests pass
- Coverage thresholds are met
- No accessibility violations
- Performance benchmarks are maintained