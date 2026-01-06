"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PropertyType, PropertyStatus } from "@/lib/types";

interface PropertyFiltersProps {
  onFilterChange: (filters: {
    location?: string;
    min_price?: number;
    max_price?: number;
    bedrooms?: number;
    property_type?: PropertyType;
    status?: PropertyStatus;
  }) => void;
}

export function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [location, setLocation] = React.useState("");
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");
  const [bedrooms, setBedrooms] = React.useState("");
  const [propertyType, setPropertyType] = React.useState("");
  const [status, setStatus] = React.useState("");

  const applyFilters = () => {
    onFilterChange({
      location: location || undefined,
      min_price: minPrice ? Number(minPrice) : undefined,
      max_price: maxPrice ? Number(maxPrice) : undefined,
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      property_type: propertyType ? (propertyType as PropertyType) : undefined,
      status: status ? (status as PropertyStatus) : undefined,
    });
  };

  const clearFilters = () => {
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setPropertyType("");
    setStatus("");
    onFilterChange({});
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm border border-slate-200">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="City or area..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Min Price
          </label>
          <input
            type="number"
            placeholder="Minimum price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            placeholder="Maximum price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Bedrooms
          </label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}+
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Type
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="APARTMENT">Apartment</option>
            <option value="HOUSE">House</option>
            <option value="VILLA">Villa</option>
            <option value="LAND">Land</option>
            <option value="COMMERCIAL">Commercial</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="AVAILABLE">Available</option>
            <option value="SOLD">Sold</option>
            <option value="UNDER_CONTRACT">Under Contract</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex gap-2 justify-end">
        <Button variant="outline" onClick={clearFilters}>
          Clear Filters
        </Button>
        <Button onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
