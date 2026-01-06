"use client";

import React from "react";
import { useProperties } from "@/hooks";
import { PropertyCard } from "./property-card";
import { PropertyFilters } from "./property-filters";
import { Pagination } from "./pagination";
import { PropertyType, PropertyStatus } from "@/lib/types";

export function PropertyListing() {
  const [page, setPage] = React.useState(1);
  const [filters, setFilters] = React.useState<{
    location?: string;
    min_price?: number;
    max_price?: number;
    bedrooms?: number;
    property_type?: PropertyType;
    status?: PropertyStatus;
  }>({});

  const { data: response, isLoading, error } = useProperties(page, 12, filters);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <PropertyFilters onFilterChange={handleFilterChange} />

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">
          <p className="font-medium">Error loading properties</p>
          <p className="text-sm">{(error as any).message}</p>
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="skeleton h-80 rounded-lg"
            />
          ))}
        </div>
      ) : response?.items && response.items.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {response.items.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {response.total > 12 && (
            <Pagination
              page={page}
              pageSize={12}
              total={response.total}
              onPageChange={setPage}
            />
          )}
        </>
      ) : (
        <div className="rounded-lg bg-slate-50 p-12 text-center">
          <p className="text-slate-600">No properties found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
