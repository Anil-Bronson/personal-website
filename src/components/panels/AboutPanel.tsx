'use client';

import { motion } from 'framer-motion';
import { about } from '@/lib/data';
import styles from './Panel.module.css';

export default function AboutPanel({ onClose }: { onClose: () => void }) {
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
            <div className={styles.panelTitle}>About</div>
            <div className={styles.panelSubtitle}>Get to know me a bit better</div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>close</button>
        </div>

        <div className={styles.panelBody}>
          <div className={styles.sectionLabel}>Who</div>
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 200,
              letterSpacing: '0.06em',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-xs)',
            }}>
              {about.name}
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--amber-muted)',
              marginBottom: 'var(--space-lg)',
            }}>
              {about.title} — {about.company}
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'var(--text-secondary)',
              maxWidth: '55ch',
            }}>
              {about.bio}
            </p>
          </div>

          <div className={styles.divider} />

          <div className={styles.sectionLabel}>Contact</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginBottom: 'var(--space-2xl)' }}>
            {[
              { label: 'Email', value: about.email, href: `mailto:${about.email}` },
              { label: 'LinkedIn', value: 'linkedin.com/in/anilbronson', href: about.linkedin },
              { label: 'GitHub', value: 'github.com/anil-bronson', href: about.github },
              { label: 'Location', value: about.location },
              { label: 'Resume', value: 'Download PDF', href: '/resume.pdf', download: true },
            ].map(({ label, value, href, download }) => (
              <div key={label} style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'baseline' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.55rem',
                  fontWeight: 200,
                  letterSpacing: '0.4em',
                  color: 'var(--text-ghost)',
                  textTransform: 'uppercase',
                  minWidth: '70px',
                }}>
                  {label}
                </span>
                {href ? (
                  <a href={href} target={download ? '_self' : '_blank'} rel="noopener noreferrer" download={download || undefined} style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    fontWeight: 300,
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.25s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--amber-muted)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {value}
                  </a>
                ) : (
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 300, color: 'var(--text-secondary)' }}>
                    {value}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.sectionLabel}>Skills</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            {Object.entries(about.skills).map(([category, items]) => (
              <div key={category}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.62rem',
                  fontWeight: 200,
                  letterSpacing: '0.35em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-sm)',
                }}>
                  {category}
                </div>
                <div className={styles.chips}>
                  {items.map((skill) => (
                    <span key={skill} className={styles.chip}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
