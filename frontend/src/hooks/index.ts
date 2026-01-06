import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  propertiesAPI,
  inquiriesAPI,
  projectsAPI,
} from "@/lib/api";
import {
  Property,
  PropertyCreate,
  PropertyStatus,
  PropertyType,
  Inquiry,
  InquiryCreate,
  Project,
  ProjectCreate,
} from "@/lib/types";

// Properties Hooks
export const useProperties = (
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
  return useQuery({
    queryKey: ["properties", page, limit, filters],
    queryFn: () => propertiesAPI.list(page, limit, filters),
  });
};

export const useProperty = (id: number) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => propertiesAPI.getById(id),
    enabled: !!id,
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (property: PropertyCreate) =>
      propertiesAPI.create(property),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, property }: { id: number; property: Partial<PropertyCreate> }) =>
      propertiesAPI.update(id, property),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      queryClient.invalidateQueries({ queryKey: ["property", data.id] });
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => propertiesAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};

// Inquiries Hooks
export const useInquiries = (
  page: number = 1,
  limit: number = 20,
  filters?: {
    status?: string;
    property_id?: number;
  }
) => {
  return useQuery({
    queryKey: ["inquiries", page, limit, filters],
    queryFn: () => inquiriesAPI.list(page, limit, filters),
  });
};

export const useInquiry = (id: number) => {
  return useQuery({
    queryKey: ["inquiry", id],
    queryFn: () => inquiriesAPI.getById(id),
    enabled: !!id,
  });
};

export const useCreateInquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (inquiry: InquiryCreate) =>
      inquiriesAPI.create(inquiry),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
};

export const useUpdateInquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, inquiry }: { id: number; inquiry: Partial<Inquiry> }) =>
      inquiriesAPI.update(id, inquiry),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["inquiry", data.id] });
    },
  });
};

export const useDeleteInquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => inquiriesAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
};

// Projects Hooks
export const useProjects = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["projects", page, limit],
    queryFn: () => projectsAPI.list(page, limit),
  });
};

export const useProject = (id: number) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => projectsAPI.getById(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: ProjectCreate) =>
      projectsAPI.create(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, project }: { id: number; project: Partial<ProjectCreate> }) =>
      projectsAPI.update(id, project),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", data.id] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => projectsAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
