import { useEffect } from "react";

// Types adapted from the editor project
const MESSAGE = {
  PING: "CRAFTCN_PING",
  PONG: "CRAFTCN_PONG",
  CHECK_SHADCN: "CRAFTCN_CHECK_SHADCN",
  SHADCN_STATUS: "CRAFTCN_SHADCN_STATUS",
  THEME_UPDATE: "CRAFTCN_THEME_UPDATE",
  THEME_APPLIED: "CRAFTCN_THEME_APPLIED",
} as const;

export function useThemeListener() {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate origin if needed, but for local dev we might skip strict origin check or allow localhost
      
      const { type, payload } = event.data || {};

      switch (type) {
        case MESSAGE.PING:
          event.source?.postMessage({ type: MESSAGE.PONG }, { targetOrigin: "*" });
          break;
          
        case MESSAGE.CHECK_SHADCN:
             // Reply that we support it
            event.source?.postMessage({ 
                type: MESSAGE.SHADCN_STATUS, 
                payload: { supported: true } 
            }, { targetOrigin: "*" });
            break;

      case MESSAGE.THEME_UPDATE:
        if (payload?.themeState?.styles) {
          const { styles } = payload.themeState;
          let styleTag = document.getElementById("craftcn-theme-styles");
          if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = "craftcn-theme-styles";
            document.head.appendChild(styleTag);
          }
          
          let lightCss = `:root {`;
          Object.entries(styles.light).forEach(([key, value]) => {
              lightCss += `--${key}: ${value};`;
          });
          lightCss += `}`;

          let darkCss = `.dark {`;
          Object.entries(styles.dark).forEach(([key, value]) => {
               darkCss += `--${key}: ${value};`;
          });
          darkCss += `}`;
          
          styleTag.textContent = `${lightCss} ${darkCss}`;

          // Also set dark mode class based on currentMode if provided
          if (payload.themeState.currentMode === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }

          event.source?.postMessage({ type: MESSAGE.THEME_APPLIED }, { targetOrigin: "*" });
        }
        break;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
}
