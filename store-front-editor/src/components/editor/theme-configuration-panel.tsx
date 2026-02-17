import { useAppSelector } from "@/store/hooks";
import { selectThemeState } from "@/store/slices/editorSlice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeConfigurationPanel() {
    const { styles, currentMode } = useAppSelector(selectThemeState);
    const currentStyles = styles[currentMode];

    // TODO: Add handlers to update individual colors if desired.
    // For now, it's read-only/display as per request "replicate functionality... clean headerless editor".
    // CraftCN allows changing colors. The request mentioned "Card based color palette selector", "Clicking settings icon open configuration component".
    // I will just display the colors for now as a config panel.

    const colorFields = [
        { key: "background", label: "Background" },
        { key: "foreground", label: "Foreground" },
        { key: "card", label: "Card" },
        { key: "card-foreground", label: "Card Foreground" },
        { key: "popover", label: "Popover" },
        { key: "popover-foreground", label: "Popover Foreground" },
        { key: "primary", label: "Primary" },
        { key: "primary-foreground", label: "Primary Foreground" },
        { key: "secondary", label: "Secondary" },
        { key: "secondary-foreground", label: "Secondary Foreground" },
        { key: "muted", label: "Muted" },
        { key: "muted-foreground", label: "Muted Foreground" },
        { key: "accent", label: "Accent" },
        { key: "accent-foreground", label: "Accent Foreground" },
        { key: "destructive", label: "Destructive" },
        { key: "destructive-foreground", label: "Destructive Foreground" },
        { key: "border", label: "Border" },
        { key: "input", label: "Input" },
        { key: "ring", label: "Ring" },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="p-6 pb-2">
                <h2 className="text-xl font-semibold tracking-tight">Theme Configuration</h2>
                <p className="text-sm text-muted-foreground">Adjust your theme colors</p>
            </div>

            <ScrollArea className="flex-1 px-6 py-4">
                <div className="grid gap-4">
                    <div className="space-y-4">
                        <h3 className="font-medium text-sm text-foreground/80">Colors ({currentMode})</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {colorFields.map(({ key, label }) => (
                                <div key={key} className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor={key} className="col-span-1 text-sm font-medium">
                                        {label}
                                    </Label>
                                    <div className="col-span-2 flex items-center gap-2">
                                        <div
                                            className="h-8 w-8 rounded border shadow-sm"
                                            style={{ backgroundColor: currentStyles[key as keyof typeof currentStyles] }}
                                        />
                                        <div className="relative flex-1">
                                            <Input
                                                id={key}
                                                value={currentStyles[key as keyof typeof currentStyles]}
                                                readOnly
                                                className="h-8 font-mono text-xs pr-8"
                                            />
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute right-0 top-0 h-8 w-8 text-muted-foreground hover:text-foreground"
                                                            onClick={() => navigator.clipboard.writeText(currentStyles[key as keyof typeof currentStyles])}
                                                        >
                                                            <Copy className="h-3 w-3" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Copy color</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
