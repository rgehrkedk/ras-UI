
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Home, Calendar, Search, User as UserIcon, MapPin, Plus, BarChart3, Settings, Users, Edit, LogIn } from "lucide-react";
import 'leaflet/dist/leaflet.css';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    // For now, simulate no user logged in
    // TODO: Implement proper authentication
    setUser(null);
    setLoading(false);
  };

  const handleLogin = async () => {
    // TODO: Implement proper login functionality
    console.log("Login clicked - authentication to be implemented");
  };

  const handleLogout = async () => {
    // TODO: Implement proper logout functionality
    setUser(null);
    console.log("Logout clicked - authentication to be implemented");
  };

  const publicNavigation = [
    {
      title: "Home",
      url: createPageUrl("Home"),
      icon: Home,
    },
    {
      title: "Browse Clubs",
      url: createPageUrl("Clubs"),
      icon: Search,
    },
    {
      title: "List Your Club",
      url: createPageUrl("ClubPricing"),
      icon: Plus,
    }
  ];

  const customerNavigation = [
    {
      title: "Home",
      url: createPageUrl("Home"),
      icon: Home,
    },
    {
      title: "Browse Clubs",
      url: createPageUrl("Clubs"),
      icon: Search,
    },
    {
      title: "My Bookings",
      url: createPageUrl("MyBookings"),
      icon: Calendar,
    },
    {
      title: "List Your Club",
      url: createPageUrl("ClubPricing"),
      icon: Plus,
    }
  ];

  const clubNavigation = [
    {
      title: "Dashboard",
      url: createPageUrl("ClubDashboard"),
      icon: BarChart3,
    },
    {
      title: "Bookings",
      url: createPageUrl("BookingAdmin"),
      icon: Calendar,
    },
    {
      title: "Content",
      url: createPageUrl("ClubContent"),
      icon: Edit,
    },
    {
      title: "Members",
      url: createPageUrl("ClubMembers"),
      icon: Users,
    },
    {
      title: "Settings",
      url: createPageUrl("ClubSettings"),
      icon: Settings,
    }
  ];

  const getNavigationItems = () => {
    if (!user) return publicNavigation;
    if (user.club_id) return clubNavigation;
    return customerNavigation;
  };

  const navigationItems = getNavigationItems();

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --primary: 14 100% 35%;
          --primary-foreground: 0 0% 100%;
          --secondary: 28 100% 60%;
          --secondary-foreground: 0 0% 0%;
        }
      `}</style>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Sidebar className="rounded-2xl border border-white/20 backdrop-blur-sm bg-white/90 shadow-xl mx-2 my-2 ring-1 ring-slate-200/30">
          <SidebarHeader className="border-b border-slate-200/40 p-6 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-slate-900">SportBook</h2>
                <p className="text-xs text-slate-500 font-medium">
                  {user?.club_id ? "Club Management" : "Premium Club Bookings"}
                </p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4 rounded-b-2xl">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`transition-all duration-300 rounded-xl p-3 ${
                          location.pathname === item.url 
                            ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg' 
                            : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 font-medium">
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Customer Navigation for Club Users */}
            {user?.club_id && (
              <SidebarGroup>
                <SidebarGroupLabel className="text-slate-500 font-medium px-3 py-2">
                  Customer View
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-2">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="transition-all duration-300 rounded-xl p-3 hover:bg-slate-100 text-slate-600 hover:text-slate-900">
                        <Link to={createPageUrl("Home")} className="flex items-center gap-3 font-medium">
                          <Home className="w-5 h-5" />
                          <span>Browse as Customer</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {/* Login/Logout Section */}
            <SidebarGroup className="mt-auto">
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    {user ? (
                      <div className="p-3 space-y-3">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                            {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 truncate text-sm">
                              {user.full_name || user.email}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {user.club_role ? `Club ${user.club_role}` : "Customer"}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleLogout}
                          className="w-full text-xs"
                        >
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <SidebarMenuButton 
                        asChild 
                        className="transition-all duration-300 rounded-xl p-3 hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                      >
                        <button onClick={handleLogin} className="flex items-center gap-3 font-medium w-full">
                          <LogIn className="w-5 h-5" />
                          <span>Sign In</span>
                        </button>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Sidebar toggle positioned between floating elements */}
        <div className="relative flex justify-center items-start pt-6">
          <SidebarTrigger className="bg-white border border-slate-200 hover:bg-slate-50 p-2 rounded-full shadow-lg transition-all duration-200 hidden md:flex z-10" />
        </div>

        <main className="flex-1 flex flex-col rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/60 shadow-xl mx-2 my-2 overflow-hidden">
          <header className="bg-transparent border-b border-slate-200/60 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-slate-900">SportBook</h1>
              {!user && (
                <Button size="sm" onClick={handleLogin} className="ml-auto bg-teal-600 hover:bg-teal-700">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
