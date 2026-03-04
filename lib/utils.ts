import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Split } from '@/types/api'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export function validateSplits(splits: Split[]) {
  if (!splits || splits.length === 0) return { valid: false, error: 'At least one split is required' }
  if (splits.length > 10) return { valid: false, error: 'Maximum 10 collaborators allowed' }
  const total = splits.reduce((acc, curr) => acc + curr.percentage, 0)
  if (Math.abs(total - 100) > 0.001) return { valid: false, error: 'Splits must sum exactly to 100%' }
  return { valid: true }
}
