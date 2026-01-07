import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function CountByField<T extends Record<K, PropertyKey>, K extends keyof T>(
  array: T[],
  field: K
): Record<T[K], number> {
  return array.reduce((accumulator, currentItem) => {
    const fieldValue = currentItem[field];
    // If the field value exists in the accumulator, increment its count; otherwise, initialize it to 1
    accumulator[fieldValue] = (accumulator[fieldValue] || 0) + 1;
    return accumulator;
  }, {} as Record<T[K], number>); // Initialize with an empty object
}
