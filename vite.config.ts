import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Student Management Project",
        short_name: "MyApp",
        description: "A powerful PWA built with React and Vite",
        orientation: "portrait",
        start_url: "/student-management-project/",
        scope: "/student-management-project/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "road.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "road.png",
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
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
