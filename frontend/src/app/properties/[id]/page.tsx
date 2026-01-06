"use client";

import React from "react";
import Link from "next/link";
import { useProperty } from "@/hooks";
import { InquiryForm } from "@/components/inquiry-form";
import { formatPrice, formatArea, getPropertyTypeLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function PropertyDetail({ params }: { params: { id: string } }) {
  const propertyId = parseInt(params.id);
  const { data: property, isLoading, error } = useProperty(propertyId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="container max-w-6xl mx-auto">
          <div className="skeleton h-96 rounded-lg mb-6" />
          <div className="skeleton h-48 rounded-lg" />
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
          <p className="text-slate-600 mb-4">
            The property you are looking for does not exist.
          </p>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            RealEstate
          </Link>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to listings
          </Link>
        </div>
      </nav>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="rounded-lg overflow-hidden bg-white shadow-sm">
              <div className="relative h-96 bg-slate-200 overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {property.images.length > 1 && (
                <div className="p-4 grid grid-cols-4 gap-2">
                  {property.images.slice(1).map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`${property.title} ${idx + 2}`}
                      className="h-20 w-full object-cover rounded cursor-pointer hover:opacity-75"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {property.title}
                </h1>
                <p className="text-slate-600">{property.location}</p>
              </div>

              <p className="text-3xl font-bold text-blue-600">
                {formatPrice(property.price)}
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge>{getPropertyTypeLabel(property.property_type)}</Badge>
                <Badge variant="secondary">{property.status}</Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-4">
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {property.bedrooms}
                  </p>
                  <p className="text-sm text-slate-600">Bedrooms</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {property.bathrooms}
                  </p>
                  <p className="text-sm text-slate-600">Bathrooms</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatArea(property.area)}
                  </p>
                  <p className="text-sm text-slate-600">sq ft</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h2 className="text-xl font-semibold text-slate-900 mb-3">
                  Description
                </h2>
                <p className="text-slate-600 leading-relaxed">
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
    </div>
  );
}
