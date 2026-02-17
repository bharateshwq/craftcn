'use client';

import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductDetailsContainerProps {
  children: ReactNode;
  className?: string;
}

export function ProductDetailsContainer({ children, className }: ProductDetailsContainerProps) {
  return <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12', className)}>{children}</div>;
}

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden">
        <img
          src={images[selectedImage] || images[0]}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={cn(
                'relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all',
                selectedImage === idx ? 'border-primary' : 'border-muted'
              )}
            >
              <img
                src={image}
                alt={`${productName} view ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface ProductInfoProps {
  children: ReactNode;
  className?: string;
}

export function ProductInfo({ children, className }: ProductInfoProps) {
  return <div className={cn('flex flex-col gap-6', className)}>{children}</div>;
}

interface ProductHeaderProps {
  name: string;
  category?: string;
  className?: string;
}

export function ProductInfoHeader({ name, category, className }: ProductHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {category && <Badge variant="secondary" className="w-fit">{category}</Badge>}
      <h1 className="text-4xl font-bold">{name}</h1>
    </div>
  );
}

interface ProductStatsProps {
  rating: number;
  reviews: number;
  inStock: boolean;
  className?: string;
}

export function ProductStats({ rating, reviews, inStock, className }: ProductStatsProps) {
  return (
    <div className={cn('flex items-center gap-6', className)}>
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(rating) ? 'text-yellow-500 text-xl' : 'text-muted-foreground text-xl'}>
              ★
            </span>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="text-sm">
        {inStock ? (
          <Badge variant="outline" className="bg-green-50">
            In Stock
          </Badge>
        ) : (
          <Badge variant="destructive">Out of Stock</Badge>
        )}
      </div>
    </div>
  );
}

interface ProductPricingProps {
  price: number;
  originalPrice?: number;
  className?: string;
}

export function ProductPricing({ price, originalPrice, className }: ProductPricingProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className={cn('flex items-baseline gap-4', className)}>
      <span className="text-5xl font-bold">${price.toFixed(2)}</span>
      {originalPrice && (
        <>
          <span className="text-2xl text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
          {discount > 0 && <Badge variant="destructive">{discount}% OFF</Badge>}
        </>
      )}
    </div>
  );
}

interface ProductActionsProps {
  children: ReactNode;
  className?: string;
}

export function ProductActions({ children, className }: ProductActionsProps) {
  return <div className={cn('flex flex-col gap-3', className)}>{children}</div>;
}

interface ProductSpecsProps {
  children: ReactNode;
  className?: string;
}

export function ProductSpecs({ children, className }: ProductSpecsProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="font-semibold text-lg">Specifications</h3>
      {children}
    </div>
  );
}

interface SpecItemProps {
  label: string;
  value: string;
}

export function SpecItem({ label, value }: SpecItemProps) {
  return (
    <div className="flex justify-between text-sm py-2 border-b last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
