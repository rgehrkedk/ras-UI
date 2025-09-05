
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Users, DollarSign, CheckCircle, XCircle, User as UserIcon, LogIn } from "lucide-react";
import { format, addDays, isSameDay, parseISO } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function BookFacility() {
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [facility, setFacility] = useState(null);
  const [user, setUser] = useState(null); // New state for current user
  const [loading, setLoading] = useState(true);
  const [existingBookings, setExistingBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    player_count: 2,
    notes: ""
  });
  const [bookingStatus, setBookingStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false); // New state for login modal

  // Generate time slots (8 AM to 10 PM, 1-hour intervals)
  const timeSlots = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 8;
    return {
      time: `${hour.toString().padStart(2, '0')}:00`,
      display: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`
    };
  });

  // Function to load user, allowing non-authenticated access initially
  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      // User is not logged in or session expired, set user to null
      setUser(null);
      return null;
    }
  };

  const loadExistingBookings = useCallback(async () => {
    if (!facility) return;
    
    try {
      const allBookings = await Booking.list();
      const dayBookings = allBookings.filter(booking => 
        booking.facility_name === facility.name &&
        booking.booking_date === selectedDate &&
        (booking.status === "confirmed" || booking.status === "pending")
      );
      setExistingBookings(dayBookings);
    } catch (error) {
      console.error("Error loading existing bookings:", error);
    }
  }, [facility, selectedDate]);

  useEffect(() => {
    loadExistingBookings();
  }, [loadExistingBookings]);

  const loadBookingData = useCallback(async () => {
    try {
      // Attempt to load user, but don't block component rendering if not logged in
      await loadUser();

      const urlParams = new URLSearchParams(window.location.search);
      const clubId = urlParams.get('clubId');
      const facilityName = decodeURIComponent(urlParams.get('facility') || '');
      
      if (clubId && facilityName) {
        const clubs = await SportClub.list();
        const foundClub = clubs.find(c => c.id === clubId);
        
        if (foundClub) {
          setClub(foundClub);
          const foundFacility = foundClub.facilities?.find(f => f.name === facilityName);
          setFacility(foundFacility);
        } else {
          console.error("Club not found with ID:", clubId);
        }
      } else {
        console.error("Missing URL parameters:", { clubId, facilityName });
      }
    } catch (error) {
      console.error("Error loading booking data:", error);
    } finally {
      setLoading(false);
    }
  }, []); // Dependencies for loadBookingData

  useEffect(() => {
    loadBookingData();
  }, [loadBookingData]); // Add loadBookingData to useEffect dependencies

  const isSlotBooked = (timeSlot) => {
    return existingBookings.some(booking => {
      const bookingStart = booking.start_time;
      const bookingEnd = booking.end_time;
      return timeSlot >= bookingStart && timeSlot < bookingEnd;
    });
  };

  const isSlotSelected = (timeSlot) => {
    return selectedSlots.includes(timeSlot);
  };

  const toggleSlot = (timeSlot) => {
    if (isSlotBooked(timeSlot)) return; // Can't select booked slots
    
    setSelectedSlots(prev => {
      if (prev.includes(timeSlot)) {
        return prev.filter(slot => slot !== timeSlot);
      } else {
        return [...prev, timeSlot].sort();
      }
    });
  };

  const calculateBookingDetails = () => {
    if (selectedSlots.length === 0) return { duration: 0, cost: 0, startTime: "", endTime: "" };
    
    const sortedSlots = [...selectedSlots].sort();
    const startTime = sortedSlots[0];
    const endHour = parseInt(sortedSlots[sortedSlots.length - 1].split(':')[0]) + 1;
    const endTime = `${endHour.toString().padStart(2, '0')}:00`;
    const duration = selectedSlots.length;
    const cost = (facility?.hourly_rate || 50) * duration;
    
    return { duration, cost, startTime, endTime };
  };

  const handleLogin = async () => {
    try {
      await User.loginWithRedirect(window.location.href);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleBooking = async () => {
    if (selectedSlots.length === 0) return;
    
    // Check if user is logged in before proceeding with booking
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { startTime, endTime, cost } = calculateBookingDetails();
      
      await Booking.create({
        club_id: club.id,
        facility_name: facility.name,
        sport: facility.sport,
        booking_date: selectedDate,
        start_time: startTime,
        end_time: endTime,
        duration_hours: selectedSlots.length,
        total_cost: cost,
        player_count: bookingDetails.player_count,
        notes: bookingDetails.notes,
        status: "confirmed"
      });
      
      setBookingStatus("success");
      setSelectedSlots([]);
      loadExistingBookings(); // Call the memoized function
      
      setTimeout(() => {
        navigate(createPageUrl("MyBookings"));
      }, 2000);
    } catch (error) {
      console.error("Error creating booking:", error);
      setBookingStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded mb-6" />
            <div className="h-64 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!club || !facility) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Booking information not found</h2>
          <Link to={createPageUrl("Clubs")}>
            <Button className="bg-teal-600 hover:bg-teal-700">
              Browse Clubs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const bookingInfo = calculateBookingDetails();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Login Prompt Modal */}
        {showLoginPrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="text-center">
                <UserIcon className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Sign in to complete booking</h3>
                <p className="text-slate-600 mb-6">
                  You need to sign in to book facilities and manage your reservations.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowLoginPrompt(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleLogin}
                    className="flex-1 bg-teal-600 hover:bg-teal-700"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to={createPageUrl(`ClubDetail?id=${club.id}`)}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Book {facility.name}</h1>
            <p className="text-slate-600">{club.name} • {facility.sport?.charAt(0).toUpperCase() + facility.sport?.slice(1).replace('_', ' ')}</p>
          </div>
        </div>

        {/* Status Messages */}
        {bookingStatus === "success" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Booking confirmed! Redirecting to your bookings...</span>
            </div>
          </div>
        )}
        
        {bookingStatus === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-800">
              <XCircle className="w-5 h-5" />
              <span className="font-medium">Failed to create booking. Please try again.</span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Booking Grid */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    Select Date & Time
                  </CardTitle>
                  <Badge className="bg-teal-100 text-teal-800">
                    ${facility.hourly_rate}/hour
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selector */}
                <div>
                  <Label htmlFor="date" className="text-base font-medium mb-3 block">Choose Date</Label>
                  <Input
                    id="date"
                    type="date"
                    min={format(new Date(), "yyyy-MM-dd")}
                    max={format(addDays(new Date(), 30), "yyyy-MM-dd")}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full max-w-xs"
                  />
                </div>

                {/* Time Grid */}
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Available Time Slots - {format(parseISO(selectedDate + 'T00:00:00'), "EEEE, MMM d, yyyy")}
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {timeSlots.map((slot) => {
                      const isBooked = isSlotBooked(slot.time);
                      const isSelected = isSlotSelected(slot.time);
                      
                      return (
                        <button
                          key={slot.time}
                          onClick={() => toggleSlot(slot.time)}
                          disabled={isBooked}
                          className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                            isBooked
                              ? 'bg-red-50 border-red-200 text-red-500 cursor-not-allowed opacity-60'
                              : isSelected
                              ? 'bg-teal-600 border-teal-600 text-white shadow-lg'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-teal-300 hover:bg-teal-50'
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <span>{slot.display}</span>
                            {isBooked && (
                              <span className="text-xs text-red-400 mt-1">Booked</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white border-2 border-slate-200 rounded" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-teal-600 rounded" />
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-50 border-2 border-red-200 rounded" />
                    <span>Booked</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedSlots.length > 0 ? (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span>{bookingInfo.startTime} - {bookingInfo.endTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span>{format(parseISO(selectedDate + 'T00:00:00'), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-semibold">${bookingInfo.cost.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-4">
                      <div>
                        <Label htmlFor="players">Number of Players</Label>
                        <Input
                          id="players"
                          type="number"
                          min="1"
                          max={facility.capacity}
                          value={bookingDetails.player_count}
                          onChange={(e) => setBookingDetails({...bookingDetails, player_count: parseInt(e.target.value)})}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          value={bookingDetails.notes}
                          onChange={(e) => setBookingDetails({...bookingDetails, notes: e.target.value})}
                          placeholder="Any special requests..."
                          className="mt-1"
                        />
                      </div>

                      <Button
                        onClick={handleBooking}
                        disabled={isSubmitting}
                        className="w-full bg-teal-600 hover:bg-teal-700"
                      >
                        {isSubmitting ? "Booking..." : user ? `Book for $${bookingInfo.cost.toFixed(2)}` : "Sign in to Book"}
                      </Button>

                      {!user && (
                        <p className="text-sm text-slate-500 text-center mt-2">
                          You need to sign in to complete your booking
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">Select time slots to see booking details</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Facility Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Facility Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{facility.name}</p>
                  <p className="text-sm text-slate-600">{facility.sport?.charAt(0).toUpperCase() + facility.sport?.slice(1).replace('_', ' ')}</p>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Users className="w-4 h-4" />
                  <span>Up to {facility.capacity} players</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <DollarSign className="w-4 h-4" />
                  <span>${facility.hourly_rate}/hour</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
