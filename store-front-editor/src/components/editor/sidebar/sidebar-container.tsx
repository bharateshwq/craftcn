import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectSidebarView, setSidebarView } from "@/store/slices/editorSlice";
import ThemeControlPanel from "./theme-control-panel";
import { PresetList } from "./preset-list";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";

export default function SidebarContainer() {
    const dispatch = useAppDispatch();
    const view = useAppSelector(selectSidebarView);

    return (
        <div className="flex flex-col h-full bg-background overflow-hidden animate-in fade-in duration-300">
            {view === 'controls' ? (
                <div className="flex flex-col h-full overflow-hidden">
                    <div className="flex items-center gap-3 p-4 border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => dispatch(setSidebarView('presets'))}
                            className="h-8 w-8 hover:bg-muted rounded-full"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4 text-primary" />
                            <h2 className="text-sm font-bold tracking-tight uppercase tracking-wider text-foreground/80">Customize</h2>
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <ThemeControlPanel />
                    </div>
                </div>
            ) : (
                <PresetList />
            )}
        </div>
    );
}
