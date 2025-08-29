// Filter-related type definitions

export interface ConsultationFilters {
  search?: string;
  category?: string;
  priceRange?: { min: number; max: number };
  duration?: string;
  language?: string;
}

export interface ProviderFilters {
  search?: string;
  category?: string;
  skills?: string[];
  location?: string;
  availability?: string;
  rating?: number;
}

export interface LanguageOption {
  code: string;
  name: { et: string; en: string; ru: string };
  nativeName: string;
}
