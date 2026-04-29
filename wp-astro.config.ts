// wp-astro.config.ts
// إعداد wp-astro — ربط WordPress مع Astro على Cloudflare
// Configuration for wp-astro — headless WordPress integration core (no fixed UI theme)

export interface WpAstroConfig {
  // مصادر البيانات — WordPress فقط في هذه المرحلة
  // Data sources — WordPress only in this phase
  sources: {
    wordpress: {
      apiUrl: string; // WordPress REST API base URL, e.g. https://myblog.com/wp-json
    };
  };

  // هوية الموقع
  // Site identity
  wordpressUrl: string;
  wpLocale?: string; // e.g. "ar", "en"
  siteName: { ar: string; en: string };
  siteDescription: { ar: string; en: string };
  siteUrl: string;

  // الترجمة
  // Localisation
  defaultLocale: string;
  supportedLocales: string[];

  // خيارات عرض المحتوى
  // Content display options
  pagination?: {
    postsPerPage: number;
  };
  sidebar?: {
    enabled: boolean;
  };
  subHeaderCategoriesCount?: number;

  // KV للمشاركة (اختياري) — Cloudflare KV binding name (optional)
  engagementKvBinding?: string;

  // SEO
  seo?: {
    defaultTitle?: string;
    titleTemplate?: string; // e.g. "%s | My Blog"
    defaultDescription?: string;
  };

  // إعدادات الجلب
  // Fetch settings
  fetch?: {
    timeoutMs?: number;
    revalidateSeconds?: number;
  };

  // Cloudflare
  cloudflare?: {
    projectName: string;
    compatibilityDate: string;
    compatibilityFlags?: string[];
  };
}

// الإعداد الافتراضي — Override in your own wp-astro.config.ts
// Default config — override values as needed
const wpAstroConfig: WpAstroConfig = {
  sources: {
    wordpress: {
      apiUrl: process.env.WORDPRESS_API_URL ?? "https://myblog.com/wp-json",
    },
  },

  wordpressUrl: process.env.WORDPRESS_API_URL ?? "https://myblog.com/wp-json",
  wpLocale: "en",

  siteName: {
    ar: "موقعي",
    en: "My Site",
  },
  siteDescription: {
    ar: "وصف الموقع",
    en: "Site description",
  },
  siteUrl: process.env.SITE_URL ?? "https://mysite.pages.dev",

  defaultLocale: "en",
  supportedLocales: ["en", "ar"],

  pagination: {
    postsPerPage: 10,
  },
  sidebar: {
    enabled: true,
  },
  subHeaderCategoriesCount: 8,

  // اختياري — Cloudflare KV binding name for engagement data
  // engagementKvBinding: "ENGAGEMENT_KV",

  seo: {
    titleTemplate: "%s | My Site",
    defaultDescription: "A headless WordPress site powered by wp-astro.",
  },

  fetch: {
    timeoutMs: 8000,
    revalidateSeconds: 60,
  },

  cloudflare: {
    projectName: "wp-astro",
    compatibilityDate: "2024-09-23",
    compatibilityFlags: ["nodejs_compat"],
  },
};

export default wpAstroConfig;
