type GullLogoProps = {
  className?: string;
  alt?: string;
};

export const GullLogo = ({ className, alt = "Gull logo" }: GullLogoProps) => (
  <img
    src="/gull-logo.png"
    alt={alt}
    className={className ?? ""}
    loading="lazy"
  />
);
