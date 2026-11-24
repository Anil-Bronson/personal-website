'use client';

import { useEffect, useRef } from 'react';
import { projects } from '@/lib/data';
import PanelShell from './PanelShell';
import ProjectVisualFigure from './ProjectVisuals';
import styles from './Panel.module.css';

export default function ProjectsPanel({ onClose, focus }: { onClose: () => void; focus?: string | null }) {
  const focusRef = useRef<HTMLElement>(null);

  // Opened from a shelf bottle: bring that project into view once the panel has slid in
  useEffect(() => {
    if (!focus) return;
    const t = setTimeout(() => focusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 450);
    return () => clearTimeout(t);
  }, [focus]);

  return (
    <PanelShell id="panel-projects" title="Projects" subtitle="things built, systems wired" onClose={onClose} wide>
      {projects.map((project, i) => {
        const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const focused = project.title === focus;
        return (
          <article
            key={project.title}
            ref={focused ? focusRef : undefined}
            className={`${styles.project} ${styles[`layout_${project.layout}`]} ${focused ? styles.projectFocused : ''}`}
            aria-labelledby={`project-${slug}`}
          >
            <header className={styles.projectHead}>
              <p className={styles.projectMeta}>
                <span className={styles.projectIndex}>{String(i + 1).padStart(2, '0')}</span>
                {project.category} · {project.period}
              </p>
              <h3 id={`project-${slug}`} className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectLede}>{project.lede}</p>
            </header>

            {project.visual && (
              <div className={styles.projectVisual}>
                <ProjectVisualFigure visual={project.visual} title={project.title} />
              </div>
            )}

            <p className={styles.projectText}>{project.description}</p>

            <aside className={styles.projectDetail}>
              <span className={styles.detailLabel}>{project.detail.label}</span>
              <p className={styles.detailText}>{project.detail.text}</p>
            </aside>

            <footer className={styles.projectFoot}>
              <span className={styles.projectStat}>{project.stat}</span>
              <span className={styles.projectTech}>Built with {project.tech.join(' · ')}</span>
              {project.github && (
                <a className={styles.projectLink} href={project.github} target="_blank" rel="noopener noreferrer">
                  Code on GitHub <span aria-hidden="true">→</span>
                </a>
              )}
            </footer>
          </article>
        );
      })}
    </PanelShell>
  );
}
