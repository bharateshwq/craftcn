import { type ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface ProductCardProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

export function ProductCard({ children, href, className }: ProductCardProps) {
  const content = (
    <Card
      className={cn(
        "overflow-hidden pt-0 flex flex-col h-full transition-all duration-200 hover:shadow-lg",
        className,
      )}
    >
      {children}
    </Card>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return content;
}

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, alt, className }: ProductImageProps) {
  return (
    <div
      className={cn(
        "relative w-full aspect-square  bg-muted overflow-hidden",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain  hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}

interface ProductHeaderProps {
  children: ReactNode;
  className?: string;
}

export function ProductHeader({ children, className }: ProductHeaderProps) {
  return (
    <div className={cn("flex-1 flex flex-col p-4", className)}>{children}</div>
  );
}

interface ProductTitleProps {
  children: ReactNode;
  className?: string;
}

export function ProductTitle({ children, className }: ProductTitleProps) {
  return (
    <h3 className={cn("font-semibold text-lg mb-2 line-clamp-2", className)}>
      {children}
    </h3>
  );
}

interface ProductDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function ProductDescription({
  children,
  className,
}: ProductDescriptionProps) {
  return (
    <p
      className={cn(
        "text-sm text-muted-foreground mb-4 line-clamp-2",
        className,
      )}
    >
      {children}
    </p>
  );
}

interface ProductRatingProps {
  rating: number;
  reviews: number;
  className?: string;
}

export function ProductRating({
  rating,
  reviews,
  className,
}: ProductRatingProps) {
  return (
    <div className={cn("flex items-center gap-2 mb-4 text-sm", className)}>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={
              i < Math.floor(rating)
                ? "text-yellow-500"
                : "text-muted-foreground"
            }
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-muted-foreground">
        {rating} ({reviews})
      </span>
    </div>
  );
}

interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  className?: string;
}

export function ProductPrice({
  price,
  originalPrice,
  className,
}: ProductPriceProps) {
  return (
    <div className={cn("flex items-center gap-2 mb-4", className)}>
      <span className="text-2xl font-bold">${price.toFixed(2)}</span>
      {originalPrice && (
        <span className="text-lg text-muted-foreground line-through">
          ${originalPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
}

interface ProductFooterProps {
  children: ReactNode;
  className?: string;
}

export function ProductFooter({ children, className }: ProductFooterProps) {
  return (
    <div className={cn("p-4 pt-0 flex flex-col gap-2", className)}>
      {children}
    </div>
  );
}
