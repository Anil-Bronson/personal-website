'use client';

import { motion } from 'framer-motion';
import styles from './BarEnvironment.module.css';

interface Props {
  activeBartender: 'kon' | 'tsutsui';
  onBartenderClick: (b: 'kon' | 'tsutsui') => void;
  muted: boolean;
  onToggleMute: () => void;
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

export default function BarEnvironment({ activeBartender, onBartenderClick, muted, onToggleMute }: Props) {
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
          {bottles.map((b, i) => (
            <div
              key={i}
              className={`${styles.bottle} ${styles[`bottle_${b.shape}`]}`}
              style={{ opacity: b.opacity }}
            />
          ))}
        </div>
        <div className={styles.glassesSilhouette} />
      </div>

      {/* Bartender zone */}
      <div className={styles.bartenderZone}>
        {/* Kon */}
        <motion.div
          className={`${styles.bartender} ${styles.bartenderLeft}`}
          animate={{ opacity: activeBartender === 'kon' ? 1 : 0.75 }}
          transition={{ duration: 0.5 }}
          onClick={() => onBartenderClick('kon')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onBartenderClick('kon')}
          aria-label="Chat with Satoshi Kon"
        >
          <motion.div
            className={styles.figure}
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className={styles.figureHead}>
              <div className={styles.figureHair} />
              <div className={styles.figureGlasses}>
                <div className={styles.lens} />
                <div className={styles.lens} />
              </div>
            </div>
            <div className={styles.figureBody} />
          </motion.div>
          <div className={styles.bartenderName}>S. KON</div>
        </motion.div>

        {/* Tsutsui */}
        <motion.div
          className={`${styles.bartender} ${styles.bartenderRight}`}
          animate={{ opacity: activeBartender === 'tsutsui' ? 1 : 0.75 }}
          transition={{ duration: 0.5 }}
          onClick={() => onBartenderClick('tsutsui')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onBartenderClick('tsutsui')}
          aria-label="Chat with Yasutaka Tsutsui"
        >
          <motion.div
            className={styles.figure}
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          >
            <div className={`${styles.figureHead} ${styles.figureHeadAlt}`}>
              <div className={`${styles.figureHair} ${styles.figureHairAlt}`} />
            </div>
            <div className={styles.figureBody} />
          </motion.div>
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
