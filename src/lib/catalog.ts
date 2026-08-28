import productsJson from "@/data/products.json";
import collectionsJson from "@/data/collections.json";
import colProductsJson from "@/data/collection-products.json";

export type Product = {
  id: number;
  handle: string;
  title: string;
  type: string;
  price: number;
  compareAt: number | null;
  available: boolean;
  tags: string[];
  description: string;
  images: string[];
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  image: string | null;
  count: number;
};

export const products = productsJson as Product[];
export const collections = collectionsJson as Collection[];
const membership = colProductsJson as Record<string, string[]>;

const byHandle = new Map(products.map((p) => [p.handle, p]));

export function getProduct(handle: string) {
  return byHandle.get(handle);
}

export function getCollection(handle: string) {
  return collections.find((c) => c.handle === handle);
}

/**
 * Products in a collection, in storefront order. Short collections are topped
 * up from the Earrings pool so grids never render half-empty.
 */
export function collectionProducts(handle: string, limit?: number): Product[] {
  const own = (membership[handle] ?? [])
    .map((h) => byHandle.get(h))
    .filter((p): p is Product => Boolean(p));

  if (limit === undefined) return own;
  if (own.length >= limit) return own.slice(0, limit);

  const taken = new Set(own.map((p) => p.handle));
  const filler = (membership["earrings"] ?? [])
    .map((h) => byHandle.get(h))
    .filter((p): p is Product => Boolean(p) && !taken.has(p!.handle));

  return [...own, ...filler].slice(0, limit);
}

/** Cover art for a collection — its own image, else its first product shot. */
export function collectionImage(handle: string): string | null {
  const col = getCollection(handle);
  if (col?.image) return col.image;
  return collectionProducts(handle, 1)[0]?.images[0] ?? null;
}

/** The four hero bestsellers featured on the live homepage. */
export const bestsellerHandles = [
  "sterling-silver-silver-cascade-chains-earring",
  "sterling-silver-designer-monarch-elegance-drop-earring",
  "sterling-silver-floral-radiance-indo-western-earring",
  "sterling-silver-heritage-anarkali-rani-style-earring-with-self-antique-design",
];

export function bestsellers(): Product[] {
  const picked = bestsellerHandles
    .map((h) => byHandle.get(h))
    .filter((p): p is Product => Boolean(p));
  if (picked.length === bestsellerHandles.length) return picked;
  return collectionProducts("earrings", 4);
}

export const priceRange = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
};

/** Tags that carry no styling signal and never belong on a card chip. */
const BOILERPLATE =
  /^(925|92\.5 silver|earrings?|pendants?|handcrafted|sterling silver|silver-play|.*batch|.*drop|statement)$/i;

/**
 * Short style label for a product card — the first tag that actually describes
 * the piece, title-cased. Falls back to the product type.
 */
export function chipFor(product: Product) {
  const tag = product.tags.find((t) => !BOILERPLATE.test(t.trim()));
  const label = tag ?? product.type ?? "Silver";
  return label
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * One-line descriptor for a product, pulled from the opening sentence of its
 * storefront description. Used as a card subtitle.
 */
export function taglineFor(product: Product, max = 52) {
  const body = product.description
    .replace(/^\s*Product Overview:\s*/i, "")
    .trim();

  const sentence = body.split(/(?<=[.!?])\s/)[0] ?? body;
  const clean = sentence.replace(/[.\s]+$/, "");

  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}
