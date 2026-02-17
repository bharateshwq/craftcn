import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsConfigOpen, setConfigOpen } from "@/store/slices/editorSlice";

import SidebarContainer from "./sidebar/sidebar-container";
import { DynamicWebsitePreview } from "./preview/dynamic-website-preview";
import { ThemeConfigurationPanel } from "./theme-configuration-panel";
import { ShareDialog } from "./share-dialog";
import { Toolbar } from "./toolbar";

export default function Editor() {
    const dispatch = useAppDispatch();
    const isConfigOpen = useAppSelector(selectIsConfigOpen);

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
            {/* Configuration Sheet */}
            <Sheet open={isConfigOpen} onOpenChange={(open) => dispatch(setConfigOpen(open))}>
                <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0">
                    <ThemeConfigurationPanel />
                </SheetContent>
            </Sheet>

            {/* Share Dialog */}
            <ShareDialog />

            {/* Main Layout - Using Flex-1 and min-h-0 for scroll stability */}
            <div className="flex-1 flex h-full w-full overflow-hidden min-h-0">
                <aside className="w-[380px] shrink-0 border-r bg-background flex flex-col min-h-0">
                    <SidebarContainer />
                </aside>

                {/* Right Panel - Preview */}
                <main className="flex-1 flex flex-col min-w-0">
                    <Toolbar />
                    <div className="flex-1 overflow-hidden relative">
                        <DynamicWebsitePreview />
                    </div>
                </main>
            </div>
        </div>
    );
}
