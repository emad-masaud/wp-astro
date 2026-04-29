// src/lib/sources/wordpress/index.ts
// نقطة التصدير الموحدة لمصدر WordPress
// Unified export for the WordPress source

export { createWordPressClient } from "./client";
export type { WpPost, WpCategory, WpTag, WpPage, FetchOptions } from "./client";
