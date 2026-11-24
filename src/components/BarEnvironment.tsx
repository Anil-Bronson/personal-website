'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data';
import styles from './BarEnvironment.module.css';

interface Props {
  activeBartender: 'kon' | 'tsutsui';
  onBartenderClick: (b: 'kon' | 'tsutsui') => void;
  muted: boolean;
  onToggleMute: () => void;
  chatEverOpened: boolean;
  onProjectClick: (title: string) => void;
  onMenuClick: () => void;
}

const bottles = [
  { shape: 'tall', opacity: 0.85 },
  { shape: 'squat', opacity: 0.9 },
  { shape: 'decanter', opacity: 0.78 },
  { shape: 'tall', opacity: 0.88 },
  { shape: 'wine', opacity: 0.82 },
  { shape: 'squat', opacity: 0.92 },
  { shape: 'tall', opacity: 0.75 },
  { shape: 'decanter', opacity: 0.87 },
  { shape: 'wine', opacity: 0.80 },
  { shape: 'squat', opacity: 0.93 },
  { shape: 'tall', opacity: 0.70 },
  { shape: 'tall', opacity: 0.85 },
];

// Every other bottle from the second one carries a project label
const PROJECT_SLOTS = [1, 3, 5, 7, 9, 11];
const shelfProjects = new Map(
  projects.slice(0, PROJECT_SLOTS.length).map((p, i) => [PROJECT_SLOTS[i], p])
);

export default function BarEnvironment({ activeBartender, onBartenderClick, muted, onToggleMute, chatEverOpened, onProjectClick, onMenuClick }: Props) {
  return (
    <div className={styles.bar}>
      {/* Ceiling */}
      <div className={styles.ceiling}>
        <div className={`${styles.pendant}`} style={{ left: '22%' }}>
          <div className={styles.pendantCord} />
          <div className={styles.pendantBulb} />
          <div className={styles.pendantGlow} />
        </div>
        <div className={`${styles.pendant}`} style={{ left: '50%' }}>
          <div className={styles.pendantCord} />
          <div className={styles.pendantBulb} />
          <div className={styles.pendantGlow} />
        </div>
        <div className={`${styles.pendant}`} style={{ left: '78%' }}>
          <div className={styles.pendantCord} />
          <div className={styles.pendantBulb} />
          <div className={styles.pendantGlow} />
        </div>
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
                  style={{ opacity: b.opacity }}
                />
              );
            }
            return (
              <button
                key={i}
                className={`${styles.bottle} ${styles[`bottle_${b.shape}`]} ${styles.bottleProject}`}
                onClick={() => onProjectClick(project.title)}
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
        {/* Kon */}
        <motion.div
          className={`${styles.bartender} ${styles.bartenderLeft}`}
          animate={{ opacity: !chatEverOpened || activeBartender === 'kon' ? 1 : 0.6 }}
          transition={{ duration: 0.5 }}
          onClick={() => onBartenderClick('kon')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onBartenderClick('kon')}
          aria-label="Chat with Satoshi Kon"
        >
          <motion.img
            src="/images/kon.png"
            alt="Satoshi Kon"
            className={styles.bartenderImg}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            draggable={false}
          />
          <div className={styles.bartenderName}>S. KON</div>
        </motion.div>

        {/* Tsutsui */}
        <motion.div
          className={`${styles.bartender} ${styles.bartenderRight}`}
          animate={{ opacity: !chatEverOpened || activeBartender === 'tsutsui' ? 1 : 0.6 }}
          transition={{ duration: 0.5 }}
          onClick={() => onBartenderClick('tsutsui')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onBartenderClick('tsutsui')}
          aria-label="Chat with Yasutaka Tsutsui"
        >
          <motion.img
            src="/images/tsutsui.png"
            alt="Yasutaka Tsutsui"
            className={styles.bartenderImg}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            draggable={false}
          />
          <div className={styles.bartenderName}>Y. TSUTSUI</div>
        </motion.div>

        {/* Record player */}
        <div
          className={styles.recordPlayer}
          onClick={onToggleMute}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onToggleMute()}
          aria-label={muted ? 'Unmute music' : 'Mute music'}
        >
          <div className={styles.recordBody}>
            <div className={styles.platter}>
              <div className={`${styles.vinyl} ${muted ? styles.vinylPaused : ''}`} />
            </div>
            <div className={styles.tonearm} />
            <div className={styles.tonearmPivot} />
          </div>
          <div className={styles.recordPlayerLabel}>{muted ? 'muted' : 'playing'}</div>
        </div>

        {/* Atmospheric smoke */}
        <div className={styles.smokeLayer} />
      </div>

      {/* Counter */}
      <div className={styles.counter}>
        <div className={styles.counterSurface}>
          <div className={styles.counterReflection} />
          <div className={styles.counterItem} style={{ left: '30%' }} />
          <div className={`${styles.counterItem} ${styles.counterGlass}`} style={{ left: '48%' }} />
          <div className={styles.counterItem} style={{ left: '66%' }} />
        </div>
        <div className={styles.counterFace} />
        <div className={styles.counterEdge} />
      </div>

      {/* Floor */}
      <div className={styles.floor}>
        <div className={styles.floorReflection} />
        <div className={styles.disclaimer}>
          Inspired by Satoshi Kon&apos;s Paprika &nbsp;·&nbsp; © 2026 &nbsp;·&nbsp; Portfolio Mode
        </div>
      </div>

      {/* Ambient vignette */}
      <div className={styles.vignette} />
    </div>
  );
}
