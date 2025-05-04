// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  server: { host: "127.0.0.1" },
  site: "https://franciu89.github.io",
  trailingSlash: "ignore",
});
