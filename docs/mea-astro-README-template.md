# mea-astro

**العربية:**
ربط MeaChat وGoogle Auth مع Astro. أضف تسجيل دخول Google وعضويات المستخدمين ومحادثات MeaChat لموقعك الـ Astro على Cloudflare Pages.

**English:**
MeaChat + Google Auth integration for Astro. Add Google login, user memberships, and MeaChat conversations to your Astro site on Cloudflare Pages.

---

## متغيرات البيئة | Environment variables

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_CLIENT_ID` | ✅ | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | ✅ | Google OAuth client secret |
| `GOOGLE_REDIRECT_URI` | ✅ | OAuth redirect URI |
| `MEACHAT_BASE_URL` | ✅ | MeaChat API base URL |
| `MEACHAT_API_TOKEN` | ✅ | MeaChat API token (المستخدم يوفر مفتاحه الخاص) |
| `SITE_URL` | ✅ | Your Astro site's public URL |

---

## تشغيل سريع على Cloudflare Pages | Quick start on Cloudflare Pages

1. Fork mea-astro repo
2. Cloudflare Pages → Create project → Connect your fork
3. Set environment variables above
4. Deploy

---

## ما يفعله | What it does

- تسجيل دخول Google OAuth وربط حساب المستخدم
- إنشاء حساب MeaChat تلقائياً عند أول تسجيل دخول (auto-provision)
- إدارة جلسات المستخدمين عبر Cloudflare KV
- لا ثيم مدمج — أنت تحضر ثيمك

---

## يبنى على | Built on

- wp-astro (الكور)
- Google OAuth 2.0
- MeaChat API

---

## الحالة | Status

قادم — مشروع مستقل سيُنشر لاحقاً.
Coming soon — standalone project to be released separately.
