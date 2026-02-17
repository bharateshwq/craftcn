import type { ThemeStyles, HslAdjustments } from "./theme";
import type { IframeStatus } from "./live-preview-embed";

// Editor state for theme customization
export interface ThemeEditorState {
  styles: ThemeStyles;
  currentMode: "light" | "dark";
  preset?: string;
  hslAdjustments: HslAdjustments;
  
  // Backend integration fields (for future use)
  themeId?: string;
  userId?: string;
  savedAt?: string;
  isPublic?: boolean;
}

// History entry for undo/redo
export interface ThemeHistoryEntry {
  state: ThemeEditorState;
  timestamp: number;
}

export type SidebarView = "presets" | "controls";

// Editor store state
export interface EditorState {
  themeState: ThemeEditorState;
  themeCheckpoint: ThemeEditorState | null;
  history: ThemeHistoryEntry[];
  future: ThemeHistoryEntry[];

  // UI State
  iframeStatus: IframeStatus;
  isShareDialogOpen: boolean;
  isConfigOpen: boolean;
  sidebarView: SidebarView;
  isPreviewRefreshed: number;
}
