import { ShoppingCart } from "lucide-react";
import { Header } from "@/components/header";
import { SectionContainer } from "@/components/section-container";
import { CartItem } from "@/components/cart-item";
import { CartSummary } from "@/components/cart-summary";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useStore } from "@/hooks/use-store";

export default function CustomerCartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity, getCartTotal } = useStore();

  const handleCheckout = () => {
    navigate({
      to: "/checkout",
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <SectionContainer>
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="mb-6">
              <div className="flex justify-center mb-4">
                <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
              <p className="text-muted-foreground mb-8">
                Explore our collection and find something you love!
              </p>
            </div>
            <Button size="lg" asChild>
              <a href="/">Continue Shopping</a>
            </Button>
          </div>
        </SectionContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <SectionContainer>
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={(quantity) =>
                  updateCartQuantity(item.id, quantity)
                }
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              subtotal={getCartTotal()}
              shipping={cart.length > 0 ? 10.99 : 0}
              onCheckout={handleCheckout}
              checkoutText="Go to Checkout"
            />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
