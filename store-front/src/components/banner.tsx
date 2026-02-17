import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BannerProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function Banner({ children, title, subtitle, ctaText, ctaHref = '#', className }: BannerProps) {
  return (
    <div
      className={cn(
        'w-full bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 md:p-12 lg:p-16 flex flex-col justify-center min-h-80',
        className
      )}
    >
      {children ? (
        children
      ) : (
        <>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-pretty">{title}</h1>
          {subtitle && <p className="text-lg text-muted-foreground mb-8 text-pretty max-w-2xl">{subtitle}</p>}
          {ctaText && (
            <div className="flex">
              <Button size="lg" asChild>
                <a href={ctaHref}>{ctaText}</a>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

interface BannerContentProps {
  children: ReactNode;
  className?: string;
}

export function BannerContent({ children, className }: BannerContentProps) {
  return <div className={cn('flex flex-col justify-center', className)}>{children}</div>;
}

interface BannerTitleProps {
  children: ReactNode;
  className?: string;
}

export function BannerTitle({ children, className }: BannerTitleProps) {
  return <h1 className={cn('text-4xl md:text-5xl font-bold mb-4 text-pretty', className)}>{children}</h1>;
}

interface BannerSubtitleProps {
  children: ReactNode;
  className?: string;
}

export function BannerSubtitle({ children, className }: BannerSubtitleProps) {
  return <p className={cn('text-lg text-muted-foreground mb-8 text-pretty max-w-2xl', className)}>{children}</p>;
}

interface BannerActionsProps {
  children: ReactNode;
  className?: string;
}

export function BannerActions({ children, className }: BannerActionsProps) {
  return <div className={cn('flex gap-4', className)}>{children}</div>;
}
