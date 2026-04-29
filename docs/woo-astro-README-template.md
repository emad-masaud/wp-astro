# woo-astro

**العربية:**
ربط WooCommerce مع Astro. وصّل متجر WooCommerce كـ API وارسم صفحات المنتجات بثيمك الخاص على Cloudflare Pages.

**English:**
WooCommerce integration for Astro. Connect a WooCommerce store as an API and render product pages with your own Astro theme. Cloudflare Pages ready.

---

## متغيرات البيئة | Environment variables

| Variable | Required | Description |
|---|---|---|
| `WORDPRESS_API_URL` | ✅ | WordPress REST API base URL |
| `WC_CONSUMER_KEY` | ✅ | WooCommerce consumer key |
| `WC_CONSUMER_SECRET` | ✅ | WooCommerce consumer secret |
| `SITE_URL` | ✅ | Your Astro site's public URL |

---

## تشغيل سريع على Cloudflare Pages | Quick start on Cloudflare Pages

1. Fork woo-astro repo
2. Cloudflare Pages → Create project → Connect your fork
3. Set the 4 environment variables above
4. Deploy

---

## ما يفعله | What it does

- يجلب المنتجات والفئات والطلبات من WooCommerce REST API v3
- يوفر مكون ThemeHost لعرض واجهة المتجر
- يعمل على Cloudflare Pages (D1 + KV اختياريان للسلة والجلسات)
- لا ثيم مدمج — أنت تحضر ثيمك

---

## يبنى على | Built on

- wp-astro (الكور)
- WooCommerce REST API v3

---

## الحالة | Status

قادم — مشروع مستقل سيُنشر لاحقاً.
Coming soon — standalone project to be released separately.
