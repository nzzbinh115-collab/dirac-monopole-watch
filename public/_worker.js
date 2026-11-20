/**
 * Cloudflare Worker that serves the Next.js static export.
 *
 * Next.js `output: export` writes HTML pages and their assets to `out/`.
 * When deployed via `wrangler pages deploy out/`, Cloudflare Pages handles
 * asset serving natively. When deployed as a plain Worker with the `out/`
 * directory bundled as a site (wrangler.toml [site] section), this script
 * fetches assets from the KV asset store and falls back to index.html for
 * SPA-style navigation.
 *
 * The script also re-writes trailing-slash paths to their index.html
 * equivalents so that /library/ correctly resolves to /library/index.html.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // Rewrite directory paths to their index.html equivalent.
    if (pathname.endsWith("/")) {
      pathname = pathname + "index.html";
    } else if (!pathname.includes(".")) {
      // Paths without a file extension are page routes → append /index.html.
      pathname = pathname + "/index.html";
    }

    // Try to serve the asset from the KV namespace bound as __STATIC_CONTENT.
    try {
      const assetKey = pathname.startsWith("/") ? pathname.slice(1) : pathname;
      const asset = await env.__STATIC_CONTENT.get(assetKey, { type: "arrayBuffer" });

      if (asset !== null) {
        const contentType = getContentType(pathname);
        return new Response(asset, {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": pathname.startsWith("_next/static/")
              ? "public, max-age=31536000, immutable"
              : "public, max-age=0, must-revalidate",
          },
        });
      }
    } catch (_) {
      // Fall through to 404.
    }

    // 404 fallback.
    return new Response("Not found", { status: 404 });
  },
};

function getContentType(pathname) {
  if (pathname.endsWith(".html")) return "text/html; charset=utf-8";
  if (pathname.endsWith(".css")) return "text/css; charset=utf-8";
  if (pathname.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (pathname.endsWith(".json")) return "application/json; charset=utf-8";
  if (pathname.endsWith(".svg")) return "image/svg+xml";
  if (pathname.endsWith(".png")) return "image/png";
  if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) return "image/jpeg";
  if (pathname.endsWith(".ico")) return "image/x-icon";
  if (pathname.endsWith(".woff2")) return "font/woff2";
  if (pathname.endsWith(".woff")) return "font/woff";
  if (pathname.endsWith(".txt")) return "text/plain; charset=utf-8";
  return "application/octet-stream";
}
