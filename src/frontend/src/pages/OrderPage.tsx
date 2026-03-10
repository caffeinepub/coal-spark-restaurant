import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { usePlaceOrder } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle,
  Flame,
  Loader2,
  MapPin,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const PAYMENT_METHODS = [
  { value: "upi", label: "UPI", icon: "📱" },
  { value: "card", label: "Credit / Debit Card", icon: "💳" },
  { value: "cod", label: "Cash on Delivery", icon: "💵" },
];

export function OrderPage() {
  const { cartItems, updateQty, removeFromCart, clearCart, totalPrice } =
    useCart();
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">(
    "delivery",
  );
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [orderId, setOrderId] = useState<bigint | null>(null);

  const { mutateAsync: placeOrder, isPending } = usePlaceOrder();

  const deliveryFee = deliveryType === "delivery" ? 40 : 0;
  const total = totalPrice + deliveryFee;

  async function handlePlaceOrder() {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    if (deliveryType === "delivery" && !address.trim()) {
      toast.error("Please enter a delivery address");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const id = await placeOrder({
        items: cartItems.map((e) => ({
          menuItemId: e.menuItem.id,
          quantity: BigInt(e.quantity),
        })),
        deliveryType,
        address: deliveryType === "delivery" ? address : "Pickup",
        paymentMethod,
        totalAmount: total,
      });
      setOrderId(id);
      clearCart();
      toast.success("Order placed successfully!");
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  }

  // Success state
  if (orderId !== null) {
    return (
      <main
        data-ocid="order.page"
        className="min-h-screen bg-background pt-20 flex items-center justify-center"
      >
        <motion.div
          data-ocid="order.success_state"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4 max-w-md mx-auto"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="font-display font-bold text-3xl text-foreground mb-3">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground font-body mb-3">
            Your order #{orderId.toString()} has been placed successfully.
          </p>
          <p className="text-muted-foreground font-body text-sm mb-8">
            {deliveryType === "delivery"
              ? "Your food will be delivered in 30–45 minutes."
              : "Your order will be ready for pickup in 20–25 minutes."}
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/menu">
              <Button className="w-full bg-ember hover:bg-ember/90 text-white rounded-full font-body font-semibold">
                Order More
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="outline"
                className="w-full border-border rounded-full font-body"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main data-ocid="order.page" className="min-h-screen bg-background pt-20">
      <div className="bg-card border-b border-border py-10">
        <div className="container mx-auto px-4 md:px-6">
          <span className="text-ember font-body text-sm font-semibold uppercase tracking-widest mb-2 block">
            Order Online
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground">
            Your <span className="text-gradient-ember">Order</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {cartItems.length === 0 ? (
          <div data-ocid="order.cart.empty_state" className="text-center py-24">
            <div className="w-20 h-20 rounded-full bg-ash flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="font-display font-bold text-2xl text-foreground mb-3">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground font-body mb-8">
              Browse our menu and add some delicious dishes!
            </p>
            <Link to="/menu">
              <Button className="bg-ember hover:bg-ember/90 text-white rounded-full font-body font-semibold px-8">
                <Flame className="h-4 w-4 mr-2" />
                Explore Menu
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left — Cart & Delivery */}
            <div className="lg:col-span-3 space-y-6">
              {/* Cart items */}
              <div className="bg-card rounded-xl border border-border p-5 md:p-6">
                <h2 className="font-display font-semibold text-foreground text-xl mb-4 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-ember" />
                  Cart Items
                </h2>
                <div data-ocid="order.cart.list" className="space-y-4">
                  {cartItems.map((entry, idx) => (
                    <motion.div
                      key={entry.menuItem.id.toString()}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-4 py-3 border-b border-border last:border-0"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-sm border ${entry.menuItem.isVeg ? "border-green-500" : "border-red-500"}`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full m-auto mt-0.5 ${entry.menuItem.isVeg ? "bg-green-500" : "bg-red-500"}`}
                            />
                          </div>
                          <h3 className="font-body font-semibold text-foreground truncate">
                            {entry.menuItem.name}
                          </h3>
                        </div>
                        <p className="text-muted-foreground text-sm mt-0.5">
                          ₹{entry.menuItem.price} each
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-ash rounded-full border border-border px-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateQty(entry.menuItem.id, entry.quantity - 1)
                            }
                            className="w-7 h-7 flex items-center justify-center text-ember hover:text-foreground transition-colors"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-body font-semibold text-sm min-w-[1.25rem] text-center">
                            {entry.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQty(entry.menuItem.id, entry.quantity + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center text-ember hover:text-foreground transition-colors"
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-display font-bold text-gold min-w-[3.5rem] text-right">
                          ₹{entry.menuItem.price * entry.quantity}
                        </span>
                        <button
                          type="button"
                          data-ocid={`order.item.delete_button.${idx + 1}`}
                          onClick={() => removeFromCart(entry.menuItem.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Delivery type */}
              <div className="bg-card rounded-xl border border-border p-5 md:p-6">
                <h2 className="font-display font-semibold text-foreground text-xl mb-4">
                  Delivery Type
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    data-ocid="order.delivery_type.toggle"
                    onClick={() => setDeliveryType("delivery")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                      deliveryType === "delivery"
                        ? "border-ember bg-ember/10 text-ember"
                        : "border-border text-muted-foreground hover:border-ember/50 hover:text-foreground"
                    }`}
                  >
                    <MapPin className="h-6 w-6" />
                    <span className="font-body font-semibold text-sm">
                      Home Delivery
                    </span>
                    <span className="text-xs">+₹40</span>
                  </button>
                  <button
                    type="button"
                    data-ocid="order.delivery_type.toggle"
                    onClick={() => setDeliveryType("pickup")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                      deliveryType === "pickup"
                        ? "border-ember bg-ember/10 text-ember"
                        : "border-border text-muted-foreground hover:border-ember/50 hover:text-foreground"
                    }`}
                  >
                    <Package className="h-6 w-6" />
                    <span className="font-body font-semibold text-sm">
                      Pickup
                    </span>
                    <span className="text-xs text-green-400">Free</span>
                  </button>
                </div>
              </div>

              {/* Contact & Address */}
              <div className="bg-card rounded-xl border border-border p-5 md:p-6">
                <h2 className="font-display font-semibold text-foreground text-xl mb-4">
                  Your Details
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="font-body text-foreground/80">
                        Name *
                      </Label>
                      <Input
                        data-ocid="order.name.input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="bg-ash border-border focus-visible:ring-ember font-body"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="font-body text-foreground/80">
                        Phone *
                      </Label>
                      <Input
                        data-ocid="order.phone.input"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        type="tel"
                        className="bg-ash border-border focus-visible:ring-ember font-body"
                      />
                    </div>
                  </div>
                  {deliveryType === "delivery" && (
                    <div className="space-y-1.5">
                      <Label className="font-body text-foreground/80">
                        Delivery Address *
                      </Label>
                      <Input
                        data-ocid="order.address.input"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Full delivery address with area and city"
                        className="bg-ash border-border focus-visible:ring-ember font-body"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right — Order Summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 bg-card rounded-xl border border-border p-5 md:p-6">
                <h2 className="font-display font-semibold text-foreground text-xl mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4">
                  {cartItems.map((entry) => (
                    <div
                      key={entry.menuItem.id.toString()}
                      className="flex justify-between text-sm font-body text-muted-foreground"
                    >
                      <span>
                        {entry.menuItem.name} × {entry.quantity}
                      </span>
                      <span>₹{entry.menuItem.price * entry.quantity}</span>
                    </div>
                  ))}
                </div>

                <Separator className="bg-border mb-4" />

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between font-body text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm text-muted-foreground">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? "text-green-400" : ""}>
                      {deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
                    </span>
                  </div>
                </div>

                <Separator className="bg-border mb-4" />

                <div className="flex justify-between items-center mb-6">
                  <span className="font-display font-bold text-foreground text-lg">
                    Total
                  </span>
                  <span className="font-display font-bold text-gold text-2xl">
                    ₹{total}
                  </span>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <Label className="font-body text-foreground/80 font-semibold mb-3 block">
                    Payment Method
                  </Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-2"
                  >
                    {PAYMENT_METHODS.map((method) => (
                      <Label
                        key={method.value}
                        htmlFor={`payment-${method.value}`}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                          paymentMethod === method.value
                            ? "border-ember bg-ember/10"
                            : "border-border"
                        }`}
                      >
                        <RadioGroupItem
                          data-ocid="order.payment.radio"
                          value={method.value}
                          id={`payment-${method.value}`}
                          className="border-ember text-ember"
                        />
                        <span className="text-lg">{method.icon}</span>
                        <span className="font-body font-medium text-foreground flex-1">
                          {method.label}
                        </span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                <Button
                  data-ocid="order.submit.button"
                  onClick={handlePlaceOrder}
                  disabled={isPending || cartItems.length === 0}
                  className="w-full bg-ember hover:bg-ember/90 text-white font-body font-semibold rounded-full py-3 text-base shadow-ember-lg hover:shadow-ember transition-all duration-300"
                >
                  {isPending ? (
                    <>
                      <Loader2
                        data-ocid="order.loading_state"
                        className="h-5 w-5 mr-2 animate-spin"
                      />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <Flame className="h-5 w-5 mr-2" />
                      Place Order · ₹{total}
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground font-body text-center mt-3">
                  By ordering, you agree to our terms of service
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
