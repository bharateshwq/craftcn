import { Heart } from "lucide-react";
import { Header } from "@/components/header";
import { Banner } from "@/components/banner";
import {
  SectionContainer,
  SectionHeader,
} from "@/components/section-container";
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
import { mockProducts } from "@/lib/mock-data";
import { useStore } from "@/hooks/use-store";

export default function Home() {
  const { addToCart, addToWishlist, isInWishlist } = useStore();

  // Get recently bought and popular products
  const recentlyBought = mockProducts.slice(0, 6);
  const popularProducts = mockProducts.slice(2, 10);

  const handleAddToCart = (product: (typeof mockProducts)[0]) => {
    addToCart(product, 1);
  };

  const handleAddToWishlist = (product: (typeof mockProducts)[0]) => {
    addToWishlist(product);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <SectionContainer className="pt-8 pb-6">
        <Banner
          title="Discover Amazing Products"
          subtitle="Find everything you need with our curated collection of premium items. Shop quality products at unbeatable prices."
          ctaText="Shop Now"
          ctaHref="#recently-bought"
        />
      </SectionContainer>

      {/* Recently Bought Section */}
      <SectionContainer>
        <SectionHeader
          title="Recently Bought"
          subtitle="Popular items in your area that customers love"
        />
        <ProductGrid columns={4}>
          {recentlyBought.map((product) => (
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
                    handleAddToWishlist(product);
                  }}
                >
                  <Heart
                    className={`h-4 w-4 mr-2 ${isInWishlist(product.id) ? "fill-current" : ""}`}
                  />
                  Wishlist
                </Button>
              </ProductFooter>
            </ProductCard>
          ))}
        </ProductGrid>
      </SectionContainer>

      {/* Popular Products Section */}
      <SectionContainer>
        <SectionHeader
          title="Popular Products"
          subtitle="Trending items that are flying off the shelves"
        />
        <ProductGrid columns={4}>
          {popularProducts.map((product) => (
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
                    handleAddToWishlist(product);
                  }}
                >
                  <Heart
                    className={`h-4 w-4 mr-2 ${isInWishlist(product.id) ? "fill-current" : ""}`}
                  />
                  Wishlist
                </Button>
              </ProductFooter>
            </ProductCard>
          ))}
        </ProductGrid>
      </SectionContainer>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-16">
        <div className="px-4 md:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
          <p>© 2024 ShopHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
