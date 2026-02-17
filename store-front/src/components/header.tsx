import { useState } from "react";
import { Search, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useStore } from "@/hooks/use-store";
import { Link, useNavigate } from "@tanstack/react-router";

export function Header() {
  const navigate = useNavigate();
  const { getCartCount } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const cartCount = getCartCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate({
        to: "/search",
        search: { q: trimmed },
      });

      setSearchQuery("");
    }
  };

  const navLinks = [
    { label: "Cart", href: "/cart" },
    { label: "Wishlist", href: "/wishlist" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">ShopHub</span>
          </Link>

          {/* Search - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md"
          >
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="absolute right-0 h-full px-3"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Navigation Links */}
          <nav className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                size="sm"
                asChild
                className={link.href === "/cart" ? "relative" : ""}
              >
                <Link to={link.href}>
                  {link.label}
                  {link.href === "/cart" && cartCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            ))}
          </nav>

          {/* Mobile Menu */}
          <div className="sm:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-4 mt-8">
                  <form onSubmit={handleSearch} className="mb-4">
                    <div className="relative w-full">
                      <Input
                        type="search"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                      />
                      <Button
                        type="submit"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 h-full px-2"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Button
                        key={link.href}
                        variant="ghost"
                        className="justify-start"
                        asChild
                      >
                        <Link to={link.href}>{link.label}</Link>
                      </Button>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
