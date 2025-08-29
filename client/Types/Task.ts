// Task-related type definitions

export interface TaskFormData {
  category: string;
  subcategory: string;
  title: string;
  description: string;
  budget: string;
  timeline: string;
  budgetType: "fixed" | "hourly";
  budgetAmount: number;
  deadline: string;
  skills: string[];
  languages: string[];
  remoteOk: boolean;
  requiresInvoice: boolean;
  priority: "normal" | "high" | "urgent" | "critical";
  attachments?: File[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  budget: number;
  timeline: string;
  status: "open" | "in_progress" | "completed" | "cancelled";
  skills: string[];
  languages: string[];
  category: string;
  subcategory?: string;
  postedAt: string;
  proposalCount: number;
  clientId: string;
  clientName: string;
}

export interface Proposal {
  id: string;
  taskId: string;
  providerId: string;
  providerName: string;
  providerPhoto: string;
  providerRating: number;
  bidAmount: number;
  timeline: string;
  coverLetter: string;
  status: "pending" | "accepted" | "rejected";
  submittedAt: string;
  // Additional provider info
  providerSkills: string[];
  providerLanguages: string[];
  providerLocation: string;
  providerCompletedProjects: number;
}
