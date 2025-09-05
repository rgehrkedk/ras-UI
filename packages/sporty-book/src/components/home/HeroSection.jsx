import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-slate-800 text-white">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Book Premium
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent"> Sport Clubs</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-12 leading-relaxed">
            Discover and book the finest sport facilities in your area. 
            From tennis courts to swimming pools, find your perfect match.
          </p>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Enter location or club name..."
                  className="pl-10 h-12 bg-white/90 border-0 text-slate-900 placeholder:text-slate-500"
                />
              </div>
              <Link to={createPageUrl("Clubs")}>
                <Button className="h-12 px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg">
                  <Search className="w-5 h-5 mr-2" />
                  Find Clubs
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12 text-slate-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-400" />
              <span>Real-time Availability</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-400" />
              <span>Premium Locations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}