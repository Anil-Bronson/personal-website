'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './page.module.css';

export default function EntryPage() {
  const router = useRouter();
  const [isEntering, setIsEntering] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    if (isEntering) return;
    setIsEntering(true);
    setTimeout(() => router.push('/bar'), 1600);
  };

  return (
    <div className={styles.entry} onClick={handleEnter} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleEnter()}>

      <div className={styles.vignette} />

      <motion.div
        className={styles.label}
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        RADIO CLUB BAR
      </motion.div>

      <motion.div
        className={styles.scene}
        animate={isEntering ? { scale: 18, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={isEntering
          ? { scale: { duration: 1.6, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.5, delay: 1.2 } }
          : { duration: 0 }
        }
        style={{ transformOrigin: '50% 46%' }}
      >
        <div className={styles.doorContainer}>
          <div className={styles.doorFrame}>
            <div className={styles.door}>
              <div className={styles.doorInnerTop} />
              <div className={styles.doorInnerBottom} />
              <div className={styles.doorKnob} />
              <div className={styles.doorSign}>est. mcmxcvii</div>
            </div>
            <div className={styles.doorLight} />
          </div>
          <motion.div
            className={styles.enterPrompt}
            initial={{ opacity: 0, y: 8 }}
            animate={loaded && !isEntering ? { opacity: 1, y: 0 } : isEntering ? { opacity: 0, y: -8 } : { opacity: 0, y: 8 }}
            transition={{ duration: 1.2, delay: loaded && !isEntering ? 1.4 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            ENTER
          </motion.div>
        </div>

      </motion.div>

      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={isEntering ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      />

      <div className={styles.particles}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{ '--idx': i, '--offset': `${(i * 7.3) % 100}%` } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
