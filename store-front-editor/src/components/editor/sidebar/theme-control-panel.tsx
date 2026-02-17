import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectThemeState, updateThemeStyles } from "@/store/slices/editorSlice";
import ControlSection from "./control-section";
import ColorPicker from "./color-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ThemeStyles, ThemeStyleProps } from "@/types/theme";
import { SliderWithInput } from "./slider-with-input";

const ThemeControlPanel = () => {
    const dispatch = useAppDispatch();
    const { styles, currentMode } = useAppSelector(selectThemeState);

    const currentStyles = useMemo(
        () => styles[currentMode],
        [currentMode, styles]
    );

    const updateStyle = useCallback(
        <K extends keyof ThemeStyleProps>(key: K, value: ThemeStyleProps[K]) => {
            const newStyles: ThemeStyles = {
                ...styles,
                [currentMode]: {
                    ...currentStyles,
                    [key]: value,
                },
            };
            dispatch(updateThemeStyles(newStyles));
        },
        [dispatch, styles, currentMode, currentStyles]
    );

    // Safety check: ensure radius and spacing exist before calling .replace
    const radiusStr = currentStyles.radius || "0.5rem";
    const spacingStr = currentStyles.spacing || "0.25rem";

    const radius = parseFloat(radiusStr.replace("rem", ""));

    return (
        <div className="flex flex-col h-full bg-background">
            <Tabs defaultValue="colors" className="flex-1 flex flex-col min-h-0">
                <div className="px-4 py-2 border-b">
                    <TabsList className="bg-muted/50 w-full justify-start h-8 p-0.5">
                        <TabsTrigger value="colors" className="text-xs h-7 px-3">Colors</TabsTrigger>
                        <TabsTrigger value="typography" className="text-xs h-7 px-3">Typography</TabsTrigger>
                        <TabsTrigger value="other" className="text-xs h-7 px-3">Other</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="colors" className="flex-1 min-h-0 m-0 p-0 overflow-hidden">
                    <ScrollArea className="h-full px-4 py-4">
                        <ControlSection title="Primary Colors" expanded>
                            <ColorPicker
                                label="Primary"
                                color={currentStyles.primary}
                                onChange={(val) => updateStyle("primary", val)}
                            />
                            <ColorPicker
                                label="Primary Foreground"
                                color={currentStyles["primary-foreground"]}
                                onChange={(val) => updateStyle("primary-foreground", val)}
                            />
                        </ControlSection>

                        <ControlSection title="Secondary Colors">
                            <ColorPicker
                                label="Secondary"
                                color={currentStyles.secondary}
                                onChange={(val) => updateStyle("secondary", val)}
                            />
                            <ColorPicker
                                label="Secondary Foreground"
                                color={currentStyles["secondary-foreground"]}
                                onChange={(val) => updateStyle("secondary-foreground", val)}
                            />
                        </ControlSection>

                        <ControlSection title="Accent Colors">
                            <ColorPicker
                                label="Accent"
                                color={currentStyles.accent}
                                onChange={(val) => updateStyle("accent", val)}
                            />
                            <ColorPicker
                                label="Accent Foreground"
                                color={currentStyles["accent-foreground"]}
                                onChange={(val) => updateStyle("accent-foreground", val)}
                            />
                        </ControlSection>

                        <ControlSection title="Base Colors">
                            <ColorPicker
                                label="Background"
                                color={currentStyles.background}
                                onChange={(val) => updateStyle("background", val)}
                            />
                            <ColorPicker
                                label="Foreground"
                                color={currentStyles.foreground}
                                onChange={(val) => updateStyle("foreground", val)}
                            />
                        </ControlSection>

                        <ControlSection title="Card Colors">
                            <ColorPicker
                                label="Card Background"
                                color={currentStyles.card}
                                onChange={(val) => updateStyle("card", val)}
                            />
                            <ColorPicker
                                label="Card Foreground"
                                color={currentStyles["card-foreground"]}
                                onChange={(val) => updateStyle("card-foreground", val)}
                            />
                        </ControlSection>

                        <ControlSection title="Border & Input Colors">
                            <ColorPicker
                                label="Border"
                                color={currentStyles.border}
                                onChange={(val) => updateStyle("border", val)}
                            />
                            <ColorPicker
                                label="Input"
                                color={currentStyles.input}
                                onChange={(val) => updateStyle("input", val)}
                            />
                            <ColorPicker
                                label="Ring"
                                color={currentStyles.ring}
                                onChange={(val) => updateStyle("ring", val)}
                            />
                        </ControlSection>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="typography" className="flex-1 min-h-0 m-0 p-0 overflow-hidden">
                    <ScrollArea className="h-full px-4 py-4">
                        <div className="p-4 bg-muted/30 rounded border text-xs text-muted-foreground text-center">
                            Typography controls Coming Soon.
                        </div>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="other" className="flex-1 min-h-0 m-0 p-0 overflow-hidden">
                    <ScrollArea className="h-full px-4 py-4">
                        <ControlSection title="Radius" expanded>
                            <SliderWithInput
                                label="Radius"
                                value={radius}
                                onChange={(val) => updateStyle("radius", `${val}rem`)}
                                min={0}
                                max={2}
                                step={0.1}
                                unit="rem"
                            />
                        </ControlSection>

                        <ControlSection title="Spacing" expanded>
                            <SliderWithInput
                                label="Spacing"
                                value={parseFloat(spacingStr.replace("rem", ""))}
                                onChange={(val) => updateStyle("spacing", `${val}rem`)}
                                min={0}
                                max={1}
                                step={0.05}
                                unit="rem"
                            />
                        </ControlSection>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ThemeControlPanel;
