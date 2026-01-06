"use client";

import React, { useState } from "react";
import { useProperties } from "@/hooks";
import { PropertyCardNew } from "@/components/property-card-new";
import { ChevronDown, Filter, Search } from "lucide-react";

export function PropertyListingNew() {
  const { data: propertiesData, isLoading, error } = useProperties();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 12;
  const properties = propertiesData?.items || [];

  // Filter properties
  const filtered = properties.filter((p: any) => {
    const matchType = selectedType === "ALL" || p.property_type === selectedType;
    const matchStatus = selectedStatus === "ALL" || p.status === selectedStatus;
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchType && matchStatus && matchPrice && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedProperties = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-slate-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700">Failed to load properties. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Filters Section */}
      <div className="bg-white rounded-xl p-5 sm:p-6 md:p-7 border border-slate-200/50 flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-5 sm:mb-6">
          <Filter className="w-5 h-5 text-orange-500" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Filters</h3>
        </div>

        {/* Search */}
        <div className="mb-5 sm:mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by location or title..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Property Type */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2.5">
              Property Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 sm:px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer text-sm sm:text-base bg-white"
            >
              <option value="ALL">All Types</option>
              <option value="APARTMENT">Apartment</option>
              <option value="HOUSE">House</option>
              <option value="VILLA">Villa</option>
              <option value="LAND">Land</option>
              <option value="COMMERCIAL">Commercial</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2.5">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 sm:px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer text-sm sm:text-base bg-white"
            >
              <option value="ALL">All Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="SOLD">Sold</option>
              <option value="UNDER_CONTRACT">Under Contract</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="sm:col-span-2 lg:col-span-2">
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2.5">
              Price Range: ${(priceRange[0] / 1000).toFixed(0)}K - ${(priceRange[1] / 1000).toFixed(0)}K
            </label>
            <input
              type="range"
              min="0"
              max="2000000"
              step="50000"
              value={priceRange[1]}
              onChange={(e) => {
                setPriceRange([priceRange[0], parseInt(e.target.value)]);
                setCurrentPage(1);
              }}
              className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-5 sm:mt-6 text-xs sm:text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900">{filtered.length}</span> properties
        </div>
      </div>

      {/* Properties Grid */}
      {paginatedProperties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
            {paginatedProperties.map((property: any) => (
              <PropertyCardNew key={property.id} property={property} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10 sm:mt-12 md:mt-14">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 sm:px-5 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
            >
              Previous
            </button>

            <div className="flex gap-1.5 sm:gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) => Math.abs(p - currentPage) <= 2 || p === 1 || p === totalPages
                )
                .map((page, i, arr) => (
                  <React.Fragment key={page}>
                    {i > 0 && arr[i - 1] !== page - 1 && (
                      <span className="text-slate-500 text-sm px-1">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                        currentPage === page
                          ? "bg-orange-500 text-white"
                          : "border border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 sm:px-5 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-600 text-base sm:text-lg">
            No properties found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
