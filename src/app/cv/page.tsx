import type { Metadata } from 'next';
import Link from 'next/link';
import { about, experience, education, projects } from '@/lib/data';
import styles from './cv.module.css';

export const metadata: Metadata = {
  title: 'Anil Bronson — CV',
  description: `${about.title} at ${about.company}. Experience, projects and skills, without the bar.`,
};

// The whole portfolio as one plain, server-rendered page: for recruiters in a
// hurry, screen readers and search engines. Everything comes from data.ts.
export default function CvPage() {
  return (
    <div className={styles.scroll}>
      <main className={styles.page}>
        <nav className={styles.topNav} aria-label="Site">
          <Link href="/bar">← back to the bar</Link>
          <a href="/resume.pdf" download>resume (pdf)</a>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.name}>{about.name}</h1>
          <p className={styles.role}>{about.title} · {about.company} · {about.location}</p>
          <p className={styles.bio}>{about.bio}</p>
          <ul className={styles.contact}>
            <li><a href={`mailto:${about.email}`}>{about.email}</a></li>
            <li><a href={about.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href={about.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </header>

        <section aria-labelledby="cv-experience">
          <h2 id="cv-experience" className={styles.section}>Experience</h2>
          {experience.map((job) => (
            <article key={`${job.role}-${job.period}`} className={styles.entry}>
              <h3 className={styles.entryTitle}>{job.role}</h3>
              <p className={styles.meta}>{job.company} · {job.location} · {job.period}</p>
              <ul className={styles.bullets}>
                {job.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </article>
          ))}
        </section>

        <section aria-labelledby="cv-projects">
          <h2 id="cv-projects" className={styles.section}>Projects</h2>
          {projects.map((p) => (
            <article key={p.title} className={styles.entry}>
              <h3 className={styles.entryTitle}>{p.title}</h3>
              <p className={styles.meta}>{p.category} · {p.period} · {p.stat}</p>
              <p>{p.description}</p>
              <p className={styles.detail}><strong>{p.detail.label}:</strong> {p.detail.text}</p>
              <p className={styles.meta}>
                {p.tech.join(' · ')}
                {p.github && <> · <a href={p.github} target="_blank" rel="noopener noreferrer">code on GitHub</a></>}
              </p>
            </article>
          ))}
        </section>

        <section aria-labelledby="cv-education">
          <h2 id="cv-education" className={styles.section}>Education</h2>
          {education.map((e) => (
            <article key={e.institution} className={styles.entry}>
              <h3 className={styles.entryTitle}>{e.credential}</h3>
              <p className={styles.meta}>{e.institution} · {e.period}</p>
              {e.notes && <p>{e.notes}</p>}
            </article>
          ))}
        </section>

        <section aria-labelledby="cv-skills">
          <h2 id="cv-skills" className={styles.section}>Skills</h2>
          <dl className={styles.skills}>
            {Object.entries(about.skills).map(([category, items]) => (
              <div key={category}>
                <dt>{category}</dt>
                <dd>{items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </div>
  );
}
