import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemePresetCard } from "./theme-preset-card";
import { defaultPresets } from "@/lib/theme/presets";
import { useAppDispatch } from "@/store/hooks";
import { setConfigOpen, applyThemePreset } from "@/store/slices/editorSlice";

export function Sidebar() {
    const dispatch = useAppDispatch();

    const handleApplyPreset = (name: string) => {
        dispatch(applyThemePreset(name));
    };

    const handleConfigure = () => {
        dispatch(setConfigOpen(true));
    };

    return (
        <div className="flex h-full w-full flex-col border-r bg-background">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold tracking-tight">Presets</h2>
                <p className="text-sm text-muted-foreground">Select a theme to start</p>
            </div>
            <ScrollArea className="flex-1">
                <div className="flex flex-col gap-4 p-4">
                    {Object.entries(defaultPresets).map(([name, preset]) => (
                        <ThemePresetCard
                            key={name}
                            presetName={name}
                            preset={preset}
                            onApply={handleApplyPreset}
                            onConfigure={handleConfigure}
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
