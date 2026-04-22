/**
 * API utility for handling backend URL across environments
 */

const getApiUrl = (): string => {
  // Always use relative paths so the platform (Vercel/Render) handles routing
  return '';
};

export const apiClient = {
  async fetch(endpoint: string, options?: RequestInit) {
    const url = `${getApiUrl()}${endpoint}`;
    const response = await fetch(url, options);
    return response;
  }
};
