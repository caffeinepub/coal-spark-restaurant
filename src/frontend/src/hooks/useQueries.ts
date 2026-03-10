import { useMutation, useQuery } from "@tanstack/react-query";
import type { MenuItem, Reservation, Review } from "../backend.d";
import { useActor } from "./useActor";

// ── Menu ──────────────────────────────────────────────────────────────────────
export function useGetMenu() {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menu"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMenu();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetMenuByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menu", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "All") return actor.getMenu();
      return actor.getMenuByCategory(category);
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

// ── Reviews ───────────────────────────────────────────────────────────────────
export function useGetReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReviews();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAddReview() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      rating,
      comment,
    }: {
      name: string;
      rating: bigint;
      comment: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addReview(name, rating, comment);
    },
  });
}

// ── Reservations ──────────────────────────────────────────────────────────────
export function useGetReservations() {
  const { actor, isFetching } = useActor();
  return useQuery<Reservation[]>({
    queryKey: ["reservations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReservations();
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateReservation() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      phone: string;
      date: string;
      time: string;
      guests: bigint;
      specialRequests: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createReservation(
        params.name,
        params.phone,
        params.date,
        params.time,
        params.guests,
        params.specialRequests,
      );
    },
  });
}

// ── Orders ────────────────────────────────────────────────────────────────────
export function usePlaceOrder() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (params: {
      items: Array<{ menuItemId: bigint; quantity: bigint }>;
      deliveryType: string;
      address: string;
      paymentMethod: string;
      totalAmount: number;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.placeOrder(
        params.items,
        params.deliveryType,
        params.address,
        params.paymentMethod,
        params.totalAmount,
      );
    },
  });
}
