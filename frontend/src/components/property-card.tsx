"use client";

import React from "react";
import Link from "next/link";
import { Property } from "@/lib/types";
import { formatPrice, formatArea, getPropertyTypeLabel, getStatusColor } from "@/lib/utils";
import { Heart, MapPin, Bath, Bed, Ruler } from "lucide-react";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const mainImage = property.images[0] || "https://via.placeholder.com/400x300";

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="group bg-white rounded-xl overflow-hidden border border-slate-200/50 hover:border-orange-500/30 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-slate-100">
          <img
            src={mainImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Status Badge */}
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
            property.status === 'AVAILABLE' 
              ? 'bg-green-500'
              : property.status === 'SOLD'
              ? 'bg-red-500'
              : 'bg-orange-500'
          }`}>
            {property.status.replace(/_/g, " ")}
          </div>

          {/* Heart Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-all"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-slate-400 hover:text-red-500"
              }`}
            />
          </button>

          {/* Price Tag */}
          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg font-bold">
            {formatPrice(property.price)}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Title */}
          <h3 className="font-bold text-lg text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 mt-2 text-slate-600 text-sm">
            <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </div>

          {/* Type Badge */}
          <div className="mt-3">
            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
              {getPropertyTypeLabel(property.type)}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200/50 my-4" />

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-3 mt-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-slate-700 font-semibold">
                <Bed className="w-4 h-4 text-orange-500" />
                {property.bedrooms}
              </div>
              <p className="text-xs text-slate-500 mt-1">Beds</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-slate-700 font-semibold">
                <Bath className="w-4 h-4 text-orange-500" />
                {property.bathrooms}
              </div>
              <p className="text-xs text-slate-500 mt-1">Baths</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-slate-700 font-semibold">
                <Ruler className="w-4 h-4 text-orange-500" />
                {property.squareFeet}
              </div>
              <p className="text-xs text-slate-500 mt-1">Sqft</p>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-900">
                  {property.bedrooms}
                </p>
                <p className="text-xs text-slate-500">Beds</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-900">
                  {property.bathrooms}
                </p>
                <p className="text-xs text-slate-500">Baths</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-900">
                  {formatArea(property.area)}
                </p>
                <p className="text-xs text-slate-500">sqft</p>
              </div>
            </div>

            <p className="pt-2 text-xs text-slate-500">
              {getPropertyTypeLabel(property.property_type)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
