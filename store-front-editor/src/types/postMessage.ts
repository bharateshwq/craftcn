import type { ThemeEditorState } from "./editor";

// Message types for postMessage communication
export const MESSAGE = {
  PING: "STOREFRONT_PING",
  PONG: "STOREFRONT_PONG",
  THEME_UPDATE: "STOREFRONT_THEME_UPDATE",
  THEME_APPLIED: "STOREFRONT_THEME_APPLIED",
  CHECK_READY: "STOREFRONT_CHECK_READY",
  READY: "STOREFRONT_READY",
} as const;

export type MessageType = (typeof MESSAGE)[keyof typeof MESSAGE];

// Payload interfaces
export interface ThemeUpdatePayload {
  themeState: ThemeEditorState;
}

// PostMessage types
export type PostMessage =
  | { type: typeof MESSAGE.PING }
  | { type: typeof MESSAGE.PONG }
  | { type: typeof MESSAGE.CHECK_READY }
  | { type: typeof MESSAGE.READY }
  | { type: typeof MESSAGE.THEME_UPDATE; payload: ThemeUpdatePayload }
  | { type: typeof MESSAGE.THEME_APPLIED };

// Iframe status
export type IframeStatus =
  | "unknown"
  | "checking"
  | "connected"
  | "ready"
  | "error";
