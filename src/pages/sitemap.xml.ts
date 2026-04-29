// src/pages/sitemap.xml.ts
// يولّد sitemap من WordPress REST API
// Generates sitemap from WordPress REST API

import { createWordPressClient } from "../lib/sources/wordpress/client";

export const GET = async () => {
  const apiUrl = import.meta.env.WORDPRESS_API_URL ?? "";
  const siteUrl = (import.meta.env.SITE_URL ?? "").replace(/\/$/, "");
  const client = createWordPressClient(apiUrl);

  let posts: { slug: string; modified: string }[] = [];
  try {
    posts = await client.getPosts({ perPage: 100 });
  } catch {
    // إذا فشل الجلب نرجع sitemap فارغ
    // Return empty sitemap on fetch failure
  }

  const urls = posts
    .map(
      (p) => `  <url>
    <loc>${siteUrl}/posts/${p.slug}</loc>
    <lastmod>${p.modified ? p.modified.split("T")[0] : ""}</lastmod>
  </url>`
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
