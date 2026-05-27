'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatInterface from './ChatInterface';
import styles from './ChatModal.module.css';

interface Props {
  open: boolean;
  activeBartender: 'kon' | 'tsutsui';
  onBartenderChange: (b: 'kon' | 'tsutsui') => void;
  onClose: () => void;
}

const BARTENDER_TITLES = {
  kon: { name: 'Satoshi Kon', sub: 'director · dreamer · bartender' },
  tsutsui: { name: 'Yasutaka Tsutsui', sub: 'author · absurdist · bartender' },
};

export default function ChatModal({ open, activeBartender, onBartenderChange, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className={styles.backdrop} onClick={onClose} />

          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.header}>
              <div>
                <div className={styles.headerName}>{BARTENDER_TITLES[activeBartender].name}</div>
                <div className={styles.headerSub}>{BARTENDER_TITLES[activeBartender].sub}</div>
              </div>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close chat">
                ✕
              </button>
            </div>

            <div className={styles.body}>
              <ChatInterface
                activeBartender={activeBartender}
                onBartenderChange={onBartenderChange}
                autoOpen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
