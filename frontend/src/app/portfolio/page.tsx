"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useProjects } from "@/hooks";
import { formatDate } from "@/lib/utils";
import { ArrowUpRight, Loader, MapPin } from "lucide-react";

export default function Portfolio() {
  const [page, setPage] = React.useState(1);
  const { data: response, isLoading, error } = useProjects(page, 12);

  const projects = response?.items || [];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Completed Projects
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Discover our portfolio of expertly executed real estate and construction projects across diverse locations and styles.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-14 sm:py-18 md:py-24 flex-1">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-5 sm:p-6 text-red-700 mb-10 text-center text-sm sm:text-base">
              <p className="font-medium">Failed to load projects. Please try again later.</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-16 sm:py-24">
              <div className="text-center">
                <Loader className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 animate-spin mx-auto mb-4" />
                <p className="text-slate-600 text-sm sm:text-base">Loading projects...</p>
              </div>
            </div>
          ) : projects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                {projects.map((project: any) => (
                  <div
                    key={project.id}
                    className="group overflow-hidden rounded-xl border border-slate-200 bg-white hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
                  >
                    {/* Project Image */}
                    <div className="relative h-56 sm:h-64 md:h-80 overflow-hidden bg-slate-100">
                      <img
                        src={project.images[0] || "https://via.placeholder.com/400x300"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* View Details Button */}
                      <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <ArrowUpRight className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600" />
                        </div>
                      </button>
                    </div>

                    {/* Project Info */}
                    <div className="p-6 sm:p-7 lg:p-8">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors mb-4">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 mb-4 line-clamp-1 flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        {project.location}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Dates */}
                      <div className="space-y-3.5 text-xs sm:text-sm text-slate-500 border-t border-slate-200 pt-6">
                        <div className="flex justify-between items-center">
                          <span>Started:</span>
                          <span className="font-semibold text-slate-900">
                            {formatDate(project.start_date)}
                          </span>
                        </div>
                        {project.end_date && (
                          <div className="flex justify-between items-center">
                            <span>Completed:</span>
                            <span className="font-semibold text-slate-900">
                              {formatDate(project.end_date)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {response && response.total > 12 && (
                <div className="mt-12 sm:mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 sm:px-5 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
                  >
                    Previous
                  </button>

                  <div className="flex gap-1.5 sm:gap-2">
                    {Array.from(
                      { length: Math.ceil(response.total / 12) },
                      (_, i) => i + 1
                    )
                      .filter((p) => Math.abs(p - page) <= 2 || p === 1 || p === Math.ceil(response.total / 12))
                      .map((p, i, arr) => (
                        <React.Fragment key={p}>
                          {i > 0 && arr[i - 1] !== p - 1 && (
                            <span className="text-slate-500 text-sm px-1">...</span>
                          )}
                          <button
                            onClick={() => setPage(p)}
                            className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                              page === p
                                ? "bg-orange-500 text-white"
                                : "border border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            {p}
                          </button>
                        </React.Fragment>
                      ))}
                  </div>

                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= Math.ceil(response.total / 12)}
                    className="px-4 sm:px-5 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 sm:py-24">
              <p className="text-slate-600 text-base sm:text-lg">No projects found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
