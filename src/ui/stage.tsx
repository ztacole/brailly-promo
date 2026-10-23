import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, fontFamily} from '../theme';
import {fade} from '../anim';

/** Dark brand background with a faint braille dot field. */
export const DarkBg: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        fontFamily,
        overflow: 'hidden',
        background:
          'radial-gradient(130% 110% at 12% 8%, #27668F 0%, #184A6B 42%, #0E2C41 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -40,
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.075) 2.4px, rgba(0,0,0,0) 2.4px)',
          backgroundSize: '38px 38px',
          transform: `translateY(${-(f * 0.12) % 38}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: -220,
          bottom: -260,
          width: 900,
          height: 900,
          borderRadius: 999,
          background:
            'radial-gradient(circle, rgba(232,135,58,0.3) 0%, rgba(232,135,58,0) 62%)',
        }}
      />
      {children}
    </div>
  );
};

/** Light background used for the feature scenes. */
export const LightBg: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        fontFamily,
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #FBFCFD 0%, #EEF3F7 55%, #E7EEF4 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: -260,
          top: -220,
          width: 980,
          height: 980,
          borderRadius: 999,
          background:
            'radial-gradient(circle, rgba(44,108,153,0.16) 0%, rgba(44,108,153,0) 64%)',
          transform: `translateY(${Math.sin(f / 90) * 14}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: -200,
          bottom: -280,
          width: 900,
          height: 900,
          borderRadius: 999,
          background:
            'radial-gradient(circle, rgba(232,135,58,0.18) 0%, rgba(232,135,58,0) 62%)',
          transform: `translateY(${Math.cos(f / 110) * 16}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(44,108,153,0.1) 2.2px, rgba(0,0,0,0) 2.2px)',
          backgroundSize: '42px 42px',
          opacity: 0.5,
        }}
      />
      {children}
    </div>
  );
};

export const Kicker: React.FC<{children: React.ReactNode; light?: boolean}> = ({
  children,
  light,
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: 4,
      textTransform: 'uppercase',
      color: light ? 'rgba(255,255,255,0.78)' : C.orangeDeep,
    }}
  >
    <div style={{width: 52, height: 5, borderRadius: 4, background: C.orange}} />
    {children}
  </div>
);

export const Headline: React.FC<{
  children: React.ReactNode;
  light?: boolean;
  size?: number;
  style?: React.CSSProperties;
}> = ({children, light, size = 74, style}) => (
  <div
    style={{
      fontSize: size,
      fontWeight: 800,
      lineHeight: 1.08,
      letterSpacing: -1.8,
      color: light ? '#fff' : C.blueDeep,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Sub: React.FC<{children: React.ReactNode; light?: boolean; style?: React.CSSProperties}> = ({
  children,
  light,
  style,
}) => (
  <div
    style={{
      fontSize: 31,
      fontWeight: 500,
      lineHeight: 1.45,
      color: light ? 'rgba(255,255,255,0.8)' : C.inkMid,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Feature bullet: braille-cell marker + label. */
export const Bullet: React.FC<{
  children: React.ReactNode;
  dots?: number[];
  light?: boolean;
}> = ({children, dots = [1, 2], light}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      background: light ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.92)',
      border: light ? '1px solid rgba(255,255,255,0.16)' : '1px solid rgba(44,108,153,0.1)',
      borderRadius: 20,
      padding: '18px 26px',
      boxShadow: light ? 'none' : '0 6px 20px rgba(20,63,92,0.07)',
      fontSize: 28,
      fontWeight: 600,
      color: light ? '#fff' : C.blueDeep,
    }}
  >
    <div style={{display: 'flex', gap: 7}}>
      {[
        [1, 2, 3],
        [4, 5, 6],
      ].map((col, ci) => (
        <div key={ci} style={{display: 'flex', flexDirection: 'column', gap: 7}}>
          {col.map((d) => (
            <div
              key={d}
              style={{
                width: 11,
                height: 11,
                borderRadius: 11,
                background: dots.includes(d)
                  ? C.orange
                  : light
                    ? 'rgba(255,255,255,0.22)'
                    : 'rgba(44,108,153,0.16)',
              }}
            />
          ))}
        </div>
      ))}
    </div>
    {children}
  </div>
);

/**
 * Stacked phone screen with crossfades, so one Phone can walk through a flow.
 * `inAt`/`outAt` are [start, end] frame pairs relative to the scene.
 */
export const ScreenLayer: React.FC<{
  frame: number;
  inAt: [number, number];
  outAt?: [number, number];
  children: React.ReactNode;
}> = ({frame, inAt, outAt, children}) => {
  const o =
    fade(frame, inAt[0], inAt[1]) * (outAt ? 1 - fade(frame, outAt[0], outAt[1]) : 1);
  if (o <= 0.001) return null;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: o}}>{children}</div>
  );
};
