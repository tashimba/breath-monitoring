export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  wsURL: import.meta.env.VITE_WS_URL || "ws://localhost:8765",
} as const;
