import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

const ALL_IMAGES = [
  {
    src: "/assets/generated/biryani-handi.dim_800x800.jpg",
    alt: "Chicken Dum Biryani",
    category: "Food",
    caption: "Chicken Dum Biryani",
  },
  {
    src: "/assets/generated/restaurant-interior.dim_1200x800.jpg",
    alt: "Restaurant Interior",
    category: "Ambience",
    caption: "Our Dining Hall",
  },
  {
    src: "/assets/generated/mutton-mandi.dim_800x800.jpg",
    alt: "Mutton Mandi",
    category: "Food",
    caption: "Whole Mutton Mandi",
  },
  {
    src: "/assets/generated/bbq-grill.dim_800x800.jpg",
    alt: "BBQ Grill",
    category: "BBQ Grill",
    caption: "Charcoal BBQ Grill",
  },
  {
    src: "/assets/generated/family-dining.dim_1200x800.jpg",
    alt: "Family Dining",
    category: "Dining",
    caption: "Family Dining Experience",
  },
  {
    src: "/assets/generated/tandoor-naan.dim_800x800.jpg",
    alt: "Tandoor Naan",
    category: "Food",
    caption: "Fresh Tandoor Naan",
  },
  {
    src: "/assets/generated/main-course.dim_800x800.jpg",
    alt: "Main Course",
    category: "Food",
    caption: "Main Course Spread",
  },
  {
    src: "/assets/generated/grills-platter.dim_800x800.jpg",
    alt: "Grills Platter",
    category: "BBQ Grill",
    caption: "Mixed Grills Platter",
  },
  {
    src: "/assets/generated/desserts.dim_800x800.jpg",
    alt: "Desserts",
    category: "Food",
    caption: "Middle Eastern Desserts",
  },
  {
    src: "/assets/generated/hero-mandi.dim_1600x900.jpg",
    alt: "Mandi Feast",
    category: "Dining",
    caption: "The Grand Mandi Feast",
  },
];

const FILTER_TABS = ["All", "Food", "Ambience", "Dining", "BBQ Grill"];

export function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeFilter === "All"
      ? ALL_IMAGES
      : ALL_IMAGES.filter((img) => img.category === activeFilter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredImages.length) % filteredImages.length;
    });
  }, [filteredImages.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredImages.length;
    });
  }, [filteredImages.length]);

  return (
    <main data-ocid="gallery.page" className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-56 md:h-72 flex items-end overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/grills-platter.dim_800x800.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coal/30 via-coal/50 to-coal/95" />
        <div className="relative z-10 container mx-auto px-4 md:px-6 pb-8">
          <span className="text-ember font-body text-sm font-semibold uppercase tracking-widest mb-2 block">
            Photo Gallery
          </span>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-white">
            Food & <span className="text-gradient-ember">Ambience</span>
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-10">
        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {FILTER_TABS.map((tab) => (
            <button
              type="button"
              key={tab}
              data-ocid="gallery.filter.tab"
              onClick={() => setActiveFilter(tab)}
              className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                activeFilter === tab
                  ? "bg-ember text-white shadow-ember"
                  : "bg-ash text-muted-foreground hover:text-foreground border border-border hover:border-ember/40"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4"
          >
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="break-inside-avoid mb-3 md:mb-4"
              >
                <button
                  type="button"
                  onClick={() => openLightbox(idx)}
                  className="relative overflow-hidden rounded-xl cursor-pointer group w-full text-left"
                  aria-label={`View ${img.caption}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-coal/0 group-hover:bg-coal/60 transition-all duration-300 flex flex-col items-center justify-center gap-2">
                    <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100 transform" />
                    <p className="text-white text-sm font-body font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
                      {img.caption}
                    </p>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-2 py-1 rounded-md text-xs font-body font-medium bg-coal/80 text-ember border border-ember/30">
                      {img.category}
                    </span>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            data-ocid="gallery.lightbox.modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-coal/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-ember-lg"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-coal/80 backdrop-blur-sm text-cream font-body text-sm px-4 py-2 rounded-full border border-border">
                {filteredImages[lightboxIndex].caption}
                <span className="ml-2 text-muted-foreground text-xs">
                  {lightboxIndex + 1} / {filteredImages.length}
                </span>
              </div>

              {/* Controls */}
              <Button
                data-ocid="gallery.lightbox.close.button"
                variant="ghost"
                size="icon"
                onClick={closeLightbox}
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-coal border border-border text-cream hover:text-ember hover:bg-ash"
              >
                <X className="h-5 w-5" />
              </Button>
              <Button
                data-ocid="gallery.lightbox.prev.button"
                variant="ghost"
                size="icon"
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-coal/80 border border-border text-cream hover:text-ember hover:bg-ash"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                data-ocid="gallery.lightbox.next.button"
                variant="ghost"
                size="icon"
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-coal/80 border border-border text-cream hover:text-ember hover:bg-ash"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
