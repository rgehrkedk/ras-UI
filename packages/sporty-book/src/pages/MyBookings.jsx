
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, DollarSign, CheckCircle, XCircle, LogIn } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [clubs, setClubs] = useState({});
  const [user, setUser] = useState(null); // Added user state
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadUserAndBookings(); // Changed to new function
  }, []);

  const loadUserAndBookings = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);

      if (currentUser) {
        const userBookings = await Booking.filter({ created_by: currentUser.email }, "-created_date");
        setBookings(userBookings);

        // Load club details
        const clubIds = [...new Set(userBookings.map(b => b.club_id))];
        const allClubs = await SportClub.list();
        const clubsMap = {};
        clubIds.forEach(id => {
          const club = allClubs.find(c => c.id === id);
          if (club) clubsMap[id] = club;
        });
        setClubs(clubsMap);
      }
    } catch (error) {
      console.error("Error loading user or bookings:", error);
      setUser(null); // Explicitly set user to null on error
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      await User.loginWithRedirect(window.location.href);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  // Show login screen if user is not authenticated
  if (!loading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <LogIn className="w-16 h-16 text-teal-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Sign in to view bookings</h2>
            <p className="text-slate-600 mb-6">
              You need to sign in to view and manage your bookings.
            </p>
            <Button onClick={handleLogin} className="w-full bg-teal-600 hover:bg-teal-700">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded mb-4" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="h-6 bg-slate-200 rounded mb-4" />
                <div className="h-4 bg-slate-200 rounded mb-2" />
                <div className="h-4 bg-slate-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 w-full overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 w-full min-w-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">My Bookings</h1>
          <p className="text-slate-600">Manage your sport facility reservations</p>
        </div>

        {/* Filter Tabs - Responsive */}
        <div className="mb-8 w-full min-w-0">
          <div className="w-full overflow-x-auto" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="flex gap-2 w-max min-w-full">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={`whitespace-nowrap ${filter === "all" ? "bg-teal-600 hover:bg-teal-700" : ""}`}
              >
                All ({bookings.length})
              </Button>
              <Button
                variant={filter === "confirmed" ? "default" : "outline"}
                onClick={() => setFilter("confirmed")}
                className={`whitespace-nowrap ${filter === "confirmed" ? "bg-teal-600 hover:bg-teal-700" : ""}`}
              >
                Confirmed ({bookings.filter(b => b.status === "confirmed").length})
              </Button>
              <Button
                variant={filter === "pending" ? "default" : "outline"}
                onClick={() => setFilter("pending")}
                className={`whitespace-nowrap ${filter === "pending" ? "bg-teal-600 hover:bg-teal-700" : ""}`}
              >
                Pending ({bookings.filter(b => b.status === "pending").length})
              </Button>
              <Button
                variant={filter === "cancelled" ? "default" : "outline"}
                onClick={() => setFilter("cancelled")}
                className={`whitespace-nowrap ${filter === "cancelled" ? "bg-teal-600 hover:bg-teal-700" : ""}`}
              >
                Cancelled ({bookings.filter(b => b.status === "cancelled").length})
              </Button>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6 w-full min-w-0">
          {filteredBookings.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No bookings found</h3>
                <p className="text-slate-600">
                  {filter === "all"
                    ? "You haven't made any bookings yet. Start by browsing our clubs!"
                    : `No ${filter} bookings found.`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredBookings.map((booking) => {
              const club = clubs[booking.club_id];
              return (
                <Card key={booking.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow w-full min-w-0">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                          <div className="min-w-0">
                            <h3 className="text-xl font-bold text-slate-900 mb-2 truncate">
                              {booking.facility_name}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-slate-600 mb-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span className="font-medium truncate">{club?.name || "Loading..."}</span>
                              </div>
                              <span className="text-slate-400 hidden sm:inline">•</span>
                              <span className="text-sm truncate">{club?.location?.address || "Loading location..."}</span>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(booking.status)} border-0 flex items-center gap-1 flex-shrink-0`}>
                            {getStatusIcon(booking.status)}
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{format(parseISO(booking.booking_date), "MMM d, yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{booking.start_time} - {booking.end_time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Users className="w-4 h-4 flex-shrink-0" />
                            <span>{booking.player_count} players</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <DollarSign className="w-4 h-4 flex-shrink-0" />
                            <span className="font-semibold">${booking.total_cost?.toFixed(2)}</span>
                          </div>
                        </div>

                        {booking.notes && (
                          <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                            <p className="text-sm text-slate-600">
                              <strong>Notes:</strong> {booking.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
