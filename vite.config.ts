// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ mode }) => {
  // Carrega .env, .env.local, .env.[mode], etc.
  // O terceiro parâmetro "" faz carregar TUDO (não só VITE_*), útil para configs do server.
  const env = loadEnv(mode, process.cwd(), "");
  console.log(">> Porta definida no .env:", env);

  const port = Number(env.VITE_PORT) || 5173;
  const previewPort = Number(env.VITE_PREVIEW_PORT) || port;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port,
      strictPort: env.VITE_STRICT_PORT === "true",
      open: env.OPEN === "true",
      // defina HOST no .env se quiser expor (ex.: HOST=0.0.0.0)
      host: env.HOST || undefined,
    },
    preview: {
      port: previewPort,
      strictPort: env.VITE_STRICT_PORT === "true",
      host: env.PREVIEW_HOST || env.HOST || undefined,
    },
  };
});

