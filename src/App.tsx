// $MOM — Money a Month • Windows 98 single‑file site (1:1 vibe, pink theme)
// Tech: React + Tailwind (TSX). Draggable windows, taskbar, Start button, FAQ.
// Fixed: balanced JSX parentheses (especially around <FAQ/>), no stray parens.
// Added: lightweight in‑UI tests (DevTests) so we can verify rendering at runtime.
// TODO: replace CONTRACT + LINKS with real ones.

import React, { useEffect, useRef, useState } from "react";
import './index.css'


// ===== Config =====
const CONTRACT = "Soon"; // TODO paste real
const LINKS = {
  pump: "https://pump.fun/",
  chart: "https://dexscreener.com/",
  x: "https://x.com/",
  tg: "https://t.me/",
};

// ===== Root App =====
export default function DAD_Win98() {
  return (
    <div className="min-h-screen bg-[#ff7eb6] text-black font-sans">
      <DesktopWallpaper />
      <StartTaskbar />

      {/* Windows (managed individually) */}
      <div className="fixed inset-0 pointer-events-none">
        <Win98Window title="$MOM — Money a Month" initial={{ x: 80, y: 70 }}>
          <HeroWindow />
        </Win98Window>

        <Win98Window title="Tokenomics.txt" initial={{ x: 520, y: 120 }}>
          <Tokenomics />
        </Win98Window>

        <Win98Window title="how_to_buy.exe" initial={{ x: 180, y: 360 }}>
          <HowToBuy />
        </Win98Window>

        <Win98Window title="faq.ini" initial={{ x: 640, y: 340 }}>
          <FAQ />
        </Win98Window>

        <Win98Window title="dev_tests.log" initial={{ x: 120, y: 520 }}>
          <DevTests />
        </Win98Window>
      </div>
    </div>
  );
}

// ===== UI Pieces =====
function DesktopWallpaper() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10">
      {/* subtle 32px tile grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#0000 31px, rgba(0,0,0,.2) 32px), linear-gradient(90deg, #0000 31px, rgba(0,0,0,.2) 32px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

function StartTaskbar() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(() => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  useEffect(() => {
    const id = setInterval(() => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })), 1000);
    return () => clearInterval(id);
  }, []);

  const menuItems = [
    "$MOM — Money a Month",
    "Tokenomics.txt",
    "how_to_buy.exe",
    "faq.ini",
    "dev_tests.log",
  ];

  return (
    <div data-testid="taskbar" className="fixed bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] border-t border-black shadow-[inset_0_1px_0_#fff] flex items-stretch relative">
      {/* Start */}
      <div className="relative">
        <button onClick={() => setOpen(o=>!o)} className="px-3 mx-1 my-1 bg-[#c0c0c0] border border-t-white border-l-white border-b-black border-r-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white flex items-center gap-2 text-sm">
          <span className="h-4 w-4 bg-[#d1007e]" />
          <b>Start</b>
        </button>
        {open && (
          <div className="absolute bottom-10 left-1 w-56 bg-[#c0c0c0] border border-t-white border-l-white border-b-black border-r-black p-1 z-[9999]">
            {menuItems.map((t,i)=> (
              <div key={i} className="px-2 py-1 text-sm hover:bg-[#dcdcdc] border border-transparent hover:border-t-white hover:border-l-white hover:border-b-black hover:border-r-black">
                {t}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scroller */}
      <div className="flex-1 m-1 border border-t-white border-l-white border-b-black border-r-black bg-[#dcdcdc] overflow-hidden">
        <div className="h-full animate-[scroll_25s_linear_infinite] whitespace-nowrap px-2 text-xs flex items-center">
          💵 $MOM — Money a Month • Make memes • Give a dollar • Repeat daily • On‑chain • Community • Fun
        </div>
      </div>

      {/* Clock */}
      <div className="w-24 m-1 grid place-items-center text-xs border border-t-white border-l-white border-b-black border-r-black bg-[#dcdcdc]">
        {time}
      </div>
      <style>{`
        @keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
      `}</style>
    </div>
  );
}

function Win98Window({ title, initial, children }: { title: string; initial: { x: number; y: number }; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(initial);
  const [z, setZ] = useState(1);
  const dragging = useRef<{ dx: number; dy: number } | null>(null);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      setPos({ x: e.clientX - dragging.current.dx, y: e.clientY - dragging.current.dy });
    };
    const onUp = () => (dragging.current = null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  if (closed) return null;

  const stylePos: React.CSSProperties = maximized
    ? { left: 8, top: 8, width: "calc(100vw - 16px)", zIndex: z }
    : { left: pos.x, top: pos.y, zIndex: z };

  return (
    <div
      ref={ref}
      onMouseDown={() => setZ((n) => n + 1)}
      className="pointer-events-auto absolute"
      style={stylePos}
    >
      <div
        onMouseDown={(e) => {
          if (maximized) return; // prevent drag in maximized
          const r = ref.current!.getBoundingClientRect();
          dragging.current = { dx: e.clientX - r.left, dy: e.clientY - r.top };
        }}
        className="h-7 bg-[#d1007e] text-white flex items-center justify-between px-2 select-none"
      >
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 bg-white" />
          <span className="text-xs font-bold tracking-tight">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={()=>setMinimized(true)} className="h-5 w-5 grid place-items-center bg-[#c0c0c0] text-black border border-t-white border-l-white border-b-black border-r-black text-[10px] leading-none">_</button>
          <button onClick={()=>setMaximized(m=>!m)} className="h-5 w-5 grid place-items-center bg-[#c0c0c0] text-black border border-t-white border-l-white border-b-black border-r-black text-[10px] leading-none">[]</button>
          <button onClick={()=>setClosed(true)} className="h-5 w-5 grid place-items-center bg-[#c0c0c0] text-black border border-t-white border-l-white border-b-black border-r-black text-[10px] leading-none">X</button>
        </div>
      </div>
      <div className={`w-[560px] max-w-[92vw] bg-[#c0c0c0] border border-t-white border-l-white border-b-black border-r-black p-3 ${minimized ? "hidden" : "block"}`}>
        <div className="min-h-[140px] bg-[#ffffff] border border-t-black border-l-black border-b-white border-r-white p-3 text-sm">
          {children}
        </div>
        <div className="mt-2 h-5 bg-[#dcdcdc] border border-t-white border-l-white border-b-black border-r-black text-[10px] px-2 grid place-items-center">
          Ready
        </div>
        {minimized && (
          <div className="mt-2 text-[10px] text-black/70">(Window minimized — restore via Start menu coming next)</div>
        )}
      </div>
    </div>
  );
}

function HeroWindow() {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 bg-[#d1007e] border border-white" />
        <div>
          <div className="text-xl font-black" data-testid="hero-title">Money a Month</div>
          <div className="text-xs text-black/70">Make memes • Give a dollar • Repeat daily</div>
        </div>
      </div>

      <div className="mt-3 text-sm">
        $MOM is a playful movement where every degen puts <b>$1/day</b> to work. No guilt. No grindset. Just consistent micro‑giving and macro‑fun.
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto_auto]">
        <div className="border border-t-black border-l-black border-b-white border-r-white p-2 bg-white font-mono text-xs truncate" data-testid="contract">
          {CONTRACT}
        </div>
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(CONTRACT);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          className="px-3 border border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0] text-xs"
          data-testid="copy-btn"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <a href={LINKS.pump} target="_blank" className="px-3 border border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0] text-xs text-center">
          Buy $MOM
        </a>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <a href={LINKS.x} target="_blank" className="px-2 border border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0]">Twitter/X</a>
        <a href={LINKS.tg} target="_blank" className="px-2 border border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0]">Telegram</a>
        <a href={LINKS.chart} target="_blank" className="px-2 border border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0]">DexScreener</a>
      </div>
    </div>
  );
}

function Tokenomics() {
  return (
    <div className="text-sm leading-relaxed" data-testid="tokenomics">
      <b>Supply:</b> 1,000,000,000 $MOM
      <br />
      <b>Liquidity:</b> Burned/Locked
      <br />
      <b>Taxes:</b> 0% / 0% (Buy/Sell)
      <br />
      <b>Treasury:</b> $1/day pool (micro‑grants)
    </div>
  );
}

function HowToBuy() {
  const Item = ({ n, title, body }: { n: number; title: string; body: string }) => (
    <div className="p-2 border border-t-black border-l-black border-b-white border-r-white bg-white" data-testid={`how-item-${n}`}>
      <div className="text-xs text-black/70">Step {n}</div>
      <div className="font-bold">{title}</div>
      <div className="text-sm">{body}</div>
    </div>
  );

  return (
    <div className="grid sm:grid-cols-3 gap-2" data-testid="how-to-buy">
      <Item n={1} title="Get a wallet" body="Phantom or Backpack on Solana." />
      <Item n={2} title="Load SOL" body="Buy SOL on CEX or on‑ramp, send to wallet." />
      <Item n={3} title="Swap to $MOM" body="Use Pump.fun or a DEX. Paste contract & confirm." />
    </div>
  );
}

function FAQ() {
  const QA = ({ q, a }: { q: string; a: string }) => (
    <details className="group" data-testid="qa-item">
      <summary className="cursor-pointer list-none px-2 py-1 bg-[#dcdcdc] border border-t-white border-l-white border-b-black border-r-black text-sm">
        {q}
      </summary>
      <div className="p-2 text-sm bg-white border border-t-black border-l-black border-b-white border-r-white">{a}</div>
    </details>
  );

  return (
    <div className="space-y-2" data-testid="faq">
      <QA q="Is this a charity?" a="No. It's a meme‑driven movement that channels tiny daily amounts into transparent on‑chain pools supporting community‑voted causes." />
      <QA q="Why $1/day?" a="Because tiny consistent actions beat rare heroic ones. Also, it's funny." />
      <QA q="Where does money go?" a="Treasury multisig, weekly votes, public proofs/tx links." />
    </div>
  );
}

// ===== Dev Tests (runtime smoke checks) =====
function DevTests() {
  const [results, setResults] = useState<Array<{ name: string; pass: boolean; note?: string }>>([]);

  useEffect(() => {
    const checks: Array<{ name: string; pass: boolean; note?: string }> = [];

    // 1. Taskbar present
    checks.push({ name: "taskbar renders", pass: !!document.querySelector('[data-testid="taskbar"]') });

    // 2. Hero title text
    const hero = document.querySelector('[data-testid="hero-title"]');
    checks.push({ name: 'hero title = "Money a Month"', pass: !!hero && hero.textContent?.includes('Money a Month') === true });

    // 3. FAQ has 3 items
    const faqItems = document.querySelectorAll('[data-testid="qa-item"]').length;
    checks.push({ name: "faq has 3 items", pass: faqItems === 3, note: `count=${faqItems}` });

    // 4. Copy button exists
    checks.push({ name: 'copy button exists', pass: !!document.querySelector('[data-testid="copy-btn"]') });

    // 5. How-to-buy shows 3 steps
    const how = document.querySelectorAll('[data-testid^="how-item-"]').length;
    checks.push({ name: "how-to-buy has 3 steps", pass: how === 3, note: `count=${how}` });

    setResults(checks);
  }, []);

  return (
    <div className="text-xs">
      <div className="mb-2 font-bold">Runtime tests</div>
      <ul className="space-y-1">
        {results.map((r, i) => (
          <li key={i} className={r.pass ? "text-green-700" : "text-red-700"}>
            {r.pass ? "✔" : "✖"} {r.name} {r.note ? <span className="opacity-70">({r.note})</span> : null}
          </li>
        ))}
      </ul>
      <div className="mt-2 opacity-70">All tests are purely DOM smoke checks (no external libs).</div>
    </div>
  );
}
