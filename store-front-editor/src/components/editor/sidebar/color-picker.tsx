import React, { useCallback, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
    color: string;
    onChange: (color: string) => void;
    label: string;
    name?: string;
}

const ColorPicker = ({ color, onChange, label }: ColorPickerProps) => {
    const textInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (textInputRef.current) {
            textInputRef.current.value = color;
        }
    }, [color]);

    const handleColorChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        },
        [onChange]
    );

    const handleTextInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            if (val.startsWith('#') && (val.length === 4 || val.length === 7)) {
                onChange(val);
            }
        },
        [onChange]
    );

    return (
        <div className="mb-3">
            <div className="mb-1.5 flex items-center justify-between">
                <Label className="text-xs font-medium">
                    {label}
                </Label>
            </div>
            <div className="relative flex items-center gap-1">
                <div
                    className="relative flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded border"
                    style={{ backgroundColor: color }}
                >
                    <input
                        type="color"
                        value={color}
                        onChange={handleColorChange}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                </div>
                <input
                    ref={textInputRef}
                    type="text"
                    defaultValue={color}
                    onChange={handleTextInputChange}
                    className="bg-muted/50 border-input h-8 flex-1 rounded border px-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="#000000"
                />
            </div>
        </div>
    );
};

export default ColorPicker;
