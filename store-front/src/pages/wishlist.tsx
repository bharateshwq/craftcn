import { Heart } from "lucide-react";
import { Header } from "@/components/header";
import { SectionContainer } from "@/components/section-container";
import { ProductGrid } from "@/components/product-grid";
import {
  ProductCard,
  ProductImage,
  ProductHeader,
  ProductTitle,
  ProductDescription,
  ProductRating,
  ProductPrice,
  ProductFooter,
} from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/hooks/use-store";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const handleAddToCart = (product: (typeof wishlist)[0]) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <SectionContainer>
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="mb-6">
              <div className="flex justify-center mb-4">
                <Heart className="h-16 w-16 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-2">
                Your wishlist is empty
              </h1>
              <p className="text-muted-foreground mb-8">
                Save your favorite products to your wishlist to view them later.
              </p>
            </div>
            <Button size="lg" asChild>
              <a href="/">Start Shopping</a>
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
        <h1 className="text-3xl md:text-4xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground mb-8">
          {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved
        </p>

        <ProductGrid columns={4}>
          {wishlist.map((product) => (
            <ProductCard key={product.id} href={`/product/${product.id}`}>
              <ProductImage src={product.image} alt={product.name} />
              <ProductHeader>
                <ProductTitle>{product.name}</ProductTitle>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductRating
                  rating={product.rating}
                  reviews={product.reviews}
                />
                <ProductPrice
                  price={product.price}
                  originalPrice={product.originalPrice}
                />
              </ProductHeader>
              <ProductFooter>
                <Button
                  variant="default"
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product);
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveFromWishlist(product.id);
                  }}
                >
                  Remove
                </Button>
              </ProductFooter>
            </ProductCard>
          ))}
        </ProductGrid>
      </SectionContainer>
    </div>
  );
}
