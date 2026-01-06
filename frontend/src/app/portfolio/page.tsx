"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { useProjects } from "@/hooks";
import { formatDate } from "@/lib/utils";
import { ArrowUpRight, Loader } from "lucide-react";

export default function Portfolio() {
  const [page, setPage] = React.useState(1);
  const { data: response, isLoading, error } = useProjects(page, 12);

  const projects = response?.items || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Completed Projects
              </span>
            </h1>
            <p className="text-xl text-slate-600">
              Discover our portfolio of expertly executed real estate and construction projects across diverse locations and styles.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-6 text-red-700 mb-8 text-center">
              <p className="font-medium">Failed to load projects. Please try again later.</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
                <p className="text-slate-600">Loading projects...</p>
              </div>
            </div>
          ) : projects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project: any) => (
                  <div
                    key={project.id}
                    className="group overflow-hidden rounded-xl border border-slate-200/50 hover:border-orange-500/30 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
                  >
                    {/* Project Image */}
                    <div className="relative h-80 overflow-hidden bg-slate-100">
                      <img
                        src={project.images[0] || "https://via.placeholder.com/400x300"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* View Details Button */}
                      <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <ArrowUpRight className="w-7 h-7 text-orange-600" />
                        </div>
                      </button>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors mb-2">
                        {project.title}
                      </h3>

                      <p className="text-sm text-slate-600 mb-3 line-clamp-1">
                        📍 {project.location}
                      </p>

                      <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Dates */}
                      <div className="space-y-2 text-sm text-slate-500 border-t border-slate-200 pt-4">
                        <div className="flex justify-between">
                          <span>Started:</span>
                          <span className="font-medium text-slate-900">
                            {formatDate(project.start_date)}
                          </span>
                        </div>
                        {project.end_date && (
                          <div className="flex justify-between">
                            <span>Completed:</span>
                            <span className="font-medium text-slate-900">
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
                <div className="mt-16 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  <div className="flex gap-2">
                    {Array.from(
                      { length: Math.ceil(response.total / 12) },
                      (_, i) => i + 1
                    )
                      .filter((p) => Math.abs(p - page) <= 2 || p === 1 || p === Math.ceil(response.total / 12))
                      .map((p, i, arr) => (
                        <React.Fragment key={p}>
                          {i > 0 && arr[i - 1] !== p - 1 && (
                            <span className="text-slate-500">...</span>
                          )}
                          <button
                            onClick={() => setPage(p)}
                            className={`px-3 py-2 rounded-lg font-medium transition-colors ${
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
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-600 text-lg">No projects found.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Interested in a similar project?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Contact our expert team to discuss your property project. We bring visions to reality.
          </p>
          <button className="px-10 py-4 bg-white text-orange-600 rounded-lg font-bold hover:bg-orange-50 transition-all hover:scale-105 inline-block">
            Get in Touch
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-slate-400">
            <p>&copy; 2024 PropertyCo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
