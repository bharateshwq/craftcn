import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectThemeState, setIframeStatus } from "@/store/slices/editorSlice";
import { applyThemeToElement } from "@/lib/theme/utils";
import type { EmbedMessage, IframeStatus } from "@/types/live-preview-embed";
import { MESSAGE } from "@/types/live-preview-embed";

const THEME_UPDATE_DEBOUNCE_MS = 50;

export interface UseIframeCommunicationProps {
  allowCrossOrigin?: boolean;
  iframeRef?: React.RefObject<HTMLIFrameElement | null>;
}

export const useIframeCommunication = ({
  allowCrossOrigin = false,
  iframeRef,
}: UseIframeCommunicationProps = {}) => {
  const internalRef = useRef<HTMLIFrameElement | null>(null);
  const ref = iframeRef ?? internalRef;

  const dispatch = useAppDispatch();
  const themeState = useAppSelector(selectThemeState);
  
  // Local state for immediate feedback, synced with Redux
  const [status, setStatus] = useState<IframeStatus>("unknown");
  const [error, setError] = useState<string | null>(null);

  const validationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const themeUpdateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync local status to Redux
  useEffect(() => {
    dispatch(setIframeStatus(status));
  }, [status, dispatch]);

  const applySameOriginTheme = useCallback(() => {
    if (allowCrossOrigin) return;

    const iframe = ref.current;
    // Accessing contentDocument of same-origin iframe
    const iframeRoot = iframe?.contentDocument?.documentElement;
    if (!iframeRoot) return;

    // Apply current mode styles
    const currentStyles = themeState.styles[themeState.currentMode];
    applyThemeToElement(currentStyles, iframeRoot);
    
    // Also set the class for dark mode if needed
    if (themeState.currentMode === "dark") {
      iframeRoot.classList.add("dark");
    } else {
      iframeRoot.classList.remove("dark");
    }
  }, [allowCrossOrigin, ref, themeState]);

  const postMessage = useCallback(
    (msg: EmbedMessage) => {
      const iframe = ref.current;
      if (iframe?.contentWindow) {
        try {
          iframe.contentWindow.postMessage(msg, "*");
        } catch (err) {
          console.warn("Failed to send message to iframe:", err);
          setError("Failed to establish connection.");
          setStatus("error");
        }
      }
    },
    [ref]
  );

  const startCrossOriginValidation = useCallback(() => {
    setStatus("checking");
    postMessage({ type: MESSAGE.PING });

    if (validationTimeoutRef.current) clearTimeout(validationTimeoutRef.current);
    
    validationTimeoutRef.current = setTimeout(() => {
      setStatus("missing");
      setError(
        "The preview script could not be found. Please ensure it is included in the website."
      );
    }, 3000);
  }, [postMessage]);

  // Handle iframe load
  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) {
      setStatus("unknown");
      return;
    }

    const handleLoad = () => {
      if (allowCrossOrigin) {
        startCrossOriginValidation();
      } else {
        applySameOriginTheme();
        setStatus("supported");
        setError(null);
      }
    };

    if (iframe.src && iframe.contentDocument?.readyState === 'complete') {
        handleLoad();
    }

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, [allowCrossOrigin, startCrossOriginValidation, applySameOriginTheme, ref]);

  // Handle cross-origin messages
  useEffect(() => {
    if (!allowCrossOrigin) return;

    const handleMessage = (event: MessageEvent<EmbedMessage>) => {
      const iframe = ref.current;
      if (!iframe || event.source !== iframe.contentWindow) return;

      const message = event.data;
      if (validationTimeoutRef.current) clearTimeout(validationTimeoutRef.current);

      switch (message.type) {
        case MESSAGE.EMBED_LOADED:
          setError(null);
          break;
        case MESSAGE.PONG:
          setStatus("connected");
          setError(null);
          postMessage({ type: MESSAGE.CHECK_SHADCN });
          break;
        case MESSAGE.SHADCN_STATUS:
          if (message.payload.supported) {
            setStatus("supported");
            setError(null);
          } else {
            setStatus("unsupported");
            setError("Shadcn UI not detected or configured correctly.");
          }
          break;
        case MESSAGE.EMBED_ERROR:
          console.error("Embed error:", message.payload.error);
          setStatus("error");
          setError(message.payload.error);
          break;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [allowCrossOrigin, ref, postMessage]);

  // Handle theme updates
  useEffect(() => {
    if (allowCrossOrigin) {
      if (status === "supported") {
        if (themeUpdateTimeoutRef.current) clearTimeout(themeUpdateTimeoutRef.current);
        themeUpdateTimeoutRef.current = setTimeout(() => {
          postMessage({ type: MESSAGE.THEME_UPDATE, payload: { themeState } });
        }, THEME_UPDATE_DEBOUNCE_MS);
      }
    } else {
      applySameOriginTheme();
    }
  }, [themeState, allowCrossOrigin, status, applySameOriginTheme, postMessage]);

  useEffect(() => {
    return () => {
      if (validationTimeoutRef.current) clearTimeout(validationTimeoutRef.current);
      if (themeUpdateTimeoutRef.current) clearTimeout(themeUpdateTimeoutRef.current);
    };
  }, []);

  return {
    ref,
    status,
    error,
    retryValidation: allowCrossOrigin ? startCrossOriginValidation : applySameOriginTheme,
  };
};
