const env = import.meta.env;

export const links = {
  twitter: env.NEXT_PUBLIC_TWITTER_URL ?? "",
  buy: env.NEXT_PUBLIC_BUY_URL ?? "",
  dexEmbed: env.NEXT_PUBLIC_DEXSCREENER_EMBED_URL ?? "",
  contract: env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "",
};
