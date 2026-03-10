import type { MenuItem } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";
import { useGetMenu } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { Flame, Minus, Plus, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const CATEGORIES = [
  "All",
  "Mandi",
  "Biryani & Rice",
  "BBQ & Grills",
  "Tandoor",
  "Main Course",
  "Chinese",
  "Desserts",
  "Drinks",
];

const CATEGORY_IMAGE_MAP: Record<string, string> = {
  Mandi: "/assets/generated/mutton-mandi.dim_800x800.jpg",
  "Biryani & Rice": "/assets/generated/biryani-handi.dim_800x800.jpg",
  "BBQ & Grills": "/assets/generated/bbq-grill.dim_800x800.jpg",
  Tandoor: "/assets/generated/tandoor-naan.dim_800x800.jpg",
  "Main Course": "/assets/generated/main-course.dim_800x800.jpg",
  Chinese: "/assets/generated/main-course.dim_800x800.jpg",
  Desserts: "/assets/generated/desserts.dim_800x800.jpg",
  Drinks: "/assets/generated/main-course.dim_800x800.jpg",
};

// Static fallback menu
const STATIC_MENU: MenuItem[] = [
  {
    id: 1n,
    name: "Mutton Mandi",
    category: "Mandi",
    description:
      "Whole roasted mutton on saffron rice, cooked in traditional coal pit",
    price: 649,
    isVeg: false,
    isAvailable: true,
  },
  {
    id: 2n,
    name: "Chicken Mandi",
    category: "Mandi",
    description:
      "Tender whole chicken mandi with aromatic rice and special mandi spices",
    price: 449,
    isVeg: false,
    isAvailable: true,
  },
  {
    id: 3n,
    name: "Fish Mandi",
    category: "Mandi",
    description:
      "Grilled fish served on bed of basmati rice with mandi seasoning",
    price: 549,
    isVeg: false,
    isAvailable: true,
  },
  {
    id: 4n,
    name: "Chicken Dum Biryani",
    category: "Biryani & Rice",
    description:
      "Slow-cooked dum biryani with marinated chicken, caramelized onions",
    price: 349,
    isVeg: false,
    isAvailable: true,
  },
  {
    id: 5n,
    name: "Mutton Biryani",
    category: "Biryani & Rice",
    description: "Tender mutton pieces layered with fragrant basmati rice",
    price: 449,
    isVeg: false,
    isAvailable: true,
  },
  {
    id: 6n,
    name: "Veg Biryani",
    category: "Biryani & Rice",
    description:
      "Aromatic vegetable biryani with seasonal vegetables and whole spices",
    price: 249,
    isVeg: true,
    isAvailable: true,
  },
  {
    id: 7n,
    name: "Prawn Biryani",
    category: "Biryani & Rice",
    description: "Juicy prawns cooked in spiced biryani with fresh herbs",
    price: 499,
    isVeg: false,
    isAvailable: true,
  },
  {
    id: 8n,
    name: "BBQ Mixed Grill",
    category: "BBQ & Grills",
    description:
      "Assorted charcoal grills: chicken tikka, seekh kebab, lamb chops",
    price: 549,
    isVeg: false,
    isAvailable: true,
  },
  {
    id: 9n,
    name: "Chicken Tikka",
    category: "BBQ & Grills",
    description:
      "Marinated chicken chargrilled to perfection with smoky flavors",
    price: 329,
    isVeg: false,
    isAvailable: true,
  },
  {
    id: 10n,
    name: "Seekh Kebab",
    category: "BBQ & Grills",
    description: "Minced meat skewers seasoned with fresh spices, coal grilled",
    price: 299,
    isVeg: false,
    isAvailable: true,
  },
  {
    id: 11n,
    name: "Paneer Tikka",
    category: "BBQ & Grills",
    description:
      "Chargrilled cottage cheese cubes with bell peppers and onions",
    price: 279,
    isVeg: true,
    isAvailable: true,
  },
  {
    id: 12n,
    name: "Butter Garlic Naan",
    category: "Tandoor",
    description:
      "Freshly baked naan with garlic butter glaze from clay tandoor",
    price: 79,
    isVeg: true,
    isAvailable: true,
  },
  {
    id: 13n,
    name: "Lacha Paratha",
    category: "Tandoor",
    description: "Flaky layered whole wheat bread from traditional tandoor",
    price: 59,
    isVeg: true,
    isAvailable: true,
  },
  {
    id: 14n,
    name: "Tandoori Roti",
    category: "Tandoor",
    description: "Classic whole wheat roti straight from the clay oven",
    price: 49,
    isVeg: true,
    isAvailable: true,
  },
  {
    id: 15n,
    name: "Butter Chicken",
    category: "Main Course",
    description:
      "Tender chicken in rich tomato-cream gravy with butter and spices",
    price: 349,
    isVeg: false,
    isAvailable: true,
  },
  {
    id: 16n,
    name: "Mutton Rogan Josh",
    category: "Main Course",
    description: "Kashmiri slow-cooked mutton curry with whole aromatic spices",
    price: 429,
    isVeg: false,
    isAvailable: true,
  },
  {
    id: 17n,
    name: "Dal Makhani",
    category: "Main Course",
    description: "Black lentils slow-cooked overnight with cream and butter",
    price: 249,
    isVeg: true,
    isAvailable: true,
  },
  {
    id: 18n,
    name: "Veg Hakka Noodles",
    category: "Chinese",
    description:
      "Wok-tossed noodles with fresh vegetables in Indo-Chinese sauce",
    price: 199,
    isVeg: true,
    isAvailable: true,
  },
  {
    id: 19n,
    name: "Chicken Fried Rice",
    category: "Chinese",
    description:
      "Fragrant fried rice with chicken and eggs in soy-ginger sauce",
    price: 249,
    isVeg: false,
    isAvailable: true,
  },
  {
    id: 20n,
    name: "Kunafa",
    category: "Desserts",
    description:
      "Traditional Middle Eastern pastry with cheese filling and rose water",
    price: 179,
    isVeg: true,
    isAvailable: true,
  },
  {
    id: 21n,
    name: "Baklava",
    category: "Desserts",
    description: "Layered pastry with pistachios, walnuts and honey syrup",
    price: 149,
    isVeg: true,
    isAvailable: true,
  },
  {
    id: 22n,
    name: "Arabic Coffee",
    category: "Drinks",
    description: "Traditional cardamom-infused Arabic coffee served with dates",
    price: 99,
    isVeg: true,
    isAvailable: true,
  },
  {
    id: 23n,
    name: "Mango Lassi",
    category: "Drinks",
    description: "Thick and creamy mango yogurt drink with cardamom",
    price: 129,
    isVeg: true,
    isAvailable: true,
  },
];

function MenuItemCard({
  item,
  qty,
  onAdd,
  onIncrement,
  onDecrement,
}: {
  item: MenuItem;
  qty: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  const imgSrc =
    CATEGORY_IMAGE_MAP[item.category] ??
    "/assets/generated/main-course.dim_800x800.jpg";

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border card-glow group flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imgSrc}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <Badge
            variant="outline"
            className={`text-xs font-body ${item.isVeg ? "border-green-500/60 text-green-400 bg-coal/80" : "border-red-500/60 text-red-400 bg-coal/80"}`}
          >
            <div
              className={`w-2 h-2 rounded-full mr-1 ${item.isVeg ? "bg-green-500" : "bg-red-500"}`}
            />
            {item.isVeg ? "Veg" : "Non-Veg"}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge className="bg-coal/80 text-muted-foreground border-border text-xs">
            {item.category}
          </Badge>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-foreground text-lg mb-1 leading-tight">
          {item.name}
        </h3>
        <p className="text-muted-foreground text-sm font-body leading-relaxed flex-1 line-clamp-2 mb-3">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-display font-bold text-gold text-xl">
            ₹{item.price}
          </span>
          {qty === 0 ? (
            <Button
              data-ocid={`menu.item.add.button.${Number(item.id)}`}
              size="sm"
              onClick={onAdd}
              className="bg-ember hover:bg-ember/90 text-white rounded-full font-body text-sm px-4 transition-all duration-200"
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add
            </Button>
          ) : (
            <div className="flex items-center gap-2 bg-ash rounded-full border border-border px-1">
              <button
                type="button"
                onClick={onDecrement}
                className="w-7 h-7 flex items-center justify-center text-ember hover:text-foreground transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="font-body font-semibold text-foreground min-w-[1.25rem] text-center text-sm">
                {qty}
              </span>
              <button
                type="button"
                onClick={onIncrement}
                className="w-7 h-7 flex items-center justify-center text-ember hover:text-foreground transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MenuSkeleton() {
  return (
    <div
      data-ocid="menu.loading_state"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      {(["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] as const).map((k) => (
        <div
          key={k}
          className="bg-card rounded-xl overflow-hidden border border-border"
        >
          <Skeleton className="h-48 w-full skeleton-shimmer" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-5 w-3/4 skeleton-shimmer" />
            <Skeleton className="h-4 w-full skeleton-shimmer" />
            <Skeleton className="h-4 w-2/3 skeleton-shimmer" />
            <div className="flex justify-between items-center pt-1">
              <Skeleton className="h-6 w-16 skeleton-shimmer" />
              <Skeleton className="h-8 w-20 rounded-full skeleton-shimmer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: menuItems, isLoading } = useGetMenu();
  const { cartItems, addToCart, updateQty } = useCart();

  const items = menuItems && menuItems.length > 0 ? menuItems : STATIC_MENU;

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const cartTotalItems = cartItems.reduce((s, e) => s + e.quantity, 0);
  const cartTotal = cartItems.reduce(
    (s, e) => s + e.menuItem.price * e.quantity,
    0,
  );

  function getQty(id: bigint) {
    return cartItems.find((e) => e.menuItem.id === id)?.quantity ?? 0;
  }

  return (
    <main data-ocid="menu.page" className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <div className="bg-card border-b border-border py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="text-ember font-body text-sm font-semibold uppercase tracking-widest mb-2 block">
            Our Menu
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
            Crafted with{" "}
            <span className="text-gradient-ember">Fire & Passion</span>
          </h1>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Explore our authentic collection of Biryani, Mandi, Charcoal Grills
            and more.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Category tabs */}
        <div className="overflow-x-auto scrollbar-none mb-8">
          <div className="flex gap-2 pb-2 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                data-ocid="menu.category.tab"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-body font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-ember text-white shadow-ember"
                    : "bg-ash text-muted-foreground hover:text-foreground hover:bg-smoke border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Items grid */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <MenuSkeleton />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  {filteredItems.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-muted-foreground font-body">
                      <Flame className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>No items found in this category.</p>
                    </div>
                  ) : (
                    filteredItems.map((item) => (
                      <MenuItemCard
                        key={item.id.toString()}
                        item={item}
                        qty={getQty(item.id)}
                        onAdd={() => addToCart(item, 1)}
                        onIncrement={() =>
                          updateQty(item.id, getQty(item.id) + 1)
                        }
                        onDecrement={() =>
                          updateQty(item.id, getQty(item.id) - 1)
                        }
                      />
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Sidebar cart (desktop, shown only when items in cart) */}
          {cartTotalItems > 0 && (
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-xl border border-border p-5">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingCart className="h-5 w-5 text-ember" />
                  <h3 className="font-display font-semibold text-foreground">
                    Your Cart
                  </h3>
                  <Badge className="ml-auto bg-ember text-white border-0">
                    {cartTotalItems}
                  </Badge>
                </div>
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {cartItems.map((entry) => (
                    <div
                      key={entry.menuItem.id.toString()}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground font-body font-medium truncate">
                          {entry.menuItem.name}
                        </p>
                        <p className="text-muted-foreground">
                          ₹{entry.menuItem.price} × {entry.quantity}
                        </p>
                      </div>
                      <span className="text-gold font-body font-semibold">
                        ₹{entry.menuItem.price * entry.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border mt-4 pt-4 flex items-center justify-between mb-4">
                  <span className="font-body font-semibold text-foreground">
                    Total
                  </span>
                  <span className="font-display font-bold text-gold text-xl">
                    ₹{cartTotal}
                  </span>
                </div>
                <Link to="/order">
                  <Button className="w-full bg-ember hover:bg-ember/90 text-white font-body font-semibold rounded-full">
                    Place Order
                    <ShoppingCart className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile cart bottom bar */}
      {cartTotalItems > 0 && (
        <div className="fixed bottom-20 left-4 right-4 lg:hidden z-30 animate-fade-up">
          <div className="bg-ember rounded-2xl p-4 shadow-ember-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-white" />
              <span className="text-white font-body font-semibold">
                {cartTotalItems} items
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white font-display font-bold">
                ₹{cartTotal}
              </span>
              <Link to="/order">
                <Button
                  size="sm"
                  className="bg-white text-ember hover:bg-cream rounded-full font-body font-semibold text-sm px-4"
                >
                  Order Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
