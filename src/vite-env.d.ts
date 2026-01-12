/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_TWITTER_URL?: string;
  readonly NEXT_PUBLIC_BUY_URL?: string;
  readonly NEXT_PUBLIC_DEXSCREENER_EMBED_URL?: string;
  readonly NEXT_PUBLIC_CONTRACT_ADDRESS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
