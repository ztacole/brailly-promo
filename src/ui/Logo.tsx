import React from 'react';
import {Img, staticFile} from 'remotion';
import {C, fontFamily} from '../theme';

/**
 * Official Brailly mark: public/logo.png (512x512, from the app's ic_launcher-playstore.png).
 *
 * The artwork has a white background with ~13% margin, so on dark scenes it is shown
 * as a rounded white tile. `reveal` (0..1) scales and fades the tile in.
 */
export const LogoMark: React.FC<{size?: number; reveal?: number}> = ({size = 260, reveal = 1}) => (
  <Img
    src={staticFile('logo.png')}
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.22,
      boxShadow: '0 26px 60px rgba(6,26,40,0.45)',
      opacity: Math.min(1, reveal * 1.6),
      transform: `scale(${0.82 + 0.18 * reveal})`,
    }}
  />
);

/** Horizontal lockup: mark + "Brailly" wordmark separated by a thin rule. */
export const LogoLockup: React.FC<{
  size?: number;
  reveal?: number;
  wordOpacity?: number;
  light?: boolean;
}> = ({size = 190, reveal = 1, wordOpacity = 1, light}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: size * 0.14}}>
    <LogoMark size={size} reveal={reveal} />
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: size * 0.085,
        opacity: wordOpacity,
      }}
    >
      <div
        style={{
          width: 3,
          height: size * 0.44,
          background: light ? 'rgba(255,255,255,0.55)' : '#1B1B1B',
        }}
      />
      <div
        style={{
          fontFamily,
          fontSize: size * 0.5,
          fontWeight: 800,
          letterSpacing: -size * 0.01,
          color: light ? '#fff' : C.blue,
        }}
      >
        Brail
        <span style={{color: C.orange}}>ly</span>
      </div>
    </div>
  </div>
);
