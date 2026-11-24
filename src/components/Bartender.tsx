'use client';

import { useState } from 'react';
import { motion, useReducedMotion, type TargetAndTransition } from 'framer-motion';
import { useIdleShift } from './useIdleShift';
import styles from './BarEnvironment.module.css';

export type BartenderId = 'kon' | 'tsutsui';

// Each bartender keeps their own rhythm. Kon is the precise one: rarer,
// smaller, slower shifts. Tsutsui fidgets a little more often.
const CHARACTER: Record<BartenderId, {
  name: string;
  fullName: string;
  src: string;
  sideClass: string;
  every: [number, number];
  hold: number;
  shift: TargetAndTransition;
}> = {
  kon: {
    name: 'S. KON',
    fullName: 'Satoshi Kon',
    src: '/images/kon.png',
    sideClass: styles.bartenderLeft,
    every: [9000, 16000],
    hold: 2600,
    shift: { rotate: -0.5, x: -2, y: 0, scale: 1 },
  },
  tsutsui: {
    name: 'Y. TSUTSUI',
    fullName: 'Yasutaka Tsutsui',
    src: '/images/tsutsui.png',
    sideClass: styles.bartenderRight,
    every: [6000, 11000],
    hold: 1700,
    shift: { rotate: 0.8, x: 2, y: 1, scale: 1 },
  },
};

const REST: TargetAndTransition = { rotate: 0, x: 0, y: 0, scale: 1 };
// Acknowledges the visitor: a slight lean toward them
const NOTICE: TargetAndTransition = { rotate: 0, x: 0, y: -3, scale: 1.012 };
// Chat open with this bartender: they step forward into the light
const PRESENT: TargetAndTransition = { rotate: 0, x: 0, y: -6, scale: 1.04 };

interface Props {
  id: BartenderId;
  active: boolean;
  dimmed: boolean;
  onSelect: (id: BartenderId) => void;
}

export default function Bartender({ id, active, dimmed, onSelect }: Props) {
  const c = CHARACTER[id];
  const reduceMotion = useReducedMotion();
  const [noticed, setNoticed] = useState(false);
  const shifted = useIdleShift(c.every, c.hold, !reduceMotion && !active && !noticed);

  const pose = active ? PRESENT : noticed ? NOTICE : shifted ? c.shift : REST;

  return (
    <motion.button
      type="button"
      className={`${styles.bartender} ${c.sideClass} ${active ? styles.bartenderActive : ''}`}
      animate={{ opacity: dimmed ? 0.7 : 1 }}
      transition={{ duration: 0.6 }}
      onClick={() => onSelect(id)}
      onPointerEnter={() => setNoticed(true)}
      onPointerLeave={() => setNoticed(false)}
      onFocus={() => setNoticed(true)}
      onBlur={() => setNoticed(false)}
      aria-label={`Talk to ${c.fullName}`}
    >
      <motion.img
        src={c.src}
        alt=""
        className={styles.bartenderImg}
        style={{ transformOrigin: '50% 100%' }}
        animate={pose}
        transition={{ duration: shifted && !noticed ? 1.6 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        draggable={false}
      />
      <span className={styles.bartenderName}>{c.name}</span>
    </motion.button>
  );
}
