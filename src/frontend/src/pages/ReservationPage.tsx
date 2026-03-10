import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReservation } from "@/hooks/useQueries";
import {
  Calendar,
  CheckCircle,
  Clock,
  Flame,
  Loader2,
  Phone,
  User,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// Generate time slots every 30 minutes from 12:00 PM to 11:00 PM
function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 12; hour <= 23; hour++) {
    for (const min of [0, 30]) {
      if (hour === 23 && min === 30) break;
      const h12 = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? "PM" : "AM";
      const minStr = min === 0 ? "00" : "30";
      slots.push(`${h12}:${minStr} ${ampm}`);
    }
  }
  return slots;
}
const TIME_SLOTS = generateTimeSlots();

// Seating layout data
const SEATING_AREAS = [
  {
    id: "family",
    label: "Family Seating",
    color: "#e8600a",
    occupied: false,
    tables: 8,
  },
  {
    id: "mandi",
    label: "Mandi Floor Seating",
    color: "#d4a017",
    occupied: false,
    tables: 6,
  },
  {
    id: "regular",
    label: "Regular Tables",
    color: "#6b7280",
    occupied: true,
    tables: 4,
  },
];

function SeatingLayout() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 md:p-6">
      <h3 className="font-display font-semibold text-foreground text-lg mb-1">
        Seating Arrangement
      </h3>
      <p className="text-muted-foreground text-sm font-body mb-5">
        Visual floor plan of our dining areas
      </p>

      {/* Floor plan SVG */}
      <div className="bg-ash rounded-xl overflow-hidden border border-border p-4 mb-4">
        <svg
          viewBox="0 0 400 300"
          className="w-full"
          role="img"
          aria-labelledby="floorplan-title"
        >
          <title id="floorplan-title">Restaurant floor plan</title>
          {/* Floor bg */}
          <rect width="400" height="300" fill="oklch(0.22 0.01 30)" rx="8" />

          {/* Entrance */}
          <rect
            x="170"
            y="270"
            width="60"
            height="20"
            fill="oklch(0.55 0.18 45 / 0.3)"
            rx="4"
          />
          <text
            x="200"
            y="284"
            textAnchor="middle"
            fill="oklch(0.55 0.18 45)"
            fontSize="9"
            fontFamily="sans-serif"
          >
            ENTRANCE
          </text>

          {/* Family Seating Area */}
          <rect
            x="20"
            y="20"
            width="170"
            height="120"
            fill="oklch(0.55 0.18 45 / 0.1)"
            rx="8"
            stroke="oklch(0.55 0.18 45 / 0.4)"
            strokeWidth="1.5"
            strokeDasharray="4,2"
          />
          <text
            x="105"
            y="38"
            textAnchor="middle"
            fill="oklch(0.55 0.18 45)"
            fontSize="10"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            Family Seating
          </text>
          {/* Round family tables */}
          {[
            [55, 70],
            [115, 70],
            [175, 70],
            [55, 115],
            [115, 115],
            [175, 115],
          ].map(([cx, cy], i) => (
            <g key={`family-${cx}-${cy}`}>
              <circle
                cx={cx}
                cy={cy}
                r="18"
                fill="oklch(0.55 0.18 45 / 0.2)"
                stroke="oklch(0.55 0.18 45)"
                strokeWidth="1.5"
              />
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fill="oklch(0.75 0.12 85)"
                fontSize="8"
                fontFamily="sans-serif"
              >
                T{i + 1}
              </text>
            </g>
          ))}

          {/* Mandi Floor Seating */}
          <rect
            x="210"
            y="20"
            width="170"
            height="130"
            fill="oklch(0.75 0.12 85 / 0.08)"
            rx="8"
            stroke="oklch(0.75 0.12 85 / 0.4)"
            strokeWidth="1.5"
            strokeDasharray="4,2"
          />
          <text
            x="295"
            y="38"
            textAnchor="middle"
            fill="oklch(0.75 0.12 85)"
            fontSize="10"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            Mandi Seating
          </text>
          {/* Arch icon */}
          <path
            d="M285 42 Q295 30 305 42"
            fill="none"
            stroke="oklch(0.75 0.12 85)"
            strokeWidth="1.5"
          />
          {/* Floor cushion seating — rectangular mats */}
          {[
            [230, 60],
            [280, 60],
            [330, 60],
            [230, 110],
            [280, 110],
            [330, 110],
          ].map(([x, y], i) => (
            <g key={`mandi-${x}-${y}`}>
              <rect
                x={x - 20}
                y={y - 14}
                width="40"
                height="28"
                fill="oklch(0.75 0.12 85 / 0.2)"
                stroke="oklch(0.75 0.12 85)"
                strokeWidth="1.5"
                rx="4"
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill="oklch(0.75 0.12 85)"
                fontSize="8"
                fontFamily="sans-serif"
              >
                M{i + 1}
              </text>
            </g>
          ))}

          {/* Regular Tables */}
          <rect
            x="20"
            y="165"
            width="360"
            height="90"
            fill="oklch(0.35 0.02 30 / 0.3)"
            rx="8"
            stroke="oklch(0.35 0.02 30 / 0.6)"
            strokeWidth="1.5"
            strokeDasharray="4,2"
          />
          <text
            x="200"
            y="182"
            textAnchor="middle"
            fill="oklch(0.65 0.02 60)"
            fontSize="10"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            Regular Tables
          </text>
          {[
            [60, 215],
            [130, 215],
            [200, 215],
            [270, 215],
            [340, 215],
          ].map(([cx, cy], i) => (
            <g key={`regular-${cx}-${cy}`}>
              <rect
                x={cx - 24}
                y={cy - 16}
                width="48"
                height="32"
                fill={
                  i < 3
                    ? "oklch(0.35 0.02 30 / 0.5)"
                    : "oklch(0.22 0.01 30 / 0.8)"
                }
                stroke={i < 3 ? "oklch(0.45 0.02 30)" : "oklch(0.28 0.02 40)"}
                strokeWidth="1.5"
                rx="4"
              />
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fill={i < 3 ? "oklch(0.65 0.02 60)" : "oklch(0.45 0.02 30)"}
                fontSize="8"
                fontFamily="sans-serif"
              >
                R{i + 1}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-3">
        <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
          <div className="w-4 h-4 rounded-sm bg-ember/20 border border-ember" />
          <span>Available — Family</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
          <div className="w-4 h-4 rounded-sm bg-gold/20 border border-gold" />
          <span>Available — Mandi</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
          <div className="w-4 h-4 rounded-sm bg-smoke/50 border border-smoke" />
          <span>Occupied</span>
        </div>
      </div>

      {/* Seating descriptions */}
      <div className="mt-5 space-y-3">
        {SEATING_AREAS.map((area) => (
          <div
            key={area.id}
            className="flex items-center justify-between p-3 bg-ash rounded-lg border border-border"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: area.color }}
              />
              <span className="font-body font-medium text-foreground text-sm">
                {area.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {area.tables} tables
              </span>
              <span
                className={`text-xs font-body font-medium ${area.occupied ? "text-red-400" : "text-green-400"}`}
              >
                {area.occupied ? "Limited" : "Available"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReservationPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: "",
  });
  const [reservationId, setReservationId] = useState<bigint | null>(null);

  const {
    mutateAsync: createReservation,
    isPending,
    isError,
  } = useCreateReservation();

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const id = await createReservation({
        name: form.name,
        phone: form.phone,
        date: form.date,
        time: form.time,
        guests: BigInt(form.guests || "2"),
        specialRequests: form.specialRequests,
      });
      setReservationId(id);
      toast.success("Table reserved successfully!");
    } catch {
      toast.error("Failed to reserve table. Please try again or call us.");
    }
  }

  if (reservationId !== null) {
    return (
      <main
        data-ocid="reservation.page"
        className="min-h-screen bg-background pt-20 flex items-center justify-center"
      >
        <motion.div
          data-ocid="reservation.success_state"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4 max-w-md mx-auto"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="font-display font-bold text-3xl text-foreground mb-3">
            Table Reserved!
          </h1>
          <p className="text-muted-foreground font-body mb-2">
            Reservation #{reservationId.toString()} confirmed.
          </p>
          <div className="bg-ash rounded-xl p-4 border border-border text-left mt-4 mb-8 space-y-2">
            <div className="flex justify-between text-sm font-body">
              <span className="text-muted-foreground">Name</span>
              <span className="text-foreground font-medium">{form.name}</span>
            </div>
            <div className="flex justify-between text-sm font-body">
              <span className="text-muted-foreground">Date</span>
              <span className="text-foreground font-medium">{form.date}</span>
            </div>
            <div className="flex justify-between text-sm font-body">
              <span className="text-muted-foreground">Time</span>
              <span className="text-foreground font-medium">{form.time}</span>
            </div>
            <div className="flex justify-between text-sm font-body">
              <span className="text-muted-foreground">Guests</span>
              <span className="text-foreground font-medium">{form.guests}</span>
            </div>
          </div>
          <p className="text-muted-foreground font-body text-sm mb-6">
            We'll contact you at {form.phone} to confirm. See you soon!
          </p>
          <Button
            onClick={() => {
              setReservationId(null);
              setForm({
                name: "",
                phone: "",
                date: "",
                time: "",
                guests: "2",
                specialRequests: "",
              });
            }}
            className="bg-ember hover:bg-ember/90 text-white rounded-full font-body font-semibold w-full"
          >
            Make Another Reservation
          </Button>
        </motion.div>
      </main>
    );
  }

  return (
    <main
      data-ocid="reservation.page"
      className="min-h-screen bg-background pt-20"
    >
      {/* Hero */}
      <div className="relative py-14 md:py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/restaurant-interior.dim_1200x800.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-coal/80" />
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <span className="text-ember font-body text-sm font-semibold uppercase tracking-widest mb-2 block">
            Book a Table
          </span>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-3">
            Reserve Your <span className="text-gradient-ember">Table</span>
          </h1>
          <p className="text-cream/70 font-body max-w-xl mx-auto">
            Reserve your spot at Coal Spark for an unforgettable dining
            experience.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reservation Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-card rounded-xl border border-border p-5 md:p-6">
              <h2 className="font-display font-semibold text-foreground text-xl mb-5 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-ember" />
                Reservation Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-1.5">
                  <Label className="font-body text-foreground/80 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-ember" /> Name *
                  </Label>
                  <Input
                    data-ocid="reservation.name.input"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Your full name"
                    required
                    className="bg-ash border-border focus-visible:ring-ember font-body"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-body text-foreground/80 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-ember" /> Phone *
                  </Label>
                  <Input
                    data-ocid="reservation.phone.input"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    type="tel"
                    required
                    className="bg-ash border-border focus-visible:ring-ember font-body"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="space-y-1.5">
                  <Label className="font-body text-foreground/80 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-ember" /> Date *
                  </Label>
                  <Input
                    data-ocid="reservation.date.input"
                    type="date"
                    value={form.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className="bg-ash border-border focus-visible:ring-ember font-body"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-body text-foreground/80 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-ember" /> Time *
                  </Label>
                  <Select
                    value={form.time}
                    onValueChange={(v) => updateField("time", v)}
                  >
                    <SelectTrigger
                      data-ocid="reservation.time.select"
                      className="bg-ash border-border focus:ring-ember font-body"
                    >
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border max-h-60">
                      {TIME_SLOTS.map((slot) => (
                        <SelectItem
                          key={slot}
                          value={slot}
                          className="font-body hover:bg-ash focus:bg-ash"
                        >
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="font-body text-foreground/80 flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-ember" /> Guests *
                  </Label>
                  <Input
                    data-ocid="reservation.guests.input"
                    type="number"
                    value={form.guests}
                    onChange={(e) => updateField("guests", e.target.value)}
                    min="1"
                    max="20"
                    required
                    className="bg-ash border-border focus-visible:ring-ember font-body"
                  />
                </div>
              </div>

              <div className="space-y-1.5 mb-5">
                <Label className="font-body text-foreground/80">
                  Special Requests
                </Label>
                <Textarea
                  data-ocid="reservation.requests.textarea"
                  value={form.specialRequests}
                  onChange={(e) =>
                    updateField("specialRequests", e.target.value)
                  }
                  placeholder="Birthday celebration, dietary requirements, seating preferences, etc."
                  rows={3}
                  className="bg-ash border-border focus-visible:ring-ember font-body resize-none"
                />
              </div>

              {isError && (
                <p
                  data-ocid="reservation.error_state"
                  className="text-destructive text-sm font-body mb-4 bg-destructive/10 p-3 rounded-lg border border-destructive/20"
                >
                  Failed to reserve table. Please call us at +91 80880 01234 or
                  try again.
                </p>
              )}

              <Button
                data-ocid="reservation.submit.button"
                type="submit"
                disabled={isPending}
                className="w-full bg-ember hover:bg-ember/90 text-white font-body font-semibold rounded-full py-3 text-base shadow-ember-lg hover:shadow-ember transition-all duration-300"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Booking Table...
                  </>
                ) : (
                  <>
                    <Flame className="h-5 w-5 mr-2" />
                    Book Table
                  </>
                )}
              </Button>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <Phone className="h-5 w-5 text-ember mx-auto mb-2" />
                <p className="font-body text-foreground text-sm font-semibold">
                  Call Us
                </p>
                <a
                  href="tel:+918088001234"
                  className="text-muted-foreground text-xs hover:text-ember transition-colors"
                >
                  +91 80880 01234
                </a>
              </div>
              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <Clock className="h-5 w-5 text-gold mx-auto mb-2" />
                <p className="font-body text-foreground text-sm font-semibold">
                  Open Daily
                </p>
                <p className="text-muted-foreground text-xs">12 PM – 11 PM</p>
              </div>
            </div>
          </form>

          {/* Seating layout */}
          <SeatingLayout />
        </div>
      </div>
    </main>
  );
}
