// Mock data service for development/testing without API
import { Property, Inquiry, Project, PaginatedResponse } from "./types";

export const mockProperties: Property[] = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    description:
      "Stunning 2-bedroom apartment with floor-to-ceiling windows overlooking the city skyline. Featuring hardwood floors, updated kitchen, and in-unit laundry.",
    price: 450000,
    location: "Downtown",
    property_type: "APARTMENT",
    status: "AVAILABLE",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    ],
    created_at: "2025-12-01T10:00:00",
  },
  {
    id: 2,
    title: "Spacious Family House",
    description:
      "Beautiful 4-bedroom, 3-bathroom house with a large backyard, perfect for families. Features a modern kitchen, master suite with ensuite, and attached garage.",
    price: 750000,
    location: "Suburbs",
    property_type: "HOUSE",
    status: "AVAILABLE",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=800",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    ],
    created_at: "2025-11-15T14:30:00",
  },
  {
    id: 3,
    title: "Luxury Beachfront Villa",
    description:
      "Exquisite 5-bedroom villa with private beach access, infinity pool, and Mediterranean architecture. Includes home theater, wine cellar, and spa facilities.",
    price: 2000000,
    location: "Beachfront",
    property_type: "VILLA",
    status: "AVAILABLE",
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9b274b3d0303?w=800",
      "https://images.unsplash.com/photo-1613490900233-141b84ecb203?w=800",
      "https://images.unsplash.com/photo-1416427891411-f3b2143b8525?w=800",
    ],
    created_at: "2025-10-20T09:15:00",
  },
  {
    id: 4,
    title: "Cozy Studio Apartment",
    description:
      "Perfect starter property or investment. Open floor plan, updated appliances, and excellent natural lighting.",
    price: 280000,
    location: "Midtown",
    property_type: "APARTMENT",
    status: "AVAILABLE",
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    images: [
      "https://images.unsplash.com/photo-1540932239986-310128078ceb?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    ],
    created_at: "2025-11-25T11:45:00",
  },
  {
    id: 5,
    title: "Executive Penthouse",
    description:
      "High-rise living at its finest. 3 bedrooms, 2.5 baths, smart home automation, and 360-degree city views.",
    price: 1200000,
    location: "Downtown",
    property_type: "APARTMENT",
    status: "AVAILABLE",
    bedrooms: 3,
    bathrooms: 2,
    area: 2000,
    images: [
      "https://images.unsplash.com/photo-1504672281656-e4981800dca0?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    created_at: "2025-11-10T14:20:00",
  },
  {
    id: 6,
    title: "Charming Victorian Home",
    description:
      "Historic 3-bedroom Victorian with original hardwood floors, high ceilings, and recently updated electrical and plumbing.",
    price: 550000,
    location: "Historic District",
    property_type: "HOUSE",
    status: "AVAILABLE",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=800",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    ],
    created_at: "2025-11-05T08:30:00",
  },
  {
    id: 7,
    title: "Modern Minimalist Loft",
    description:
      "Industrial-chic 2-bedroom loft with exposed brick, soaring ceilings, and floor-to-ceiling windows. Pet-friendly building.",
    price: 620000,
    location: "Arts District",
    property_type: "APARTMENT",
    status: "AVAILABLE",
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    ],
    created_at: "2025-12-01T13:10:00",
  },
  {
    id: 8,
    title: "Waterfront Cottage",
    description:
      "Peaceful 2-bedroom cottage on the water with private dock, boat house, and beautiful sunset views.",
    price: 680000,
    location: "Waterfront",
    property_type: "HOUSE",
    status: "AVAILABLE",
    bedrooms: 2,
    bathrooms: 2,
    area: 1600,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=800",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    ],
    created_at: "2025-10-28T16:45:00",
  },
  {
    id: 9,
    title: "Luxury Mountain Retreat",
    description:
      "Exclusive 6-bedroom mountain villa with panoramic views, heated pool, and direct ski access.",
    price: 3500000,
    location: "Mountain Ridge",
    property_type: "VILLA",
    status: "SOLD",
    bedrooms: 6,
    bathrooms: 5,
    area: 5500,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9b274b3d0303?w=800",
      "https://images.unsplash.com/photo-1613490900233-141b84ecb203?w=800",
    ],
    created_at: "2025-09-15T10:00:00",
  },
  {
    id: 10,
    title: "Contemporary Garden House",
    description:
      "Sleek 4-bedroom modern home with smart home features, solar panels, and beautiful landscaped garden.",
    price: 890000,
    location: "Suburbs",
    property_type: "HOUSE",
    status: "AVAILABLE",
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=800",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    ],
    created_at: "2025-11-20T09:30:00",
  },
  {
    id: 11,
    title: "Oceanfront Resort Condo",
    description:
      "3-bedroom resort condo with direct beach access, resort amenities, and perfect for vacation rental income.",
    price: 925000,
    location: "Resort Area",
    property_type: "APARTMENT",
    status: "AVAILABLE",
    bedrooms: 3,
    bathrooms: 2,
    area: 1900,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    ],
    created_at: "2025-11-18T11:00:00",
  },
  {
    id: 12,
    title: "Urban Townhouse",
    description:
      "Modern 3-level townhouse in prime urban location. Rooftop deck, garage, and walking distance to shops and restaurants.",
    price: 795000,
    location: "Downtown",
    property_type: "HOUSE",
    status: "AVAILABLE",
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=800",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    ],
    created_at: "2025-12-02T15:30:00",
  },
];

export const mockInquiries: Inquiry[] = [
  {
    id: 1,
    property_id: 1,
    customer_name: "John Smith",
    email: "john@example.com",
    phone: "555-0101",
    message: "Very interested in this property. Would like to schedule a viewing.",
    status: "NEW",
    created_at: "2025-12-02T10:30:00",
  },
  {
    id: 2,
    property_id: 2,
    customer_name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "555-0102",
    message: "Looking for a family home. This seems perfect!",
    status: "CONTACTED",
    created_at: "2025-12-01T14:15:00",
  },
];

export const mockProjects: Project[] = [
  {
    id: 1,
    title: "Downtown Plaza Redevelopment",
    description: "A major urban redevelopment project transforming downtown with mixed-use spaces.",
    location: "Downtown",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    ],
    start_date: "2025-01-01",
    end_date: "2026-12-31",
    created_at: "2025-01-15T09:00:00",
  },
  {
    id: 2,
    title: "Suburban Community Complex",
    description: "New suburban community with residential and commercial spaces.",
    location: "Suburbs",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
    ],
    start_date: "2025-06-01",
    end_date: "2027-06-30",
    created_at: "2025-03-20T10:30:00",
  },
];

// Mock API responses
export const getMockProperties = async (
  page: number = 1,
  limit: number = 12
): Promise<PaginatedResponse<Property>> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const start = (page - 1) * limit;
  const end = start + limit;
  const items = mockProperties.slice(start, end);

  return {
    items,
    total: mockProperties.length,
    page,
    limit,
  };
};

export const getMockPropertyById = async (id: number): Promise<Property> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const property = mockProperties.find((p) => p.id === id);
  if (!property) {
    throw new Error(`Property with id ${id} not found`);
  }
  return property;
};

export const getMockInquiries = async (
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResponse<Inquiry>> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const start = (page - 1) * limit;
  const end = start + limit;
  const items = mockInquiries.slice(start, end);

  return {
    items,
    total: mockInquiries.length,
    page,
    limit,
  };
};

export const getMockProjects = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Project>> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const start = (page - 1) * limit;
  const end = start + limit;
  const items = mockProjects.slice(start, end);

  return {
    items,
    total: mockProjects.length,
    page,
    limit,
  };
};
