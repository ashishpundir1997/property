// Property Types
export type PropertyType = "APARTMENT" | "HOUSE" | "VILLA" | "LAND" | "COMMERCIAL";
export type PropertyStatus = "AVAILABLE" | "SOLD" | "UNDER_CONTRACT";

export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  property_type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  created_at: string;
}

export interface PropertyCreate {
  title: string;
  description: string;
  price: number;
  location: string;
  property_type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
}

// Inquiry Types
export type InquiryStatus = "NEW" | "CONTACTED" | "CLOSED";

export interface Inquiry {
  id: number;
  property_id: number;
  customer_name: string;
  email: string;
  phone: string;
  message: string;
  status: InquiryStatus;
  created_at: string;
}

export interface InquiryCreate {
  property_id: number;
  customer_name: string;
  email: string;
  phone: string;
  message: string;
}

// Project Types
export interface Project {
  id: number;
  title: string;
  description: string;
  location: string;
  images: string[];
  start_date: string;
  end_date: string | null;
  created_at: string;
}

export interface ProjectCreate {
  title: string;
  description: string;
  location: string;
  images: string[];
  start_date: string;
  end_date?: string | null;
}

// Pagination
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

// API Response
export interface ApiError {
  detail: string | { [key: string]: string[] };
}
