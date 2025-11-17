/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string; // Adicione suas variáveis aqui
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
