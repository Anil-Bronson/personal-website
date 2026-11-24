'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import BarEnvironment from '@/components/BarEnvironment';
import type { BartenderId } from '@/components/Bartender';
import ChatModal from '@/components/ChatModal';
import AboutPanel from '@/components/panels/AboutPanel';
import ProjectsPanel from '@/components/panels/ProjectsPanel';
import ExperiencePanel from '@/components/panels/ExperiencePanel';
import MenuPanel from '@/components/panels/MenuPanel';
import styles from './bar.module.css';

type Panel = 'about' | 'projects' | 'experience' | 'menu' | null;

export default function BarPage() {
  const [panel, setPanel] = useState<Panel>(null);
  const [focusedProject, setFocusedProject] = useState<string | null>(null);
  const [activeBartender, setActiveBartender] = useState<BartenderId>('kon');
  const [chatOpen, setChatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Lets the entrance know you've been inside (see the door's dream state)
    try {
      sessionStorage.setItem('rcb-visited-bar', '1');
    } catch {}
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

    const handleVisibility = () => {
      if (document.hidden) {
        audio.pause();
      } else if (!audio.muted) {
        audio.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    // Delay until after entrance animation settles
    const t = setTimeout(tryPlay, 1400);

    return () => {
      clearTimeout(t);
      document.removeEventListener('visibilitychange', handleVisibility);
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

  const openPanel = (next: Panel) => {
    setFocusedProject(null);
    setPanel(next);
  };

  const handleProjectClick = (title: string) => {
    setFocusedProject(title);
    setPanel('projects');
  };

  const handleBartenderClick = (b: BartenderId) => {
    setActiveBartender(b);
    setChatOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
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
          <div className={styles.navSections}>
            {(['about', 'projects', 'experience'] as const).map((item) => (
              <button
                key={item}
                className={`${styles.navItem} ${panel === item ? styles.navActive : ''}`}
                onClick={() => openPanel(panel === item ? null : item)}
                aria-expanded={panel === item}
                aria-controls={panel === item ? `panel-${item}` : undefined}
              >
                {item}
              </button>
            ))}
          </div>
          <div className={styles.navUtility}>
            <Link className={styles.navLink} href="/cv">plain text</Link>
            <a className={styles.navLink} href="/resume.pdf" download>resume</a>
          </div>
        </motion.nav>

        <BarEnvironment
          activeBartender={activeBartender}
          onBartenderClick={handleBartenderClick}
          muted={muted}
          onToggleMute={toggleMute}
          chatOpen={chatOpen}
          panelOpen={panel !== null}
          onProjectClick={handleProjectClick}
          onMenuClick={() => openPanel('menu')}
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
            <ProjectsPanel key="projects" focus={focusedProject} onClose={() => setPanel(null)} />
          )}
          {panel === 'experience' && (
            <ExperiencePanel key="experience" onClose={() => setPanel(null)} />
          )}
          {panel === 'menu' && (
            <MenuPanel key="menu" onClose={() => setPanel(null)} />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
