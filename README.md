[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/emad-masaud/wp-astro)

---

## wp-astro

**العربية:**
ربط WordPress مع Astro بدون قيود. وصّل أي موقع WordPress كـ CMS وارسم الواجهة بثيمك الخاص على Cloudflare Pages.

**English:**
Connect any WordPress site as a headless CMS and render it with your own Astro theme. Optimized for Cloudflare Pages.

---

## ما يفعله | What it does

- يجلب المحتوى من WordPress REST API
- يوفر مكون ThemeHost لتحميل أي ثيم Astro
- يعمل على Cloudflare Pages بشكل أصلي (D1 + KV اختياريان)
- لا ثيم مدمج — أنت تحضر ثيمك

---

## تشغيل سريع على Cloudflare Pages | Quick start on Cloudflare Pages

1. Fork this repo
2. Go to Cloudflare Pages → Create project → Connect your fork
3. Set these environment variables:
  - `WORDPRESS_API_URL` → e.g. `https://myblog.com`
   - `SITE_URL` → e.g. `https://myblog.pages.dev`
4. Deploy

Provide only the WordPress site base URL in `WORDPRESS_API_URL`.
The code automatically calls `/wp-json/wp/v2` under the hood.

Node recommendation: use Node 22 LTS for local build stability on Windows.
توصية Node: استخدم Node 22 LTS لتفادي مشاكل البناء المحلية على ويندوز.

---

## متغيرات البيئة | Environment variables

| Variable | Required | Description |
|---|---|---|
| `WORDPRESS_API_URL` | ✅ | WordPress REST API base URL |
| `SITE_URL` | ✅ | Your Astro site's public URL |
| `ENGAGEMENT_KV` | ⬜ Optional | Cloudflare KV binding for engagement data |

انظر `.dev.vars.example` لمثال كامل.  
See `.dev.vars.example` for a full example.

---

## D1 و KV (اختياري) | D1 & KV (optional)

يمكن ربط Cloudflare D1 وKV لتخزين بيانات التفاعل (مشاهدات، إعجابات). غير مطلوب لتشغيل wp-astro.  
D1 and KV can be bound for engagement data (views, likes). Not required to run wp-astro.

Most users do NOT need D1 or KV. If you just want to render WordPress posts, you can ignore this section.
أغلب المستخدمين ما يحتاجون D1 أو KV. لو هدفك بس تعرض مقالات ووردبرس، تجاهل هذا القسم.

---

## هيكل المشروع | Project structure

```
src/
  components/core/ThemeHost.astro   ← مكون ThemeHost الوحيد في الكور
  lib/sources/wordpress/            ← طبقة بيانات WordPress
  pages/
    example.astro
    robots.txt.ts
    sitemap.xml.ts
    api/sources/wordpress/

examples/
  wp-theme/                         ← مثال ثيم كامل (ليس جزءاً من الكور)
```

---

## الترخيص | License

MIT
