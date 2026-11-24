'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { projects } from '@/lib/data';
import Bartender, { type BartenderId } from './Bartender';
import styles from './BarEnvironment.module.css';

interface Props {
  activeBartender: BartenderId;
  onBartenderClick: (b: BartenderId) => void;
  muted: boolean;
  onToggleMute: () => void;
  chatOpen: boolean;
  panelOpen: boolean;
  onProjectClick: (title: string) => void;
  onMenuClick: () => void;
}

// How long a picked bottle's label takes to dissolve before its project opens
const PICK_MS = 420;

// Back-bar shelf, left to right. Heights (h) and gaps vary so the row reads as
// collected over time rather than laid out; it runs off the right edge on purpose.
const bottles = [
  { shape: 'tall', opacity: 0.85, h: 1, gap: 0 },
  { shape: 'squat', opacity: 0.9, h: 1.05, gap: 9 },
  { shape: 'thin', opacity: 0.7, h: 1.1, gap: 6 },
  { shape: 'decanter', opacity: 0.8, h: 0.9, gap: 4 },
  { shape: 'wine', opacity: 0.88, h: 1, gap: 22 },
  { shape: 'tall', opacity: 0.76, h: 0.92, gap: 5 },
  { shape: 'flask', opacity: 0.84, h: 1, gap: 12 },
  { shape: 'tall', opacity: 0.9, h: 1.12, gap: 3 },
  { shape: 'squat', opacity: 0.72, h: 0.85, gap: 18 },
  { shape: 'wine', opacity: 0.86, h: 1.08, gap: 7 },
  { shape: 'thin', opacity: 0.62, h: 0.95, gap: 4 },
  { shape: 'decanter', opacity: 0.88, h: 1.1, gap: 14 },
  { shape: 'tall', opacity: 0.8, h: 1, gap: 10 },
  { shape: 'flask', opacity: 0.7, h: 0.9, gap: 6 },
  { shape: 'wine', opacity: 0.75, h: 0.96, gap: 16 },
  { shape: 'tall', opacity: 0.66, h: 1.05, gap: 5 },
  { shape: 'squat', opacity: 0.6, h: 1, gap: 11 },
] as const;

// Which shelf positions hold project bottles, in project order
const PROJECT_SLOTS = [1, 4, 6, 9, 11, 13];
const shelfProjects = new Map(
  projects.slice(0, PROJECT_SLOTS.length).map((p, i) => [PROJECT_SLOTS[i], p])
);

// Three pendants: uneven spacing, cord lengths and brightness, each drifting
// on its own slow cycle
const lamps = [
  { left: '19%', cord: 30, level: 0.75, drift: '13s', delay: '-4s' },
  { left: '46%', cord: 44, level: 1, drift: '19s', delay: '-11s' },
  { left: '83%', cord: 24, level: 0.6, drift: '27s', delay: '-2s' },
];

export default function BarEnvironment({ activeBartender, onBartenderClick, muted, onToggleMute, chatOpen, panelOpen, onProjectClick, onMenuClick }: Props) {
  const reduceMotion = useReducedMotion();
  const [picked, setPicked] = useState<number | null>(null);
  const pickTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(pickTimer.current), []);

  // The label stretches and dissolves, then the project opens
  const pickBottle = (slot: number, title: string) => {
    if (reduceMotion) return onProjectClick(title);
    setPicked(slot);
    clearTimeout(pickTimer.current);
    pickTimer.current = setTimeout(() => {
      setPicked(null);
      onProjectClick(title);
    }, PICK_MS);
  };

  return (
    <div className={`${styles.bar} ${panelOpen ? styles.barReceded : ''}`}>
      {/* Ceiling */}
      <div className={styles.ceiling}>
        {lamps.map((l) => (
          <div
            key={l.left}
            className={styles.pendant}
            style={{ left: l.left, '--cord': `${l.cord}px`, '--lamp': l.level, '--drift': l.drift, '--drift-delay': l.delay } as React.CSSProperties}
          >
            <div className={styles.pendantCord} />
            <div className={styles.pendantBulb} />
            <div className={styles.pendantGlow} />
          </div>
        ))}
      </div>

      {/* Backlit shelf */}
      <div className={styles.shelfZone}>
        <div className={styles.shelfGlow} />
        <div className={styles.shelfEdge} />
        <div className={styles.bottles}>
          {bottles.map((b, i) => {
            const project = shelfProjects.get(i);
            if (!project) {
              return (
                <div
                  key={i}
                  className={`${styles.bottle} ${styles[`bottle_${b.shape}`]}`}
                  style={{ opacity: b.opacity, '--h': b.h, marginLeft: b.gap } as React.CSSProperties}
                />
              );
            }
            return (
              <button
                key={i}
                className={`${styles.bottle} ${styles[`bottle_${b.shape}`]} ${styles.bottleProject} ${picked === i ? styles.bottlePicked : ''}`}
                style={{ '--h': b.h, marginLeft: b.gap } as React.CSSProperties}
                onClick={() => pickBottle(i, project.title)}
                aria-label={`Open project: ${project.title}`}
              >
                <span className={styles.bottleLabel} />
                <span className={styles.bottleTag}>
                  <span className={styles.bottleTagTitle}>{project.title}</span>
                  <span className={styles.bottleTagMeta}>{project.stat}</span>
                </span>
              </button>
            );
          })}
        </div>
        <div className={styles.glassesSilhouette} />
        {/* Chalkboard of specials on the back wall — opens the skills menu */}
        <button className={styles.chalkboard} onClick={onMenuClick} aria-label="Open the drink menu (skills)">
          <span className={styles.chalkTitle}>specials</span>
          <span className={styles.chalkLine} style={{ width: '70%' }} />
          <span className={styles.chalkLine} style={{ width: '55%' }} />
          <span className={styles.chalkLine} style={{ width: '64%' }} />
        </button>
      </div>

      {/* Bartender zone */}
      <div className={styles.bartenderZone}>
        <Bartender
          id="kon"
          active={chatOpen && activeBartender === 'kon'}
          dimmed={chatOpen && activeBartender !== 'kon'}
          onSelect={onBartenderClick}
        />
        <Bartender
          id="tsutsui"
          active={chatOpen && activeBartender === 'tsutsui'}
          dimmed={chatOpen && activeBartender !== 'tsutsui'}
          onSelect={onBartenderClick}
        />

        {/* Record player: the arm sits on the record while it plays */}
        <button
          type="button"
          className={styles.recordPlayer}
          onClick={onToggleMute}
          aria-pressed={!muted}
          aria-label="Background music"
        >
          <span className={styles.recordBody}>
            <span className={styles.platter}>
              <span className={`${styles.vinyl} ${muted ? styles.vinylPaused : ''}`} />
            </span>
            <span className={`${styles.tonearm} ${muted ? styles.tonearmLifted : ''}`} />
            <span className={styles.tonearmPivot} />
          </span>
          <span className={styles.recordPlayerLabel} aria-hidden="true">{muted ? 'off' : 'playing'}</span>
        </button>

        {/* Record sleeve leaning beside the turntable — decoration only */}
        <div className={styles.recordSleeve} aria-hidden="true" />

        {/* Atmospheric smoke, drifting very slowly */}
        <div className={styles.smokeLayer} />
        <div className={styles.haze} aria-hidden="true" />
      </div>

      {/* Counter — the objects on it are set dressing, not controls */}
      <div className={styles.counter}>
        <div className={styles.counterSurface}>
          <div className={styles.counterReflection} />
          <div className={styles.receipt} style={{ left: '9%' }} aria-hidden="true" />
          <div className={styles.matchbook} style={{ left: '13.5%' }} aria-hidden="true" />
          <div className={styles.coaster} style={{ left: '37%' }} aria-hidden="true" />
          <div className={styles.drink} style={{ left: '37%' }} aria-hidden="true">
            <span className={styles.drinkLiquid} />
          </div>
          <div className={`${styles.coaster} ${styles.coasterEmpty}`} style={{ left: '61%' }} aria-hidden="true" />
        </div>
        <div className={styles.counterFace} />
        <div className={styles.counterEdge} />
      </div>

      {/* Floor */}
      <div className={styles.floor}>
        <div className={styles.floorReflection} />
        <div className={styles.floorMirror} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/kon.png" alt="" className={styles.mirrorKon} draggable={false} />
          {[...lamps.map((l) => ({ left: l.left, level: l.level })), { left: '64%', level: 0.85 }].map((l) => (
            <span
              key={l.left}
              className={styles.mirrorLamp}
              style={{ left: l.left, '--lamp': l.level } as React.CSSProperties}
            />
          ))}
        </div>
        <div className={styles.disclaimer}>
          Inspired by Satoshi Kon&apos;s Paprika &nbsp;·&nbsp; © 2026 &nbsp;·&nbsp; Portfolio Mode
        </div>
      </div>

      {/* Ambient vignette */}
      <div className={styles.vignette} />
      {/* While a panel is open the room cools and dims a little, as if receding */}
      <div className={styles.lightShift} aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />
    </div>
  );
}
