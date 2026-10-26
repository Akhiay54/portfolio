// Vercel exposes its own https hostname at build time, so a deploy stays correct
// even when NEXT_PUBLIC_SITE_URL is forgotten. The explicit override wins.
const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelHost ? `https://${vercelHost}` : "http://localhost:3000")
).replace(/\/$/, "");

if (
  process.env.NODE_ENV === "production" &&
  !process.env.NEXT_PUBLIC_SITE_URL
) {
  console.warn(
    "[site] NEXT_PUBLIC_SITE_URL is not set — canonical and Open Graph URLs will point at localhost.",
  );
}
