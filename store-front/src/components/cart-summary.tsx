'use client';

import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface CartSummaryProps {
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  onCheckout?: () => void;
  checkoutText?: string;
  className?: string;
}

export function CartSummary({
  subtotal,
  shipping = 0,
  tax = 0,
  discount = 0,
  onCheckout,
  checkoutText = 'Proceed to Checkout',
  className,
}: CartSummaryProps) {
  const total = subtotal + shipping + tax - discount;

  return (
    <Card className={cn('p-6 sticky top-24', className)}>
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        {shipping > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">${shipping.toFixed(2)}</span>
          </div>
        )}

        {/* Tax */}
        {tax > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
        )}

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <Separator className="my-6" />

      {/* Total */}
      <div className="flex justify-between mb-6">
        <span className="text-lg font-bold">Total</span>
        <span className="text-2xl font-bold">${total.toFixed(2)}</span>
      </div>

      {/* Checkout Button */}
      {onCheckout && (
        <Button size="lg" className="w-full mb-3" onClick={onCheckout}>
          {checkoutText}
        </Button>
      )}

      <Button variant="outline" className="w-full" asChild>
        <a href="/">Continue Shopping</a>
      </Button>
    </Card>
  );
}
