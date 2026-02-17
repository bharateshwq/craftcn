import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  children: ReactNode;
  columns?: number;
  className?: string;
}

export function ProductGrid({
  children,
  columns = 4,
  className,
}: ProductGridProps) {
  const gridColsClass =
    {
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3",
      5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    }[columns] || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div
      className={cn(`grid ${gridColsClass} gap-4 md:gap-6 w-full`, className)}
    >
      {children}
    </div>
  );
}
