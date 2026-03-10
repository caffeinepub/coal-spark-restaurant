import { Button } from "@/components/ui/button";
import { Car, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";

const HOURS = [
  { days: "Monday – Thursday", hours: "12:00 PM – 11:00 PM" },
  { days: "Friday", hours: "12:00 PM – 11:30 PM" },
  { days: "Saturday", hours: "12:00 PM – 11:30 PM" },
  { days: "Sunday", hours: "12:00 PM – 11:30 PM" },
];

export function ContactPage() {
  return (
    <main data-ocid="contact.page" className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-56 md:h-72 flex items-end overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/restaurant-interior.dim_1200x800.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coal/40 via-coal/60 to-coal/95" />
        <div className="relative z-10 container mx-auto px-4 md:px-6 pb-8">
          <span className="text-ember font-body text-sm font-semibold uppercase tracking-widest mb-2 block">
            Get in Touch
          </span>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-white">
            Find <span className="text-gradient-ember">Us</span>
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
          {/* Left — Contact Info */}
          <div className="space-y-7">
            {/* Restaurant name & address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <h2 className="font-display font-bold text-2xl text-gold mb-4">
                Coal Spark Restaurant
              </h2>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="h-5 w-5 text-ember flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-body font-medium">
                    27th Main, HSR Layout
                  </p>
                  <p className="text-muted-foreground font-body text-sm">
                    Sector 2, Bangalore - 560102
                  </p>
                  <p className="text-muted-foreground font-body text-sm">
                    Karnataka, India
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <a
                  data-ocid="contact.phone.link"
                  href="tel:+918088001234"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ash border border-border text-foreground hover:border-ember/50 hover:text-ember font-body font-medium text-sm transition-all duration-200"
                >
                  <Phone className="h-4 w-4" />
                  +91 80880 01234
                </a>
                <a
                  data-ocid="contact.whatsapp.button"
                  href="https://wa.me/918088001234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-full font-body font-semibold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </div>
            </motion.div>

            {/* Opening hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <h3 className="font-display font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-ember" />
                Opening Hours
              </h3>
              <div className="space-y-2.5">
                {HOURS.map((h) => (
                  <div
                    key={h.days}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <span className="font-body text-sm text-foreground">
                      {h.days}
                    </span>
                    <span className="font-body text-sm font-semibold text-gold">
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Parking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <h3 className="font-display font-semibold text-foreground text-lg mb-3 flex items-center gap-2">
                <Car className="h-5 w-5 text-ember" />
                Parking & Access
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed text-sm">
                🅿️ <strong className="text-foreground">Free parking</strong>{" "}
                available on 27th Main street and in the nearby BBMP parking lot
                (2-minute walk). Valet service available for weekend evenings.
              </p>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <h3 className="font-display font-semibold text-foreground text-lg mb-3 flex items-center gap-2">
                <Mail className="h-5 w-5 text-ember" />
                Email
              </h3>
              <a
                href="mailto:hello@coalspark.in"
                className="text-ember hover:text-gold transition-colors font-body"
              >
                hello@coalspark.in
              </a>
              <p className="text-muted-foreground text-sm font-body mt-1">
                For large group bookings, corporate events, and catering
                inquiries.
              </p>
            </motion.div>
          </div>

          {/* Right — Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="rounded-2xl overflow-hidden border border-border shadow-ember-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5806406749647!2d77.63948!3d12.91225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1517f0000001%3A0x5f3b2fc8f0000001!2sHSR%20Layout%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
                data-ocid="contact.map_marker"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Coal Spark Restaurant Location"
                className="grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* Quick info cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <div className="text-2xl mb-1">🚇</div>
                <p className="font-body font-semibold text-foreground text-sm">
                  Metro Access
                </p>
                <p className="text-muted-foreground text-xs">
                  HSR Layout Station (1.2 km)
                </p>
              </div>
              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <div className="text-2xl mb-1">🛵</div>
                <p className="font-body font-semibold text-foreground text-sm">
                  Delivery
                </p>
                <p className="text-muted-foreground text-xs">
                  Swiggy & Zomato available
                </p>
              </div>
              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <div className="text-2xl mb-1">🎉</div>
                <p className="font-body font-semibold text-foreground text-sm">
                  Private Events
                </p>
                <p className="text-muted-foreground text-xs">Up to 80 guests</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <div className="text-2xl mb-1">♿</div>
                <p className="font-body font-semibold text-foreground text-sm">
                  Accessible
                </p>
                <p className="text-muted-foreground text-xs">
                  Wheelchair friendly
                </p>
              </div>
            </div>

            {/* Reserve CTA */}
            <div className="bg-card rounded-2xl border border-ember/30 p-6 text-center bg-gradient-to-br from-ember/5 to-transparent">
              <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                Ready to Visit?
              </h3>
              <p className="text-muted-foreground font-body text-sm mb-4">
                Reserve your table online or call us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  className="bg-ember hover:bg-ember/90 text-white rounded-full font-body font-semibold px-7"
                >
                  <a href="/reservation">Reserve Table</a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-border rounded-full font-body"
                >
                  <a href="tel:+918088001234">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
