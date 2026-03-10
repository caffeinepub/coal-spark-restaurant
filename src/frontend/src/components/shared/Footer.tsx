import { Link } from "@tanstack/react-router";
import { Clock, Facebook, Flame, Instagram, MapPin, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-card border-t border-border">
      {/* Divider */}
      <div className="divider-ember" />

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-ember/20 flex items-center justify-center">
                <Flame className="h-4 w-4 text-ember" />
              </div>
              <span className="font-display font-bold text-xl text-gold">
                Coal Spark
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Premium Biryani, Mandi & Charcoal Grills in HSR Layout, Bangalore.
              Authentic Arabian & Mughlai cuisine since 2018.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-ash flex items-center justify-center text-muted-foreground hover:text-ember hover:bg-ember/10 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-ash flex items-center justify-center text-muted-foreground hover:text-ember hover:bg-ember/10 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-semibold text-gold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "Our Menu", to: "/menu" },
                { label: "Order Online", to: "/order" },
                { label: "Reserve Table", to: "/reservation" },
                { label: "About Us", to: "/about" },
                { label: "Gallery", to: "/gallery" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-ember text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-gold mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-ember flex-shrink-0 mt-0.5" />
                <span>27th Main, HSR Layout, Sector 2, Bangalore - 560102</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Phone className="h-4 w-4 text-ember flex-shrink-0" />
                <a
                  href="tel:+918088001234"
                  className="text-muted-foreground hover:text-ember transition-colors duration-200"
                >
                  +91 80880 01234
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-ember flex-shrink-0 mt-0.5" />
                <div>
                  <p>Mon–Thu: 12:00 PM – 11:00 PM</p>
                  <p>Fri–Sun: 12:00 PM – 11:30 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display font-semibold text-gold mb-4">
              Opening Hours
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Monday – Thursday</span>
                <span className="text-cream/70">12PM – 11PM</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Friday</span>
                <span className="text-cream/70">12PM – 11:30PM</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Saturday</span>
                <span className="text-cream/70">12PM – 11:30PM</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Sunday</span>
                <span className="text-cream/70">12PM – 11:30PM</span>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <span className="text-xs text-ember">
                  🅿️ Free parking available nearby
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            © {currentYear} Coal Spark Restaurant. All rights reserved.
          </span>
          <span>
            Built with <span className="text-ember">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ember hover:text-gold transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
