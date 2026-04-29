# setup-cloudflare.ps1
# مساعد اختياري لإعداد بيئة Cloudflare محلياً — ليس مطلوباً لنشر Cloudflare Pages البسيط
# Optional helper script for local Cloudflare setup — not required for simple Cloudflare Pages deploy

Write-Host "=== wp-astro Cloudflare Setup Helper ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "هذا السكريبت اختياري. يمكنك نشر المشروع مباشرة على Cloudflare Pages."
Write-Host "This script is optional. You can deploy directly to Cloudflare Pages."
Write-Host ""

# التحقق من وجود wrangler | Check wrangler is installed
$wranglerPath = Get-Command wrangler -ErrorAction SilentlyContinue
if (-not $wranglerPath) {
    Write-Host "[!] wrangler not found. Install it: npm install -g wrangler" -ForegroundColor Red
    exit 1
}

Write-Host "[1] Logging in to Cloudflare..." -ForegroundColor Green
wrangler login

$createKv = Read-Host "[2] Create KV namespace for engagement (optional)? (y/N)"
if ($createKv -eq "y" -or $createKv -eq "Y") {
    wrangler kv:namespace create "ENGAGEMENT_KV"
    Write-Host "    Copy the namespace ID above into wrangler.toml" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Done ===" -ForegroundColor Green
Write-Host "Next: Set WORDPRESS_API_URL and SITE_URL in Cloudflare Pages dashboard."
