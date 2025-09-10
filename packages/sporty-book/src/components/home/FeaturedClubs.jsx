import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function FeaturedClubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedClubs();
  }, []);

  const loadFeaturedClubs = async () => {
    try {
      const data = await SportClub.list("-rating", 6);
      setClubs(data);
    } catch (error) {
      console.error("Error loading clubs:", error);
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
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Featured Clubs
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-orange-500 mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-slate-200 h-48 rounded-t-xl" />
                <div className="bg-white p-6 rounded-b-xl shadow-md">
                  <div className="h-6 bg-slate-200 rounded mb-4" />
                  <div className="h-4 bg-slate-200 rounded mb-2" />
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Featured Clubs
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Discover our handpicked selection of premium sport facilities
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-orange-500 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map((club) => (
            <Card
              key={club.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={
                    club.image_url ||
                    `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop`
                  }
                  alt={club.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-slate-900 font-semibold backdrop-blur-sm">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {club.rating || 4.8}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {club.name}
                </h3>
                <div className="flex items-center text-slate-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{club.location?.address}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {club.sports?.slice(0, 3).map((sport) => (
                    <Badge
                      key={sport}
                      variant="secondary"
                      className={`${getSportColor(sport)} border-0`}
                    >
                      {sport.charAt(0).toUpperCase() + sport.slice(1)}
                    </Badge>
                  ))}
                  {club.sports?.length > 3 && (
                    <Badge variant="outline" className="text-slate-600">
                      +{club.sports.length - 3} more
                    </Badge>
                  )}
                </div>

                {club.operating_hours && (
                  <div className="flex items-center text-slate-600 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {club.operating_hours.open_time} -{" "}
                      {club.operating_hours.close_time}
                    </span>
                  </div>
                )}

                <Link to={createPageUrl(`ClubDetail?id=${club.id}`)}>
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold group">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to={createPageUrl("Clubs")}>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-teal-500 text-teal-600 hover:bg-teal-50 font-semibold"
            >
              View All Clubs
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
