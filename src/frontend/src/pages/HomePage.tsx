import type { MenuItem } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useGetReviews } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Flame,
  Plus,
  ShoppingCart,
  Star,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

// Static featured dishes for immediate display
const FEATURED_DISHES: (Omit<MenuItem, "id"> & { id: bigint; img: string })[] =
  [
    {
      id: 1n,
      name: "Mutton Mandi",
      category: "Mandi",
      description:
        "Slow-roasted whole mutton on aromatic saffron rice, cooked in traditional coal pit",
      price: 649,
      isVeg: false,
      isAvailable: true,
      img: "/assets/generated/mutton-mandi.dim_800x800.jpg",
    },
    {
      id: 2n,
      name: "Chicken Dum Biryani",
      category: "Biryani & Rice",
      description:
        "Layered dum biryani with tender chicken, caramelized onions & fresh herbs",
      price: 349,
      isVeg: false,
      isAvailable: true,
      img: "/assets/generated/biryani-handi.dim_800x800.jpg",
    },
    {
      id: 3n,
      name: "BBQ Mixed Grill",
      category: "BBQ & Grills",
      description:
        "Assorted charcoal-grilled meats: chicken tikka, seekh kebab & lamb chops",
      price: 549,
      isVeg: false,
      isAvailable: true,
      img: "/assets/generated/bbq-grill.dim_800x800.jpg",
    },
    {
      id: 4n,
      name: "Kunafa & Baklava",
      category: "Desserts",
      description:
        "Traditional Middle Eastern sweets: kunafa with rose water & pistachio baklava",
      price: 199,
      isVeg: true,
      isAvailable: true,
      img: "/assets/generated/desserts.dim_800x800.jpg",
    },
  ];

const POPULAR_DISHES = [
  {
    name: "Grills Platter",
    category: "BBQ & Grills",
    price: 549,
    img: "/assets/generated/grills-platter.dim_800x800.jpg",
    isVeg: false,
  },
  {
    name: "Mutton Mandi",
    category: "Mandi",
    price: 649,
    img: "/assets/generated/mutton-mandi.dim_800x800.jpg",
    isVeg: false,
  },
  {
    name: "Chicken Biryani",
    category: "Biryani & Rice",
    price: 349,
    img: "/assets/generated/biryani-handi.dim_800x800.jpg",
    isVeg: false,
  },
  {
    name: "Tandoor Naan",
    category: "Tandoor",
    price: 59,
    img: "/assets/generated/tandoor-naan.dim_800x800.jpg",
    isVeg: true,
  },
  {
    name: "Main Course Spread",
    category: "Main Course",
    price: 299,
    img: "/assets/generated/main-course.dim_800x800.jpg",
    isVeg: false,
  },
  {
    name: "Dessert Platter",
    category: "Desserts",
    price: 199,
    img: "/assets/generated/desserts.dim_800x800.jpg",
    isVeg: true,
  },
];

const STATIC_REVIEWS = [
  {
    id: 1n,
    name: "Rahul Sharma",
    rating: 5n,
    comment:
      "Best mandi in Bangalore! The whole roasted lamb is absolutely divine. The charcoal aroma is unmatched.",
    createdAt: 1700000000n,
  },
  {
    id: 2n,
    name: "Priya Nair",
    rating: 5n,
    comment:
      "Family dining at its finest. The ambiance is top-notch and the biryani is dum-perfection.",
    createdAt: 1700100000n,
  },
  {
    id: 3n,
    name: "Mohammed Farhan",
    rating: 4n,
    comment:
      "Authentic Middle Eastern flavors. Reminds me of home. The seekh kebabs are brilliant!",
    createdAt: 1700200000n,
  },
  {
    id: 4n,
    name: "Ananya Krishnan",
    rating: 5n,
    comment:
      "Every dish is a masterpiece. The mandi seating experience with floor cushions was so fun.",
    createdAt: 1700300000n,
  },
];

const GALLERY_IMAGES = [
  {
    src: "/assets/generated/grills-platter.dim_800x800.jpg",
    alt: "Grills Platter",
  },
  {
    src: "/assets/generated/restaurant-interior.dim_1200x800.jpg",
    alt: "Restaurant Interior",
  },
  {
    src: "/assets/generated/mutton-mandi.dim_800x800.jpg",
    alt: "Mutton Mandi",
  },
  {
    src: "/assets/generated/biryani-handi.dim_800x800.jpg",
    alt: "Biryani Handi",
  },
  {
    src: "/assets/generated/family-dining.dim_1200x800.jpg",
    alt: "Family Dining",
  },
  {
    src: "/assets/generated/tandoor-naan.dim_800x800.jpg",
    alt: "Tandoor Naan",
  },
];

const STATS = [
  { icon: Users, value: "500+", label: "Happy Customers Daily" },
  { icon: UtensilsCrossed, value: "8", label: "Cuisine Categories" },
  { icon: Clock, value: "Est. 2018", label: "Serving Since" },
  { icon: Star, value: "4.7", label: "Google Rating" },
];

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {(["s1", "s2", "s3", "s4", "s5"] as const).slice(0, max).map((k, i) => (
        <Star
          key={k}
          className={`h-4 w-4 ${
            i < rating ? "text-gold fill-gold" : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

export function HomePage() {
  const { data: backendReviews } = useGetReviews();
  const { addToCart } = useCart();
  const [activeFeature, setActiveFeature] = useState(0);

  const reviews =
    backendReviews && backendReviews.length > 0
      ? backendReviews
      : STATIC_REVIEWS;

  // Auto-rotate featured dishes
  useEffect(() => {
    const timer = setInterval(
      () => setActiveFeature((v) => (v + 1) % FEATURED_DISHES.length),
      4000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      {/* ── Hero Section ── */}
      <section
        data-ocid="home.hero.section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-mandi.dim_1600x900.jpg')",
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-coal/70 via-coal/50 to-coal/90" />
        {/* Ember glow at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ember/10 to-transparent" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-sm font-body mb-6">
              <Flame className="h-3.5 w-3.5" />
              HSR Layout, Bangalore
            </div>
            <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-4">
              Authentic Biryani,
              <br />
              <span className="text-gradient-ember">Mandi & Charcoal</span>
              <br />
              Grills
            </h1>
            <p className="text-cream/80 text-lg md:text-xl font-body max-w-2xl mx-auto mb-10 leading-relaxed">
              Premium Middle Eastern dining experience where fire meets flavor.
              <br className="hidden md:block" />
              Fresh ingredients, authentic recipes, unforgettable memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/order">
                <Button
                  data-ocid="hero.order.button"
                  size="lg"
                  className="bg-ember hover:bg-ember/90 text-white font-body font-semibold rounded-full px-8 py-3 text-base shadow-ember-lg hover:shadow-ember transition-all duration-300 hover:-translate-y-1"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Order Online
                </Button>
              </Link>
              <Link to="/reservation">
                <Button
                  data-ocid="hero.reserve.button"
                  variant="outline"
                  size="lg"
                  className="border-gold/50 text-gold hover:bg-gold/10 hover:border-gold font-body font-semibold rounded-full px-8 py-3 text-base transition-all duration-300 hover:-translate-y-1"
                >
                  Reserve Table
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cream/40 animate-float">
          <span className="text-xs font-body">Scroll to explore</span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="bg-ash border-y border-border py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center gap-1"
              >
                <stat.icon className="h-5 w-5 text-ember mb-1" />
                <span className="font-display font-bold text-2xl text-gold">
                  {stat.value}
                </span>
                <span className="text-muted-foreground text-xs font-body">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Dishes ── */}
      <section
        data-ocid="home.featured.section"
        className="py-16 md:py-24 bg-background"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-ember font-body text-sm font-semibold uppercase tracking-widest mb-2 block">
              Chef's Selection
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
              Featured <span className="text-gradient-ember">Dishes</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-body">
              Handpicked favourites crafted with charcoal-fire perfection
            </p>
          </motion.div>

          {/* Desktop Grid / Mobile Horizontal Scroll */}
          <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible scrollbar-none snap-x snap-mandatory">
            {FEATURED_DISHES.map((dish, idx) => (
              <motion.div
                key={dish.id.toString()}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex-shrink-0 w-72 md:w-auto snap-start"
              >
                <div className="bg-card rounded-xl overflow-hidden border border-border card-glow group">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display font-semibold text-foreground text-lg leading-tight">
                        {dish.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`text-xs flex-shrink-0 ${dish.isVeg ? "border-green-500/50 text-green-400" : "border-ember/50 text-ember"}`}
                      >
                        {dish.isVeg ? "Veg" : "Non-Veg"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed line-clamp-2">
                      {dish.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-gold text-xl">
                        ₹{dish.price}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(dish)}
                        className="bg-ember hover:bg-ember/90 text-white rounded-full font-body text-xs px-4"
                      >
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dot indicators for mobile */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {FEATURED_DISHES.map((dish, i) => (
              <button
                type="button"
                key={dish.id.toString()}
                onClick={() => setActiveFeature(i)}
                className={`rounded-full transition-all duration-300 ${activeFeature === i ? "w-6 h-2 bg-ember" : "w-2 h-2 bg-muted"}`}
                aria-label={`View dish ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section Divider ── */}
      <div className="divider-ember mx-8 md:mx-auto md:max-w-4xl" />

      {/* ── Restaurant Story ── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <span className="text-ember font-body text-sm font-semibold uppercase tracking-widest mb-3 block">
                Our Story
              </span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-5 leading-tight">
                Where Fire Meets{" "}
                <span className="text-gradient-ember">Flavor</span>
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                Born from a deep passion for Arabian and Mughlai culinary
                traditions, Coal Spark opened its doors in 2018 with a single
                vision: to bring the authentic flavors of Middle Eastern
                charcoal cooking to Bangalore.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                Every dish is crafted with respect for tradition — from our
                slow-cooked mutton mandi in underground coal pits to our
                fragrant biryani sealed with dum. We source the freshest
                ingredients daily and never compromise on authenticity.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {STATS.slice(0, 3).map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-3 bg-ash rounded-xl border border-border"
                  >
                    <div className="font-display font-bold text-2xl text-gold">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-xs font-body mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/about">
                <Button
                  variant="outline"
                  className="border-ember/40 text-ember hover:bg-ember/10 rounded-full font-body"
                >
                  Our Full Story
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <img
                  src="/assets/generated/restaurant-interior.dim_1200x800.jpg"
                  alt="Restaurant Interior"
                  className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-ember-lg"
                  loading="lazy"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-5 -left-5 bg-coal border border-border p-4 rounded-xl shadow-ember">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-ember/20 flex items-center justify-center">
                      <Flame className="h-5 w-5 text-ember" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-gold text-sm">
                        Coal Cooking
                      </div>
                      <div className="text-muted-foreground text-xs">
                        Authentic Method
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Popular Menu Highlights ── */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-ember font-body text-sm font-semibold uppercase tracking-widest mb-2 block">
              Popular Picks
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
              Must-Try <span className="text-gradient-ember">Dishes</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_DISHES.map((dish, idx) => (
              <motion.div
                key={dish.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <div className="flex gap-3 bg-card rounded-xl p-3 border border-border card-glow group cursor-pointer">
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-foreground truncate">
                          {dish.name}
                        </h3>
                        <div
                          className={`w-3 h-3 rounded-sm border flex-shrink-0 ${dish.isVeg ? "border-green-500" : "border-red-500"}`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full m-auto mt-0.5 ${dish.isVeg ? "bg-green-500" : "bg-red-500"}`}
                          />
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs text-muted-foreground"
                      >
                        {dish.category}
                      </Badge>
                    </div>
                    <span className="font-display font-bold text-gold">
                      ₹{dish.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/menu">
              <Button className="bg-ember hover:bg-ember/90 text-white rounded-full font-body font-semibold px-8">
                View Full Menu
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Customer Reviews ── */}
      <section
        data-ocid="home.reviews.section"
        className="py-16 md:py-24 bg-background"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-ember font-body text-sm font-semibold uppercase tracking-widest mb-2 block">
              What People Say
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Customer <span className="text-gradient-ember">Reviews</span>
            </h2>
            {/* Overall rating */}
            <div className="inline-flex flex-col items-center gap-2 p-5 bg-ash rounded-2xl border border-border">
              <div className="font-display font-bold text-5xl text-gold">
                4.7
              </div>
              <StarRating rating={5} />
              <p className="text-muted-foreground text-sm font-body">
                Based on 500+ Google Reviews
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.slice(0, 4).map((review, idx) => (
              <motion.div
                key={review.id.toString()}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-card rounded-xl p-5 border border-border card-glow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-ember/20 flex items-center justify-center font-display font-bold text-ember">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-body font-semibold text-foreground text-sm">
                      {review.name}
                    </div>
                    <StarRating rating={Number(review.rating)} />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm font-body leading-relaxed line-clamp-4">
                  "{review.comment}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instagram Gallery ── */}
      <section
        data-ocid="home.gallery.section"
        className="py-16 md:py-24 bg-card/30"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="text-ember font-body text-sm font-semibold uppercase tracking-widest mb-2 block">
              Gallery
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
              Food & <span className="text-gradient-ember">Ambience</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {GALLERY_IMAGES.map((img, idx) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-coal/0 group-hover:bg-coal/50 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white font-body text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.alt}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/gallery">
              <Button
                variant="outline"
                className="border-gold/40 text-gold hover:bg-gold/10 rounded-full font-body font-semibold px-8"
              >
                View Full Gallery
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Reserve CTA Banner ── */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/family-dining.dim_1200x800.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-coal/80" />
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Ready for an Unforgettable
              <br />
              <span className="text-gradient-ember">Dining Experience?</span>
            </h2>
            <p className="text-cream/70 font-body mb-8 max-w-lg mx-auto">
              Book your table today and experience the magic of authentic
              charcoal-grilled cuisine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/reservation">
                <Button
                  size="lg"
                  className="bg-ember hover:bg-ember/90 text-white font-body font-semibold rounded-full px-10 shadow-ember-lg"
                >
                  <Flame className="h-5 w-5 mr-2" />
                  Reserve Your Table
                </Button>
              </Link>
              <Link to="/menu">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-cream/30 text-cream hover:bg-cream/10 font-body font-semibold rounded-full px-10"
                >
                  Browse Menu
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
