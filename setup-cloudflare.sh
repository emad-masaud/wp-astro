#!/bin/bash
# setup-cloudflare.sh
# مساعد اختياري لإعداد بيئة Cloudflare محلياً — ليس مطلوباً لنشر Cloudflare Pages البسيط
# Optional helper script for local Cloudflare setup — not required for simple Cloudflare Pages deploy

echo "=== wp-astro Cloudflare Setup Helper ==="
echo ""
echo "هذا السكريبت اختياري. يمكنك نشر المشروع مباشرة على Cloudflare Pages."
echo "This script is optional. You can deploy directly to Cloudflare Pages."
echo ""

# التحقق من وجود wrangler | Check wrangler is installed
if ! command -v wrangler &> /dev/null; then
  echo "[!] wrangler not found. Install it: npm install -g wrangler"
  exit 1
fi

echo "[1] Logging in to Cloudflare..."
wrangler login

echo "[2] Creating KV namespace for engagement (optional)..."
echo "    Skip this step if you don't need engagement data."
read -p "Create KV namespace? (y/N) " CREATE_KV
if [[ "$CREATE_KV" == "y" || "$CREATE_KV" == "Y" ]]; then
  wrangler kv:namespace create "ENGAGEMENT_KV"
  echo "    Copy the namespace ID above into wrangler.toml"
fi

echo ""
echo "=== Done ==="
echo "Next: Set WORDPRESS_API_URL and SITE_URL in Cloudflare Pages dashboard."
