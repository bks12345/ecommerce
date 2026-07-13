// Image sources for categories and products.
//
// HOW TO ADD YOUR OWN PHOTOS (download & drag in — no code changes needed):
//   1. Download a photo for a category.
//   2. Rename it to match that category's id below (see `categoryImages`),
//      e.g. "fruits.jpg" for the Fruits category.
//   3. Drop it into  public/images/categories/
//   4. Refresh the site — your photo now replaces the placeholder automatically.
//
// If your file isn't a .jpg (e.g. .png or .webp), update the extension in
// `categoryImages` below to match your file.
//
// For an individual PRODUCT photo (overrides its category photo):
//   1. Save the photo as  public/images/products/<product-id>.jpg
//      (product ids are visible in src/data/products.js, e.g. "p001", "b001")
//   2. Add an `image` field to that product in products.js, e.g.
//        image: "/images/products/p001.jpg"
//
// Nothing breaks if a file is missing — SafeImage automatically tries the
// backup photo below, then finally falls back to the emoji icon.

export const categoryImages = {
  fruits: "/images/categories/fruits.jpg",
  vegetables: "/images/categories/vegetables.jpg",
  dairy: "/images/categories/dairy.jpg",
  bakery: "/images/categories/bakery.jpg",
  beverages: "/images/categories/beverages.jpg",
  snacks: "/images/categories/snacks.jpg",
  frozen: "/images/categories/frozen.jpg",
  "meat-seafood": "/images/categories/meat-seafood.jpg",
  household: "/images/categories/household.jpg",
  "personal-care": "/images/categories/personal-care.jpg",
  "baby-care": "/images/categories/baby-care.jpg",
  organic: "/images/categories/organic.jpg",
};

// Backup photos (hotlinked, freely-licensed) used automatically whenever a
// local file above hasn't been added yet. Once you drop in your own photo,
// this fallback is simply never reached for that category.
const wikimedia = (filename, width = 600) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    filename
  )}?width=${width}`;

const unsplash = (photoId, width = 600) =>
  `https://images.unsplash.com/photo-${photoId}?w=${width}&q=80&fit=crop&auto=format`;

export const categoryImagesFallback = {
  fruits: unsplash("1560806887-1e4cd0b6cbd6"),
  vegetables: unsplash("1741515043161-e97d05e5cfcc"),
  dairy: unsplash("1601436423474-51738541c1b1"),
  bakery: wikimedia("Assorted bread.jpg"),
  beverages: wikimedia("Apfelsaft.jpg"),
  snacks: wikimedia("Potato-Chips.jpg"),
  frozen: wikimedia("Frozen peas.JPG"),
  "meat-seafood": wikimedia("Raw chicken slices.jpg"),
  household: wikimedia("Afwasmiddel Una Aldi.JPG"),
  "personal-care": wikimedia("Hair wash with shampoo.jpg"),
  "baby-care": wikimedia("Baby diaper.jpg"),
  organic: wikimedia("Organic Honey.jpg"),
};

export const getCategoryImage = (categoryId) => categoryImages[categoryId];
export const getCategoryImageFallback = (categoryId) =>
  categoryImagesFallback[categoryId];

// Products borrow their category's photo unless they have their own
// `image` field set in data/products.js.
export const getProductImage = (product) =>
  product.image || categoryImages[product.category];
export const getProductImageFallback = (product) =>
  categoryImagesFallback[product.category];
