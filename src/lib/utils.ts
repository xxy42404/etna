import { type ClassValue, clsx } from 'clsx';

// Simple cn without clsx dependency — just join classes
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}
