import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format member since date from backend response
 * @param createdAt - ISO date string from backend (e.g., "2006-01-02T15:04:05Z07:00")
 * @returns Formatted string like "Member since January 2006"
 */
export function formatMemberSince(createdAt: string): string {
  try {
    const date = new Date(createdAt);
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `Member since ${month} ${year}`;
  } catch (error) {
    console.error("Error formatting member since date:", error);
    return "Member since recently";
  }
}
