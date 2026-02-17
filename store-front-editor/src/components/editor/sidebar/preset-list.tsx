import { ScrollArea } from "@/components/ui/scroll-area";
import { defaultPresets } from "@/lib/theme/presets";
import { PresetCard } from "./preset-card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { applyThemePreset, selectThemeState, setSidebarView, toggleMode } from "@/store/slices/editorSlice";
import { Input } from "@/components/ui/input";
import { Search, Moon, Sun, LayoutGrid } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

export function PresetList() {
    const dispatch = useAppDispatch();
    const { preset: currentPreset, currentMode } = useAppSelector(selectThemeState);
    const [search, setSearch] = useState("");

    const presets = useMemo(() => {
        return Object.entries(defaultPresets).filter(([name, preset]) =>
            preset.label.toLowerCase().includes(search.toLowerCase()) ||
            name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    return (
        <div className="flex flex-col h-full bg-background">
            <div className="p-5 border-b space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <LayoutGrid className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-bold tracking-tight">Presets</h2>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-muted/30"
                        onClick={() => dispatch(toggleMode())}
                    >
                        {currentMode === "light" ? (
                            <Sun className="h-4 w-4" />
                        ) : (
                            <Moon className="h-4 w-4" />
                        )}
                    </Button>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                    <Input
                        placeholder="Search theme presets..."
                        className="pl-9 bg-muted/40 border-none h-10 focus-visible:ring-1 focus-visible:ring-primary/30"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <ScrollArea className="flex-1 min-h-0">
                <div className="grid grid-cols-2 gap-4 p-5 pb-10">
                    {presets.map(([name, preset]) => (
                        <PresetCard
                            key={name}
                            name={name}
                            preset={preset}
                            active={currentPreset === name}
                            mode={currentMode}
                            onSelect={() => dispatch(applyThemePreset(name))}
                            onOpenSettings={() => {
                                dispatch(applyThemePreset(name));
                                dispatch(setSidebarView('controls'));
                            }}
                        />
                    ))}
                    {presets.length === 0 && (
                        <div className="col-span-2 py-10 text-center space-y-2">
                            <p className="text-sm text-muted-foreground font-medium">No results for "{search}"</p>
                            <Button variant="link" size="sm" onClick={() => setSearch("")}>Clear search</Button>
                        </div>
                    )}
                </div>
            </ScrollArea>

            <div className="p-4 border-t bg-muted/10 text-[10px] text-center text-muted-foreground font-medium uppercase tracking-widest">
                Select a preset to customize
            </div>
        </div>
    );
}
