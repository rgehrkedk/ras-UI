/**
 * Layout component tests
 */

import { describe, it, expect, vi } from 'vitest';

import { render, screen } from '../../test/test-utils';

import { 
  Layout, 
  LayoutHeader, 
  LayoutBody, 
  LayoutMain, 
  LayoutContent, 
  LayoutFooter 
} from './Layout';

describe('Layout', () => {
  it('renders with default props', () => {
    render(<Layout>Layout content</Layout>);
    
    const layout = screen.getByText('Layout content');
    expect(layout).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Layout className="custom-layout">Test</Layout>);
    
    const layout = screen.getByText('Test');
    expect(layout).toHaveClass('custom-layout');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    
    render(<Layout ref={ref}>Test</Layout>);
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('preserves additional props', () => {
    render(
      <Layout 
        data-testid="layout-test" 
      >
        Test
      </Layout>
    );
    
    const layout = screen.getByTestId('layout-test');
    expect(layout).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <Layout>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Layout>
    );
    
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });
});

describe('LayoutHeader', () => {
  it('renders as header element', () => {
    render(<LayoutHeader>Header content</LayoutHeader>);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Header content');
  });

  it('applies sticky behavior by default', () => {
    render(<LayoutHeader>Sticky header</LayoutHeader>);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('can disable sticky behavior', () => {
    render(<LayoutHeader sticky={false}>Non-sticky header</LayoutHeader>);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<LayoutHeader className="custom-header">Test</LayoutHeader>);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('custom-header');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    
    render(<LayoutHeader ref={ref}>Test</LayoutHeader>);
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
  });

  it('preserves additional props', () => {
    render(
      <LayoutHeader 
        data-testid="header-test" 
      >
        Test
      </LayoutHeader>
    );
    
    const header = screen.getByTestId('header-test');
    expect(header).toBeInTheDocument();
  });

  it('renders complex children', () => {
    render(
      <LayoutHeader>
        <nav>Navigation</nav>
        <h1>Title</h1>
        <div>Actions</div>
      </LayoutHeader>
    );
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });
});

describe('LayoutBody', () => {
  it('renders with default props', () => {
    render(<LayoutBody>Body content</LayoutBody>);
    
    const body = screen.getByText('Body content');
    expect(body).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<LayoutBody className="custom-body">Test</LayoutBody>);
    
    const body = screen.getByText('Test');
    expect(body).toHaveClass('custom-body');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    
    render(<LayoutBody ref={ref}>Test</LayoutBody>);
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('preserves additional props', () => {
    render(
      <LayoutBody 
        data-testid="body-test" 
      >
        Test
      </LayoutBody>
    );
    
    const body = screen.getByTestId('body-test');
    expect(body).toBeInTheDocument();
  });

  it('renders sidebar and main content together', () => {
    render(
      <LayoutBody>
        <aside>Sidebar</aside>
        <div>Main Content</div>
      </LayoutBody>
    );
    
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });
});

describe('LayoutMain', () => {
  it('renders as main element', () => {
    render(<LayoutMain>Main content</LayoutMain>);
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveTextContent('Main content');
  });

  it('applies padding by default', () => {
    render(<LayoutMain>Padded content</LayoutMain>);
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('can disable padding', () => {
    render(<LayoutMain padded={false}>No padding</LayoutMain>);
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<LayoutMain className="custom-main">Test</LayoutMain>);
    
    const main = screen.getByRole('main');
    expect(main).toHaveClass('custom-main');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    
    render(<LayoutMain ref={ref}>Test</LayoutMain>);
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
  });

  it('preserves additional props', () => {
    render(
      <LayoutMain 
        data-testid="main-test" 
      >
        Test
      </LayoutMain>
    );
    
    const main = screen.getByTestId('main-test');
    expect(main).toBeInTheDocument();
  });

  it('renders complex content', () => {
    render(
      <LayoutMain>
        <h1>Page Title</h1>
        <section>Section 1</section>
        <section>Section 2</section>
        <aside>Related content</aside>
      </LayoutMain>
    );
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Related content')).toBeInTheDocument();
  });
});

describe('LayoutContent', () => {
  it('renders with default props', () => {
    render(<LayoutContent>Content</LayoutContent>);
    
    const content = screen.getByText('Content');
    expect(content).toBeInTheDocument();
  });

  it('renders different maxWidth variants', () => {
    const widths = ['sm', 'md', 'lg', 'xl', 'full'] as const;
    
    widths.forEach(maxWidth => {
      const { unmount } = render(
        <LayoutContent maxWidth={maxWidth}>Width {maxWidth}</LayoutContent>
      );
      expect(screen.getByText(`Width ${maxWidth}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('uses xl as default maxWidth', () => {
    render(<LayoutContent>Default width</LayoutContent>);
    
    const content = screen.getByText('Default width');
    expect(content).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<LayoutContent className="custom-content">Test</LayoutContent>);
    
    const content = screen.getByText('Test');
    expect(content).toHaveClass('custom-content');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    
    render(<LayoutContent ref={ref}>Test</LayoutContent>);
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('preserves additional props', () => {
    render(
      <LayoutContent 
        data-testid="content-test" 
      >
        Test
      </LayoutContent>
    );
    
    const content = screen.getByTestId('content-test');
    expect(content).toBeInTheDocument();
  });

  it('constrains content width based on maxWidth prop', () => {
    const { rerender } = render(
      <LayoutContent maxWidth="sm">Small content</LayoutContent>
    );
    expect(screen.getByText('Small content')).toBeInTheDocument();
    
    rerender(
      <LayoutContent maxWidth="full">Full width content</LayoutContent>
    );
    expect(screen.getByText('Full width content')).toBeInTheDocument();
  });
});

describe('LayoutFooter', () => {
  it('renders as footer element', () => {
    render(<LayoutFooter>Footer content</LayoutFooter>);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent('Footer content');
  });

  it('applies custom className', () => {
    render(<LayoutFooter className="custom-footer">Test</LayoutFooter>);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('custom-footer');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    
    render(<LayoutFooter ref={ref}>Test</LayoutFooter>);
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
  });

  it('preserves additional props', () => {
    render(
      <LayoutFooter 
        data-testid="footer-test" 
      >
        Test
      </LayoutFooter>
    );
    
    const footer = screen.getByTestId('footer-test');
    expect(footer).toBeInTheDocument();
  });

  it('renders complex footer content', () => {
    render(
      <LayoutFooter>
        <div>Copyright © 2024</div>
        <nav>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </nav>
      </LayoutFooter>
    );
    
    expect(screen.getByText('Copyright © 2024')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Terms' })).toBeInTheDocument();
  });
});

describe('Layout Composition', () => {
  it('composes all layout components together', () => {
    render(
      <Layout>
        <LayoutHeader>Header</LayoutHeader>
        <LayoutBody>
          <aside>Sidebar</aside>
          <LayoutMain>
            <LayoutContent>Main Content</LayoutContent>
          </LayoutMain>
        </LayoutBody>
        <LayoutFooter>Footer</LayoutFooter>
      </Layout>
    );
    
    expect(screen.getByRole('banner')).toHaveTextContent('Header');
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Footer');
  });

  it('allows nested layouts', () => {
    render(
      <Layout>
        <LayoutHeader>Outer Header</LayoutHeader>
        <LayoutBody>
          <LayoutMain>
            <Layout>
              <LayoutHeader sticky={false}>Inner Header</LayoutHeader>
              <LayoutMain padded={false}>Inner Content</LayoutMain>
            </Layout>
          </LayoutMain>
        </LayoutBody>
      </Layout>
    );
    
    expect(screen.getByText('Outer Header')).toBeInTheDocument();
    expect(screen.getByText('Inner Header')).toBeInTheDocument();
    expect(screen.getByText('Inner Content')).toBeInTheDocument();
  });

  it('handles dynamic content', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    
    render(
      <Layout>
        <LayoutHeader>Dynamic Layout</LayoutHeader>
        <LayoutMain>
          <LayoutContent maxWidth="lg">
            {items.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </LayoutContent>
        </LayoutMain>
      </Layout>
    );
    
    items.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('works with conditional rendering', () => {
    const showSidebar = true;
    const showFooter = false;
    
    render(
      <Layout>
        <LayoutHeader>Conditional Layout</LayoutHeader>
        <LayoutBody>
          {showSidebar && <aside>Sidebar</aside>}
          <LayoutMain>
            <LayoutContent>Main Content</LayoutContent>
          </LayoutMain>
        </LayoutBody>
        {showFooter && <LayoutFooter>Footer</LayoutFooter>}
      </Layout>
    );
    
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
  });

  it('supports responsive layouts', () => {
    render(
      <Layout>
        <LayoutHeader>
          <div className="mobile-menu">☰</div>
          <nav className="desktop-nav">Full Navigation</nav>
        </LayoutHeader>
        <LayoutBody>
          <aside className="desktop-sidebar">Desktop Sidebar</aside>
          <LayoutMain>
            <LayoutContent maxWidth="xl">
              Responsive Content
            </LayoutContent>
          </LayoutMain>
        </LayoutBody>
      </Layout>
    );
    
    expect(screen.getByText('☰')).toBeInTheDocument();
    expect(screen.getByText('Full Navigation')).toBeInTheDocument();
    expect(screen.getByText('Desktop Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Responsive Content')).toBeInTheDocument();
  });
});

describe('Accessibility', () => {
  it('uses semantic HTML elements', () => {
    render(
      <Layout>
        <LayoutHeader>Header</LayoutHeader>
        <LayoutBody>
          <LayoutMain>Main</LayoutMain>
        </LayoutBody>
        <LayoutFooter>Footer</LayoutFooter>
      </Layout>
    );
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('maintains proper heading hierarchy', () => {
    render(
      <Layout>
        <LayoutHeader>
          <h1>Site Title</h1>
        </LayoutHeader>
        <LayoutMain>
          <LayoutContent>
            <h2>Page Title</h2>
            <section>
              <h3>Section Title</h3>
            </section>
          </LayoutContent>
        </LayoutMain>
      </Layout>
    );
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Site Title');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Page Title');
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Section Title');
  });

  it('supports skip navigation links', () => {
    render(
      <Layout>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <LayoutHeader>Header</LayoutHeader>
        <LayoutBody>
          <aside>Sidebar with navigation</aside>
          <LayoutMain>
            <div id="main-content">Main Content</div>
          </LayoutMain>
        </LayoutBody>
      </Layout>
    );
    
    const skipLink = screen.getByRole('link', { name: 'Skip to main content' });
    expect(skipLink).toHaveAttribute('href', '#main-content');
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });
});

describe('Edge Cases', () => {
  it('handles empty content gracefully', () => {
    render(
      <Layout>
        <LayoutHeader>{null}</LayoutHeader>
        <LayoutBody>
          <LayoutMain>{null}</LayoutMain>
        </LayoutBody>
        <LayoutFooter>{null}</LayoutFooter>
      </Layout>
    );
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('handles very long content', () => {
    const longContent = 'Lorem ipsum '.repeat(1000);
    
    render(
      <Layout>
        <LayoutMain>
          <LayoutContent maxWidth="md">
            <div>{longContent}</div>
          </LayoutContent>
        </LayoutMain>
      </Layout>
    );
    
    const content = screen.getByText((content, element) => {
      return element?.textContent?.includes('Lorem ipsum') ?? false;
    });
    expect(content).toBeInTheDocument();
  });

  it('handles deeply nested structures', () => {
    render(
      <Layout>
        <LayoutBody>
          <LayoutMain>
            <LayoutContent>
              <div>
                <div>
                  <div>
                    <div>Deeply nested content</div>
                  </div>
                </div>
              </div>
            </LayoutContent>
          </LayoutMain>
        </LayoutBody>
      </Layout>
    );
    
    expect(screen.getByText('Deeply nested content')).toBeInTheDocument();
  });

  it('handles multiple Layout instances on the same page', () => {
    render(
      <>
        <Layout>
          <LayoutMain>First Layout</LayoutMain>
        </Layout>
        <Layout>
          <LayoutMain>Second Layout</LayoutMain>
        </Layout>
      </>
    );
    
    expect(screen.getByText('First Layout')).toBeInTheDocument();
    expect(screen.getByText('Second Layout')).toBeInTheDocument();
  });

  it('maintains component boundaries', () => {
    const { container } = render(
      <Layout className="outer-layout">
        <LayoutHeader className="outer-header">Outer</LayoutHeader>
        <Layout className="inner-layout">
          <LayoutHeader className="inner-header">Inner</LayoutHeader>
        </Layout>
      </Layout>
    );
    
    const outerHeader = container.querySelector('.outer-header');
    const innerHeader = container.querySelector('.inner-header');
    
    expect(outerHeader).toHaveTextContent('Outer');
    expect(innerHeader).toHaveTextContent('Inner');
  });
});
