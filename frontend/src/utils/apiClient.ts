/**
 * API utility for handling backend URL across environments
 */

const getApiUrl = (): string => {
  // In development (Vite with proxy), use relative /api
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return '';
  }
  
  // In production, use environment variable or default
  return import.meta.env.VITE_API_URL || '';
};

export const apiClient = {
  async fetch(endpoint: string, options?: RequestInit) {
    const url = `${getApiUrl()}${endpoint}`;
    const response = await fetch(url, options);
    return response;
  }
};
