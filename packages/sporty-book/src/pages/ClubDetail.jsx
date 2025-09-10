import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ClubInfoTabs from "../components/ClubInfoTabs";

export default function ClubDetail() {
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClubDetail();
  }, []);

  const loadClubDetail = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const clubId = urlParams.get("id");

      if (clubId) {
        const clubs = await SportClub.list();
        const foundClub = clubs.find((c) => c.id === clubId);
        setClub(foundClub);
      }
    } catch (error) {
      console.error("Error loading club:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSportColor = (sport) => {
    const colors = {
      tennis: "bg-green-100 text-green-800",
      basketball: "bg-orange-100 text-orange-800",
      football: "bg-blue-100 text-blue-800",
      volleyball: "bg-purple-100 text-purple-800",
      badminton: "bg-yellow-100 text-yellow-800",
      squash: "bg-red-100 text-red-800",
      swimming: "bg-cyan-100 text-cyan-800",
      gym: "bg-gray-100 text-gray-800",
    };
    return colors[sport] || "bg-slate-100 text-slate-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-64 bg-slate-200 rounded-2xl mb-8" />
            <div className="h-8 bg-slate-200 rounded mb-4" />
            <div className="h-4 bg-slate-200 rounded mb-2" />
            <div className="h-4 bg-slate-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Club not found
          </h2>
          <p className="text-slate-600">
            The requested club could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 w-full overflow-x-hidden">
      {/* Hero Image */}
      <div className="relative h-80 md:h-96 overflow-hidden w-full">
        <img
          src={
            club.image_url ||
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop"
          }
          alt={club.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 break-words">
            {club.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/90">
            <div className="flex items-center gap-2 min-w-0">
              <MapPin className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{club.location.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span>{club.rating || 4.8}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 md:px-6 py-8 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8 w-full min-w-0">
          {/* Main Content */}
          <div className="lg:col-span-2 w-full min-w-0">
            <ClubInfoTabs club={club} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6 w-full min-w-0">
            <Card className="border-0 shadow-lg w-full">
              <CardHeader>
                <CardTitle>Available Facilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {club.facilities?.map((facility, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-xl hover:border-teal-300 transition-colors w-full"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-slate-900 truncate mr-2">
                        {facility.name}
                      </h4>
                      <span className="text-teal-600 font-bold whitespace-nowrap">
                        ${facility.hourly_rate}/hr
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      {facility.sport?.charAt(0).toUpperCase() +
                        facility.sport?.slice(1).replace("_", " ")}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Up to {facility.capacity} players
                      </span>
                    </div>
                    <Link
                      to={createPageUrl(
                        `BookFacility?clubId=${club.id}&facility=${encodeURIComponent(facility.name)}`,
                      )}
                    >
                      <Button
                        size="sm"
                        className="w-full bg-teal-600 hover:bg-teal-700"
                        onClick={() =>
                          console.log("Booking link:", {
                            clubId: club.id,
                            facilityName: facility.name,
                          })
                        }
                      >
                        Book Now
                      </Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
