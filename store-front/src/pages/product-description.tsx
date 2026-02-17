import { useState } from "react";
import { Heart, Truck, RotateCcw, CheckCircle } from "lucide-react";
import { Header } from "@/components/header";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ProductDetailsContainer,
  ProductGallery,
  ProductInfo,
  ProductInfoHeader,
  ProductStats,
  ProductPricing,
  ProductActions,
  ProductSpecs,
  SpecItem,
} from "@/components/product-details";
import { mockProducts } from "@/lib/mock-data";
import { useStore } from "@/hooks/use-store";
import { useLoaderData, useNavigate } from "@tanstack/react-router";

export default function ProductDescriptionPage() {
  const navigate = useNavigate();
  const product = useLoaderData({
    from: "/product/$id",
  });
  const { addToCart, addToWishlist, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity);
    navigate({
      to: "/checkout",
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <SectionContainer>
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button asChild>
              <a href="/">Back to Home</a>
            </Button>
          </div>
        </SectionContainer>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  // Get related products (same category, different product)
  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productImages = product.images || [product.image];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Product Details Section */}
      <SectionContainer className="py-8">
        <ProductDetailsContainer>
          {/* Product Gallery */}
          <ProductGallery images={productImages} productName={product.name} />

          {/* Product Info */}
          <ProductInfo>
            <ProductInfoHeader
              name={product.name}
              category={product.category}
            />
            <ProductStats
              rating={product.rating}
              reviews={product.reviews}
              inStock={product.inStock}
            />
            <Separator />

            {/* Price */}
            <ProductPricing
              price={product.price}
              originalPrice={product.originalPrice}
            />

            {/* Description */}
            <div>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Actions */}
            <ProductActions>
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Quantity:
                </label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-20"
                />
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                variant="secondary"
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>

              <Button
                size="lg"
                variant="default"
                className="w-full"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                Buy Now
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={handleAddToWishlist}
              >
                <Heart
                  className={`h-4 w-4 mr-2 ${isInWishlist(product.id) ? "fill-current" : ""}`}
                />
                {isInWishlist(product.id)
                  ? "Added to Wishlist"
                  : "Add to Wishlist"}
              </Button>
            </ProductActions>

            {/* Specifications */}
            {(product.sku || product.dimensions || product.weight) && (
              <>
                <Separator />
                <ProductSpecs>
                  {product.sku && <SpecItem label="SKU" value={product.sku} />}
                  {product.dimensions && (
                    <SpecItem label="Dimensions" value={product.dimensions} />
                  )}
                  {product.weight && (
                    <SpecItem label="Weight" value={product.weight} />
                  )}
                </ProductSpecs>
              </>
            )}

            {/* Shipping Info */}
            <Separator />
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <Truck className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Free Shipping</p>
              </div>
              <div>
                <RotateCcw className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">30-day Returns</p>
              </div>
              <div>
                <CheckCircle className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">1-year Warranty</p>
              </div>
            </div>
          </ProductInfo>
        </ProductDetailsContainer>
      </SectionContainer>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <SectionContainer>
          <SectionHeader
            title="Related Products"
            subtitle={`More items in ${product.category}`}
          />
          <ProductGrid columns={4}>
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                href={`/product/${relProduct.id}`}
              >
                <ProductImage src={relProduct.image} alt={relProduct.name} />
                <ProductHeader>
                  <ProductTitle>{relProduct.name}</ProductTitle>
                  <ProductDescription>
                    {relProduct.description}
                  </ProductDescription>
                  <ProductRating
                    rating={relProduct.rating}
                    reviews={relProduct.reviews}
                  />
                  <ProductPrice
                    price={relProduct.price}
                    originalPrice={relProduct.originalPrice}
                  />
                </ProductHeader>
                <ProductFooter>
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(relProduct, 1);
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      addToWishlist(relProduct);
                    }}
                  >
                    <Heart
                      className={`h-4 w-4 mr-2 ${isInWishlist(relProduct.id) ? "fill-current" : ""}`}
                    />
                    {isInWishlist(relProduct.id) ? "Wishlist" : "Wishlist"}
                  </Button>
                </ProductFooter>
              </ProductCard>
            ))}
          </ProductGrid>
        </SectionContainer>
      )}
    </div>
  );
}
