"use client";

import React from "react";
import Link from "next/link";
import { useProperty } from "@/hooks";
import { InquiryForm } from "@/components/inquiry-form";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { formatPrice, formatArea, getPropertyTypeLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function PropertyDetail({ params }: { params: { id: string } }) {
  const propertyId = parseInt(params.id);
  const { data: property, isLoading, error } = useProperty(propertyId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-slate-600">Loading property...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Property Not Found
          </h1>
          <p className="text-slate-600 mb-6">
            The property you are looking for does not exist.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium">
            ← Back to listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <Navbar />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium mb-6 sm:mb-8">
          ← Back to listings
        </Link>
        
        <div className="grid gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Image Gallery */}
            <div className="rounded-xl overflow-hidden bg-white shadow-sm border border-slate-200">
              <div className="relative w-full bg-slate-200 overflow-hidden" style={{ paddingBottom: "66.67%" }}>
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {property.images.length > 1 && (
                <div className="p-4 sm:p-5 grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {property.images.slice(1).map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`${property.title} ${idx + 2}`}
                      className="aspect-video w-full object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="bg-white rounded-xl p-5 sm:p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 sm:space-y-8">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                  {property.title}
                </h1>
                <p className="text-base sm:text-lg text-slate-600">{property.location}</p>
              </div>

              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-600">
                {formatPrice(property.price)}
              </p>

              <div className="flex flex-wrap gap-2.5">
                <Badge>{getPropertyTypeLabel(property.property_type)}</Badge>
                <Badge variant="secondary">{property.status}</Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-6 border-t border-slate-200 pt-6 sm:pt-8">
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                    {property.bedrooms}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2">Bedrooms</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                    {property.bathrooms}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2">Bathrooms</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                    {formatArea(property.area)}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2">sq ft</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6 sm:pt-8">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">
                  Description
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {property.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-20 h-fit">
            <InquiryForm propertyId={propertyId} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
