'use client';

import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ShippingOption } from '@/context/store-context';
import { cn } from '@/lib/utils';

interface ShippingOptionsProps {
  options: ShippingOption[];
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
  className?: string;
}

export function ShippingOptions({
  options,
  selectedOptionId,
  onSelectOption,
  className,
}: ShippingOptionsProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="text-xl font-bold">Shipping Method</h2>

      <RadioGroup value={selectedOptionId} onValueChange={onSelectOption}>
        <div className="space-y-3">
          {options.map((option) => (
            <div key={option.id} className="flex items-start space-x-3">
              <RadioGroupItem value={option.id} id={option.id} className="mt-3" />
              <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                <ShippingOptionCard option={option} />
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

interface ShippingOptionCardProps {
  option: ShippingOption;
}

function ShippingOptionCard({ option }: ShippingOptionCardProps) {
  return (
    <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-semibold">{option.name}</p>
          <p className="text-sm text-muted-foreground">{option.description}</p>
        </div>
        <p className="font-bold">${option.price.toFixed(2)}</p>
      </div>
      <p className="text-xs text-muted-foreground">
        Estimated delivery: {option.estimatedDays} business day{option.estimatedDays > 1 ? 's' : ''}
      </p>
    </Card>
  );
}
