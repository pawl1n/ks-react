import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

// https://astro.build/config
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [tailwind(), preact(), image(), compress(), sitemap({
    // filter **/admin/** pages
    filter: page => page.match(/\/admin\//)
  })]
});