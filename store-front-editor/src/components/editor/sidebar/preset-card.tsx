import type { ThemePreset } from "@/types/theme";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";

interface PresetCardProps {
    name: string;
    preset: ThemePreset;
    active: boolean;
    mode: "light" | "dark";
    onSelect: () => void;
    onOpenSettings: () => void;
}

export function PresetCard({ name, preset, active, mode, onSelect, onOpenSettings }: PresetCardProps) {
    const styles = preset.styles[mode];

    return (
        <div
            className={cn(
                "group relative flex flex-col gap-3 rounded-xl border p-3 transition-all duration-500 hover:shadow-2xl cursor-pointer overflow-hidden backdrop-blur-sm",
                active ? "border-primary bg-primary/[0.03] ring-2 ring-primary/20 shadow-primary/10" : "border-border bg-card hover:border-primary/40"
            )}
            onClick={onSelect}
        >
            <div className="flex items-center justify-between gap-2 relative z-30">
                <span className="text-[11px] font-bold truncate capitalize tracking-tight text-foreground/80">{preset.label || name}</span>
                <button
                    onClick={(e) => { e.stopPropagation(); onOpenSettings(); }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-muted rounded-lg transition-all duration-200 active:scale-95"
                >
                    <Settings className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
            </div>

            <div className="relative h-28 w-full flex items-center justify-center overflow-hidden rounded-lg bg-muted/20 border border-border/50">
                {/* Background Decorative Pattern */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{ backgroundImage: `radial-gradient(${styles.primary} 1px, transparent 0)`, backgroundSize: '12px 12px' }}
                />

                {/* Stacked Cards that spread on hover */}
                <div className="relative w-12 h-16 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    {/* Card 4 - Background (Bottom Left) */}
                    <div
                        style={{ backgroundColor: styles.background }}
                        className="absolute inset-0 rounded-lg shadow-lg border border-border/20 transition-all duration-500 -translate-x-1 -translate-y-1 -rotate-3 group-hover:-translate-x-8 group-hover:-translate-y-6 group-hover:-rotate-12"
                    />
                    {/* Card 3 - Accent (Top Right) */}
                    <div
                        style={{ backgroundColor: styles.accent }}
                        className="absolute inset-0 rounded-lg shadow-lg border border-border/10 transition-all duration-500 translate-x-1 -translate-y-1 rotate-3 group-hover:translate-x-8 group-hover:-translate-y-6 group-hover:rotate-12"
                    />
                    {/* Card 2 - Secondary (Bottom Right) */}
                    <div
                        style={{ backgroundColor: styles.secondary }}
                        className="absolute inset-0 rounded-lg shadow-lg border border-border/10 transition-all duration-500 -translate-x-1 translate-y-1 rotate-1 group-hover:-translate-x-8 group-hover:translate-y-6 group-hover:rotate-6"
                    />
                    {/* Card 1 - Primary (Top - Bottom Left slight offset) */}
                    <div
                        style={{ backgroundColor: styles.primary }}
                        className="absolute inset-0 rounded-lg shadow-2xl border border-white/20 transition-all duration-500 translate-x-1 translate-y-1 -rotate-1 group-hover:translate-x-8 group-hover:translate-y-6 group-hover:-rotate-6"
                    />

                    {/* Center Icon/Dot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40 shadow-sm backdrop-blur-sm z-20 group-hover:scale-[2.5] transition-all duration-500" />
                </div>
            </div>

            {/* {active && (
                <div className="absolute top-2 left-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold shadow-lg shadow-primary/20 animate-in zoom-in slide-in-from-top-1 duration-300 z-40 pointer-events-none">
                    ✓
                </div>
            )} */}
        </div>
    );
}
