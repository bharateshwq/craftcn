import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
}

export function SectionContainer({ children, className }: SectionContainerProps) {
  return (
    <section className={cn('w-full px-4 py-12 md:px-6 md:py-16 lg:px-8', className)}>
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-8 md:mb-12', className)}>
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-pretty">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-lg text-pretty">{subtitle}</p>}
    </div>
  );
}
