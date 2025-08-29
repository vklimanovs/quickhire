import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface FilterState {
  search?: string;
  category?: string;
  rating?: string;
  skills?: string[];
  status?: string;
  consultations?: boolean;
  priceMin?: string;
  priceMax?: string;
  videoCall?: boolean;
}

/**
 * Custom hook for managing filter state with URL persistence
 * Automatically syncs filter state with URL search parameters
 * @param defaultFilters - Default filter values
 * @returns Object with filter state and update functions
 */
export function useUrlFilters(defaultFilters: FilterState = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL or defaults - run only once
  const initializeFilters = useCallback((): FilterState => {
    return {
      search: searchParams.get("search") || defaultFilters.search || "",
      category: searchParams.get("category") || defaultFilters.category || "",
      rating: searchParams.get("rating") || defaultFilters.rating || "",
      skills:
        searchParams.get("skills")?.split(",").filter(Boolean) ||
        defaultFilters.skills ||
        [],
      status: searchParams.get("status") || defaultFilters.status || "all",
      consultations:
        searchParams.get("consultations") === "true" ||
        defaultFilters.consultations ||
        false,
      priceMin: searchParams.get("priceMin") || defaultFilters.priceMin || "",
      priceMax: searchParams.get("priceMax") || defaultFilters.priceMax || "",
      videoCall:
        searchParams.get("videoCall") === "true" ||
        defaultFilters.videoCall ||
        false,
    };
  }, []); // Empty dependency array to avoid infinite loops

  const [filters, setFilters] = useState<FilterState>(() => {
    // Initialize state from URL on mount
    return {
      search: searchParams.get("search") || defaultFilters.search || "",
      category: searchParams.get("category") || defaultFilters.category || "",
      rating: searchParams.get("rating") || defaultFilters.rating || "",
      skills:
        searchParams.get("skills")?.split(",").filter(Boolean) ||
        defaultFilters.skills ||
        [],
      status: searchParams.get("status") || defaultFilters.status || "all",
      consultations:
        searchParams.get("consultations") === "true" ||
        defaultFilters.consultations ||
        false,
      priceMin: searchParams.get("priceMin") || defaultFilters.priceMin || "",
      priceMax: searchParams.get("priceMax") || defaultFilters.priceMax || "",
      videoCall:
        searchParams.get("videoCall") === "true" ||
        defaultFilters.videoCall ||
        false,
    };
  });

  // Update URL when filters change
  const updateUrl = useCallback(
    (newFilters: FilterState) => {
      const params = new URLSearchParams();

      // Only add non-empty/non-default values to URL
      if (newFilters.search) params.set("search", newFilters.search);
      if (newFilters.category) params.set("category", newFilters.category);
      if (newFilters.rating) params.set("rating", newFilters.rating);
      if (newFilters.skills && newFilters.skills.length > 0) {
        params.set("skills", newFilters.skills.join(","));
      }
      if (newFilters.status && newFilters.status !== "all") {
        params.set("status", newFilters.status);
      }
      if (newFilters.consultations) params.set("consultations", "true");
      if (newFilters.priceMin) params.set("priceMin", newFilters.priceMin);
      if (newFilters.priceMax) params.set("priceMax", newFilters.priceMax);
      if (newFilters.videoCall) params.set("videoCall", "true");

      setSearchParams(params, { replace: true });
    },
    [setSearchParams],
  );

  // Update filters and URL
  const updateFilters = useCallback(
    (newFilters: Partial<FilterState>) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);
      updateUrl(updatedFilters);
    },
    [filters, updateUrl],
  );

  // Update single filter
  const updateFilter = useCallback(
    (key: keyof FilterState, value: any) => {
      updateFilters({ [key]: value });
    },
    [updateFilters],
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    const clearedFilters: FilterState = {
      search: "",
      category: "",
      rating: "",
      skills: [],
      status: "all",
      consultations: false,
      priceMin: "",
      priceMax: "",
      videoCall: false,
    };
    setFilters(clearedFilters);
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  // Check if any filters are active
  const hasActiveFilters = useCallback(() => {
    return !!(
      filters.search ||
      filters.category ||
      filters.rating ||
      (filters.skills && filters.skills.length > 0) ||
      (filters.status && filters.status !== "all") ||
      filters.consultations ||
      filters.priceMin ||
      filters.priceMax ||
      filters.videoCall
    );
  }, [filters]);

  // Listen for URL changes (back/forward navigation)
  useEffect(() => {
    const newFilters: FilterState = {
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "",
      rating: searchParams.get("rating") || "",
      skills: searchParams.get("skills")?.split(",").filter(Boolean) || [],
      status: searchParams.get("status") || "all",
      consultations: searchParams.get("consultations") === "true",
      priceMin: searchParams.get("priceMin") || "",
      priceMax: searchParams.get("priceMax") || "",
      videoCall: searchParams.get("videoCall") === "true",
    };
    setFilters(newFilters);
  }, [searchParams]);

  return {
    filters,
    updateFilter,
    updateFilters,
    clearFilters,
    hasActiveFilters: hasActiveFilters(),
  };
}
