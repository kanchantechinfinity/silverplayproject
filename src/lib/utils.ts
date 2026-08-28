import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** ₹29,999 — Indian digit grouping, no decimals. */
export function inr(value: number) {
  return "₹" + value.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}
