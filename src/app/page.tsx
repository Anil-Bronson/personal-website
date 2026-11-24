'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, MotionConfig, useReducedMotion } from 'framer-motion';
import styles from './page.module.css';

// Time from pressing the door to arriving in the bar
const ENTER_MS = 850;

// Now and then the door isn't quite the door you left: rarely on a first
// visit, more often when you come back out of the bar in the same session
const DREAM_CHANCE = { first: 0.1, returning: 0.34 };

function cameBackFromBar() {
  try {
    return sessionStorage.getItem('rcb-visited-bar') === '1';
  } catch {
    return false;
  }
}

export default function EntryPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [isEntering, setIsEntering] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [dream, setDream] = useState(false);

  useEffect(() => {
    router.prefetch('/bar');
    const t = setTimeout(() => {
      const chance = cameBackFromBar() ? DREAM_CHANCE.returning : DREAM_CHANCE.first;
      setDream(Math.random() < chance);
      setLoaded(true);
    }, 100);
    return () => clearTimeout(t);
  }, [router]);

  const handleEnter = () => {
    if (isEntering) return;
    if (reduceMotion) return router.push('/bar');
    setIsEntering(true);
    setTimeout(() => router.push('/bar'), ENTER_MS);
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className={styles.entry}>
        <div className={styles.vignette} />
        <div className="film-grain" aria-hidden="true" />

        <motion.h1
          className={styles.label}
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.6, delay: 0.3 }}
        >
          RADIO CLUB BAR
        </motion.h1>

        <motion.div
          className={styles.scene}
          animate={isEntering ? { scale: 14, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={isEntering
            ? { scale: { duration: ENTER_MS / 1000, ease: [0.7, 0, 0.84, 0] }, opacity: { duration: 0.3, delay: ENTER_MS / 1000 - 0.3 } }
            : { duration: 0 }
          }
          style={{ transformOrigin: '50% 46%' }}
        >
          <button type="button" className={`${styles.doorButton} ${dream ? styles.doorDream : ''}`} onClick={handleEnter} aria-label="Enter the bar">
            <span className={styles.doorFrame}>
              <span className={styles.door}>
                <span className={styles.doorInnerTop} />
                <span className={styles.doorInnerBottom} />
                <span className={styles.doorKnob} />
                <span className={styles.doorSign}>{dream ? 'est. tomorrow' : 'est. mcmxcvii'}</span>
              </span>
              <span className={styles.doorLight} />
            </span>
            <motion.span
              className={styles.enterPrompt}
              initial={{ opacity: 0, y: 8 }}
              animate={loaded && !isEntering ? { opacity: 1, y: 0 } : isEntering ? { opacity: 0, y: -8 } : { opacity: 0, y: 8 }}
              transition={{ duration: 1, delay: loaded && !isEntering ? 0.8 : 0, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            >
              ENTER
            </motion.span>
          </button>
        </motion.div>

        {/* For anyone who'd rather not knock: straight in, the plain version, or the resume */}
        <motion.nav
          className={styles.shortcuts}
          aria-label="Skip the entrance"
          initial={{ opacity: 0 }}
          animate={loaded && !isEntering ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: loaded && !isEntering ? 1.2 : 0 }}
        >
          <Link href="/bar" className={styles.shortcut}>walk straight in</Link>
          <Link href="/cv" className={styles.shortcut}>read it as plain text</Link>
          <a href="/resume.pdf" className={styles.shortcut} download>resume (pdf)</a>
        </motion.nav>

        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={isEntering ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.35, delay: ENTER_MS / 1000 - 0.35 }}
        />

        <div className={styles.particles} aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={styles.particle}
              style={{ '--idx': i, '--offset': `${(i * 13.7 + 9) % 100}%` } as React.CSSProperties}
            />
          ))}
        </div>
      </main>
    </MotionConfig>
  );
}
