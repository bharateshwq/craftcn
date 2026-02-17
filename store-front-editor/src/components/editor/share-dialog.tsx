import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectThemeState, selectIsShareDialogOpen, setShareDialogOpen } from "@/store/slices/editorSlice";

export function ShareDialog() {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectIsShareDialogOpen);
    const themeState = useAppSelector(selectThemeState);
    const [copied, setCopied] = useState(false);
    const [url, setUrl] = useState("");

    const onOpenChange = (open: boolean) => {
        dispatch(setShareDialogOpen(open));
    };

    useEffect(() => {
        if (isOpen) {
            // Generate URL
            const currentUrl = new URL(window.location.href);
            const searchParams = new URLSearchParams(currentUrl.search);

            if (themeState.preset) {
                searchParams.set("theme", themeState.preset);
            }

            setUrl(`${currentUrl.origin}${currentUrl.pathname}?${searchParams.toString()}`);
            setCopied(false);
        }
    }, [isOpen, themeState]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share Theme</DialogTitle>
                    <DialogDescription>
                        Copy the link below to share this theme configuration.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2 pt-4">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            value={url}
                            readOnly
                            className="h-9"
                        />
                    </div>
                    <Button type="button" size="sm" className="px-3" onClick={handleCopy}>
                        <span className="sr-only">Copy</span>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
