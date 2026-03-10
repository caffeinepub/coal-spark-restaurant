import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Reservation {
    id: bigint;
    status: string;
    date: string;
    name: string;
    specialRequests: string;
    createdAt: bigint;
    time: string;
    phone: string;
    guests: bigint;
}
export interface MenuItem {
    id: bigint;
    name: string;
    isAvailable: boolean;
    description: string;
    category: string;
    isVeg: boolean;
    price: number;
}
export interface CartItem {
    quantity: bigint;
    menuItemId: bigint;
}
export interface Order {
    id: bigint;
    status: string;
    paymentMethod: string;
    createdAt: bigint;
    deliveryType: string;
    totalAmount: number;
    address: string;
    items: Array<CartItem>;
}
export interface Review {
    id: bigint;
    name: string;
    createdAt: bigint;
    comment: string;
    rating: bigint;
}
export interface backendInterface {
    addReview(name: string, rating: bigint, comment: string): Promise<bigint>;
    createReservation(name: string, phone: string, date: string, time: string, guests: bigint, specialRequests: string): Promise<bigint>;
    getMenu(): Promise<Array<MenuItem>>;
    getMenuByCategory(category: string): Promise<Array<MenuItem>>;
    getOrder(id: bigint): Promise<Order | null>;
    getReservation(id: bigint): Promise<Reservation | null>;
    getReservations(): Promise<Array<Reservation>>;
    getReviews(): Promise<Array<Review>>;
    placeOrder(items: Array<CartItem>, deliveryType: string, address: string, paymentMethod: string, totalAmount: number): Promise<bigint>;
}
