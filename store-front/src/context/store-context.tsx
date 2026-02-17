import { createContext } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  sku?: string;
  dimensions?: string;
  weight?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: number;
  description: string;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  addresses: Address[];

  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  addAddress: (address: Address) => void;
  removeAddress: (addressId: string) => void;
  updateAddress: (address: Address) => void;

  getCartTotal: () => number;
  getCartCount: () => number;
}

export const StoreContext = createContext<StoreContextType | undefined>(
  undefined,
);
