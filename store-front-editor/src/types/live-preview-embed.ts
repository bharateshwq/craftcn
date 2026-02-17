import type { ThemeEditorState } from "@/types/editor";

// Keep in sync with public/live-preview-embed-script.js CRAFTCN_MESSAGE
export const MESSAGE = {
  PING: "CRAFTCN_PING",
  PONG: "CRAFTCN_PONG",
  CHECK_SHADCN: "CRAFTCN_CHECK_SHADCN",
  SHADCN_STATUS: "CRAFTCN_SHADCN_STATUS",
  THEME_UPDATE: "CRAFTCN_THEME_UPDATE",
  THEME_APPLIED: "CRAFTCN_THEME_APPLIED",
  EMBED_LOADED: "CRAFTCN_EMBED_LOADED",
  EMBED_ERROR: "CRAFTCN_EMBED_ERROR",
} as const;

export type MessageType = (typeof MESSAGE)[keyof typeof MESSAGE];

export interface ShadcnStatusPayload {
  supported: boolean;
}

export interface ThemeUpdatePayload {
  themeState: ThemeEditorState;
}

export type EmbedMessage =
  | { type: typeof MESSAGE.PING }
  | { type: typeof MESSAGE.PONG }
  | { type: typeof MESSAGE.CHECK_SHADCN }
  | { type: typeof MESSAGE.SHADCN_STATUS; payload: ShadcnStatusPayload }
  | { type: typeof MESSAGE.THEME_UPDATE; payload: ThemeUpdatePayload }
  | { type: typeof MESSAGE.THEME_APPLIED }
  | { type: typeof MESSAGE.EMBED_LOADED }
  | { type: typeof MESSAGE.EMBED_ERROR; payload: { error: string } };

export type IframeStatus =
  | "unknown"
  | "checking"
  | "connected"
  | "supported"
  | "unsupported"
  | "missing"
  | "error";
