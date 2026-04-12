import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { LAYOUT_BG_DARK, LAYOUT_BG_LIGHT } from "./src/theme/canvasBackground.ts";
import { STORAGE_THEME_MODE } from "./src/theme/storageKeys.ts";

/** `canvasBackground.ts`와 동일 값 — 빌드 시 index.html 인라인 스크립트에 주입 */
function firstPaintInlineScript(): string {
  const key = JSON.stringify(STORAGE_THEME_MODE);
  const light = JSON.stringify(LAYOUT_BG_LIGHT);
  const dark = JSON.stringify(LAYOUT_BG_DARK);
  return `(function(){try{var m=localStorage.getItem(${key});var mode=m==="dark"?"dark":"light";var bg=mode==="dark"?${dark}:${light};document.documentElement.setAttribute("data-theme",mode);document.documentElement.style.backgroundColor=bg;}catch(e){}})();`;
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: "inject-theme-first-paint",
      transformIndexHtml(html) {
        return html.replace(
          '<script id="theme-first-paint"></script>',
          `<script id="theme-first-paint">${firstPaintInlineScript()}</script>`,
        );
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
