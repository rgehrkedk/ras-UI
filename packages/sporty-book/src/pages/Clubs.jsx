
import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Star, Filter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const sports = ["tennis", "basketball", "football", "volleyball", "badminton", "squash", "table_tennis", "swimming", "gym", "yoga"];

  useEffect(() => {
    loadClubs();
  }, []);

  const filterClubs = useCallback(() => {
    let filtered = clubs;

    if (searchTerm) {
      filtered = filtered.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.location.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSport !== "all") {
      filtered = filtered.filter(club =>
        club.sports?.includes(selectedSport)
      );
    }

    setFilteredClubs(filtered);
  }, [clubs, searchTerm, selectedSport]);

  useEffect(() => {
    filterClubs();
  }, [filterClubs]);

  const loadClubs = async () => {
    try {
      const data = await SportClub.list("-rating");
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
      yoga: "bg-pink-100 text-pink-800",
      table_tennis: "bg-indigo-100 text-indigo-800" // Added color for table_tennis
    };
    return colors[sport] || "bg-slate-100 text-slate-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Browse Sport Clubs</h1>
          <p className="text-slate-600 text-lg">Discover premium sport facilities near you</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search clubs or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-slate-200 focus:border-teal-500"
              />
            </div>

            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger className="lg:w-48 h-12 border-slate-200">
                <SelectValue placeholder="All Sports" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sports</SelectItem>
                {sports.map(sport => (
                  <SelectItem key={sport} value={sport}>
                    {sport.charAt(0).toUpperCase() + sport.slice(1).replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-slate-600">
            {loading ? "Loading..." : `${filteredClubs.length} club${filteredClubs.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <Card key={club.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={club.image_url || `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop`}
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
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{club.name}</h3>
                  <div className="flex items-center text-slate-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{club.location.address}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {club.sports?.slice(0, 3).map((sport) => (
                      <Badge key={sport} variant="secondary" className={`${getSportColor(sport)} border-0`}>
                        {sport.charAt(0).toUpperCase() + sport.slice(1).replace('_', ' ')}
                      </Badge>
                    ))}
                    {club.sports?.length > 3 && (
                      <Badge variant="outline" className="text-slate-600">
                        +{club.sports.length - 3} more
                      </Badge>
                    )}
                  </div>

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
        )}

        {!loading && filteredClubs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No clubs found</h3>
            <p className="text-slate-600">Try adjusting your search criteria or browse all clubs.</p>
          </div>
        )}
      </div>
    </div>
  );
}
