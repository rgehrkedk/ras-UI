import React from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturedClubs from "../components/home/FeaturedClubs";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedClubs />

      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Why Choose SportBook?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Premium Facilities
              </h3>
              <p className="text-slate-600">
                Access to the finest sport clubs with top-notch facilities and
                equipment.
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Instant Booking
              </h3>
              <p className="text-slate-600">
                Book your favorite courts and facilities instantly with
                real-time availability.
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Secure Payments
              </h3>
              <p className="text-slate-600">
                Safe and secure payment processing with flexible booking
                options.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
