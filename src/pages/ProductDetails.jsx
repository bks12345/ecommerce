import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Minus, Plus, Star, ChevronRight, Check, X } from "lucide-react";
import * as productService from "../services/productService";
import * as categoryService from "../services/categoryService";
import { getProductImage, getProductImageFallback } from "../data/images";
import PriceTag from "../components/ui/PriceTag";
import SafeImage from "../components/ui/SafeImage";
import ProductCard from "../components/ui/ProductCard";
import ComingSoon from "./ComingSoon";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    setQuantity(1);

    productService
      .getProduct(id)
      .then(async (p) => {
        if (cancelled) return;
        setProduct(p);
        const [cat, relatedProducts] = await Promise.all([
          categoryService.getCategory(p.category).catch(() => null),
          productService.getRelatedProducts(p),
        ]);
        if (cancelled) return;
        setCategory(cat);
        setRelated(relatedProducts);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (notFound) {
    return <ComingSoon title="Product not found" />;
  }

  if (loading || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 animate-pulse">
          <div className="bg-basil-50 rounded-3xl h-80 sm:h-[26rem]" />
          <div className="flex flex-col gap-3">
            <div className="h-3 w-24 bg-basil-50 rounded-full" />
            <div className="h-8 w-3/4 bg-basil-50 rounded-full" />
            <div className="h-4 w-40 bg-basil-50 rounded-full mt-2" />
            <div className="h-8 w-32 bg-basil-50 rounded-full mt-4" />
            <div className="h-20 w-full bg-basil-50 rounded-2xl mt-4" />
          </div>
        </div>
      </div>
    );
  }

  const saved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-ink-soft mb-8">
        <Link to="/" className="hover:text-basil-600">Home</Link>
        <ChevronRight size={14} />
        <Link to="/shop" className="hover:text-basil-600">Shop</Link>
        {category && (
          <>
            <ChevronRight size={14} />
            <Link to={`/shop?category=${category.id}`} className="hover:text-basil-600">
              {category.name}
            </Link>
          </>
        )}
        <ChevronRight size={14} />
        <span className="text-ink line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <div className="relative bg-basil-50 rounded-3xl h-80 sm:h-[26rem] overflow-hidden shadow-elevated">
          <SafeImage
            src={getProductImage(product)}
            fallbackSrc={getProductImageFallback(product)}
            alt={product.name}
            fallbackEmoji={product.icon}
            className="w-full h-full object-cover"
            emojiClassName="text-[7rem] sm:text-[9rem] h-full"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            {product.isBulk && (
              <span className="text-xs font-semibold bg-mango-400 text-basil-900 px-2.5 py-1 rounded-full">
                Bulk Pack
              </span>
            )}
            {product.oldPrice && (
              <span className="text-xs font-semibold bg-tomato-500 text-white px-2.5 py-1 rounded-full">
                Sale
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-wide text-ink-soft/70">
            {product.brand}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink mt-1">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mt-3 text-sm">
            <div className="flex items-center gap-1 text-mango-500">
              <Star size={16} className="fill-mango-400 text-mango-400" />
              <span className="font-medium text-ink">{product.rating}</span>
            </div>
            <span className="text-ink-soft">({product.reviewsCount} reviews)</span>
            <span className="text-ink-soft/40">•</span>
            <span className={product.inStock ? "text-basil-600 font-medium" : "text-tomato-500 font-medium"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="mt-5">
            <PriceTag price={product.price} oldPrice={product.oldPrice} size="lg" />
            <p className="text-sm text-ink-soft mt-1.5">{product.weight}</p>
            {product.bulkNote && (
              <p className="text-sm text-basil-600 font-medium mt-1">{product.bulkNote}</p>
            )}
          </div>

          <p className="text-ink-soft leading-relaxed mt-5 max-w-lg">
            {product.description}
          </p>

          {/* Quantity + actions */}
          <div className="flex flex-wrap items-center gap-3 mt-7">
            <div className="flex items-center bg-white shadow-soft rounded-full">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-10 h-10 flex items-center justify-center hover:bg-basil-50 rounded-full transition-colors"
              >
                <Minus size={15} />
              </button>
              <span className="w-8 text-center font-medium" aria-live="polite">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-10 h-10 flex items-center justify-center hover:bg-basil-50 rounded-full transition-colors"
              >
                <Plus size={15} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-basil-600 text-white font-medium hover:bg-basil-700 hover:shadow-glow transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {added ? (
                <>
                  <Check size={17} /> Added
                </>
              ) : (
                "Add to Cart"
              )}
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              aria-pressed={saved}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-soft hover:shadow-soft-lg transition-shadow"
            >
              <Heart
                size={18}
                className={saved ? "fill-tomato-500 text-tomato-500" : "text-ink-soft"}
              />
            </button>
          </div>

          {!product.inStock && (
            <p className="flex items-center gap-1.5 text-sm text-tomato-500 mt-3">
              <X size={15} /> Currently unavailable — check back soon.
            </p>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-semibold text-ink mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
