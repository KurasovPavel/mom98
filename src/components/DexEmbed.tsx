type DexEmbedProps = {
  src: string;
  heightClassName?: string;
};

export const DexEmbed = ({ src, heightClassName = "h-[520px]" }: DexEmbedProps) => {
  if (!src) {
    return (
      <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
        DexScreener URL missing.
      </div>
    );
  }

  return (
    <iframe
      title="DexScreener chart"
      src={src}
      className={`w-full ${heightClassName} rounded-[16px] border border-white/5 bg-[#0d102a]/60`}
      allow="clipboard-write"
    />
  );
};
