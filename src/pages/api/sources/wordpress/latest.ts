// src/pages/api/sources/wordpress/latest.ts
// API endpoint — يرجع أحدث المقالات من WordPress
// API endpoint — returns latest posts from WordPress

import { createWordPressClient } from "../../../../lib/sources/wordpress/client";

export const GET = async ({ request }: { request: Request }) => {
  const apiUrl = import.meta.env.WORDPRESS_API_URL ?? "";
  if (!apiUrl) {
    return new Response(JSON.stringify({ error: "WORDPRESS_API_URL is not set" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? 1);
  const perPage = Number(url.searchParams.get("per_page") ?? 10);

  const client = createWordPressClient(apiUrl);

  try {
    const posts = await client.getPosts({ page, perPage });
    return new Response(JSON.stringify(posts), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
};
