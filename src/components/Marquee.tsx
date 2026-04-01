import React from 'react';

const items = [
  'Compact Shopping',
  'Shop \'n Stroll',
  'Nytorgsgatan 36–38',
  'Södermalm · Stockholm',
  'Boutique',
  'Något att älska',
  'SoFo',
  'Compact Shopping',
  'Shop \'n Stroll',
  'Nytorgsgatan 36–38',
  'Södermalm · Stockholm',
  'Boutique',
  'Något att älska',
  'SoFo',
];

const Marquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden bg-brand-red py-3 select-none">
      <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap w-max">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
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
