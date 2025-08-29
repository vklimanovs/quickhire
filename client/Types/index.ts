// Main export file for all types

// User-related types
export * from "./User";

// Profile-related types
export * from "./Profile";

// Service-related types
export * from "./Service";

// Task-related types
export * from "./Task";

// Dashboard-related types
export * from "./Dashboard";

// Messaging-related types
export * from "./Messaging";

// Filter-related types
export * from "./Filter";

// Authentication-related types
export * from "./Auth";

// Additional types from external files (legacy compatibility)
export interface Translations {
  // Navigation
  nav: {
    home: string;
    services: string;
    providers: string;
    consultations: string;
    tasks: string;
    pricing: string;
    login: string;
    signup: string;
    logout: string;
    switchToEn: string;
    switchToEt: string;
    switchToRu: string;
    dashboard: string;
    profile: string;
    settings: string;
    help: string;
    contact: string;
    about: string;
    termsOfService: string;
    privacy: string;
    freelance: string;
    client: string;
  };
  [key: string]: any; // Allow additional properties for the full translations interface
}

export interface MultilingualProvider {
  id: string;
  name: string;
  rating: number;
  completedTasks: number;
  hourlyRate: string;
  location: string;
  profileImage: string;
  isVerified: boolean;
  isOnline: boolean;
  responseTime: string;
  completionRate: number;
  languages: string[];
  skills: string[];
  bio: string;
  translations: {
    [languageCode: string]: {
      name?: string;
      bio?: string;
      skills?: string[];
    };
  };
}
