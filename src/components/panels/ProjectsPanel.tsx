'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data';
import styles from './Panel.module.css';

export default function ProjectsPanel({ onClose }: { onClose: () => void }) {
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
            <div className={styles.panelTitle}>Projects</div>
            <div className={styles.panelSubtitle}>things built, systems wired</div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>close</button>
        </div>

        <div className={styles.panelBody}>
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className={styles.card}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.cardCategory}>{project.category} · {project.period}</div>
              <div className={styles.cardTitle}>{project.title}</div>
              <div className={styles.cardStat}>{project.stat}</div>
              <p className={styles.cardDesc}>{project.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                <div className={styles.chips}>
                  {project.tech.map((t) => (
                    <span key={t} className={styles.chip}>{t}</span>
                  ))}
                </div>
                {'github' in project && project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.52rem',
                      fontWeight: 200,
                      letterSpacing: '0.35em',
                      color: 'var(--text-ghost)',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      transition: 'color 0.25s',
                      flexShrink: 0,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--amber-muted)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-ghost)')}
                  >
                    View on GitHub →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
