'use client';

import { about, drinkMenu } from '@/lib/data';
import PanelShell from './PanelShell';
import styles from './Panel.module.css';

export default function MenuPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell id="panel-menu" title="Tonight's Menu" subtitle="house specials, mixed from the toolkit" onClose={onClose}>
      {drinkMenu.map((drink) => (
        <div key={drink.name} className={styles.drink}>
          <div className={styles.drinkHeader}>
            <h3 className={styles.cardTitle}>{drink.name}</h3>
            <div className={styles.drinkLeader} />
            <div className={styles.cardCategory}>{drink.category}</div>
          </div>
          <p className={styles.drinkNote}>{drink.note}</p>
          <div className={styles.drinkIngredients}>
            {about.skills[drink.category].join(' · ')}
          </div>
        </div>
      ))}
    </PanelShell>
  );
}
