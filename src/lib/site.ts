export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

if (
  process.env.NODE_ENV === "production" &&
  !process.env.NEXT_PUBLIC_SITE_URL
) {
  console.warn(
    "[site] NEXT_PUBLIC_SITE_URL is not set — canonical and Open Graph URLs will point at localhost.",
  );
}
