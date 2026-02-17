import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export const SliderWithInput = ({
    value,
    onChange,
    min,
    max,
    step = 1,
    label,
    unit = "px",
}: {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    label: string;
    unit?: string;
}) => {
    const [localValue, setLocalValue] = useState(value.toString());

    useEffect(() => {
        setLocalValue(value.toString());
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        setLocalValue(raw);
        const num = parseFloat(raw.replace(',', '.'));
        if (!isNaN(num)) {
            onChange(Math.max(min, Math.min(max, num)));
        }
    };

    return (
        <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
                <Label className="text-xs font-medium">
                    {label}
                </Label>
                <div className="flex items-center gap-1">
                    <Input
                        type="number"
                        value={localValue}
                        onChange={handleChange}
                        onBlur={() => setLocalValue(value.toString())}
                        min={min}
                        max={max}
                        step={step}
                        className="h-6 w-16 text-xs px-2"
                    />
                    <span className="text-xs text-muted-foreground">{unit}</span>
                </div>
            </div>
            <Slider
                value={[value]}
                min={min}
                max={max}
                step={step}
                onValueChange={(values) => {
                    const newValue = values[0];
                    setLocalValue(newValue.toString());
                    onChange(newValue);
                }}
                className="py-1"
            />
        </div>
    );
};
