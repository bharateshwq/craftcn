'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Heart } from 'lucide-react';
import { Header } from '@/components/header';
import { SectionContainer } from '@/components/section-container';
import { ProductGrid } from '@/components/product-grid';
import {
  ProductCard,
  ProductImage,
  ProductHeader,
  ProductTitle,
  ProductDescription,
  ProductRating,
  ProductPrice,
  ProductFooter,
} from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStore } from '@/context/store-context';
import { searchProducts, categories } from '@/lib/mock-data';

function SearchContent() {
  const searchParams = useSearchParams();
  const { addToCart, addToWishlist, isInWishlist } = useStore();
  
  const query = searchParams.get('q') || '';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  
  let results = searchProducts(query);
  if (selectedCategory !== 'all') {
    results = results.filter((product) => product.category === selectedCategory);
  }
  results = results.filter((product) => product.price <= maxPrice);

  const handleAddToCart = (product: typeof results[0]) => {
    addToCart(product, 1);
  };

  const handleAddToWishlist = (product: typeof results[0]) => {
    addToWishlist(product);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <SectionContainer>
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search products..."
              defaultValue={query}
              disabled
              className="w-full"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="w-full md:w-48">
            <label htmlFor="price" className="text-sm font-medium mb-2 block">
              Max Price: ${maxPrice}
            </label>
            <Input
              id="price"
              type="range"
              min="0"
              max="10000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory('all');
              setMaxPrice(10000);
            }}
            className="w-full md:w-auto"
          >
            Clear Filters
          </Button>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-muted-foreground">
                {results.length} product{results.length !== 1 ? 's' : ''} found
                {query && ` for "${query}"`}
              </p>
            </div>
            <ProductGrid columns={4}>
              {results.map((product) => (
                <ProductCard key={product.id} href={`/product/${product.id}`}>
                  <ProductImage src={product.image} alt={product.name} />
                  <ProductHeader>
                    <ProductTitle>{product.name}</ProductTitle>
                    <ProductDescription>{product.description}</ProductDescription>
                    <ProductRating rating={product.rating} reviews={product.reviews} />
                    <ProductPrice price={product.price} originalPrice={product.originalPrice} />
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
                      <Heart className={`h-4 w-4 mr-2 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      Wishlist
                    </Button>
                  </ProductFooter>
                </ProductCard>
              ))}
            </ProductGrid>
          </>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground mb-4">No products found</p>
            <p className="text-sm text-muted-foreground mb-6">
              {query && `No results for "${query}"`}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </p>
            <Button asChild>
              <a href="/">Browse All Products</a>
            </Button>
          </div>
        )}
      </SectionContainer>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
