'use client';

import { useEffect, useState } from 'react';

// Returns true for a short moment every so often, at irregular intervals —
// used to give a still figure an occasional shift of weight instead of a
// constant loop. Skips beats while the tab is hidden.
export function useIdleShift(everyMs: [number, number], holdMs: number, enabled: boolean) {
  const [shifted, setShifted] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout>;
    const [min, max] = everyMs;

    const schedule = () => {
      timer = setTimeout(() => {
        if (document.hidden) return schedule();
        setShifted(true);
        timer = setTimeout(() => {
          setShifted(false);
          schedule();
        }, holdMs);
      }, min + Math.random() * (max - min));
    };

    schedule();
    return () => {
      clearTimeout(timer);
      setShifted(false);
    };
  }, [enabled, everyMs, holdMs]);

  return enabled && shifted;
}
