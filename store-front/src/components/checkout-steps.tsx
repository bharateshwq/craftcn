'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface CheckoutStepsProps {
  currentStep: number;
  steps: string[];
  className?: string;
}

export function CheckoutSteps({ currentStep, steps, className }: CheckoutStepsProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="flex items-center flex-1">
              {/* Step Circle */}
              <div
                className={cn(
                  'relative flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-semibold flex-shrink-0 transition-all',
                  isCompleted && 'border-primary bg-primary text-white',
                  isCurrent && 'border-primary bg-background text-primary',
                  !isCompleted && !isCurrent && 'border-muted bg-background text-muted-foreground'
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
              </div>

              {/* Step Label */}
              <div className="ml-3 flex-1">
                <p
                  className={cn(
                    'text-sm font-medium',
                    isCurrent && 'text-foreground',
                    !isCurrent && 'text-muted-foreground'
                  )}
                >
                  {step}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'h-0.5 flex-1 mx-2',
                    isCompleted ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
