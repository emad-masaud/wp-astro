// src/lib/sources/wordpress/client.ts
// طبقة جلب البيانات من WordPress REST API
// WordPress REST API data fetching layer

export interface WpPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: Record<string, unknown>;
  link: string;
}

export interface WpCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
  parent: number;
}

export interface WpTag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WpPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
}

export interface FetchOptions {
  revalidateSeconds?: number;
  timeoutMs?: number;
}

function normalizeWordPressBaseUrl(input: string): string {
  const trimmed = input.trim().replace(/\/$/, "");
  return trimmed.replace(/\/wp-json(?:\/wp\/v2)?\/?$/, "");
}

function buildUrl(base: string, path: string, params?: Record<string, string | number>): string {
  // إزالة الشرطة المائلة الزائدة من النهاية
  const cleanBase = base.replace(/\/$/, "");
  const url = new URL(`${cleanBase}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  }
  return url.toString();
}

async function wpFetch<T>(url: string, options?: FetchOptions): Promise<T> {
  const controller = new AbortController();
  const timeout = options?.timeoutMs ?? 8000;
  const timerId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      throw new Error(`WordPress API error: ${res.status} ${res.statusText} — ${url}`);
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(timerId);
  }
}

export function createWordPressClient(apiUrl: string, defaultOptions?: FetchOptions) {
  const baseSiteUrl = normalizeWordPressBaseUrl(apiUrl);

  return {
    async getPosts(params?: { page?: number; perPage?: number; categoryId?: number; tagId?: number }): Promise<WpPost[]> {
      const query: Record<string, string | number> = {
        _embed: "1",
        per_page: params?.perPage ?? 10,
        page: params?.page ?? 1,
      };
      if (params?.categoryId) query.categories = params.categoryId;
      if (params?.tagId) query.tags = params.tagId;
      return wpFetch<WpPost[]>(buildUrl(baseSiteUrl, "/wp-json/wp/v2/posts", query), defaultOptions);
    },

    async getPost(slug: string): Promise<WpPost | null> {
      const posts = await wpFetch<WpPost[]>(
        buildUrl(baseSiteUrl, "/wp-json/wp/v2/posts", { slug, _embed: "1" }),
        defaultOptions
      );
      return posts[0] ?? null;
    },

    async getCategories(): Promise<WpCategory[]> {
      return wpFetch<WpCategory[]>(
        buildUrl(baseSiteUrl, "/wp-json/wp/v2/categories", { per_page: 100 }),
        defaultOptions
      );
    },

    async getTags(): Promise<WpTag[]> {
      return wpFetch<WpTag[]>(
        buildUrl(baseSiteUrl, "/wp-json/wp/v2/tags", { per_page: 100 }),
        defaultOptions
      );
    },

    async getPage(slug: string): Promise<WpPage | null> {
      const pages = await wpFetch<WpPage[]>(
        buildUrl(baseSiteUrl, "/wp-json/wp/v2/pages", { slug }),
        defaultOptions
      );
      return pages[0] ?? null;
    },
  };
}

export function createDefaultWordPressClient(options?: FetchOptions) {
  const base = import.meta.env.WORDPRESS_API_URL;
  if (!base) {
    throw new Error("WORDPRESS_API_URL is not set. Please define it in your env.");
  }
  return createWordPressClient(base, options);
}
