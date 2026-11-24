'use client';

import { experience, education } from '@/lib/data';
import PanelShell from './PanelShell';
import styles from './Panel.module.css';

export default function ExperiencePanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell id="panel-experience" title="Experience" subtitle="where the work actually happened" onClose={onClose}>
      <div className={styles.sectionLabel}>Work</div>

      {experience.map((job, i) => (
        <div key={i} className={styles.expEntry}>
          <div className={styles.expRole}>{job.role}</div>
          <div className={styles.expMeta}>
            {job.company} · {job.location} · {job.period}
          </div>
          <ul className={styles.expBullets}>
            {job.bullets.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ul>
        </div>
      ))}

      <div className={styles.divider} />

      <div className={styles.sectionLabel}>Education</div>

      {education.map((edu, i) => (
        <div key={i} className={styles.expEntry}>
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
        </div>
      ))}
    </PanelShell>
  );
}
