# Coal Spark Restaurant

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full multi-page restaurant website with 7 pages: Home, Menu, Order Online, Table Reservation, About Us, Gallery, Contact
- Sticky navigation bar with logo and links
- Floating "Order Now" CTA button and floating WhatsApp support button
- Backend: menu items (with categories, price, description), cart/orders, table reservations storage

### Modify
N/A (new project)

### Remove
N/A (new project)

## Implementation Plan

### Backend (Motoko)
- `MenuItem` type: id, name, category, description, price, isVeg, isAvailable
- `CartItem` type: menuItemId, quantity
- `Order` type: id, items (CartItem[]), deliveryType (delivery/pickup), address, paymentMethod, status, totalAmount, createdAt
- `Reservation` type: id, name, phone, date, time, guests, specialRequests, status, createdAt
- `Review` type: id, name, rating, comment, createdAt
- Stable vars for menu, orders, reservations, reviews
- Seeded menu data across all 8 categories
- CRUD: getMenu, getMenuByCategory, placeOrder, getOrder, createReservation, getReservations, addReview, getReviews

### Frontend Pages

**1. Home Page (`/`)**
- Full-screen hero with large food background image, headline "Authentic Biryani, Mandi & Charcoal Grills in HSR Bangalore", Order Online + Reserve Table CTAs
- Featured dishes carousel (3-4 dishes)
- Restaurant story section (short, 2-3 sentences)
- Popular menu highlights grid (6 dishes)
- Customer reviews carousel (Google-style rating display)
- Instagram-style photo gallery grid (6 images)
- Google rating badge section (4.7 stars, 500+ reviews)

**2. Menu Page (`/menu`)**
- Category tab filter: Mandi, Biryani & Rice, BBQ & Grills, Tandoor, Main Course, Chinese, Desserts, Drinks
- Dish cards: image, name, price, veg/non-veg badge, Add to Cart button, quantity stepper
- Cart summary sidebar / bottom sheet on mobile
- Cart persisted in React state (shared via context)

**3. Order Online Page (`/order`)**
- Cart review with item list, quantity controls, remove item
- Delivery / Pickup toggle
- Address input form (for delivery)
- Order summary with subtotal, delivery fee, total
- Payment method selection: UPI, Card, Cash on Delivery
- Place Order button with confirmation state

**4. Table Reservation Page (`/reservation`)**
- Reservation form: Name, Phone, Date, Time, Number of Guests (1-20), Special Requests
- Visual seating layout diagram: Family seating (large booths), Mandi seating (floor-level), Regular tables
- Success confirmation state

**5. About Us Page (`/about`)**
- Full story: Arabian & Mughlai inspiration, charcoal cooking philosophy, fresh ingredients sourcing, family dining vision
- Key stats: year founded, dishes, happy customers
- Chef/team section placeholder

**6. Gallery Page (`/gallery`)**
- Masonry/grid layout with category filter tabs: Food, Ambience, Dining, BBQ Grill
- Lightbox modal on image click

**7. Contact Page (`/contact`)**
- Static Google Maps embed (iframe) for HSR Layout location
- Phone number with click-to-call link
- WhatsApp button (opens wa.me link)
- Opening hours table
- Parking info text block
- Address display

### Shared Components
- `Navbar`: sticky, dark background, logo "Coal Spark", nav links, Cart icon with badge count
- `FloatingOrderButton`: fixed bottom-right "Order Now" pill button
- `FloatingWhatsApp`: fixed bottom-left WhatsApp icon button
- `CartContext`: React context for cart state management across pages
- `Footer`: address, quick links, social icons, copyright
