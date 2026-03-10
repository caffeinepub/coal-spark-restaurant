import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Link, useLocation } from "@tanstack/react-router";
import { Flame, Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally reacts to pathname changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      data-ocid="navbar.panel"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-coal/95 backdrop-blur-md shadow-ember-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/assets/generated/logo-transparent.dim_400x200.png"
              alt="Coal Spark Restaurant"
              className="h-10 md:h-12 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="font-display font-bold text-xl text-gold hidden">
              Coal Spark
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`navbar.${link.label.toLowerCase()}.link`}
                className={`px-4 py-2 text-sm font-body font-medium rounded-md transition-colors duration-200 ${
                  location.pathname === link.to
                    ? "text-ember"
                    : "text-cream/80 hover:text-cream hover:bg-ash/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Cart */}
            <Link to="/order">
              <Button
                data-ocid="navbar.cart.button"
                variant="ghost"
                size="icon"
                className="relative text-cream hover:text-ember hover:bg-ash/50"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-ember text-white text-xs rounded-full border-0 min-w-0">
                    {totalItems > 99 ? "99+" : totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Reserve CTA */}
            <Link to="/reservation" className="hidden md:block">
              <Button
                data-ocid="navbar.reserve.button"
                className="bg-ember hover:bg-ember/90 text-white font-body font-semibold rounded-full px-5 py-2 text-sm shadow-ember transition-all duration-200 hover:shadow-ember-lg"
              >
                <Flame className="h-4 w-4 mr-1.5" />
                Reserve Table
              </Button>
            </Link>

            {/* Mobile hamburger */}
            <Button
              data-ocid="navbar.mobile_menu.toggle"
              variant="ghost"
              size="icon"
              className="md:hidden text-cream hover:text-ember hover:bg-ash/50"
              onClick={() => setIsMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="md:hidden bg-coal/98 backdrop-blur-md border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`navbar.mobile.${link.label.toLowerCase()}.link`}
                className={`px-4 py-3 text-base font-body font-medium rounded-lg transition-colors duration-200 ${
                  location.pathname === link.to
                    ? "text-ember bg-ash/50"
                    : "text-cream/80 hover:text-cream hover:bg-ash/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/reservation" className="mt-2">
              <Button className="w-full bg-ember hover:bg-ember/90 text-white font-body font-semibold rounded-full">
                <Flame className="h-4 w-4 mr-1.5" />
                Reserve Table
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
