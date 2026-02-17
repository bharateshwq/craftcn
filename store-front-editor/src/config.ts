// Configuration for the store front editor

export const config = {
  // Store front application URL
  // In development, the store front runs on its default Vite port
  // In production, this should point to the deployed store front URL
  storeFrontUrl: import.meta.env.VITE_STORE_FRONT_URL || "http://localhost:5173",
  
  // Editor settings
  editor: {
    // Maximum undo/redo history entries
    maxHistoryCount: 30,
    
    // Debounce time for history entries (ms)
    historyDebounceMs: 500,
  },
  
  // Iframe communication settings
  iframe: {
    // Timeout for iframe ready check (ms)
    readyTimeout: 5000,
    
    // Interval for ping checks (ms)
    pingInterval: 1000,
  },
} as const;

export type Config = typeof config;
