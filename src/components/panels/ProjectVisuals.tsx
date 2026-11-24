import { createContext, useContext, useId } from 'react';
import type { ProjectVisual } from '@/lib/data';
import styles from './ProjectVisuals.module.css';

// Diagrams are drawn from the facts in data.ts; captions say so, so nobody
// mistakes them for screenshots.

// Each diagram gets its own arrowhead marker id so ids stay unique in the page
const MarkerId = createContext('arrow');

function Box({ x, y, w, h = 30, label, sub, strong }: {
  x: number; y: number; w: number; h?: number; label: string; sub?: string; strong?: boolean;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} className={strong ? styles.boxStrong : styles.box} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 3 : h / 2 + 4)} className={styles.label} textAnchor="middle">{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 11} className={styles.sub} textAnchor="middle">{sub}</text>}
    </g>
  );
}

function Arrow({ d, label, lx, ly }: { d: string; label?: string; lx?: number; ly?: number }) {
  const marker = useContext(MarkerId);
  return (
    <g>
      <path d={d} className={styles.line} markerEnd={`url(#${marker})`} />
      {label && <text x={lx} y={ly} className={styles.note} textAnchor="middle">{label}</text>}
    </g>
  );
}

function Defs() {
  const marker = useContext(MarkerId);
  return (
    <defs>
      <marker id={marker} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L8,4 L0,8 z" className={styles.arrowHead} />
      </marker>
    </defs>
  );
}

function HomelabDiagram() {
  return (
    <svg viewBox="0 0 560 250" className={styles.svg} role="img"
      aria-label="Home lab diagram: devices reach the server over Tailscale, Caddy terminates TLS in front of 25+ Docker Compose services on a 5 TB mergerfs pool, with restic backups and ntfy alerts.">
      <Defs />
      <Box x={8} y={34} w={92} label="My devices" />
      <Arrow d="M100,49 L136,49" label="tailnet" lx={118} ly={40} />
      <Box x={138} y={34} w={96} label="Tailscale" sub="no open ports" h={36} />
      <Arrow d="M234,52 L270,52" />
      <Box x={272} y={34} w={96} label="Caddy" sub="TLS via DNS-01" h={36} />
      <Arrow d="M320,70 L320,92" />

      <rect x={150} y={94} width={340} height={86} rx={2} className={styles.group} />
      <text x={160} y={110} className={styles.groupLabel}>Docker Compose · 25+ services</text>
      <Box x={162} y={120} w={98} h={26} label="Spend Tracker" />
      <Box x={268} y={120} w={98} h={26} label="Gatus checks" />
      <Box x={374} y={120} w={104} h={26} label="SMART disk health" />
      <Box x={162} y={150} w={98} h={22} label="Claude agent" />
      <text x={372} y={166} className={styles.note}>…and the rest</text>

      <Arrow d="M320,180 L320,202" />
      <Box x={244} y={204} w={152} h={32} label="mergerfs pool · 5 TB" strong />
      <text x={406} y={224} className={styles.note}>udev + systemd remount</text>

      <Box x={8} y={204} w={150} h={32} label="restic" sub="nightly, encrypted" />
      <Arrow d="M244,220 L160,220" />
      <Box x={498} y={120} w={56} h={26} label="ntfy" />
      <Arrow d="M478,133 L496,133" />
      <text x={526} y={160} className={styles.note} textAnchor="middle">alerts</text>
    </svg>
  );
}

function CaptionDiagram() {
  return (
    <svg viewBox="0 0 260 300" className={styles.svg} role="img"
      aria-label="Caption pipeline diagram: the client sends an image to a Node.js proxy, an image-recognition model writes a scene description, a language model turns it into a caption, and the proxy returns it.">
      <Defs />
      <Box x={70} y={8} w={120} label="Client" sub="uploads an image" h={38} />
      <Arrow d="M130,46 L130,72" label="one REST API" lx={192} ly={63} />
      <Box x={50} y={74} w={160} label="Node.js proxy" h={34} strong />
      <Arrow d="M110,108 L110,140" />
      <Box x={30} y={142} w={200} label="Image-recognition model" sub="→ structured scene description" h={42} />
      <Arrow d="M130,184 L130,214" label="as context" lx={176} ly={203} />
      <Box x={30} y={216} w={200} label="Language model" sub="→ caption" h={42} />
      <Arrow d="M232,237 C 256,200 256,110 212,92" label="caption returned" lx={214} ly={128} />
    </svg>
  );
}

function SpendDiagram() {
  return (
    <svg viewBox="0 0 576 122" className={styles.svg} role="img"
      aria-label="Categorization diagram: each imported transaction goes to my rules first, then the OpenAI API if no rule matches, with Claude as the fallback, ending in a category.">
      <Defs />
      <Box x={4} y={42} w={86} label="Bank CSV row" sub="de-duplicated" h={38} />
      <Arrow d="M90,61 L116,61" />
      <Box x={118} y={42} w={92} label="1 · My rules" h={38} strong />
      <Arrow d="M210,61 L254,61" label="no match" lx={232} ly={54} />
      <Box x={256} y={42} w={96} label="2 · OpenAI API" h={38} />
      <Arrow d="M352,61 L396,61" label="fallback" lx={374} ly={54} />
      <Box x={398} y={42} w={80} label="3 · Claude" h={38} />
      <Arrow d="M478,61 L504,61" />
      <Box x={506} y={42} w={64} label="Category" h={38} />
      <Arrow d="M164,42 C 164,6 536,6 538,40" label="matched" lx={350} ly={18} />
      <Arrow d="M304,80 C 304,114 526,114 538,82" />
    </svg>
  );
}

export default function ProjectVisualFigure({ visual, title }: { visual: ProjectVisual; title: string }) {
  const markerId = useId().replace(/:/g, '');
  if (visual === 'golden-gaming-logo') {
    return (
      <figure className={styles.artifact}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/projects/golden-gaming-logo.png" alt={`${title} logo`} width={260} height={192} loading="lazy" />
        <figcaption className={styles.caption}>The project&apos;s logo, from its repo</figcaption>
      </figure>
    );
  }

  const Diagram = { 'homelab-diagram': HomelabDiagram, 'caption-diagram': CaptionDiagram, 'spend-diagram': SpendDiagram }[visual];
  return (
    <figure className={styles.figure}>
      <MarkerId.Provider value={`arrow-${markerId}`}>
        <Diagram />
      </MarkerId.Provider>
      <figcaption className={styles.caption}>Diagram of how it fits together</figcaption>
    </figure>
  );
}
