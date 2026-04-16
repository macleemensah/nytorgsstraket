import React from 'react';
import { STORES } from '../data/stores';

const Marquee: React.FC = () => {
  // Only include store and place names from data
  const items = STORES.map(s => s.name);

  return (
    <div className="w-full overflow-hidden bg-brand-red py-3 select-none">
      <div className="flex animate-[marquee_60s_linear_infinite] whitespace-nowrap w-max">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length ? "true" : undefined}
            className="inline-flex items-center gap-5 px-6 text-white text-xs uppercase tracking-[0.2em] font-din font-medium"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
