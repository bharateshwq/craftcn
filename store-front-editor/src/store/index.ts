import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "./slices/editorSlice";
import presetReducer from "./slices/presetSlice";

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    preset: presetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["editor/setThemeState"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["editor.history", "editor.future"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
