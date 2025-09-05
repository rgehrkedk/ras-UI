/**
 * Card component tests
 */

import { describe, it, expect, vi } from 'vitest';

import { render, screen, createUser } from '../../test/test-utils';

import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from './Card';

describe('Card', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>);
    
    const card = screen.getByText('Card content');
    expect(card).toBeInTheDocument();
  });

  it('renders different elevation variants', () => {
    const elevations = ['flat', 'low', 'medium', 'high'] as const;
    
    elevations.forEach(elevation => {
      const { unmount } = render(
        <Card elevation={elevation}>Elevation {elevation}</Card>
      );
      expect(screen.getByText(`Elevation ${elevation}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('renders different padding variants', () => {
    const paddings = ['none', 'sm', 'md', 'lg'] as const;
    
    paddings.forEach(padding => {
      const { unmount } = render(
        <Card padding={padding}>Padding {padding}</Card>
      );
      expect(screen.getByText(`Padding ${padding}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('renders as interactive when interactive prop is true', async () => {
    const user = createUser();
    const handleClick = vi.fn();
    
    render(
      <Card interactive onClick={handleClick}>
        Interactive card
      </Card>
    );
    
    const card = screen.getByText('Interactive card');
    await user.click(card);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Card className="custom-card">Test</Card>);
    
    const card = screen.getByText('Test');
    expect(card).toHaveClass('custom-card');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    
    render(<Card ref={ref}>Test</Card>);
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('preserves additional props', () => {
    render(
      <Card 
        data-testid="card-test" 
        title="Card title"
        style={{ backgroundColor: 'red' }}
      >
        Test
      </Card>
    );
    
    const card = screen.getByTestId('card-test');
    expect(card).toHaveAttribute('title', 'Card title');
    expect(card).toHaveStyle('background-color: red');
  });

  it('supports keyboard navigation when interactive', async () => {
    const user = createUser();
    const handleClick = vi.fn();
    
    render(
      <Card interactive onClick={handleClick} tabIndex={0}>
        Keyboard interactive
      </Card>
    );
    
    const card = screen.getByText('Keyboard interactive');
    
    // Focus the card
    card.focus();
    expect(card).toHaveFocus();
    
    // Test Enter key
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('CardHeader', () => {
  it('renders children correctly', () => {
    render(
      <CardHeader>
        <h2>Header content</h2>
      </CardHeader>
    );
    
    const header = screen.getByText('Header content');
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe('H2');
  });

  it('applies custom className', () => {
    render(
      <CardHeader className="custom-header">
        Header
      </CardHeader>
    );
    
    const header = screen.getByText('Header').closest('div');
    expect(header).toHaveClass('custom-header');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    
    render(
      <CardHeader ref={ref}>
        Header
      </CardHeader>
    );
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('preserves additional props', () => {
    render(
      <CardHeader data-testid="header-test" role="banner">
        Header
      </CardHeader>
    );
    
    const header = screen.getByTestId('header-test');
    expect(header).toHaveAttribute('role', 'banner');
  });
});

describe('CardTitle', () => {
  it('renders as h3 by default', () => {
    render(<CardTitle>Default Title</CardTitle>);
    
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Default Title');
  });

  it('renders different heading levels', () => {
    const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
    
    headingLevels.forEach((level, index) => {
      const { unmount } = render(
        <CardTitle as={level}>Heading {level}</CardTitle>
      );
      
      const heading = screen.getByRole('heading', { level: index + 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(`Heading ${level}`);
      unmount();
    });
  });

  it('renders different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    sizes.forEach(size => {
      const { unmount } = render(
        <CardTitle size={size}>Size {size}</CardTitle>
      );
      
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveTextContent(`Size ${size}`);
      unmount();
    });
  });

  it('applies custom className', () => {
    render(
      <CardTitle className="custom-title">
        Custom Title
      </CardTitle>
    );
    
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toHaveClass('custom-title');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    
    render(
      <CardTitle ref={ref}>
        Title
      </CardTitle>
    );
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLHeadingElement));
  });

  it('preserves additional props', () => {
    render(
      <CardTitle id="card-title" data-testid="title-test">
        Title
      </CardTitle>
    );
    
    const title = screen.getByTestId('title-test');
    expect(title).toHaveAttribute('id', 'card-title');
  });
});

describe('CardDescription', () => {
  it('renders as paragraph by default', () => {
    render(<CardDescription>Card description text</CardDescription>);
    
    const description = screen.getByText('Card description text');
    expect(description).toBeInTheDocument();
    expect(description.tagName).toBe('P');
  });

  it('applies custom className', () => {
    render(
      <CardDescription className="custom-description">
        Description
      </CardDescription>
    );
    
    const description = screen.getByText('Description');
    expect(description).toHaveClass('custom-description');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    
    render(
      <CardDescription ref={ref}>
        Description
      </CardDescription>
    );
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLParagraphElement));
  });

  it('preserves additional props', () => {
    render(
      <CardDescription data-testid="desc-test" title="Description title">
        Description
      </CardDescription>
    );
    
    const description = screen.getByTestId('desc-test');
    expect(description).toHaveAttribute('title', 'Description title');
  });
});

describe('CardContent', () => {
  it('renders children correctly', () => {
    render(
      <CardContent>
        <p>Main content</p>
        <div>Additional content</div>
      </CardContent>
    );
    
    expect(screen.getByText('Main content')).toBeInTheDocument();
    expect(screen.getByText('Additional content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <CardContent className="custom-content">
        Content
      </CardContent>
    );
    
    const content = screen.getByText('Content').closest('div');
    expect(content).toHaveClass('custom-content');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    
    render(
      <CardContent ref={ref}>
        Content
      </CardContent>
    );
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('preserves additional props', () => {
    render(
      <CardContent data-testid="content-test" role="region">
        Content
      </CardContent>
    );
    
    const content = screen.getByTestId('content-test');
    expect(content).toHaveAttribute('role', 'region');
  });
});

describe('CardFooter', () => {
  it('renders children correctly', () => {
    render(
      <CardFooter>
        <button>Action</button>
        <span>Footer text</span>
      </CardFooter>
    );
    
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    expect(screen.getByText('Footer text')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <CardFooter className="custom-footer">
        Footer
      </CardFooter>
    );
    
    const footer = screen.getByText('Footer').closest('div');
    expect(footer).toHaveClass('custom-footer');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    
    render(
      <CardFooter ref={ref}>
        Footer
      </CardFooter>
    );
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('preserves additional props', () => {
    render(
      <CardFooter data-testid="footer-test" role="contentinfo">
        Footer
      </CardFooter>
    );
    
    const footer = screen.getByTestId('footer-test');
    expect(footer).toHaveAttribute('role', 'contentinfo');
  });
});

describe('Card Integration', () => {
  it('renders complete card structure', () => {
    render(
      <Card elevation="medium" interactive padding="lg">
        <CardHeader>
          <CardTitle size="lg" as="h2">
            Card Title
          </CardTitle>
          <CardDescription>
            This is a description of the card content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content goes here with various elements.</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
          </ul>
        </CardContent>
        <CardFooter>
          <button>Primary Action</button>
          <button>Secondary Action</button>
        </CardFooter>
      </Card>
    );
    
    // Verify all parts are rendered
    expect(screen.getByRole('heading', { level: 2, name: 'Card Title' })).toBeInTheDocument();
    expect(screen.getByText('This is a description of the card content.')).toBeInTheDocument();
    expect(screen.getByText('Main content goes here with various elements.')).toBeInTheDocument();
    expect(screen.getByText('List item 1')).toBeInTheDocument();
    expect(screen.getByText('List item 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Primary Action' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Secondary Action' })).toBeInTheDocument();
  });

  it('handles partial card structures', () => {
    render(
      <Card>
        <CardTitle>Just a title</CardTitle>
        <CardContent>Just content</CardContent>
      </Card>
    );
    
    expect(screen.getByRole('heading', { level: 3, name: 'Just a title' })).toBeInTheDocument();
    expect(screen.getByText('Just content')).toBeInTheDocument();
    
    // Should not have header, description, or footer
    expect(screen.queryByText('CardHeader')).not.toBeInTheDocument();
    expect(screen.queryByText('CardFooter')).not.toBeInTheDocument();
  });

  it('handles empty card', () => {
    render(<Card />);
    
    const card = screen.getByRole('generic');
    expect(card).toBeInTheDocument();
    expect(card).toBeEmptyDOMElement();
  });

  it('handles nested interactive content', async () => {
    const user = createUser();
    const handleCardClick = vi.fn();
    const handleButtonClick = vi.fn();
    
    render(
      <Card interactive onClick={handleCardClick}>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Content with interaction</p>
        </CardContent>
        <CardFooter>
          <button onClick={handleButtonClick}>Button</button>
        </CardFooter>
      </Card>
    );
    
    const card = screen.getByText('Interactive Card').closest('[role="generic"]') || screen.getByText('Content with interaction').closest('div')?.parentElement;
    const button = screen.getByRole('button', { name: 'Button' });
    
    // Button click should work independently
    await user.click(button);
    expect(handleButtonClick).toHaveBeenCalledTimes(1);
    expect(handleCardClick).toHaveBeenCalledTimes(1); // Due to event bubbling
    
    // Reset mocks
    handleCardClick.mockClear();
    handleButtonClick.mockClear();
    
    // Card click should work
    if (card) {
      await user.click(card);
      expect(handleCardClick).toHaveBeenCalledTimes(1);
      expect(handleButtonClick).not.toHaveBeenCalled();
    }
  });
});

describe('Accessibility', () => {
  it('maintains proper semantic structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle as="h1">Main Title</CardTitle>
          <CardDescription>Description text</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Paragraph content</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );
    
    // Check heading hierarchy
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Main Title');
    
    // Check paragraph structure
    const description = screen.getByText('Description text');
    expect(description.tagName).toBe('P');
    
    const content = screen.getByText('Paragraph content');
    expect(content.tagName).toBe('P');
    
    // Check interactive element
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('supports ARIA attributes', () => {
    render(
      <Card 
        role="article" 
        aria-labelledby="card-title" 
        aria-describedby="card-desc"
      >
        <CardTitle id="card-title">Accessible Card</CardTitle>
        <CardDescription id="card-desc">This card is accessible</CardDescription>
        <CardContent>Content here</CardContent>
      </Card>
    );
    
    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-labelledby', 'card-title');
    expect(card).toHaveAttribute('aria-describedby', 'card-desc');
    
    const title = screen.getByRole('heading');
    expect(title).toHaveAttribute('id', 'card-title');
    
    const description = screen.getByText('This card is accessible');
    expect(description).toHaveAttribute('id', 'card-desc');
  });

  it('supports keyboard navigation for interactive cards', async () => {
    const user = createUser();
    const handleClick = vi.fn();
    
    render(
      <Card 
        interactive 
        onClick={handleClick}
        tabIndex={0}
        role="button"
        aria-label="Interactive card button"
      >
        <CardContent>Keyboard accessible content</CardContent>
      </Card>
    );
    
    const card = screen.getByRole('button', { name: 'Interactive card button' });
    
    // Tab navigation
    await user.tab();
    expect(card).toHaveFocus();
    
    // Space key activation
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    // Enter key activation
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});

describe('Edge Cases', () => {
  it('handles very long content', () => {
    const longTitle = 'A'.repeat(200);
    const longDescription = 'B'.repeat(500);
    const longContent = 'C'.repeat(1000);
    
    render(
      <Card>
        <CardHeader>
          <CardTitle>{longTitle}</CardTitle>
          <CardDescription>{longDescription}</CardDescription>
        </CardHeader>
        <CardContent>{longContent}</CardContent>
      </Card>
    );
    
    expect(screen.getByText(longTitle)).toBeInTheDocument();
    expect(screen.getByText(longDescription)).toBeInTheDocument();
    expect(screen.getByText(longContent)).toBeInTheDocument();
  });

  it('handles complex nested content', () => {
    render(
      <Card>
        <CardContent>
          <div>
            <Card elevation="flat">
              <CardTitle>Nested Card</CardTitle>
              <CardContent>Nested content</CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    );
    
    expect(screen.getByText('Nested Card')).toBeInTheDocument();
    expect(screen.getByText('Nested content')).toBeInTheDocument();
  });

  it('handles undefined or null children gracefully', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>{undefined}</CardTitle>
          <CardDescription>{null}</CardDescription>
        </CardHeader>
        <CardContent>{undefined}</CardContent>
        <CardFooter>{null}</CardFooter>
      </Card>
    );
    
    // Should not crash and should render the structure
    const card = screen.getByRole('generic');
    expect(card).toBeInTheDocument();
  });
});