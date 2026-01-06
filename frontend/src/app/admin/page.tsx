"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import {
  useProperties,
  useInquiries,
  useProjects,
  useDeleteProperty,
  useDeleteInquiry,
  useDeleteProject,
  useUpdateInquiry,
} from "@/hooks";
import { formatPrice, formatDate, getStatusColor } from "@/lib/utils";
import {
  Building2,
  MessageSquare,
  FolderOpen,
  Trash2,
  Check,
  X,
  Loader,
} from "lucide-react";

type TabType = "properties" | "inquiries" | "projects";

export default function Admin() {
  const [activeTab, setActiveTab] = React.useState<TabType>("properties");
  const [page, setPage] = React.useState(1);

  // Queries
  const propertiesQuery = useProperties(page, 10);
  const inquiriesQuery = useInquiries(page, 10);
  const projectsQuery = useProjects(page, 10);

  // Mutations
  const deletePropertyMutation = useDeleteProperty();
  const deleteInquiryMutation = useDeleteInquiry();
  const deleteProjectMutation = useDeleteProject();
  const updateInquiryMutation = useUpdateInquiry();

  const handleDeleteProperty = (id: number) => {
    if (confirm("Are you sure you want to delete this property?")) {
      deletePropertyMutation.mutate(id);
    }
  };

  const handleDeleteInquiry = (id: number) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      deleteInquiryMutation.mutate(id);
    }
  };

  const handleDeleteProject = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProjectMutation.mutate(id);
    }
  };

  const handleUpdateInquiryStatus = (id: number, status: string) => {
    updateInquiryMutation.mutate({
      id,
      inquiry: { status: status as any },
    });
  };

  const properties = propertiesQuery.data?.items || [];
  const inquiries = inquiriesQuery.data?.items || [];
  const projects = projectsQuery.data?.items || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-slate-300">Manage properties, inquiries, and projects</p>
        </div>
      </section>

      {/* Admin Content */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 border-b border-slate-200/50">
            <button
              onClick={() => {
                setActiveTab("properties");
                setPage(1);
              }}
              className={`px-6 py-3 font-semibold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "properties"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building2 className="w-5 h-5" />
              Properties ({propertiesQuery.data?.total || 0})
            </button>
            <button
              onClick={() => {
                setActiveTab("inquiries");
                setPage(1);
              }}
              className={`px-6 py-3 font-semibold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "inquiries"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              Inquiries ({inquiriesQuery.data?.total || 0})
            </button>
            <button
              onClick={() => {
                setActiveTab("projects");
                setPage(1);
              }}
              className={`px-6 py-3 font-semibold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "projects"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <FolderOpen className="w-5 h-5" />
              Projects ({projectsQuery.data?.total || 0})
            </button>
          </div>

          {/* Properties Tab */}
          {activeTab === "properties" && (
            <div className="space-y-6">
              {propertiesQuery.isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="w-8 h-8 text-orange-500 animate-spin" />
                </div>
              ) : properties.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200/50 bg-slate-50">
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                            Location
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.map((property: any) => (
                          <tr
                            key={property.id}
                            className="border-b border-slate-200/50 hover:bg-slate-50 transition-colors"
                          >
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 line-clamp-1">
                              {property.title}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">
                              {property.location}
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold text-orange-600">
                              {formatPrice(property.price)}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                {property.property_type}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  property.status === "AVAILABLE"
                                    ? "bg-green-100 text-green-700"
                                    : property.status === "SOLD"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                {property.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <button
                                onClick={() => handleDeleteProperty(property.id)}
                                disabled={deletePropertyMutation.isPending}
                                className="text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {propertiesQuery.data && propertiesQuery.data.total > 10 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
                      >
                        Previous
                      </button>
                      <span className="text-slate-600">
                        Page {page} of{" "}
                        {Math.ceil(propertiesQuery.data.total / 10)}
                      </span>
                      <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page >= Math.ceil(propertiesQuery.data.total / 10)}
                        className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-600">No properties found.</p>
                </div>
              )}
            </div>
          )}

          {/* Inquiries Tab */}
          {activeTab === "inquiries" && (
            <div className="space-y-6">
              {inquiriesQuery.isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="w-8 h-8 text-orange-500 animate-spin" />
                </div>
              ) : inquiries.length > 0 ? (
                <>
                  <div className="grid gap-6">
                    {inquiries.map((inquiry: any) => (
                      <div
                        key={inquiry.id}
                        className="border border-slate-200/50 rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">
                              {inquiry.customer_name}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {inquiry.email} • {inquiry.phone}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              inquiry.status === "NEW"
                                ? "bg-blue-100 text-blue-700"
                                : inquiry.status === "CONTACTED"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {inquiry.status}
                          </span>
                        </div>

                        <p className="text-slate-700 mb-4 p-3 bg-slate-50 rounded-lg">
                          {inquiry.message}
                        </p>

                        <p className="text-xs text-slate-500 mb-4">
                          Property ID: {inquiry.property_id} • Created:{" "}
                          {formatDate(inquiry.created_at)}
                        </p>

                        <div className="flex gap-2">
                          {inquiry.status !== "CONTACTED" && (
                            <button
                              onClick={() =>
                                handleUpdateInquiryStatus(
                                  inquiry.id,
                                  "CONTACTED"
                                )
                              }
                              disabled={updateInquiryMutation.isPending}
                              className="px-3 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                              <Check className="w-4 h-4" />
                              Mark Contacted
                            </button>
                          )}
                          {inquiry.status !== "CLOSED" && (
                            <button
                              onClick={() =>
                                handleUpdateInquiryStatus(inquiry.id, "CLOSED")
                              }
                              disabled={updateInquiryMutation.isPending}
                              className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                              <Check className="w-4 h-4" />
                              Mark Closed
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteInquiry(inquiry.id)}
                            disabled={deleteInquiryMutation.isPending}
                            className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {inquiriesQuery.data && inquiriesQuery.data.total > 10 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
                      >
                        Previous
                      </button>
                      <span className="text-slate-600">
                        Page {page} of{" "}
                        {Math.ceil(inquiriesQuery.data.total / 10)}
                      </span>
                      <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page >= Math.ceil(inquiriesQuery.data.total / 10)}
                        className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-600">No inquiries found.</p>
                </div>
              )}
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              {projectsQuery.isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="w-8 h-8 text-orange-500 animate-spin" />
                </div>
              ) : projects.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project: any) => (
                      <div
                        key={project.id}
                        className="border border-slate-200/50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="h-48 bg-slate-200 overflow-hidden">
                          <img
                            src={
                              project.images[0] ||
                              "https://via.placeholder.com/400x300"
                            }
                            alt={project.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-slate-900 mb-2">
                            {project.title}
                          </h3>
                          <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                            <div>
                              <p className="text-slate-500">Location</p>
                              <p className="font-medium text-slate-900">
                                {project.location}
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-500">Completed</p>
                              <p className="font-medium text-slate-900">
                                {project.end_date
                                  ? formatDate(project.end_date)
                                  : "Ongoing"}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            disabled={deleteProjectMutation.isPending}
                            className="w-full px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Project
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {projectsQuery.data && projectsQuery.data.total > 10 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
                      >
                        Previous
                      </button>
                      <span className="text-slate-600">
                        Page {page} of{" "}
                        {Math.ceil(projectsQuery.data.total / 10)}
                      </span>
                      <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page >= Math.ceil(projectsQuery.data.total / 10)}
                        className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-600">No projects found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-slate-400">
            <p>&copy; 2024 PropertyCo Admin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
