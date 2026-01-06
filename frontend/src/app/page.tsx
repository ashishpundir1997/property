"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { PropertyListingNew } from "@/components/property-listing-new";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Page Header */}
        <section className="py-2 sm:py-4 md:py-6 bg-white border-b border-slate-200">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-3 sm:mb-4">
              Properties
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl">
              Browse our collection of available properties
            </p>
          </div>
        </section>

        {/* Properties Listing */}
        <section className="py-14 sm:py-18 md:py-22">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PropertyListingNew />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
