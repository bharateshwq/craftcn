import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ThemePreset } from "@/types/theme";
import { Settings2 } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectThemeState } from "@/store/slices/editorSlice";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ThemePresetCardProps {
    presetName: string;
    preset: ThemePreset;
    onApply: (name: string) => void;
    onConfigure: (name: string) => void;
}

export function ThemePresetCard({ presetName, preset, onApply, onConfigure }: ThemePresetCardProps) {
    const { currentMode, preset: activePresetName } = useAppSelector(selectThemeState);
    const isActive = activePresetName === presetName;
    const styles = preset.styles[currentMode];

    return (
        <Card
            className={cn(
                "group relative flex cursor-pointer flex-col overflow-hidden border-2 transition-all hover:border-primary",
                isActive ? "border-primary shadow-md" : "border-transparent bg-muted/30"
            )}
            onClick={() => onApply(presetName)}
        >
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                    {/* Color Preview Circles */}
                    <div className="flex -space-x-2">
                        {[styles.primary, styles.secondary, styles.accent].map((color, i) => (
                            <div
                                key={i}
                                className="h-6 w-6 rounded-full border border-background ring-1 ring-border"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                    <span className="font-medium">{preset.label}</span>
                </div>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onConfigure(presetName);
                                }}
                            >
                                <Settings2 className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Configure Theme</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {/* Mini Preview Bar */}
            <div className="h-2 w-full" style={{
                background: `linear-gradient(to right, ${styles.primary} 33%, ${styles.secondary} 33% 66%, ${styles.accent} 66%)`
            }} />
        </Card>
    );
}
