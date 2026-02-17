import { type Product, type ShippingOption } from "@/context/store-context";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 299.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
    ],
    description:
      "High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality.",
    category: "Electronics",
    rating: 4.8,
    reviews: 2150,
    inStock: true,
    sku: "WH-1000XM4",
    dimensions: "24.5 x 22.8 x 8.5 cm",
    weight: "250g",
  },
  {
    id: "2",
    name: "Professional Backpack",
    price: 89.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1491637639811-076d5194837d?w=400&h=400&fit=crop",
    ],
    description:
      "Durable and spacious backpack perfect for work, travel, and daily use with multiple compartments and USB charging port.",
    category: "Bags",
    rating: 4.6,
    reviews: 1842,
    inStock: true,
    sku: "BP-2024-PRO",
    dimensions: "32 x 18 x 50 cm",
    weight: "850g",
  },
  {
    id: "3",
    name: "Smart Watch Pro",
    price: 299.99,
    originalPrice: 399.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
    ],
    description:
      "Advanced fitness tracking smartwatch with heart rate monitoring, blood oxygen sensor, and 14-day battery life.",
    category: "Wearables",
    rating: 4.7,
    reviews: 3421,
    inStock: true,
    sku: "SW-PRO-2024",
    dimensions: "45 x 45 x 12 mm",
    weight: "45g",
  },
  {
    id: "4",
    name: "USB-C Cable (2m)",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop",
    ],
    description:
      "High-quality USB-C cable with fast charging support up to 100W and durable braided construction.",
    category: "Accessories",
    rating: 4.5,
    reviews: 892,
    inStock: true,
    sku: "USB-C-2M",
    dimensions: "200 cm length",
    weight: "45g",
  },
  {
    id: "5",
    name: "Portable Charger 30000mAh",
    price: 49.99,
    originalPrice: 79.99,
    image:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop",
    ],
    description:
      "Ultra-compact portable power bank with 30000mAh capacity, dual USB ports, and fast charging support.",
    category: "Accessories",
    rating: 4.7,
    reviews: 2567,
    inStock: true,
    sku: "PB-30000",
    dimensions: "15.5 x 7.3 x 2.5 cm",
    weight: "660g",
  },
  {
    id: "6",
    name: "Mechanical Keyboard RGB",
    price: 129.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1587829191301-49f29eba84db?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1587829191301-49f29eba84db?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1612580292884-8ac5d1618f10?w=400&h=400&fit=crop",
    ],
    description:
      "Professional mechanical keyboard with RGB backlighting, hot-swap switches, and aluminum frame.",
    category: "Electronics",
    rating: 4.9,
    reviews: 1654,
    inStock: true,
    sku: "KB-MECH-RGB",
    dimensions: "45 x 13.5 x 3.5 cm",
    weight: "950g",
  },
  {
    id: "7",
    name: "4K Webcam",
    price: 179.99,
    originalPrice: 249.99,
    image:
      "https://images.unsplash.com/photo-1598625256621-f1b8cae90f9e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1598625256621-f1b8cae90f9e?w=400&h=400&fit=crop",
    ],
    description:
      "Ultra HD 4K webcam with 90-degree wide angle lens, auto-focus, and built-in microphone for professional streaming.",
    category: "Electronics",
    rating: 4.6,
    reviews: 987,
    inStock: true,
    sku: "WC-4K-PRO",
    dimensions: "6.5 x 5.5 x 5 cm",
    weight: "180g",
  },
  {
    id: "8",
    name: "Desk Lamp LED",
    price: 59.99,
    originalPrice: 89.99,
    image:
      "https://images.unsplash.com/photo-1565636192335-14bdf9e6eae7?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1565636192335-14bdf9e6eae7?w=400&h=400&fit=crop",
    ],
    description:
      "Energy-efficient LED desk lamp with adjustable brightness, color temperature control, and USB charging port.",
    category: "Lighting",
    rating: 4.5,
    reviews: 756,
    inStock: true,
    sku: "LAMP-LED-USB",
    dimensions: "15 x 12 x 45 cm",
    weight: "520g",
  },
  {
    id: "9",
    name: "Ergonomic Mouse",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
    ],
    description:
      "Wireless ergonomic mouse designed to reduce wrist strain with precision tracking and silent clicks.",
    category: "Electronics",
    rating: 4.7,
    reviews: 2341,
    inStock: true,
    sku: "MOUSE-ERG-WL",
    dimensions: "12.5 x 7 x 4 cm",
    weight: "115g",
  },
  {
    id: "10",
    name: "Monitor Stand Adjustable",
    price: 44.99,
    originalPrice: 69.99,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    ],
    description:
      "Adjustable monitor stand with storage compartment, supports screens up to 32 inches.",
    category: "Office",
    rating: 4.4,
    reviews: 654,
    inStock: true,
    sku: "MS-ADJUST-32",
    dimensions: "60 x 25 x 10-15 cm",
    weight: "2.5kg",
  },
];

export const shippingOptions: ShippingOption[] = [
  {
    id: "1",
    name: "Standard Shipping",
    price: 10.99,
    estimatedDays: 5,
    description: "Delivery in 5-7 business days",
  },
  {
    id: "2",
    name: "Express Shipping",
    price: 24.99,
    estimatedDays: 2,
    description: "Delivery in 2-3 business days",
  },
  {
    id: "3",
    name: "Overnight Shipping",
    price: 49.99,
    estimatedDays: 1,
    description: "Next business day delivery",
  },
  {
    id: "4",
    name: "Free Shipping",
    price: 0,
    estimatedDays: 7,
    description: "Delivery in 7-10 business days (Free)",
  },
];

export const categories = [
  "Electronics",
  "Bags",
  "Wearables",
  "Accessories",
  "Office",
  "Lighting",
];

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((product) => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return mockProducts.filter((product) => product.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery),
  );
}
