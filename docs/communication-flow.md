# End-to-End Communication Flow

This document details the communication bridge between the **CraftCN Editor** (Parent) and the **Live Preview** (Iframe).

## Architecture Overview

The communication relies on the browser's `Window.postMessage()` API to securely pass data across different origins.

- **Parent side:** `useIframeCommunication.ts` hook manages the state and outgoing messages.
- **Iframe side:** `craftcn-listener.js` script (embedded in the target site) listens for messages and applies styles.

## Flow Diagram

```mermaid
sequenceDiagram
    participant Editor as Editor (Parent)
    participant Hook as useIframeCommunication
    participant Iframe as Live Preview (Iframe)
    participant Listener as craftcn-listener.js

    Note over Editor, Iframe: Initialization
    Iframe->>Hook: EMBED_LOADED
    Hook->>Iframe: CRAFTCN_PING
    Iframe->>Hook: CRAFTCN_PONG
    Hook->>Iframe: CRAFTCN_CHECK_SHADCN
    Iframe->>Hook: CRAFTCN_SHADCN_STATUS (Supported/Unsupported)

    Note over Editor, Iframe: Theme Updates
    Editor->>Hook: Theme State Change (Redux)
    Hook->>Hook: Debounce (50ms)
    Hook->>Iframe: CRAFTCN_THEME_UPDATE (JSON Payload)
    Iframe->>Listener: applyTheme(payload)
    Listener->>Listener: Update CSS Variables
    Listener->>Listener: Load Google Fonts
    Iframe->>Hook: CRAFTCN_THEME_APPLIED

    Note over Editor, Iframe: Navigation Syncing
    Iframe->>Listener: Navigates to new URL
    Listener->>Hook: CRAFTCN_NAVIGATION_UPDATE (New URL)
    Hook->>Editor: Sync Editor Address Bar
```

## Key Mechanisms

### 1. Handshake & Validation

To ensure the target website is ready and compatible:

- **Ping/Pong:** A watchdog timer (3s) starts when `PING` is sent. If `PONG` isn't received, the editor shows a "Script Missing" error.
- **Shadcn Check:** The listener verifies that the target site actually uses Shadcn-compatible CSS variables (e.g., `--primary`, `--background`).

### 2. Debounced Theme Updates

To prevent performance lag during rapid edits (like dragging a color slider):

- Updates are delayed by **50ms**.
- If a new change occurs before the 50ms is up, the previous update is cancelled and the timer restarts.

### 3. Style Injection

When a `THEME_UPDATE` is received, the listener:

1.  Sets CSS variables on `document.documentElement`.
2.  Toggles the `.dark` class.
3.  Dynamically appends `<link>` tags for Google Fonts.
4.  Injects a `<style>` block to override Shadow and Typography utility classes.

### 4. Navigation Sync

The listener "monkey-patches" the browser's `history.pushState` and `history.replaceState`. This allows the parent editor to stay aware of the current URL inside the iframe, even during client-side transitions.
