"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { PropertyListingNew } from "@/components/property-listing-new";
import { ArrowRight, MapPin, Home as HomeIcon, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-red-500/5" />
        
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="px-4 py-2 bg-orange-100 rounded-full border border-orange-200">
                <span className="text-sm font-semibold text-orange-700">
                  🎉 Your dream property awaits
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Property Today
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover premium properties from our extensive collection. Whether you're looking for a
              cozy apartment, a spacious house, or a luxury villa, we have the perfect match for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-bold hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 group">
                Start Exploring
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-slate-300 text-slate-900 rounded-lg font-bold hover:bg-slate-100 transition-all">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-orange-600">500+</p>
                <p className="text-sm text-slate-600 mt-1">Properties</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-orange-600">10K+</p>
                <p className="text-sm text-slate-600 mt-1">Happy Clients</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-orange-600">50+</p>
                <p className="text-sm text-slate-600 mt-1">Cities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-y border-slate-200/50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group hover:bg-orange-500 transition-colors">
                <HomeIcon className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Wide Selection</h3>
              <p className="text-slate-600">Browse from hundreds of properties across multiple categories and price ranges.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group hover:bg-orange-500 transition-colors">
                <MapPin className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Prime Locations</h3>
              <p className="text-slate-600">Find properties in the most desirable neighborhoods and locations.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group hover:bg-orange-500 transition-colors">
                <TrendingUp className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Best Value</h3>
              <p className="text-slate-600">Get the best deals and investment opportunities in real estate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-slate-600">
              Explore our latest listings and find your next home.
            </p>
          </div>

          <PropertyListingNew />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to find your dream property?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Contact our expert team today. We're here to help you every step of the way.
          </p>
          <button className="px-10 py-4 bg-white text-orange-600 rounded-lg font-bold hover:bg-orange-50 transition-all hover:scale-105 inline-block">
            Get in Touch
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">PropertyCo</h3>
              <p className="text-slate-400">Your trusted real estate partner.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition">Help</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2024 PropertyCo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
