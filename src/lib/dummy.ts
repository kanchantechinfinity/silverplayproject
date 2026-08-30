import type { Product } from "@/lib/catalog";

const DUMMY_IMAGE =
  "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/sterling-silver-cascade-chains-earring.png?v=1786310334";
const HANDLE_RE = /^sample-(.+)-(\d+)$/;

/**
 * Deterministic placeholder listings for a real collection whose Shopify
 * export has no products actually mapped (a real gap in the scraped data —
 * see collections/[handle]/page.tsx). Handles encode the source collection
 * so the standalone product page can regenerate the same item on demand
 * without needing to persist anything.
 */
export function makeDummyProducts(collectionHandle: string, collectionTitle: string): Product[] {
  return Array.from({ length: 6 }, (_, i) => makeDummyProduct(collectionHandle, collectionTitle, i));
}

function makeDummyProduct(collectionHandle: string, collectionTitle: string, i: number): Product {
  return {
    id: -(i + 1),
    handle: `sample-${collectionHandle}-${i + 1}`,
    title: `Sample ${collectionTitle} ${i + 1}`,
    type: collectionTitle,
    price: 2500 + i * 750,
    compareAt: i % 3 === 0 ? 2500 + i * 750 + 500 : null,
    available: i !== 4,
    tags: [collectionTitle, "Sterling Silver"],
    description: "Placeholder listing — real pieces for this collection aren't mapped in our data yet.",
    images: [DUMMY_IMAGE],
  };
}

/** Reverse a dummy handle back into the product, given the real collection's
 *  current title (kept in sync even if the collection's display name changes). */
export function dummyProductByHandle(handle: string, collectionTitle: string): Product | null {
  const m = handle.match(HANDLE_RE);
  if (!m) return null;
  const index = parseInt(m[2], 10) - 1;
  if (index < 0 || index >= 6) return null;
  return makeDummyProduct(m[1], collectionTitle, index);
}

export function dummyCollectionHandle(handle: string): string | null {
  const m = handle.match(HANDLE_RE);
  return m ? m[1] : null;
}
