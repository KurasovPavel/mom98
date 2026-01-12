export const StarfieldOverlay = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 starfield opacity-70" />
    <div className="absolute inset-0 starfield starfield-secondary opacity-50" />
  </div>
);
