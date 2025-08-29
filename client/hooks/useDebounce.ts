import { useState, useEffect } from "react";

/**
 * Custom hook for debouncing values (e.g., search inputs)
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 250ms)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 250): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for debounced search functionality
 * @param initialValue - Initial search value
 * @param delay - Debounce delay in milliseconds (default: 250ms)
 * @returns Object with search input value, debounced value, and setter
 */
export function useDebouncedSearch(
  initialValue: string = "",
  delay: number = 250,
) {
  const [searchInput, setSearchInput] = useState(initialValue);
  const debouncedSearchTerm = useDebounce(searchInput, delay);

  return {
    searchInput,
    setSearchInput,
    debouncedSearchTerm,
  };
}
