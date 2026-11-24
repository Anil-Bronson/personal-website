'use client';

import { motion } from 'framer-motion';
import { about, drinkMenu } from '@/lib/data';
import styles from './Panel.module.css';

export default function MenuPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.backdrop} onClick={onClose} />
      <motion.div
        className={styles.panel}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.panelHeader}>
          <div>
            <div className={styles.panelTitle}>Tonight&apos;s Menu</div>
            <div className={styles.panelSubtitle}>house specials, mixed from the toolkit</div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>close</button>
        </div>

        <div className={styles.panelBody}>
          {drinkMenu.map((drink, i) => (
            <motion.div
              key={drink.name}
              className={styles.drink}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.drinkHeader}>
                <div className={styles.cardTitle}>{drink.name}</div>
                <div className={styles.drinkLeader} />
                <div className={styles.cardCategory}>{drink.category}</div>
              </div>
              <p className={styles.drinkNote}>{drink.note}</p>
              <div className={styles.drinkIngredients}>
                {about.skills[drink.category].join(' · ')}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
