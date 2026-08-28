"use client";

/**
 * Custom next/image loader.
 *
 * Silver Play's source assets are 2–5 MB PNGs, which blow past Next's upstream
 * fetch timeout when routed through the built-in optimizer. Shopify's CDN can
 * resize them itself via the `_{width}x` filename suffix and negotiates WebP
 * from the browser's Accept header, so we hand sizing off to the CDN and skip
 * our own optimizer entirely. Non-Shopify sources pass through untouched.
 */
export default function shopifyLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}) {
  if (!/(?:cdn\.shopify\.com|silverplay\.in\/cdn)\//.test(src)) return src;

  const [path, query] = src.split("?");

  // Replace any existing size suffix so we never stack them.
  const sized = path.replace(
    /(_\d+x\d*(?:_crop_[a-z]+)?)?(\.[a-z]{3,4})$/i,
    `_${width}x$2`,
  );

  return query ? `${sized}?${query}` : sized;
}
