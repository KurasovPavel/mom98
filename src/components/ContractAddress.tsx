import { useState } from "react";
import toast from "react-hot-toast";

const toastStyle = {
  borderRadius: "999px",
  background: "rgba(30, 20, 70, 0.8)",
  color: "white",
  padding: "8px 16px",
  boxShadow: "0 0 20px rgba(133, 98, 240, 0.6)",
};

type ContractAddressProps = {
  address: string;
};

export const ContractAddress = ({ address }: ContractAddressProps) => {
  const [copied, setCopied] = useState(false);

  if (!address) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success("COPIED", {
      style: toastStyle,
      duration: 1200,
    });
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group flex w-full items-center justify-center gap-2 overflow-x-auto whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-[#8562F0] shadow-[0_0_24px_rgba(133,98,240,0.35)] transition hover:bg-white/15"
      aria-label="Copy contract address"
    >
      <span className="min-w-max">{address}</span>
      <span className="text-xs text-white/70">{copied ? "COPIED" : "COPY"}</span>
    </button>
  );
};
