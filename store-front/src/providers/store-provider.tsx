import {
  StoreContext,
  type Address,
  type CartItem,
  type Product,
} from "@/context/store-context";
import { useState, type ReactNode } from "react";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "Home",
      phone: "+1 234 567 8900",
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      country: "United States",
      isDefault: true,
    },
  ]);

  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      if (exists) {
        // Remove
        return prev.filter((item) => item.id !== product.id);
      }

      // Add
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const addAddress = (address: Address) => {
    setAddresses((prev) => [...prev, address]);
  };

  const removeAddress = (addressId: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
  };

  const updateAddress = (updatedAddress: Address) => {
    setAddresses((prev) =>
      prev.map((addr) =>
        addr.id === updatedAddress.id ? updatedAddress : addr,
      ),
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addresses,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        addAddress,
        removeAddress,
        updateAddress,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
