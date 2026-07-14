# GreenCart — Grocery Website (React + Tailwind)

## Phase 1 — Foundation & Home Page ✅
## Phase 2 — Shop, Search, Filters & Product Details ✅

### What's new in Phase 2
- **Shop page** (`/shop`): full product catalog with
  - Filters: category, price range, brand, minimum rating, in-stock only, bulk-only
  - Sort: Relevance, Price (low–high / high–low), Popularity, Latest, Best Selling
  - Search (typed in the navbar, syncs to `?search=` in the URL)
  - Pagination (8 products per page)
  - Mobile filter drawer (filters collapse into a slide-in panel on small screens)
  - Filters stay in sync with the URL, so links like `/shop?category=fruits` or `/shop?bulk=true` work directly (used by the Home page's category cards and "Explore Bulk Packs" button)
- **Product Details page** (`/product/:id`): image, price, description, stock status, quantity selector, add-to-cart with a brief "Added" confirmation, wishlist toggle, breadcrumb navigation, and a related-products section
- **Categories page** (`/categories`): browse all categories with live product counts
- Navbar search is now functional — typing and hitting enter takes you to the Shop page with results filtered

### Run it
```bash
npm install
npm run dev
```

### Folder structure additions
```
src/
  components/ui/
    FilterSidebar.jsx   Category/price/brand/rating/stock/bulk filters
    Pagination.jsx       Page controls
  pages/
    Shop.jsx              Catalog with filters, sort, search, pagination
    Categories.jsx         Category browse grid
    ProductDetails.jsx     Single product page
```

## Upcoming phases
- **Phase 3:** Cart page, Wishlist page, Checkout flow
- **Phase 4:** User Account (Login/Register/Profile/Order History)
- **Phase 5:** Admin Panel, static pages (About, FAQ, policies, Offers)
- **Phase 6:** Backend/API integration, payments, polish

## Real Images (added after Phase 2)
Categories and products now use real photos instead of emoji, sourced from stable, freely-licensed CDNs (Unsplash CDN + Wikimedia Commons `Special:FilePath`) — no manual uploads needed.

- All image sources live in **one place**: `src/data/images.js`. Swap any URL there (or add a `product.image` field to a specific product in `src/data/products.js` to override its category photo) and it updates everywhere automatically.
- Products currently borrow their category's photo (no per-product photography yet). Add a distinct `image` field per product later for a fully unique catalog.
- `components/ui/SafeImage.jsx` automatically falls back to the emoji icon if any photo fails to load (e.g. offline, ad-blocker, hotlink restrictions) — the UI never shows a broken-image icon.
- These are hotlinked, not downloaded into the repo. For a production client site, download the images and self-host them (or connect a proper product-photo pipeline / DAM) instead of relying on third-party hotlinks long-term.

## Hero Slider (added after Phase 2)
The Home page hero is now a 3-slide auto-rotating carousel (`src/components/ui/HeroSlider.jsx`):
- Autoplay every ~5.5s, pauses on hover/focus
- Left/right arrow buttons, clickable dot indicators, and keyboard arrow-key navigation
- Each slide has its own photo, eyebrow tag, heading, subtext, and CTA buttons — defined in `heroSlides` at the top of `src/pages/Home.jsx`
- Add, remove, or reorder slides by editing that array — no changes needed inside `HeroSlider.jsx` itself

## Redesigned Navigation (matches reference screenshot)
Three-tier header, all in `src/components/layout/`:
- **`AnnouncementBar.jsx`** — top strip ("Free delivery on your first order over ₹700" / "Contact support")
- **`Navbar.jsx`** — logo, nav links (active link gets a mango underline), search bar with a circular mango search button, wishlist/cart icons with live count badges, user icon, and a hamburger menu on smaller screens
- **`CategoryBar.jsx`** — horizontally-scrollable category pills; the active pill highlights automatically based on the `?category=` in the URL when you're on the Shop page

Responsive behavior:
- **Desktop (lg+):** full nav links, inline search bar, everything in one row
- **Tablet/mobile (<lg):** nav links collapse into a hamburger menu; the search bar drops to its own full-width row so it's never hidden
- **All sizes:** the category pill bar scrolls horizontally with touch/trackpad, no layout breakage
- Navbar + category bar stick together to the top on scroll; the announcement bar scrolls away (standard e-commerce pattern)

## Dropdown Menus (Mega Menu + Two-Level)
- **`Shop`** in the main nav is now a **mega menu**: hover or click opens a full-width panel showing all 12 categories, each with its subcategories (level 2), plus a promo panel on the right. Category/subcategory data lives in `src/data/categories.js` (`subcategories` field) — add or edit entries there and the menu updates automatically.
- **`Offers`** is a **two-level dropdown**: grouped sections ("Current Deals", "Savings") each containing several linked items with a short note. Data lives in `src/data/offers.js`.
- Both are built on a shared, reusable **`NavDropdown.jsx`** wrapper that handles hover-to-open (with a short close delay so moving the mouse into the panel doesn't close it), click-to-toggle, outside-click to close, and Escape to close — so any future dropdown can reuse the same component.
- **Mobile fallback:** hover menus don't work on touchscreens, so on mobile the hamburger menu shows `Shop` and `Offers` as expandable accordions instead, with the same nested content in a touch-friendly list.

## Premium & Elegant Visual Refresh
A design pass across the whole site toward a "premium & elegant" feel: soft diffused shadows, glass/frosted surfaces, refined motion, subtle gradients.

**New design tokens** (`src/index.css`):
- `shadow-soft`, `shadow-soft-lg`, `shadow-elevated`, `shadow-glow` — layered, diffused shadows (used instead of hard borders everywhere)
- `.glass-panel` / `.glass-panel-dark` — frosted glass surfaces (pair with Tailwind's `backdrop-blur-xl` utility in JSX; doing the blur as raw CSS gets its vendor prefix stripped by the build's CSS minifier, so utility classes are the reliable way to apply it)
- `.card-elevated` — the standard "card" pattern now used for product cards, category cards, and the filter sidebar: soft shadow at rest, lifts with a deeper shadow on hover

**Where it shows up:**
- **Navbar** is now true frosted glass (blurs whatever scrolls behind it)
- **Hero slider** — content sits in a glass panel over the photo (instead of text directly on a flat gradient), glass arrow buttons, richer multi-directional overlay
- **Product & category cards** — soft shadow instead of borders, lift + deepen on hover, product photos zoom slightly on hover, add-to-cart button shows a checkmark + glow briefly after adding
- **Trust bar** floats as a card slightly overlapping the hero's bottom edge
- **Bulk deals section** — subtle gradient background with soft blurred glow shapes for depth
- **Dropdowns/mega menu** — elevated soft shadow instead of a hard border
- Buttons, inputs, and pagination all use soft shadows + shadow-on-focus instead of visible borders

If you want a different direction later (more minimal, bolder/brighter, etc.), the tokens are centralized in `index.css`, so retheming is mostly a matter of adjusting values there rather than hunting through every component.

## Hero fixed height + Shop page search
- **Hero slider** now has a fixed, responsive height (`460px` mobile → `500px` tablet → `560px` desktop) instead of height that shifted between slides based on text length. Content is vertically centered within that fixed box, and long subtitles clamp to 3 lines instead of stretching the container.
- **Shop page** now has its own search input directly above the filters/results (in addition to the navbar search), so someone browsing the catalog doesn't need to scroll back up to the header to refine their search. It stays in sync with the URL (`?search=`) exactly like the navbar search does, and has its own clear (×) button.

## Scroll-to-top fix
Fixed a common single-page-app issue: React Router doesn't reset scroll position between page navigations by default (unlike a traditional multi-page site where every new page load starts at the top). This meant clicking a product while scrolled down a long list would land on the Product Details page still scrolled to that same position, showing its bottom instead of its top.

Added `src/components/layout/ScrollToTop.jsx` — a small component that watches the route and calls `window.scrollTo(0, 0)` on every navigation. It's mounted once in `App.jsx`, so it applies site-wide automatically; no need to add anything per-page.

## Adding your own photos manually
You can now drop in your own downloaded photos and the site will automatically prefer them over the built-in placeholder photos — no code changes required for categories.

**Quick version:** save a photo as `public/images/categories/<category-id>.jpg` (e.g. `fruits.jpg`, `dairy.jpg`) and refresh. Full instructions, the exact filename for every category, and how to add a photo for one specific product are in **`public/images/README.md`**.

How it works under the hood: `SafeImage` now tries your local photo first, falls back to the built-in backup photo if yours isn't there yet, and only shows the emoji icon if both fail — so the site never looks broken while you're adding photos gradually.

## Backend-Ready Architecture

The app is now structured so a real backend can be dropped in later by editing a handful of files — no component rewrites needed. This is the single most important thing to understand before connecting a real API:

### The three layers
```
src/data/          Mock "database" — plain arrays (products, categories)
src/services/       The layer components actually call — async functions
                     that currently read from data/, shaped exactly like
                     real API responses (Promises, {items, total, ...})
src/pages, components   Only ever import from services/, never from data/
```

**Why this matters:** every page (`Home`, `Shop`, `Categories`, `ProductDetails`) calls functions like `productService.queryProducts(...)` or `categoryService.getCategories()` — never the raw mock arrays directly. Swapping to a real backend means rewriting the *inside* of the functions in `src/services/*.js` to call `fetch` (via `src/services/apiClient.js`) instead of filtering a local array. The function names, parameters, and return shapes stay the same, so no page or component needs to change.

### Key files
- **`src/services/apiClient.js`** — a fetch wrapper already set up for a real backend: reads `VITE_API_BASE_URL` from `.env` (copy `.env.example`), attaches an auth token from `localStorage` if present, and throws readable errors. Not used yet — services will call `apiGet`/`apiPost`/etc. from here once there's a real endpoint to hit.
- **`src/services/productService.js`** — the important one. `queryProducts({ category, search, sort, page, pageSize, ... })` returns `{ items, total, page, pageSize, totalPages }` — exactly the shape a real paginated `GET /api/products` endpoint would return. The Shop page's filters, search, sort, and pagination all flow through this one function.
- **`src/services/categoryService.js`** — `getCategories()`, `getCategory(id)`, `getCategoryProductCounts()`.
- **`src/hooks/useAsync.js`** — the loading/error/data pattern every page uses to call a service function. Handles race conditions (if you navigate away before a request finishes, it won't set state on an unmounted page).
- **`src/components/ui/Skeletons.jsx`** — loading placeholders shown while a service call is in flight, instead of a blank page or content popping in.

### What to do when a real backend is ready
1. Set `VITE_API_BASE_URL` in `.env` to your API's URL.
2. In each `src/services/*.js` file, replace the body of each function with a call to `apiGet`/`apiPost` (from `apiClient.js`) hitting your real endpoint, keeping the same function name and return shape.
3. That's it for products/categories — every page already calls these functions and already has loading/error states.

### Cart & Wishlist — a deliberate exception
`CartContext` and `WishlistContext` stay client-side (in-memory) rather than being converted to services, and that's intentional: a shopping cart needs to work instantly for guests who haven't logged in, so it shouldn't block on a network request. Both files have comments showing exactly where to add backend sync (fetch the saved cart on login, fire a background request on each change) once auth exists — the `addItem`/`toggleWishlist` functions components already call wouldn't need to change.

## Phase 3 — Cart, Wishlist & Checkout ✅

### What's included
- **Cart page** (`/cart`): quantity controls, remove item, promo code (try `WELCOME10` for 10% off), free-delivery threshold messaging, order summary, empty state
- **Wishlist page** (`/wishlist`): grid of saved products (reuses `ProductCard`, so add-to-cart works right from the wishlist), clear-all, empty state
- **Checkout page** (`/checkout`): delivery address form, delivery method (standard/express), payment method (Cash on Delivery works; Card/UPI are shown but disabled with "coming soon," matching the spec's note that payment integration is a future step), live order summary, redirects to Cart if reached with an empty cart
- **Order Confirmation page** (`/order-confirmation`): order number, items, payment method, total, estimated delivery date; redirects home if visited directly without an order (no state to show)
- **`src/services/orderService.js`** — new service following the same backend-ready pattern as products/categories; `placeOrder()` returns `{ orderId, estimatedDelivery }` the way a real `POST /api/orders` would

### Cart & Wishlist now persist across refreshes
Both were previously pure in-memory React state, meaning a page refresh silently emptied them — not acceptable for a real store. Both now save to `localStorage` on every change and reload from it on startup (see `CartContext.jsx` / `WishlistContext.jsx`). This is separate from, and doesn't conflict with, the backend-sync notes already in those files — `localStorage` is the right interim persistence layer for guest users before real accounts exist.

### A bug I caught and fixed while testing
Placing an order calls `clearCart()`, which — combined with a naive "redirect to /cart if empty" guard on the Checkout page — created a race condition: clearing the cart made Checkout's own guard fire and bounce the user back to `/cart` instead of forward to the confirmation page. Fixed with a ref flag that tells the guard to stand down specifically when the redirect to empty-cart is caused by a just-completed order, versus someone genuinely landing on `/checkout` with nothing in their cart. Caught this by actually running the full flow end-to-end rather than testing each page in isolation.

## Phase 4 — User Account ✅

### What's included
- **Register** (`/register`), **Login** (`/login`), **Forgot Password** (`/forgot-password`) — full forms with validation and loading/error states
- **Account** (`/account`) — guarded page (redirects to `/login` if not signed in, and remembers where you were headed) with three tabs:
  - **Profile** — edit name, email, phone
  - **Order History** — real past orders, pulled from the orders placed at checkout
  - **Security** — change password
- **Navbar** now reflects login state: shows a circular avatar with a dropdown (Profile / Order History / Log Out) when signed in, or a plain login icon when signed out — both desktop and the mobile menu
- **`src/services/authService.js`** — register/login/updateProfile/changePassword/requestPasswordReset, following the same backend-ready pattern as the other services
- **`src/context/AuthContext.jsx`** — session state (current user, login/register/logout), restores the session automatically on page refresh

### How login works right now (demo mode)
There's no real backend yet, so `authService.js` keeps a small "users table" in `localStorage` — registering actually creates an account you can log into later, with real validation (wrong password correctly fails, duplicate email correctly fails). This is purely a stand-in: swapping in a real backend later means rewriting the inside of `authService.js`'s functions to call your real auth API — `AuthContext` and every page that uses `useAuth()` wouldn't need to change.

**Note for going to production:** passwords are stored as plain text in this demo setup (fine for local development/client preview, never acceptable for a real deployed site). A real backend must hash passwords — never store or compare them as-is.

### Orders are now linked to accounts
`orderService.placeOrder()` now accepts a `userId` (or `null` for guest checkout) and saves it with the order, so `getOrderHistory(userId)` can return the right person's past orders.

### Two real bugs caught while testing this end-to-end
1. **Checkout's pre-filled name/phone silently failed.** `user` loads asynchronously on refresh (session restore isn't instant), but the form only read it once via `useState`'s initial value — which runs before that finishes, so the fields stayed blank. Since they're marked `required`, this silently blocked order submission with no visible error. Fixed with a `useEffect` that fills in the fields once the user data actually arrives, without overwriting anything already typed.
2. Confirmed via the same test that the fix didn't just mask the symptom — re-ran the full register → checkout → order-history → profile-update → password-change flow and every step now completes with zero console errors.

This is exactly the kind of bug that "looks fine" in a quick manual click-through (most people test while already logged in from a previous session, so the race rarely shows up) but breaks for a real first-time user. Worth remembering as you keep building: test the *actual* sequence a new user would hit, not just each page in isolation.

## Phase 5 — Static Pages & Admin Panel ✅

### Static pages
About, Contact (working demo form), FAQ (accordion), Offers (live coupons + bulk deals + sale items), Privacy Policy, Terms & Conditions, Shipping Policy, Return & Refund Policy — all built and linked from the footer/nav. **The legal pages contain placeholder text for demonstration purposes only — have them reviewed by a qualified professional before launch.**

### Admin Panel (`/admin`)
A full admin section, guarded so only an account with `role: "admin"` can reach it (regular customers are redirected home; logged-out visitors go to `/login`).

**Demo admin login:** `admin@greencart.com` / `admin123` — seeded automatically. **Change this before showing the site to anyone outside your team.**

- **Dashboard** — stat cards (products, categories, customers, orders, revenue, out-of-stock count) plus a 7-day orders chart (via `recharts`)
- **Products** — full add/edit/delete, searchable table
- **Categories** — add/edit/delete (blocks deleting a category that still has products in it, with a clear error)
- **Orders** — every order across all customers, with a status dropdown (confirmed → shipped → delivered → cancelled)
- **Customers** — every registered account, with block/unblock (blocked accounts can't log in)
- **Coupons** — add/delete/toggle active; **these are the same coupons customers can actually apply in Cart** (see below)

### The architecture that makes this actually work
Admin changes aren't a separate, disconnected view — they affect the real storefront immediately, the same way a real database would back both:
- **`src/services/productStore.js`** / **`categoryStore.js`** — the actual source of truth: seed mock data + a localStorage "overrides" layer (added/edited/deleted). Both the customer-facing `productService`/`categoryService` and the admin services (`adminProductService`, `adminCategoryService`) read and write through these same stores.
- Add a product in Admin → Products, and it appears on the Shop page and in search immediately (verified by testing this exact flow).
- Delete a product, edit a price, add a category — all reflected site-wide, not just in the admin table.
- **`src/services/couponService.js`** — powers both Admin → Coupons *and* the Cart page's promo code field. The old hardcoded `WELCOME10` check in Cart is gone; it now validates against real coupon data, seeded with `WELCOME10` (10% off) and `BULK50` (₹50 off) by default.

### A performance issue I caught and fixed
Adding the dashboard chart pulled in `recharts`, which pushed the site's main JavaScript bundle from ~300KB to ~757KB — meaning every regular shopper would download admin-dashboard charting code they'd never use, just to browse groceries. Fixed by code-splitting the entire `/admin` section with `React.lazy` + `Suspense`, so `recharts` (and all admin code) is now its own separate bundle that only downloads if someone actually navigates to `/admin`. Confirmed via the build output: the main bundle dropped back to ~372KB, with the admin dashboard split into its own ~356KB chunk loaded on demand.

### Known limitation worth knowing
Reports (daily/weekly/monthly breakdowns, product performance, customer activity) from the original spec are represented by the dashboard's 7-day chart and stat cards rather than a full separate Reports section — a reasonable core Phase 5 scope, but worth expanding later if your client needs deeper analytics.

## Admin login requirement disabled
`/admin` is now directly accessible without logging in — no admin account needed.

**Why this is fine for now:** without a real backend, the admin "login" was only ever a frontend check. Anyone can read the source code or browser storage, so it wasn't real security to begin with — just a preview of the flow a real backend would eventually enforce server-side.

**To turn it back on** (e.g. once a real backend exists and can actually enforce this), open `src/components/admin/AdminLayout.jsx` and flip the flag at the top:
```js
const REQUIRE_ADMIN_LOGIN = false; // set back to true
```
Everything else — the seeded admin account, roles, block/unblock — is unchanged and ready to go the moment you flip it back.

**Worth remembering before this site is ever actually deployed:** an `/admin` route with no real protection means *anyone* who finds the URL can add/edit/delete products, change order statuses, and manage customers. That's fine for local development and client demos, but a real backend needs to enforce this server-side (checking the logged-in user's role on every admin API request), not just hide the UI on the frontend — a determined visitor could otherwise call the underlying functions directly.

## Grid / List View Toggle (Shop page)
The Shop page now supports two ways to browse products, toggled via two icon buttons in the toolbar (next to Sort):

- **Grid view** (default) — the existing card grid, best for scanning many products by photo
- **List view** — a horizontal layout (`ProductListItem.jsx`) with a bit more room per product: full description text, same add-to-cart and wishlist actions

Your choice is remembered in `localStorage`, so it stays as you left it next time you visit the Shop page — same pattern used for cart/wishlist persistence elsewhere in the site. Loading skeletons match whichever view is active, so switching views (or reloading) never shows a layout mismatch while data loads.

## Rename: GreenCart → DaalBhat
The brand has been renamed everywhere — navbar logo, footer, page title, browser tab title, support email (`support@daalbhat.com`), seeded admin email (`admin@daalbhat.com`), and every internal `localStorage` key prefix (`daalbhat_cart`, `daalbhat_wishlist`, etc.).

**Note if you're reviewing on a browser that already used the site under the old name:** since the storage keys changed, your browser won't find your old cart/wishlist/login session under the new keys — that data isn't lost, it's just sitting under the old `greencart_*` keys and won't be read anymore. Clear your browser's local storage (DevTools → Application → Local Storage) for a clean start, or just keep browsing — everything will save fresh under the new keys from now on.

## Fixed: dropdown menus cut off / requiring zoom-out to see fully
**Root cause found:** the mega menu (and by extension every dropdown, since they share the same component) had no height limit. On typical laptop screens, its content — 12 categories × subcategories — was often taller than the visible browser window. Two things compounded this into a real bug rather than a minor inconvenience:
1. The dropdown lives inside the **sticky header**, which stays pinned in place when you scroll the page — so scrolling the page did nothing to reveal the rest of the dropdown.
2. The dropdown panel had `overflow-hidden` with no scroll of its own, so the cut-off portion wasn't reachable *any* normal way — zooming out (which shrinks everything to fit) was the only workaround.

**Fix:** `NavDropdown.jsx` (shared by the Shop mega menu, Offers dropdown, and account menu) now caps its height to fit the visible viewport and scrolls internally when its content is taller than that — tested and confirmed working down to a 650px-tall viewport, a genuinely short laptop screen. No more zooming required.

## Emoji icons removed site-wide
Every emoji icon has been removed and replaced with proper icons, consistent with the rest of the design system:

- **`icon` field removed entirely** from `src/data/products.js` and `src/data/categories.js` — it's no longer part of the product/category data model.
- **`SafeImage.jsx`** — when a photo fails to load (both the primary and backup source), it now shows a generic `ImageOff` icon (from `lucide-react`) instead of an emoji standing in for the product.
- **Admin panel** — product/category table rows now show a colored initial-letter avatar (e.g. "F" for "Fresh Royal Gala Apples") instead of an emoji, matching the same avatar style already used for customer accounts. The "Icon (emoji)" field is gone from the Add/Edit Product form.
- **Empty states, error states, and page icons** (empty cart, empty wishlist, no search results, "coming soon," order history) all use proper `lucide-react` icons (`ShoppingCart`, `Heart`, `SearchX`, `Construction`, `Package`, etc.) instead of emoji.

Verified with an automated scan of every rendered page's text content — confirmed zero emoji characters remain anywhere in the app, admin panel included. (The only remaining non-letter symbol is the plain ★ character used in "4★ & up" rating-filter labels, which isn't an icon and wasn't part of this change.)

## Real social icons in footer
The footer's social links now use real brand icons (via `react-icons/fa6`) instead of text initials, each linking to an actual URL:

- Facebook, Instagram, Twitter/X, YouTube
- All open in a new tab with `rel="noopener noreferrer"` (safe practice for external links — prevents the new tab from being able to manipulate the original page)
- Bundle impact is negligible (~5KB) since these are just small SVGs

**To do before launch:** the URLs (`facebook.com/daalbhat`, `instagram.com/daalbhat`, etc.) are placeholders — update them in `src/components/layout/Footer.jsx` (`socialLinks` array near the top) to your real profile links. Want a different set of platforms (e.g. WhatsApp, LinkedIn, TikTok)? `react-icons/fa6` has icons for those too — swap the import and the array entry.

## Currency: Rupee → Dollar
Every ₹ symbol across the entire app has been replaced with $ — product prices, cart/checkout totals, admin dashboard revenue, coupon values, and every policy/FAQ page that mentioned pricing. Also updated the admin dashboard's revenue icon (was `IndianRupee`, now `DollarSign`) and fixed a leftover "Indian Rupees" text mention in Terms & Conditions to say "US Dollars" so the currency name matches the symbol.

**Worth knowing:** this was a symbol swap only — the actual numeric prices are unchanged (e.g. what was ₹180 is now $180). If you'd like the numbers themselves adjusted to feel realistic in USD (grocery items and the $700 free-delivery threshold were tuned for the original currency), let me know and I can rework the pricing.

## Family Bulk Packs: mobile-only slider
On mobile, the "Family Bulk Packs" section on the Home page is now a horizontally swipeable slider (scroll-snap, no extra JS needed) instead of a stacked grid — each card takes about 78% of the screen width so the next one peeks in, inviting a swipe. Tablet and desktop are unchanged and still show the full grid.
