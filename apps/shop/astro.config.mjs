import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    preact(),
    image(),
    compress(),
    sitemap({
      // filter **/admin/** pages
      filter: (page) => page.match(/\/admin\//),
    }),
  ],
});
