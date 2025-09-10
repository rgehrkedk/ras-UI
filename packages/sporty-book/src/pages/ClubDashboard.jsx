import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  MapPin,
  UserIcon,
  LogIn,
} from "lucide-react";
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
} from "date-fns";

// Dummy createPageUrl for compilation. In a real app, this would be a routing utility.
const createPageUrl = (pageName) => {
  if (pageName === "ClubPricing") {
    return "/club-pricing"; // Example path
  }
  return "#"; // Fallback for other cases
};

export default function ClubDashboard() {
  const [club, setClub] = useState(null);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    weeklyBookings: 0,
    totalRevenue: 0,
    weeklyRevenue: 0,
    activeMembers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      console.log("Current user:", currentUser); // Debug log

      // If no user or user is not associated with a club, we don't proceed with club-specific data loading
      if (!currentUser || !currentUser.club_id) {
        console.log("User has no club_id:", currentUser?.club_id); // Debug log
        setLoading(false);
        return; // Exit early if no club_id
      }

      // Load club data
      const clubs = await SportClub.list();
      console.log("All clubs:", clubs); // Debug log
      const userClub = clubs.find((c) => c.id === currentUser.club_id);
      console.log("Found user club:", userClub); // Debug log
      setClub(userClub);

      // If a club_id exists but the club itself wasn't found in the list, handle this specifically
      if (!userClub) {
        console.error("Club not found for ID:", currentUser.club_id);
        setLoading(false);
        return;
      }

      // Load bookings
      const allBookings = await Booking.list();
      const clubBookings = allBookings.filter(
        (b) => b.club_id === currentUser.club_id,
      );
      setBookings(clubBookings);

      // Load members
      const allMembers = await ClubMember.filter({
        club_id: currentUser.club_id,
      });
      setMembers(allMembers);

      // Calculate stats
      const now = new Date();
      const weekStart = startOfWeek(now);
      const weekEnd = endOfWeek(now);

      const weeklyBookings = clubBookings.filter((booking) => {
        const bookingDate = parseISO(booking.booking_date);
        return isWithinInterval(bookingDate, {
          start: weekStart,
          end: weekEnd,
        });
      });

      const totalRevenue = clubBookings.reduce(
        (sum, booking) => sum + (booking.total_cost || 0),
        0,
      );
      const weeklyRevenue = weeklyBookings.reduce(
        (sum, booking) => sum + (booking.total_cost || 0),
        0,
      );

      setStats({
        totalBookings: clubBookings.length,
        weeklyBookings: weeklyBookings.length,
        totalRevenue,
        weeklyRevenue,
        activeMembers: allMembers.filter((m) => m.status === "active").length,
      });
    } catch (error) {
      console.error("Error loading dashboard:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      // Assuming User.loginWithRedirect handles the full OAuth/authentication flow
      await User.loginWithRedirect(window.location.href);
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error, e.g., display a message to the user
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded mb-6" />
            <div className="grid md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-200 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // First, check if a user is authenticated at all
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <UserIcon className="w-16 h-16 text-teal-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Club Access Required
            </h2>
            <p className="text-slate-600 mb-6">
              Sign in to access your club dashboard and management tools.
            </p>
            <Button
              onClick={handleLogin}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Second, check if the authenticated user has a club_id associated
  if (!user.club_id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              No Club Association
            </h2>
            <p className="text-slate-600 mb-6">
              You are not associated with any club. Contact support or register
              your club to get access.
            </p>
            <Link to={createPageUrl("ClubPricing")}>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                Register Your Club
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Third, if a club_id exists but the actual club data couldn't be loaded/found
  if (!club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Club Not Found
          </h2>
          <p className="text-slate-600">
            Your associated club could not be found. Please contact support.
          </p>
        </div>
      </div>
    );
  }

  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Welcome back to {club.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stats.totalBookings}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">This Week</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stats.weeklyBookings}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-slate-900">
                    ${stats.totalRevenue.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Active Members</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stats.activeMembers}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {recentBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">No recent bookings</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                      >
                        <div>
                          <h4 className="font-semibold text-slate-900">
                            {booking.facility_name}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {format(parseISO(booking.booking_date), "MMM d")} •{" "}
                            {booking.start_time} - {booking.end_time}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {booking.status}
                          </Badge>
                          <p className="text-sm font-semibold text-slate-900">
                            ${booking.total_cost}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <button className="p-4 border-2 border-dashed border-slate-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-colors text-left">
                    <h4 className="font-semibold text-slate-900">
                      Update Club Info
                    </h4>
                    <p className="text-sm text-slate-600">
                      Edit facilities, hours, amenities
                    </p>
                  </button>
                  <button className="p-4 border-2 border-dashed border-slate-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-colors text-left">
                    <h4 className="font-semibold text-slate-900">
                      Manage Bookings
                    </h4>
                    <p className="text-sm text-slate-600">
                      View and update reservations
                    </p>
                  </button>
                  <button className="p-4 border-2 border-dashed border-slate-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-colors text-left">
                    <h4 className="font-semibold text-slate-900">
                      Member Management
                    </h4>
                    <p className="text-sm text-slate-600">
                      Add and manage members
                    </p>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
