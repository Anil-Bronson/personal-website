'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BarEnvironment from '@/components/BarEnvironment';
import ChatModal from '@/components/ChatModal';
import AboutPanel from '@/components/panels/AboutPanel';
import ProjectsPanel from '@/components/panels/ProjectsPanel';
import ExperiencePanel from '@/components/panels/ExperiencePanel';
import styles from './bar.module.css';

type Panel = 'about' | 'projects' | 'experience' | null;

export default function BarPage() {
  const [panel, setPanel] = useState<Panel>(null);
  const [activeBartender, setActiveBartender] = useState<'kon' | 'tsutsui'>('kon');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatEverOpened, setChatEverOpened] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const audio = new Audio('/audio/jazz.mp3');
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const tryPlay = async () => {
      try {
        await audio.play();
        // Fade in over 2s
        const start = performance.now();
        const TARGET = 0.38;
        const tick = () => {
          const elapsed = performance.now() - start;
          audio.volume = Math.min(TARGET, (elapsed / 2000) * TARGET);
          if (audio.volume < TARGET) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      } catch {
        // Autoplay blocked — record player click will start it
      }
    };

    // Delay until after entrance animation settles
    const t = setTimeout(tryPlay, 1400);

    return () => {
      clearTimeout(t);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      // Autoplay was blocked — start on first interaction
      audio.play().catch(() => {});
      audio.volume = 0.38;
      setMuted(false);
    } else if (muted) {
      audio.muted = false;
      setMuted(false);
    } else {
      audio.muted = true;
      setMuted(true);
    }
  };

  const handleBartenderClick = (b: 'kon' | 'tsutsui') => {
    setActiveBartender(b);
    setChatOpen(true);
    setChatEverOpened(true);
  };

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.fadeIn}
        initial={{ opacity: 1 }}
        animate={mounted ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        style={{ pointerEvents: 'none' }}
      />

      <motion.nav
        className={styles.nav}
        initial={{ opacity: 0, y: -8 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {(['about', 'projects', 'experience'] as Panel[]).map((item) => (
          <button
            key={item}
            className={`${styles.navItem} ${panel === item ? styles.navActive : ''}`}
            onClick={() => setPanel(panel === item ? null : item)}
          >
            {item}
          </button>
        ))}
      </motion.nav>

      <BarEnvironment
        activeBartender={activeBartender}
        onBartenderClick={handleBartenderClick}
        muted={muted}
        onToggleMute={toggleMute}
        chatEverOpened={chatEverOpened}
      />

      <ChatModal
        open={chatOpen}
        activeBartender={activeBartender}
        onBartenderChange={setActiveBartender}
        onClose={() => setChatOpen(false)}
      />

      <AnimatePresence>
        {panel === 'about' && (
          <AboutPanel key="about" onClose={() => setPanel(null)} />
        )}
        {panel === 'projects' && (
          <ProjectsPanel key="projects" onClose={() => setPanel(null)} />
        )}
        {panel === 'experience' && (
          <ExperiencePanel key="experience" onClose={() => setPanel(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
