import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/student-management-project/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My PWA App",
        short_name: "MyPWA",
        description: "A powerful PWA built with React and Vite",
        orientation: "portrait",
        start_url: "/student-management-project/",
        scope: "/student-management-project/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "vite.svg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "vite.svg",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        navigateFallback: "/offline.html",
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/your-api-url\.com\//,
            handler: "NetworkFirst",
            options: { cacheName: "api-cache" },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: "CacheFirst",
            options: { cacheName: "image-cache" },
          },
          {
            urlPattern: /\.(?:woff2|woff|ttf|otf)$/,
            handler: "CacheFirst",
            options: { cacheName: "font-cache" },
          },
        ],
      },
    }),
  ],
});
