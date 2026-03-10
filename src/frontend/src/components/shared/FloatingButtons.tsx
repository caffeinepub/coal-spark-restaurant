import { useNavigate } from "@tanstack/react-router";
import { MessageCircle, ShoppingBag } from "lucide-react";

export function FloatingOrderButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      data-ocid="floating.order.button"
      onClick={() => navigate({ to: "/menu" })}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-ember hover:bg-ember/90 text-white font-body font-semibold px-5 py-3 rounded-full shadow-ember-lg hover:shadow-ember transition-all duration-300 hover:-translate-y-1 group"
      aria-label="Order Now"
    >
      <ShoppingBag className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
      <span className="hidden sm:block text-sm">Order Now</span>
    </button>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      data-ocid="floating.whatsapp.button"
      href="https://wa.me/918088001234"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-13 h-13 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      style={{ backgroundColor: "#25D366", width: "52px", height: "52px" }}
      aria-label="WhatsApp Support"
    >
      <MessageCircle className="h-6 w-6 text-white fill-white" />
    </a>
  );
}
