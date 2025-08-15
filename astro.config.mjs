// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  server: { host: "127.0.0.1" },
  site: "https://franciu89.github.io",
  trailingSlash: "ignore",
  integrations: [react()],
});