import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { applyThemePreset, selectThemeState, toggleMode } from "@/store/slices/editorSlice";
import { defaultPresets } from "@/lib/theme/presets";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { ChevronDown, Check, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const ThemePresetSelect = ({ className }: { className?: string }) => {
    const dispatch = useAppDispatch();
    const { preset: currentPreset, currentMode } = useAppSelector(selectThemeState);

    const presets = ["default", ...Object.keys(defaultPresets)];

    return (
        <div className={cn("flex items-center gap-2 px-4 py-3 border-b bg-background", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="flex-1 justify-between h-9 text-sm font-medium">
                        <span className="capitalize">{currentPreset || "Default"}</span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] p-0" align="start">
                    <Command>
                        <CommandList>
                            <CommandEmpty>No preset found.</CommandEmpty>
                            <CommandGroup heading="Presets">
                                {presets.map((p) => (
                                    <CommandItem
                                        key={p}
                                        onSelect={() => dispatch(applyThemePreset(p))}
                                        className="flex items-center justify-between"
                                    >
                                        <span className="capitalize">{p.replace(/-/g, " ")}</span>
                                        {currentPreset === p && <Check className="h-4 w-4" />}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={() => dispatch(toggleMode())}
            >
                {currentMode === "light" ? (
                    <Sun className="h-4 w-4" />
                ) : (
                    <Moon className="h-4 w-4" />
                )}
            </Button>
        </div>
    );
};

export default ThemePresetSelect;
