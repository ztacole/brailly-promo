import React from 'react';
import {C, shadow} from '../theme';
import {cellsFor} from './Braille';

export const Card: React.FC<{
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({children, style}) => (
  <div
    style={{
      background: C.card,
      borderRadius: 16,
      boxShadow: shadow.card,
      padding: 16,
      ...style,
    }}
  >
    {children}
  </div>
);

export const SectionTitle: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({
  children,
  style,
}) => (
  <div style={{fontSize: 17, fontWeight: 700, color: C.ink, margin: '18px 0 10px', ...style}}>
    {children}
  </div>
);

export const ScreenTitle: React.FC<{title: string; sub?: string}> = ({title, sub}) => (
  <div style={{paddingTop: 14}}>
    <div style={{fontSize: 29, fontWeight: 800, color: C.ink, letterSpacing: -0.4}}>{title}</div>
    {sub ? <div style={{fontSize: 15, color: C.inkSoft, marginTop: 3}}>{sub}</div> : null}
  </div>
);

export const PrimaryButton: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  outline?: boolean;
}> = ({children, style, outline}) => (
  <div
    style={{
      height: 56,
      borderRadius: 28,
      background: outline ? 'transparent' : C.blue,
      border: outline ? `1.6px solid ${C.blue}` : 'none',
      color: outline ? C.blue : '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      fontSize: 17,
      fontWeight: 700,
      boxShadow: outline ? 'none' : shadow.pill,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Chip: React.FC<{label: string; active?: boolean}> = ({label, active}) => (
  <div
    style={{
      height: 36,
      padding: '0 18px',
      borderRadius: 18,
      background: active ? C.orangeSoft : C.card,
      border: active ? 'none' : `1px solid ${C.hairline}`,
      color: active ? C.orangeDeep : C.inkMid,
      fontSize: 14,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
    }}
  >
    {label}
  </div>
);

/**
 * Synthetic photograph of embossed braille on paper over a wooden desk.
 * Used in the scan viewfinder and the opening scene; no stock photo needed.
 */
export const BraillePaper: React.FC<{
  width: number;
  height: number;
  lines?: string[];
  dot?: number;
  radius?: number;
  tilt?: number;
}> = ({
  width,
  height,
  lines = ['one joy dispels', 'a hundred cares', '(orientalwisdom)'],
  dot = 7,
  radius = 16,
  tilt = 0,
}) => {
  const gap = dot * 0.72;
  const cellGap = dot * 1.5;
  const emboss = `radial-gradient(circle at 34% 28%, #ffffff 0%, #ededea 34%, #b4b4b0 68%, #96968f 100%)`;
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(170deg, #6f4620 0%, #8a5a28 45%, #a6752f 100%)',
      }}
    >
      {/* wood grain */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(94deg, rgba(0,0,0,0.12) 0 2px, rgba(255,255,255,0.05) 2px 7px, rgba(0,0,0,0.06) 7px 13px)',
          opacity: 0.6,
        }}
      />
      {/* paper */}
      <div
        style={{
          position: 'absolute',
          left: -width * 0.04,
          right: -width * 0.04,
          top: height * 0.17,
          bottom: height * 0.1,
          background: 'linear-gradient(165deg, #d2d2cf 0%, #c2c2bf 55%, #b0b0ac 100%)',
          boxShadow: '0 10px 26px rgba(0,0,0,0.35)',
          transform: `rotate(${tilt}deg)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: dot * 2.6,
          padding: `0 ${dot * 3}px`,
        }}
      >
        {lines.map((line, li) => (
          <div key={li} style={{display: 'flex', gap: cellGap, flexWrap: 'nowrap'}}>
            {cellsFor(line).map((cell, ci) => (
              <div key={ci} style={{display: 'flex', gap}}>
                {[
                  [1, 2, 3],
                  [4, 5, 6],
                ].map((col, coli) => (
                  <div key={coli} style={{display: 'flex', flexDirection: 'column', gap}}>
                    {col.map((d) => (
                      <div
                        key={d}
                        style={{
                          width: dot,
                          height: dot,
                          borderRadius: dot,
                          background: cell.includes(d) ? emboss : 'transparent',
                          boxShadow: cell.includes(d)
                            ? '0 1px 1.5px rgba(0,0,0,0.3)'
                            : 'none',
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* lighting */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(120% 80% at 25% 10%, rgba(255,255,255,0.16), rgba(0,0,0,0) 55%), radial-gradient(90% 70% at 85% 95%, rgba(0,0,0,0.3), rgba(0,0,0,0) 60%)',
        }}
      />
    </div>
  );
};
