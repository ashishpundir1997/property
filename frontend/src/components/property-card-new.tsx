"use client";

import React from "react";
import Link from "next/link";
import { Property } from "@/lib/types";
import { formatPrice, formatArea, getPropertyTypeLabel } from "@/lib/utils";
import { Heart, MapPin, Bath, Bed, Ruler } from "lucide-react";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCardNew({ property }: PropertyCardProps) {
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
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
              property.status === "AVAILABLE"
                ? "bg-green-500"
                : property.status === "SOLD"
                ? "bg-red-500"
                : "bg-orange-500"
            }`}
          >
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
        <div className="p-6 sm:p-7 flex flex-col flex-1 px-[20px]" style={{padding:"20px"}}>
          {/* Title */}
          <h3 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors leading-snug mb-3.5">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 mb-4 text-slate-600 text-xs sm:text-sm">
            <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </div>

          {/* Type Badge */}
          <div className="mb-5">
            <span className="inline-block px-3.5 py-2 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
              {getPropertyTypeLabel(property.property_type)}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 my-5 sm:my-6" />

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-4 sm:gap-5 mt-auto pt-3">
            <div className="text-center">
              <div className="flex flex-col items-center justify-center mb-2.5">
                <Bed className="w-5 h-5 text-orange-500 mb-1.5" />
                <span className="text-slate-900 font-bold text-base sm:text-lg">{property.bedrooms}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Beds</p>
            </div>
            <div className="text-center">
              <div className="flex flex-col items-center justify-center mb-2.5">
                <Bath className="w-5 h-5 text-orange-500 mb-1.5" />
                <span className="text-slate-900 font-bold text-base sm:text-lg">{property.bathrooms}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Baths</p>
            </div>
            <div className="text-center">
              <div className="flex flex-col items-center justify-center mb-2.5">
                <Ruler className="w-5 h-5 text-orange-500 mb-1.5" />
                <span className="text-slate-900 font-bold text-base sm:text-lg">{formatArea(property.area)}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Sqft</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
