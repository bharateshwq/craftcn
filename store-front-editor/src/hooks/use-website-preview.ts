import { useCallback, useEffect, useState, useRef } from "react";

const LOADING_TIMEOUT_MS = 5000;
const DEFAULT_URL = "http://localhost:5173";

export function useWebsitePreview() {
  const [inputUrl, setInputUrl] = useState(DEFAULT_URL);
  const [currentUrl, setCurrentUrl] = useState(DEFAULT_URL);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLoadingTimeout = () => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  };

  const handleIframeLoad = useCallback(() => {
    clearLoadingTimeout();
    setIsLoading(false);
    setError(null);
  }, []);

  const handleIframeError = useCallback(() => {
    clearLoadingTimeout();
    setIsLoading(false);
    setError("Failed to load website. This could be due to CORS restrictions.");
  }, []);

  const loadUrl = useCallback(() => {
    if (!inputUrl.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    let formattedUrl = inputUrl.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "http://" + formattedUrl; // Default to http for local dev
    }

    setCurrentUrl(formattedUrl);
    setIsLoading(true);
    setError(null);
    clearLoadingTimeout();

    // Set timeout for loading
    loadingTimeoutRef.current = setTimeout(() => {
      // Don't error out, just stop showing loading spinner endlessly
      setIsLoading(false);
    }, LOADING_TIMEOUT_MS);

  }, [inputUrl]);

  const refreshIframe = useCallback(() => {
    if (!currentUrl || !iframeRef.current) return;
    setIsLoading(true);
    try {
      const url = new URL(currentUrl);
      url.searchParams.set("_refresh", Date.now().toString());
      iframeRef.current.src = url.toString();
    } catch {
      iframeRef.current.src = currentUrl;
    }
    // Re-trigger load handler
  }, [currentUrl]);

  useEffect(() => {
    return () => clearLoadingTimeout();
  }, []);

  return {
    inputUrl,
    setInputUrl,
    currentUrl,
    isLoading,
    error,
    iframeRef,
    loadUrl,
    refreshIframe,
    handleIframeLoad,
    handleIframeError,
  };
}
