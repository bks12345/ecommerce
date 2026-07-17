import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingCart, User, Menu, X, ChevronDown, Package, LogOut } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { categories } from "../../data/categories";
import { offersMenu } from "../../data/offers";
import NavDropdown from "./NavDropdown";
import MegaMenu from "./MegaMenu";
import OffersDropdown from "./OffersDropdown";

const simpleLinks = [
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

function SearchBar({ className = "", inputId = "nav-search" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    navigate(trimmed ? `/shop?search=${encodeURIComponent(trimmed)}` : "/shop");
  };

  return (
    <form onSubmit={handleSearch} className={className}>
      <label htmlFor={inputId} className="sr-only">
        Search for products
      </label>
      <div className="relative w-full">
        <input
          id={inputId}
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for tomatoes, oat milk, bread..."
          className="w-full pl-4 pr-12 py-2.5 rounded-full bg-white shadow-soft focus:shadow-soft-lg text-sm placeholder:text-ink-soft/50 outline-none transition-shadow"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-mango-400 hover:bg-mango-500 hover:shadow-glow text-basil-900 transition-all"
        >
          <Search size={15} />
        </button>
      </div>
    </form>
  );
}

function MobileCategoryItem({ category, onNavigate }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-basil-50 last:border-b-0">
      <div className="flex items-center">
        <Link
          to={`/shop?category=${category.id}`}
          onClick={onNavigate}
          className="flex-1 py-2.5 text-sm font-medium text-ink hover:text-basil-600"
        >
          {category.name}
        </Link>
        {category.subcategories?.length > 0 && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={`${open ? "Hide" : "Show"} ${category.name} subcategories`}
            className="p-2.5 -mr-1 text-ink-soft"
          >
            <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
      {open && (
        <ul className="pb-2 pl-3 flex flex-col">
          {category.subcategories.map((sub) => (
            <li key={sub}>
              <Link
                to={`/shop?category=${category.id}&sub=${encodeURIComponent(sub)}`}
                onClick={onNavigate}
                className="block py-1.5 text-sm text-ink-soft hover:text-basil-600"
              >
                {sub}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
function MobileAccordion({ title, children }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-basil-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-basil-50 rounded-lg"
      >
        {title}
        <ChevronDown size={16} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <div className="pl-3 pb-2 max-h-[50vh] overflow-y-auto overscroll-contain">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="glass-panel backdrop-blur-xl shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 shrink-0">
            <span className="font-display text-xl font-semibold text-ink">
              Daal<span className="text-mango-500">Bhat</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-6 ml-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `relative py-1 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-basil-700 after:absolute after:-bottom-[1px] after:left-0 after:right-0 after:h-0.5 after:bg-mango-400 after:rounded-full"
                    : "text-ink-soft hover:text-basil-600"
                }`
              }
            >
              Home
            </NavLink>

            {/* Shop — mega menu */}
            <NavDropdown label="Shop" panelClassName="left-0">
              {(close) => <MegaMenu onNavigate={close} />}
            </NavDropdown>

            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `relative py-1 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-basil-700 after:absolute after:-bottom-[1px] after:left-0 after:right-0 after:h-0.5 after:bg-mango-400 after:rounded-full"
                    : "text-ink-soft hover:text-basil-600"
                }`
              }
            >
              Categories
            </NavLink>

            {/* Offers — two-level dropdown */}
            <NavDropdown label="Offers" panelClassName="left-0">
              {(close) => <OffersDropdown onNavigate={close} />}
            </NavDropdown>

            {simpleLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-basil-700 after:absolute after:-bottom-[1px] after:left-0 after:right-0 after:h-0.5 after:bg-mango-400 after:rounded-full"
                      : "text-ink-soft hover:text-basil-600"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Search - desktop */}
          <SearchBar className="hidden md:block flex-1 max-w-md ml-auto" />

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto md:ml-0">
            <Link
              to="/wishlist"
              aria-label={`Wishlist, ${wishlistItems.length} items`}
              className="relative p-2 rounded-full hover:bg-basil-50 transition-colors"
            >
              <Heart size={20} className="text-ink" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center rounded-full bg-mango-400 text-basil-900 text-[10px] font-semibold">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              aria-label={`Cart, ${itemCount} items`}
              className="relative p-2 rounded-full hover:bg-basil-50 transition-colors"
            >
              <ShoppingCart size={20} className="text-ink" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center rounded-full bg-mango-400 text-basil-900 text-[10px] font-semibold">
                  {itemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="hidden sm:block">
                <NavDropdown
                  label={
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-basil-600 text-white text-xs font-semibold">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  }
                  panelClassName="right-0"
                  hideChevron
                >
                  {(close) => (
                    <div className="w-56 p-2">
                      <div className="px-3 py-2">
                        <p className="text-sm font-medium text-ink line-clamp-1">{user.name}</p>
                        <p className="text-xs text-ink-soft/60 line-clamp-1">{user.email}</p>
                      </div>
                      <div className="border-t border-basil-100 my-1" />
                      <Link
                        to="/account"
                        onClick={close}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink hover:bg-basil-50 transition-colors"
                      >
                        <User size={15} /> My Profile
                      </Link>
                      <Link
                        to="/account"
                        onClick={close}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink hover:bg-basil-50 transition-colors"
                      >
                        <Package size={15} /> Order History
                      </Link>
                      <button
                        onClick={() => {
                          close();
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-tomato-500 hover:bg-tomato-100/50 transition-colors"
                      >
                        <LogOut size={15} /> Log Out
                      </button>
                    </div>
                  )}
                </NavDropdown>
              </div>
            ) : (
              <Link
                to="/login"
                aria-label="Log in"
                className="hidden sm:flex p-2 rounded-full hover:bg-basil-50 transition-colors"
              >
                <User size={20} className="text-ink" />
              </Link>
            )}

            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="lg:hidden p-2 rounded-full hover:bg-basil-50 transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search - mobile (always visible, own row) */}
        <div className="md:hidden pb-3">
          <SearchBar inputId="nav-search-mobile" />
        </div>

        {/* Mobile nav links */}
        {menuOpen && (
          <nav className="lg:hidden flex flex-col gap-1 pb-4 max-h-[60vh] overflow-y-auto overscroll-contain">
            <NavLink
              to="/"
              end
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? "bg-basil-50 text-basil-700" : "text-ink-soft hover:bg-basil-50"
                }`
              }
            >
              Home
            </NavLink>

            {/* Shop accordion: categories -> subcategories (tap a category to reveal its subcategories) */}
            <MobileAccordion title="Shop">
              <div className="flex flex-col">
                {categories.map((cat) => (
                  <MobileCategoryItem
                    key={cat.id}
                    category={cat}
                    onNavigate={() => setMenuOpen(false)}
                  />
                ))}
              </div>
            </MobileAccordion>

            <NavLink
              to="/categories"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? "bg-basil-50 text-basil-700" : "text-ink-soft hover:bg-basil-50"
                }`
              }
            >
              Categories
            </NavLink>

            {/* Offers accordion: group -> items */}
            <MobileAccordion title="Offers">
              <div className="flex flex-col gap-3">
                {offersMenu.map((section) => (
                  <div key={section.group}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft/60 pb-2">
                      {section.group}
                    </p>
                    <div className="mt-1 flex flex-col gap-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={() => setMenuOpen(false)}
                          className="text-sm text-ink pb-1"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </MobileAccordion>

            {simpleLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive ? "bg-basil-50 text-basil-700" : "text-ink-soft hover:bg-basil-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to="/account"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-ink-soft hover:bg-basil-50"
                >
                  My Account
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium text-tomato-500 hover:bg-tomato-100/50"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-ink-soft hover:bg-basil-50"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-basil-600 hover:bg-basil-50"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
