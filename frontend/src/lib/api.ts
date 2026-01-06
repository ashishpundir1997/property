import axios, { AxiosInstance, AxiosError } from "axios";
import {
  Property,
  PropertyCreate,
  PropertyStatus,
  PropertyType,
  Inquiry,
  InquiryCreate,
  Project,
  ProjectCreate,
  PaginatedResponse,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API] Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API] Response: ${response.status}`);
    return response;
  },
  (error: AxiosError) => {
    console.error("[API] Response error:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// Properties API
export const propertiesAPI = {
  list: async (
    page: number = 1,
    limit: number = 12,
    filters?: {
      location?: string;
      min_price?: number;
      max_price?: number;
      bedrooms?: number;
      property_type?: PropertyType;
      status?: PropertyStatus;
    }
  ) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(filters?.location && { location: filters.location }),
      ...(filters?.min_price !== undefined && {
        min_price: String(filters.min_price),
      }),
      ...(filters?.max_price !== undefined && {
        max_price: String(filters.max_price),
      }),
      ...(filters?.bedrooms !== undefined && {
        bedrooms: String(filters.bedrooms),
      }),
      ...(filters?.property_type && {
        property_type: filters.property_type,
      }),
      ...(filters?.status && { status: filters.status }),
    });

    const response = await apiClient.get<PaginatedResponse<Property>>(
      `/api/properties?${params}`
    );
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<Property>(`/api/properties/${id}`);
    return response.data;
  },

  create: async (property: PropertyCreate) => {
    const response = await apiClient.post<Property>(
      "/api/properties",
      property
    );
    return response.data;
  },

  update: async (id: number, property: Partial<PropertyCreate>) => {
    const response = await apiClient.put<Property>(
      `/api/properties/${id}`,
      property
    );
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/api/properties/${id}`);
    return response.data;
  },
};

// Inquiries API
export const inquiriesAPI = {
  list: async (
    page: number = 1,
    limit: number = 20,
    filters?: {
      status?: string;
      property_id?: number;
    }
  ) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.property_id !== undefined && {
        property_id: String(filters.property_id),
      }),
    });

    const response = await apiClient.get<PaginatedResponse<Inquiry>>(
      `/api/inquiries?${params}`
    );
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<Inquiry>(`/api/inquiries/${id}`);
    return response.data;
  },

  create: async (inquiry: InquiryCreate) => {
    const response = await apiClient.post<Inquiry>("/api/inquiries", inquiry);
    return response.data;
  },

  update: async (id: number, inquiry: Partial<Inquiry>) => {
    const response = await apiClient.put<Inquiry>(
      `/api/inquiries/${id}`,
      inquiry
    );
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/api/inquiries/${id}`);
    return response.data;
  },
};

// Projects API
export const projectsAPI = {
  list: async (page: number = 1, limit: number = 10) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    const response = await apiClient.get<PaginatedResponse<Project>>(
      `/api/projects?${params}`
    );
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<Project>(`/api/projects/${id}`);
    return response.data;
  },

  create: async (project: ProjectCreate) => {
    const response = await apiClient.post<Project>("/api/projects", project);
    return response.data;
  },

  update: async (id: number, project: Partial<ProjectCreate>) => {
    const response = await apiClient.put<Project>(`/api/projects/${id}`, project);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/api/projects/${id}`);
    return response.data;
  },
};

export default apiClient;
