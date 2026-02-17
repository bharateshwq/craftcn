import { Loader2, RefreshCw, ExternalLink, Globe, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useWebsitePreview } from "@/hooks/use-website-preview";
import { useIframeCommunication } from "@/hooks/use-iframe-communication";
import type { IframeStatus } from "@/types/live-preview-embed";
import { cn } from "@/lib/utils";

export function DynamicWebsitePreview() {
    const {
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
    } = useWebsitePreview();

    const { status, error: connectionError, retryValidation } = useIframeCommunication({
        allowCrossOrigin: true,
        iframeRef,
    });

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            loadUrl();
        }
    };

    const hasError = !!(error || connectionError);

    return (
        <div className="flex h-full flex-col overflow-hidden bg-muted/30">
            {/* Toolbar */}
            <div className="flex items-center gap-2 border-b bg-background p-2">
                <div className="relative flex-1">
                    <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="pl-9 h-9 bg-muted/50"
                        placeholder="Enter URL to preview..."
                    />
                </div>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-9 w-9" onClick={refreshIframe}>
                                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Refresh</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => window.open(currentUrl, "_blank")}>
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Open in new tab</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {/* Main Content */}
            <div className="relative flex-1 overflow-hidden">
                {/* Loading Overlay */}
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-sm text-muted-foreground">Loading preview...</p>
                        </div>
                    </div>
                )}

                {/* Error Overlay */}
                {hasError && !isLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/95 p-6">
                        <div className="flex max-w-md flex-col items-center text-center gap-4">
                            <div className="rounded-full bg-destructive/10 p-4">
                                <AlertCircle className="h-8 w-8 text-destructive" />
                            </div>
                            <h3 className="text-lg font-semibold">Preview Error</h3>
                            <p className="text-sm text-muted-foreground">{error || connectionError}</p>
                            <Button onClick={() => {
                                refreshIframe();
                                if (connectionError) retryValidation();
                            }}>
                                Retry
                            </Button>
                        </div>
                    </div>
                )}

                <iframe
                    ref={iframeRef}
                    src={currentUrl}
                    className={cn(
                        "h-full w-full border-0 bg-white",
                        // isResizing && "pointer-events-none"
                    )}
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                // allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"
                />

                {/* Status indicator */}
                <div className="absolute bottom-4 left-4 z-20">
                    <ConnectionStatus status={status} />
                </div>
            </div>
        </div>
    );
}

function ConnectionStatus({ status }: { status: IframeStatus | undefined }) {
    if (!status || status === "unknown" || status === "checking") return null;

    let icon = AlertCircle;
    let text: string = status;
    let color = "text-muted-foreground";

    switch (status) {
        case "connected":
        case "supported":
            icon = CheckCircle;
            text = status === "supported" ? "Ready" : "Connected";
            color = "text-green-500";
            break;
        case "unsupported":
            icon = AlertCircle;
            text = "Unsupported";
            color = "text-amber-500";
            break;
        case "missing":
            icon = XCircle;
            text = "Script Missing";
            color = "text-red-500";
            break;
        case "error":
            icon = XCircle;
            text = "Error";
            color = "text-red-500";
            break;
    }

    const Icon = icon;

    return (
        <div className="flex items-center gap-2 rounded-full border bg-background/90 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
            <Icon className={`h-3 w-3 ${color}`} />
            <span>{text}</span>
        </div>
    );
}
