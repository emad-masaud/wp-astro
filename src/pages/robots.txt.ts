// src/pages/robots.txt.ts
// يولّد ملف robots.txt بناءً على SITE_URL
// Generates robots.txt based on SITE_URL

export const GET = () => {
  const siteUrl = import.meta.env.SITE_URL ?? "";
  const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
};
