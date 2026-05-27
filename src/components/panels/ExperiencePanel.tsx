'use client';

import { motion } from 'framer-motion';
import { experience, education } from '@/lib/data';
import styles from './Panel.module.css';

export default function ExperiencePanel({ onClose }: { onClose: () => void }) {
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
            <div className={styles.panelTitle}>Experience</div>
            <div className={styles.panelSubtitle}>where the work actually happened</div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>close</button>
        </div>

        <div className={styles.panelBody}>
          <div className={styles.sectionLabel}>Work</div>

          {experience.map((job, i) => (
            <motion.div
              key={i}
              className={styles.expEntry}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.expRole}>{job.role}</div>
              <div className={styles.expMeta}>
                {job.company} · {job.location} · {job.period}
              </div>
              <ul className={styles.expBullets}>
                {job.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </motion.div>
          ))}

          <div className={styles.divider} />

          <div className={styles.sectionLabel}>Education</div>

          {education.map((edu, i) => (
            <motion.div
              key={i}
              className={styles.expEntry}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.expRole}>{edu.credential}</div>
              <div className={styles.expMeta}>{edu.institution} · {edu.period}</div>
              {edu.notes && (
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                }}>
                  {edu.notes}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
