import React, { useEffect, useState } from "react";
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
  SidebarGroup,
  SidebarItem,
  SidebarSeparator,
  SidebarFooter,
  Switch,
  Input,
  Avatar,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  Icon,
  Menu,
  MenuTriggerComponent,
  MenuItem,
  Spinner,
} from "@ras-ui/react";
import { ClubCard } from "./components/ClubCard";
import { GlassPanel } from "./components/GlassPanel";
import { StatCard } from "./components/StatCard";

const featured = [
  {
    name: "Central Tennis Club",
    city: "Copenhagen",
    tags: ["Tennis", "Indoor", "AC"],
    price: "$45/hour",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1600&q=80",
    rating: 4.8,
    reviews: 234,
    distance: "1.2 km",
    isBookmarked: true,
  },
  {
    name: "Harbor Basketball Court",
    city: "Aarhus",
    tags: ["Basketball", "Outdoor"],
    price: "$25/hour",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80",
    rating: 4.6,
    reviews: 156,
    distance: "2.5 km",
    isBookmarked: false,
  },
  {
    name: "Nordic Fitness Center",
    city: "Odense",
    tags: ["Gym", "Sauna"],
    price: "$35/month",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80",
    rating: 4.9,
    reviews: 387,
    distance: "0.8 km",
    isBookmarked: true,
  },
  {
    name: "Royal Swim Arena",
    city: "Aalborg",
    tags: ["Swimming", "Indoor"],
    price: "$15/entry",
    image:
      "https://images.unsplash.com/photo-1556909212-d5b6043e67f3?auto=format&fit=crop&w=1600&q=80",
    rating: 4.7,
    reviews: 198,
    distance: "3.1 km",
    isBookmarked: false,
  },
];

export default function App() {
  // theme state + persistence
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("ras-theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  // Interactive state
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("featured");

  // default brand and apply theme attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-brand", "default");
  }, []);

  useEffect(() => {
    const theme = dark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("ras-theme", theme);
    } catch {}
  }, [dark]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gridTemplateColumns: "1fr",
        minHeight: "100vh",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {/* Header Row */}
      <header
        style={{
          gridRow: "1",
          gridColumn: "1",
          background: "var(--color-semantic-surface-raised)",
          backdropFilter: "saturate(180%) blur(10px)",
          WebkitBackdropFilter: "saturate(180%) blur(10px)",
          borderRadius: "1rem",
          border: "1px solid var(--color-semantic-border-default)",
          boxShadow: "0 8px 32px var(--color-semantic-shadow-md)",
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
          zIndex: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Badge variant="primary">ras‑UI</Badge>
          <strong>Club Explorer</strong>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Button variant="primary" size="sm">
            Create account
          </Button>
          <MenuTriggerComponent>
            <Button
              variant="ghost"
              size="sm"
              style={{ padding: "4px", borderRadius: "50%" }}
            >
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt="User avatar"
                size="sm"
                name="Guest"
              />
            </Button>
            <Menu aria-label="User actions">
              <MenuItem id="profile">Profile</MenuItem>
              <MenuItem id="settings">Settings</MenuItem>
              <MenuItem id="logout">Logout</MenuItem>
            </Menu>
          </MenuTriggerComponent>
        </div>
      </header>

      {/* Content Row with Sidebar + Main */}
      <div
        style={{
          gridRow: "2",
          gridColumn: "1",
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "1rem",
          minHeight: 0,
        }}
      >
        {/* Sidebar */}
        <aside>
          <Sidebar variant="floating" collapsible defaultCollapsed={false}>
            <SidebarHeader title="Browse" />
            <SidebarContent>
              <SidebarGroup label="Explore">
                <SidebarItem icon="home" label="Home" active />
                <SidebarItem icon="search" label="Search" />
                <SidebarItem icon="calendar" label="Bookings" />
              </SidebarGroup>

              <SidebarSeparator />

              <SidebarGroup label="Sports">
                <SidebarItem icon="star" label="Featured" />
                <SidebarItem icon="grid" label="All Sports" />
                <SidebarItem icon="folder" label="Clubs" />
              </SidebarGroup>

              <SidebarSeparator />

              <SidebarGroup label="Display">
                <SidebarItem
                  icon="layout"
                  label="Dark mode"
                  badge={
                    <Switch
                      size="sm"
                      isSelected={dark}
                      onChange={setDark}
                      aria-label="Toggle dark mode"
                    />
                  }
                />
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter userName="Guest" userEmail="welcome@ras-ui.dev" />
          </Sidebar>
        </aside>

        {/* Main Content - Flexible */}
        <main
          style={{
            minWidth: 0,
            overflow: "auto",
          }}
        >
          <LayoutContent maxWidth="4xl">
            {/* Hero Section */}
            <section style={{ marginBottom: "4rem" }}>
              <div
                style={{
                  background: "var(--color-semantic-surface-raised)",
                  borderRadius: "1.5rem",
                  padding: "3rem",
                  border: "1px solid var(--color-semantic-border-default)",
                  boxShadow: "0 8px 32px var(--color-semantic-shadow-md)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Tennis Court Background */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "60%",
                    height: "100%",
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1200&q=80)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    pointerEvents: "none",
                  }}
                />
                {/* Dark Mode Only - Brightness Control */}
                {dark && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "60%",
                      height: "100%",
                      background: "rgba(0, 0, 0, 0.4)",
                      mixBlendMode: "multiply",
                      pointerEvents: "none",
                    }}
                  />
                )}
                {/* Granular Fade Overlay - Theme Aware */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "60%",
                    height: "100%",
                    background: `linear-gradient(90deg, 
                  var(--color-semantic-surface-raised) 0%, 
                  color-mix(in srgb, var(--color-semantic-surface-raised) 95%, transparent) 15%, 
                  color-mix(in srgb, var(--color-semantic-surface-raised) 80%, transparent) 30%, 
                  color-mix(in srgb, var(--color-semantic-surface-raised) 60%, transparent) 45%, 
                  color-mix(in srgb, var(--color-semantic-surface-raised) 40%, transparent) 60%, 
                  color-mix(in srgb, var(--color-semantic-surface-raised) 20%, transparent) 75%, 
                  color-mix(in srgb, var(--color-semantic-surface-raised) 5%, transparent) 90%, 
                  transparent 100%)`,
                    pointerEvents: "none",
                  }}
                />

                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ marginBottom: "1rem" }}>
                    <Badge variant="primary">ras‑UI</Badge>
                  </div>

                  <h1
                    style={{
                      margin: "0 0 1.5rem 0",
                      fontSize: "clamp(2.5rem, 5vw, 4rem)",
                      fontWeight: 800,
                      lineHeight: 1.1,
                      background:
                        "linear-gradient(135deg, var(--color-semantic-text-primary) 0%, var(--color-brand-primary) 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Discover Amazing
                    <br />
                    Sports Facilities
                  </h1>

                  <p
                    style={{
                      margin: "0 0 2rem 0",
                      fontSize: "1.25rem",
                      lineHeight: 1.6,
                      color: "var(--color-semantic-text-secondary)",
                      maxWidth: "32rem",
                    }}
                  >
                    Find and book the perfect sports facility near you. From
                    tennis courts to fitness centers, discover your next
                    activity.
                  </p>

                  {/* Enhanced Search */}
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "stretch",
                      flexWrap: "wrap",
                      marginBottom: "2rem",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Search facilities, sports, locations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        flexGrow: 1,
                        minWidth: "20rem",
                        fontSize: "1.1rem",
                        padding: "0.75rem 1rem",
                        borderRadius: "0.75rem",
                        border:
                          "1px solid var(--color-semantic-border-default)",
                        background: "var(--color-semantic-surface-base)",
                        color: "var(--color-semantic-text-primary)",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor =
                          "var(--color-brand-primary)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor =
                          "var(--color-semantic-border-default)";
                      }}
                    />
                    <Button
                      variant="primary"
                      size="lg"
                      onPress={() => {
                        setIsLoading(true);
                        setTimeout(() => setIsLoading(false), 1000);
                      }}
                      isDisabled={isLoading}
                      style={{
                        minWidth: "8rem",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                      }}
                    >
                      {isLoading ? <Spinner size="sm" /> : "Explore"}
                    </Button>
                  </div>

                  {/* Quick Stats */}
                  <div
                    style={{
                      display: "flex",
                      gap: "2rem",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "2rem",
                          fontWeight: 700,
                          color: "var(--color-brand-primary)",
                        }}
                      >
                        120+
                      </div>
                      <div
                        style={{
                          color: "var(--color-semantic-text-secondary)",
                        }}
                      >
                        Clubs
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "2rem",
                          fontWeight: 700,
                          color: "var(--color-brand-primary)",
                        }}
                      >
                        15k+
                      </div>
                      <div
                        style={{
                          color: "var(--color-semantic-text-secondary)",
                        }}
                      >
                        Members
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "2rem",
                          fontWeight: 700,
                          color: "var(--color-brand-primary)",
                        }}
                      >
                        99%
                      </div>
                      <div
                        style={{
                          color: "var(--color-semantic-text-secondary)",
                        }}
                      >
                        Satisfaction
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Clubs */}
            <section style={{ marginBottom: "4rem" }}>
              <div style={{ marginBottom: "2rem" }}>
                <h2
                  style={{
                    margin: "0 0 0.5rem 0",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "var(--color-semantic-text-primary)",
                  }}
                >
                  Featured Clubs
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: "1.1rem",
                    color: "var(--color-semantic-text-secondary)",
                  }}
                >
                  Top-rated facilities in your area
                </p>
              </div>

              {/* Tabbed Content */}
              <Tabs
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as string)}
              >
                <TabList
                  aria-label="Club categories"
                  style={{ marginBottom: "2rem" }}
                >
                  <Tab key="featured">Featured</Tab>
                  <Tab key="popular">Most Popular</Tab>
                  <Tab key="new">New This Week</Tab>
                  <Tab key="nearby">Nearby</Tab>
                </TabList>

                <TabPanel key="featured">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(20rem, 1fr))",
                      gap: "2rem",
                    }}
                  >
                    {featured.map((c) => (
                      <ClubCard key={c.name} {...c} />
                    ))}
                  </div>
                </TabPanel>

                <TabPanel key="popular">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(20rem, 1fr))",
                      gap: "2rem",
                    }}
                  >
                    {featured.slice(0, 2).map((c) => (
                      <ClubCard key={c.name} {...c} />
                    ))}
                  </div>
                </TabPanel>

                <TabPanel key="new">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(20rem, 1fr))",
                      gap: "2rem",
                    }}
                  >
                    {featured.slice(1, 3).map((c) => (
                      <ClubCard key={c.name} {...c} />
                    ))}
                  </div>
                </TabPanel>

                <TabPanel key="nearby">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(20rem, 1fr))",
                      gap: "2rem",
                    }}
                  >
                    {featured.slice(2).map((c) => (
                      <ClubCard key={c.name} {...c} />
                    ))}
                  </div>
                </TabPanel>
              </Tabs>
            </section>

            {/* Why Choose Us */}
            <section style={{ marginBottom: "4rem" }}>
              <div style={{ marginBottom: "3rem", textAlign: "center" }}>
                <h2
                  style={{
                    margin: "0 0 1rem 0",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "var(--color-semantic-text-primary)",
                  }}
                >
                  Why Choose Club Explorer
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: "1.1rem",
                    color: "var(--color-semantic-text-secondary)",
                    maxWidth: "32rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  The smart way to find and book sports facilities
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
                  gap: "2rem",
                }}
              >
                <FeatureCard
                  icon="search"
                  title="Smart Discovery"
                  desc="AI-powered matching finds facilities that perfectly match your preferences, location, and schedule."
                />
                <FeatureCard
                  icon="calendar"
                  title="Instant Booking"
                  desc="Real-time availability with instant confirmations. Cancel or reschedule with just one tap."
                />
                <FeatureCard
                  icon="star"
                  title="Verified Quality"
                  desc="Every facility is verified and rated by real users. Book with confidence every time."
                />
              </div>
            </section>

            {/* User Testimonials */}
            <section style={{ marginBottom: "4rem" }}>
              <div style={{ marginBottom: "3rem", textAlign: "center" }}>
                <h2
                  style={{
                    margin: "0 0 1rem 0",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "var(--color-semantic-text-primary)",
                  }}
                >
                  What Our Members Say
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: "1.1rem",
                    color: "var(--color-semantic-text-secondary)",
                  }}
                >
                  Join thousands of happy athletes
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
                  gap: "2rem",
                }}
              >
                <TestimonialCard
                  name="Sarah Johnson"
                  role="Tennis Enthusiast"
                  content="Found the perfect tennis court just 5 minutes from my office. The booking process was seamless and the facility was exactly as described!"
                  avatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
                  rating={5}
                />
                <TestimonialCard
                  name="Mike Chen"
                  role="Fitness Coach"
                  content="Great variety of gyms and facilities. The real-time availability feature saves me so much time when planning client sessions."
                  avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                  rating={5}
                />
                <TestimonialCard
                  name="Emma Wilson"
                  role="Swimming Instructor"
                  content="The verification system gives me confidence that I'm booking quality facilities every time. Customer support is outstanding too!"
                  avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
                  rating={5}
                />
              </div>
            </section>

            {/* Footer */}
            <footer
              style={{
                marginTop: "4rem",
                paddingTop: "3rem",
                paddingBottom: "2rem",
                borderTop: "1px solid var(--color-semantic-border-default)",
                textAlign: "center",
                color: "var(--color-semantic-text-secondary)",
                fontSize: "0.9rem",
              }}
            >
              © {new Date().getFullYear()} ras‑UI Club Explorer • Built with
              accessibility and design tokens
            </footer>
          </LayoutContent>
        </main>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div
      style={{
        background: "var(--color-semantic-surface-raised)",
        borderRadius: "1.5rem",
        padding: "2rem",
        border: "1px solid var(--color-semantic-border-default)",
        boxShadow: "0 4px 16px var(--color-semantic-shadow-sm)",
        textAlign: "center",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 12px 32px var(--color-semantic-shadow-md)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 4px 16px var(--color-semantic-shadow-sm)";
      }}
    >
      <div
        style={{
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "4rem",
            height: "4rem",
            borderRadius: "1rem",
            background:
              "linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-primary)90)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            boxShadow: "0 4px 16px var(--color-brand-primary)30",
          }}
        >
          <Icon name={icon as any} size="lg" />
        </div>
      </div>
      <h3
        style={{
          margin: "0 0 1rem 0",
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "var(--color-semantic-text-primary)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          color: "var(--color-semantic-text-secondary)",
          lineHeight: "1.6",
          fontSize: "1rem",
        }}
      >
        {desc}
      </p>
    </div>
  );
}

function TestimonialCard({
  name,
  role,
  content,
  avatar,
  rating,
}: {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}) {
  return (
    <div
      style={{
        background: "var(--color-semantic-surface-raised)",
        borderRadius: "1.5rem",
        padding: "2rem",
        border: "1px solid var(--color-semantic-border-default)",
        boxShadow: "0 4px 16px var(--color-semantic-shadow-sm)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow =
          "0 8px 24px var(--color-semantic-shadow-md)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 4px 16px var(--color-semantic-shadow-sm)";
      }}
    >
      {/* Rating Stars */}
      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "0.25rem" }}>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            style={{
              color:
                i < rating ? "#fbbf24" : "var(--color-semantic-text-disabled)",
              fontSize: "1.25rem",
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Content */}
      <p
        style={{
          margin: "0 0 2rem 0",
          color: "var(--color-semantic-text-primary)",
          lineHeight: "1.7",
          fontSize: "1rem",
          fontStyle: "italic",
        }}
      >
        "{content}"
      </p>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Avatar src={avatar} alt={name} size="md" name={name} />
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--color-semantic-text-primary)",
              marginBottom: "0.25rem",
            }}
          >
            {name}
          </div>
          <div
            style={{
              color: "var(--color-semantic-text-secondary)",
              fontSize: "0.875rem",
            }}
          >
            {role}
          </div>
        </div>
      </div>
    </div>
  );
}
