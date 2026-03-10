import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Float "mo:core/Float";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Order "mo:core/Order";

actor {
  module MenuItemCompare {
    public func compare(item1 : MenuItem, item2 : MenuItem) : Order.Order {
      Nat.compare(item1.id, item2.id);
    };
  };

  type MenuItem = {
    id : Nat;
    name : Text;
    category : Text;
    description : Text;
    price : Float;
    isVeg : Bool;
    isAvailable : Bool;
  };

  module OrderCompare {
    public func compare(order1 : Order, order2 : Order) : Order.Order {
      Nat.compare(order1.id, order2.id);
    };
  };

  type CartItem = {
    menuItemId : Nat;
    quantity : Nat;
  };

  type Order = {
    id : Nat;
    items : [CartItem];
    deliveryType : Text;
    address : Text;
    paymentMethod : Text;
    status : Text;
    totalAmount : Float;
    createdAt : Int;
  };

  module ReservationCompare {
    public func compare(reservation1 : Reservation, reservation2 : Reservation) : Order.Order {
      Nat.compare(reservation1.id, reservation2.id);
    };
  };

  type Reservation = {
    id : Nat;
    name : Text;
    phone : Text;
    date : Text;
    time : Text;
    guests : Nat;
    specialRequests : Text;
    status : Text;
    createdAt : Int;
  };

  module ReviewCompare {
    public func compare(review1 : Review, review2 : Review) : Order.Order {
      Nat.compare(review1.id, review2.id);
    };
  };

  type Review = {
    id : Nat;
    name : Text;
    rating : Nat;
    comment : Text;
    createdAt : Int;
  };

  let menuItems = Map.empty<Nat, MenuItem>();
  let orders = Map.empty<Nat, Order>();
  let reservations = Map.empty<Nat, Reservation>();
  let reviews = Map.empty<Nat, Review>();

  var nextOrderId = 1;
  var nextReservationId = 1;
  var nextReviewId = 1;

  public shared ({ caller }) func placeOrder(items : [CartItem], deliveryType : Text, address : Text, paymentMethod : Text, totalAmount : Float) : async Nat {
    let orderId = nextOrderId;
    let order : Order = {
      id = orderId;
      items;
      deliveryType;
      address;
      paymentMethod;
      status = "pending";
      totalAmount;
      createdAt = Time.now();
    };

    orders.add(orderId, order);
    nextOrderId += 1;
    orderId;
  };

  public query ({ caller }) func getOrder(id : Nat) : async ?Order {
    orders.get(id);
  };

  public shared ({ caller }) func createReservation(name : Text, phone : Text, date : Text, time : Text, guests : Nat, specialRequests : Text) : async Nat {
    let reservationId = nextReservationId;
    let reservation : Reservation = {
      id = reservationId;
      name;
      phone;
      date;
      time;
      guests;
      specialRequests;
      status = "pending";
      createdAt = Time.now();
    };

    reservations.add(reservationId, reservation);
    nextReservationId += 1;
    reservationId;
  };

  public query ({ caller }) func getReservations() : async [Reservation] {
    reservations.values().toArray();
  };

  public query ({ caller }) func getReservation(id : Nat) : async ?Reservation {
    reservations.get(id);
  };

  public shared ({ caller }) func addReview(name : Text, rating : Nat, comment : Text) : async Nat {
    let reviewId = nextReviewId;
    let review : Review = {
      id = reviewId;
      name;
      rating;
      comment;
      createdAt = Time.now();
    };

    reviews.add(reviewId, review);
    nextReviewId += 1;
    reviewId;
  };

  public query ({ caller }) func getReviews() : async [Review] {
    reviews.values().toArray();
  };

  public query ({ caller }) func getMenu() : async [MenuItem] {
    let allItems = menuItems.values().toArray();
    allItems.filter(
      func(item) {
        item.isAvailable;
      }
    );
  };

  public query ({ caller }) func getMenuByCategory(category : Text) : async [MenuItem] {
    let filteredItems = menuItems.values().toArray().filter(
      func(item) {
        item.category.contains(#text category) and item.isAvailable
      }
    );
    filteredItems.sort();
  };
};
