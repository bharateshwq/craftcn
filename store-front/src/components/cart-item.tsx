import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type CartItem as CartItemType } from "@/context/store-context";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
  className?: string;
}

export function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  className,
}: CartItemProps) {
  return (
    <Card className={cn("p-4 md:p-6", className)}>
      <div className="flex gap-4 md:gap-6">
        {/* Product Image */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 bg-muted rounded-md overflow-hidden">
          <img src={item.image} alt={item.name} className="object-cover" />
        </div>

        {/* Product Info and Actions */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {item.description}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Price and Subtotal */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">Price</p>
                <p className="font-semibold">${item.price.toFixed(2)}</p>
              </div>
              {item.originalPrice && (
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1 line-through">
                    ${item.originalPrice.toFixed(2)}
                  </p>
                </div>
              )}
            </div>

            {/* Quantity Control */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Qty:</span>
              <Input
                type="number"
                min="1"
                max="100"
                value={item.quantity}
                onChange={(e) =>
                  onUpdateQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-16"
              />
            </div>

            {/* Subtotal */}
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Subtotal</p>
              <p className="text-xl font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-destructive hover:text-destructive"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
