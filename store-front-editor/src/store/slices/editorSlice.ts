import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ThemeEditorState, EditorState, SidebarView } from "@/types/editor";
import type { ThemeStyles } from "@/types/theme";
import { defaultThemeState } from "@/lib/theme/defaults";
import { getPresetThemeStyles } from "@/lib/theme/utils";
import type { IframeStatus } from "@/types/live-preview-embed";

const MAX_HISTORY_COUNT = 30;
const HISTORY_OVERRIDE_THRESHOLD_MS = 500; // 0.5 seconds

const initialState: EditorState = {
  themeState: defaultThemeState,
  themeCheckpoint: null,
  history: [],
  future: [],
  
  iframeStatus: "unknown",
  isShareDialogOpen: false,
  isConfigOpen: false,
  sidebarView: "presets",
  isPreviewRefreshed: 0,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setSidebarView: (state, action: PayloadAction<SidebarView>) => {
      state.sidebarView = action.payload;
    },
    setThemeState: (state, action: PayloadAction<ThemeEditorState>) => {
      const oldThemeState = state.themeState;
      const newState = action.payload;
      const currentTime = Date.now();

      // Check if only currentMode changed
      const oldStateWithoutMode = { ...oldThemeState, currentMode: undefined };
      const newStateWithoutMode = { ...newState, currentMode: undefined };

      if (
        JSON.stringify(oldStateWithoutMode) === JSON.stringify(newStateWithoutMode) &&
        oldThemeState.currentMode !== newState.currentMode
      ) {
        // Only currentMode changed, don't affect history
        state.themeState = newState;
        return;
      }

      // Add to history
      const lastHistoryEntry =
        state.history.length > 0 ? state.history[state.history.length - 1] : null;

      if (
        !lastHistoryEntry ||
        currentTime - lastHistoryEntry.timestamp >= HISTORY_OVERRIDE_THRESHOLD_MS
      ) {
        // Add new history entry
        state.history.push({ state: oldThemeState, timestamp: currentTime });
        state.future = [];

        // Limit history size
        if (state.history.length > MAX_HISTORY_COUNT) {
          state.history.shift();
        }
      }

      state.themeState = newState;
    },

    applyThemePreset: (state, action: PayloadAction<string>) => {
      const preset = action.payload;
      const currentTime = Date.now();
      const newStyles = getPresetThemeStyles(preset);

      const newThemeState: ThemeEditorState = {
        ...state.themeState,
        preset,
        styles: newStyles,
        hslAdjustments: defaultThemeState.hslAdjustments,
      };

      // Add to history
      state.history.push({ state: state.themeState, timestamp: currentTime });
      if (state.history.length > MAX_HISTORY_COUNT) {
        state.history.shift();
      }

      state.themeState = newThemeState;
      state.themeCheckpoint = newThemeState;
      state.future = [];
    },

    updateThemeStyles: (state, action: PayloadAction<ThemeStyles>) => {
      const currentTime = Date.now();
      
      // Add to history
      state.history.push({ state: state.themeState, timestamp: currentTime });
      if (state.history.length > MAX_HISTORY_COUNT) {
        state.history.shift();
      }

      state.themeState = {
        ...state.themeState,
        styles: action.payload,
      };
      state.future = [];
    },

    toggleMode: (state) => {
      state.themeState.currentMode = state.themeState.currentMode === "light" ? "dark" : "light";
    },

    saveThemeCheckpoint: (state) => {
      state.themeCheckpoint = state.themeState;
    },

    restoreThemeCheckpoint: (state) => {
      if (state.themeCheckpoint) {
        const currentTime = Date.now();
        
        state.history.push({ state: state.themeState, timestamp: currentTime });
        if (state.history.length > MAX_HISTORY_COUNT) {
          state.history.shift();
        }

        state.themeState = {
          ...state.themeCheckpoint,
          currentMode: state.themeState.currentMode,
        };
        state.future = [];
      }
    },

    undo: (state) => {
      if (state.history.length === 0) return;

      const lastHistoryEntry = state.history[state.history.length - 1];
      state.history = state.history.slice(0, -1);

      state.future.unshift({ state: state.themeState, timestamp: Date.now() });

      state.themeState = {
        ...lastHistoryEntry.state,
        currentMode: state.themeState.currentMode,
      };
      state.themeCheckpoint = lastHistoryEntry.state;
    },

    redo: (state) => {
      if (state.future.length === 0) return;

      const firstFutureEntry = state.future[0];
      state.future = state.future.slice(1);

      state.history.push({ state: state.themeState, timestamp: Date.now() });
      if (state.history.length > MAX_HISTORY_COUNT) {
        state.history.shift();
      }

      state.themeState = {
        ...firstFutureEntry.state,
        currentMode: state.themeState.currentMode,
      };
      state.themeCheckpoint = firstFutureEntry.state;
    },

    resetToCurrentPreset: (state) => {
      const presetThemeStyles = getPresetThemeStyles(state.themeState.preset ?? "default");
      const newThemeState: ThemeEditorState = {
        ...state.themeState,
        styles: presetThemeStyles,
        hslAdjustments: defaultThemeState.hslAdjustments,
      };

      state.themeState = newThemeState;
      state.themeCheckpoint = newThemeState;
      state.history = [];
      state.future = [];
    },

    setIframeStatus: (state, action: PayloadAction<IframeStatus>) => {
      state.iframeStatus = action.payload;
    },

    setShareDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isShareDialogOpen = action.payload;
    },

    setConfigOpen: (state, action: PayloadAction<boolean>) => {
      state.isConfigOpen = action.payload;
    },

    refreshPreview: (state) => {
      state.isPreviewRefreshed = Date.now();
    },
  },
});

export const {
  setSidebarView,
  setThemeState,
  applyThemePreset,
  updateThemeStyles,
  toggleMode,
  saveThemeCheckpoint,
  restoreThemeCheckpoint,
  undo,
  redo,
  resetToCurrentPreset,
  setIframeStatus,
  setShareDialogOpen,
  setConfigOpen,
  refreshPreview,
} = editorSlice.actions;

// Selectors
export const selectSidebarView = (state: { editor: EditorState }) => state.editor.sidebarView;
export const selectThemeState = (state: { editor: EditorState }) => state.editor.themeState;
export const selectCanUndo = (state: { editor: EditorState }) => state.editor.history.length > 0;
export const selectCanRedo = (state: { editor: EditorState }) => state.editor.future.length > 0;
export const selectCurrentMode = (state: { editor: EditorState }) => state.editor.themeState.currentMode;
export const selectCurrentStyles = (state: { editor: EditorState }) => state.editor.themeState.styles;
export const selectIframeStatus = (state: { editor: EditorState }) => state.editor.iframeStatus;
export const selectIsShareDialogOpen = (state: { editor: EditorState }) => state.editor.isShareDialogOpen;
export const selectIsConfigOpen = (state: { editor: EditorState }) => state.editor.isConfigOpen;
export const selectIsPreviewRefreshed = (state: { editor: EditorState }) => state.editor.isPreviewRefreshed;

export default editorSlice.reducer;
