import {
  Award,
  Clock,
  Flame,
  Heart,
  Sparkles,
  Star,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "motion/react";

const STATS = [
  { value: "6+", label: "Years of Flavour", icon: Clock },
  { value: "50+", label: "Menu Items", icon: UtensilsCrossed },
  { value: "500+", label: "Daily Guests", icon: Users },
  { value: "4.7", label: "Google Rating", icon: Star },
];

const STORY_SECTIONS = [
  {
    title: "Born from Fire",
    subtitle: "Our Charcoal Philosophy",
    body: "Coal Spark was born from an obsession with one ancient technique: cooking over live charcoal. Inspired by the great mandi pits of Yemen and the tandoor traditions of Mughal kitchens, our founders set out to bring these slow-fire methods to Bangalore. Every dish that leaves our kitchen carries the unmistakable signature of coal — that smoky depth, that caramelized crust, that warmth that lingers long after the last bite.",
    img: "/assets/generated/bbq-grill.dim_800x800.jpg",
    imgAlt: "BBQ Grill",
    reverse: false,
  },
  {
    title: "Fresh Every Day",
    subtitle: "No Shortcuts, Ever",
    body: "We believe great food starts before the stove. Our team visits the market every morning to handpick the freshest ingredients — plump whole chickens, cuts of lamb from trusted farms, freshly-ground spice blends, and herbs cut from the pot. We marinate overnight, we slow-cook for hours. We never reheat, never compromise. What reaches your table is prepared with the same care as it would be in a family kitchen.",
    img: "/assets/generated/main-course.dim_800x800.jpg",
    imgAlt: "Fresh Main Course",
    reverse: true,
  },
  {
    title: "A Family Affair",
    subtitle: "For Every Table, Every Occasion",
    body: "Coal Spark was designed for the joy of sharing. Whether it's a mandi spread for the whole family, a birthday celebration, or a quiet dinner for two — we've crafted every corner of our restaurant for togetherness. From our floor-cushion mandi seating that encourages communal dining, to our wide family round tables, to our warm hospitable service — we believe every meal is a memory in the making.",
    img: "/assets/generated/family-dining.dim_1200x800.jpg",
    imgAlt: "Family Dining",
    reverse: false,
  },
];

const VALUES = [
  {
    icon: Flame,
    title: "Quality",
    desc: "We never compromise on ingredients or technique. Authenticity is not negotiable.",
  },
  {
    icon: Heart,
    title: "Hospitality",
    desc: "Every guest is family. Warm, attentive service from the moment you walk in.",
  },
  {
    icon: Award,
    title: "Authenticity",
    desc: "Recipes rooted in Arabian and Mughlai tradition, perfected over 6 years.",
  },
];

export function AboutPage() {
  return (
    <main data-ocid="about.page" className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/restaurant-interior.dim_1200x800.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coal/60 via-coal/50 to-coal/90" />
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-ember font-body text-sm font-semibold uppercase tracking-widest mb-3 block">
              Est. 2018
            </span>
            <h1 className="font-display font-bold text-5xl md:text-7xl text-white">
              Our <span className="text-gradient-ember">Story</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 md:py-16 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="h-8 w-8 text-gold mx-auto mb-4" />
            <p className="font-display text-xl md:text-2xl text-foreground leading-relaxed italic">
              "We cook with coal, not shortcuts. Every ember tells a story of
              patience, tradition, and an uncompromising love for real flavour."
            </p>
            <p className="text-ember font-body font-semibold mt-4">
              — The Coal Spark Founders
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-6 w-6 text-ember mx-auto mb-2" />
                <div className="font-display font-bold text-4xl md:text-5xl text-gold mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-body text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story sections */}
      {STORY_SECTIONS.map((section, idx) => (
        <section
          key={section.title}
          className={`py-14 md:py-20 ${idx % 2 === 0 ? "bg-background" : "bg-card/50"}`}
        >
          <div className="container mx-auto px-4 md:px-6">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center ${section.reverse ? "lg:flex-row-reverse" : ""}`}
            >
              <motion.div
                initial={{ opacity: 0, x: section.reverse ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={section.reverse ? "order-2 lg:order-1" : ""}
              >
                <span className="text-ember font-body text-sm font-semibold uppercase tracking-widest mb-2 block">
                  {section.subtitle}
                </span>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-5 leading-tight">
                  {section.title}
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed text-lg">
                  {section.body}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: section.reverse ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className={section.reverse ? "order-1 lg:order-2" : ""}
              >
                <img
                  src={section.img}
                  alt={section.imgAlt}
                  className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-ember-lg"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Divider */}
      <div className="divider-ember mx-8 md:mx-auto md:max-w-4xl" />

      {/* Values */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-ember font-body text-sm font-semibold uppercase tracking-widest mb-2 block">
              What We Stand For
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
              Our <span className="text-gradient-ember">Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-card rounded-2xl border border-border p-7 card-glow text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-ember/15 flex items-center justify-center mx-auto mb-5">
                  <val.icon className="h-7 w-7 text-ember" />
                </div>
                <h3 className="font-display font-bold text-2xl text-gold mb-3">
                  {val.title}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
