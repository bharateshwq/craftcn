import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    undo,
    redo,
    resetToCurrentPreset,
    selectCanUndo,
    selectCanRedo,
    setShareDialogOpen
} from "@/store/slices/editorSlice";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Undo2,
    Redo2,
    RotateCcw,
    Share2,
    Code,
    Download
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function Toolbar() {
    const dispatch = useAppDispatch();
    const canUndo = useAppSelector(selectCanUndo);
    const canRedo = useAppSelector(selectCanRedo);

    return (
        <div className="flex h-12 items-center justify-between border-b bg-background px-4 shrink-0">
            <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight mr-4">CraftCN <span className="text-muted-foreground font-normal">Storefront</span></span>

                <TooltipProvider>
                    <div className="flex items-center gap-1">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    disabled={!canUndo}
                                    onClick={() => dispatch(undo())}
                                >
                                    <Undo2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Undo</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    disabled={!canRedo}
                                    onClick={() => dispatch(redo())}
                                >
                                    <Redo2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Redo</TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>

                <Separator orientation="vertical" className="mx-1 h-6" />

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => dispatch(resetToCurrentPreset())}
                            >
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Reset to Preset</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs">
                    <Download className="h-3.5 w-3.5" />
                    Import
                </Button>

                <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs">
                    <Code className="h-3.5 w-3.5" />
                    Code
                </Button>

                <Separator orientation="vertical" className="mx-1 h-6" />

                <Button
                    variant="default"
                    size="sm"
                    className="h-8 gap-2 text-xs px-4"
                    onClick={() => dispatch(setShareDialogOpen(true))}
                >
                    <Share2 className="h-3.5 w-3.5" />
                    Share
                </Button>
            </div>
        </div>
    );
}
