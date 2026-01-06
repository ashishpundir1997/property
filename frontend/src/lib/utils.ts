import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatArea = (area: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(area);
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

export const getPropertyTypeLabel = (type: string): string => {
  const labels: { [key: string]: string } = {
    APARTMENT: "Apartment",
    HOUSE: "House",
    VILLA: "Villa",
    LAND: "Land",
    COMMERCIAL: "Commercial",
  };
  return labels[type] || type;
};

export const getStatusLabel = (status: string): string => {
  const labels: { [key: string]: string } = {
    AVAILABLE: "Available",
    SOLD: "Sold",
    UNDER_CONTRACT: "Under Contract",
    NEW: "New",
    CONTACTED: "Contacted",
    CLOSED: "Closed",
  };
  return labels[status] || status;
};

export const getStatusColor = (
  status: string
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "AVAILABLE":
    case "NEW":
      return "default";
    case "UNDER_CONTRACT":
    case "CONTACTED":
      return "secondary";
    case "SOLD":
    case "CLOSED":
      return "destructive";
    default:
      return "outline";
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};
