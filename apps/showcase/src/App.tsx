/**
 * ras-UI Showcase with Layout and Sidebar
 * Demonstrates the complete design system with navigation
 */

import { 
  Button, 
  Badge, 
  Layout,
  LayoutHeader,
  LayoutBody,
  LayoutMain,
  LayoutContent,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarSeparator
} from '@ras-ui/react';
import '@ras-ui/react/style.css';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [brand, setBrand] = useState<'default' | 'vibrant' | 'corporate'>('default');

  // Apply theme and brand to document
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const changeBrand = (newBrand: 'default' | 'vibrant' | 'corporate') => {
    setBrand(newBrand);
    document.documentElement.setAttribute('data-brand', newBrand);
  };

  return (
    <Layout>
      <LayoutHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>ras-UI Showcase</h1>
          <Badge variant="primary">v0.1.0</Badge>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>
          <Button 
            variant={brand === 'default' ? 'primary' : 'ghost'} 
            size="sm" 
            onClick={() => changeBrand('default')}
          >
            Default
          </Button>
          <Button 
            variant={brand === 'vibrant' ? 'primary' : 'ghost'} 
            size="sm" 
            onClick={() => changeBrand('vibrant')}
          >
            Vibrant
          </Button>
          <Button 
            variant={brand === 'corporate' ? 'primary' : 'ghost'} 
            size="sm" 
            onClick={() => changeBrand('corporate')}
          >
            Corporate
          </Button>
        </div>
      </LayoutHeader>
      
      <LayoutBody>
        <Sidebar variant="floating" defaultCollapsed={false} collapsible={true}>
          <SidebarHeader title="Application" />
          
          <SidebarContent>
            <SidebarGroup label="Main">
              <SidebarItem icon="home" label="Dashboard" />
              <SidebarItem icon="search" label="Search" />
              <SidebarItem icon="chart" label="Analytics" badgeText="New" badgeVariant="success" />
            </SidebarGroup>
            
            <SidebarSeparator />
            
            <SidebarGroup label="Projects">
              <SidebarItem icon="folder" label="All Projects" />
              <SidebarItem icon="star" label="Favorites" badgeText="5" badgeVariant="outline" />
              <SidebarItem icon="calendar" label="Recent" />
            </SidebarGroup>
            
            <SidebarSeparator />
            
            <SidebarGroup label="Communication">
              <SidebarItem icon="message" label="Messages" badgeText="12" badgeVariant="danger" />
              <SidebarItem icon="bell" label="Notifications" badgeText="3" badgeVariant="warning" />
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter userName="John Doe" userEmail="john@example.com" />
        </Sidebar>
        
        <LayoutMain>
          <LayoutContent maxWidth="lg">
            <h2>Welcome to ras-UI Design System</h2>
            <p>
              This showcase demonstrates the Layout and Sidebar components working together
              to create a complete application shell.
            </p>
            
            <div style={{ marginTop: '2rem' }}>
              <p>Theme: {theme} | Brand: {brand}</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Danger Button</Button>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </LayoutContent>
        </LayoutMain>
      </LayoutBody>
    </Layout>
  );
}

export default App;