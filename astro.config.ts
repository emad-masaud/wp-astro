// astro.config.ts
// إعداد Astro مع Cloudflare adapter
// Astro config with Cloudflare adapter

import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "server",
  image: {
    // Cloudflare adapter in this setup uses passthrough images (no Astro optimization pipeline).
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
});
