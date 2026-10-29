import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {fade, pop, rise, sceneOpacity} from '../anim';
import {C} from '../theme';
import {IconCamera, IconLearn, IconTranslate} from '../ui/icons';
import {LogoLockup} from '../ui/Logo';
import {DarkBg} from '../ui/stage';

export const S6_LEN = 180;

const FeatureChip: React.FC<{
  Icon: React.FC<any>;
  label: string;
  style?: React.CSSProperties;
}> = ({Icon, label, style}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '16px 28px',
      borderRadius: 999,
      background: 'rgba(255,255,255,0.12)',
      border: '1.5px solid rgba(255,255,255,0.22)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
      fontSize: 26,
      fontWeight: 600,
      color: '#fff',
      backdropFilter: 'blur(10px)',
      ...style,
    }}
  >
    <Icon size={28} color={C.orange} strokeWidth={2.2} />
    {label}
  </div>
);

export const S6Closing: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{position: 'absolute', inset: 0, opacity: sceneOpacity(f, S6_LEN, 10)}}>
      <DarkBg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
          }}
        >
          <div style={pop(f, fps, 0, 0.85)}>
            <LogoLockup size={180} light />
          </div>

          <div style={{textAlign: 'center', ...rise(f, fps, 18, 28)}}>
            <div style={{fontSize: 58, fontWeight: 800, color: '#fff', lineHeight: 1.2}}>
              Setiap Karya <span style={{color: C.orange}}>Berhak Terbaca.</span>
            </div>
            <div
              style={{
                marginTop: 16,
                fontSize: 28,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.85)',
                ...rise(f, fps, 28, 24),
              }}
            >
              Mendukung pembelajaran braille, mempermudah penerjemahan untuk semua.
            </div>
          </div>

          {/* Key 3 Features Highlighted */}
          <div style={{display: 'flex', gap: 20, marginTop: 10}}>
            <FeatureChip Icon={IconCamera} label="Scan Braille" style={pop(f, fps, 38)} />
            <FeatureChip Icon={IconLearn} label="Belajar Interaktif" style={pop(f, fps, 48)} />
            <FeatureChip Icon={IconTranslate} label="Terjemah 2 Arah" style={pop(f, fps, 58)} />
          </div>

          <div
            style={{
              marginTop: 18,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              opacity: fade(f, 72, 94),
            }}
          >
            Mulai Bersama Brailly
          </div>
        </div>

        {/* Brand progress bar underline */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: 8,
            width: `${interpolate(f, [0, S6_LEN], [30, 100], {
              extrapolateRight: 'clamp',
            })}%`,
            background: `linear-gradient(90deg, ${C.orange}, ${C.blue})`,
          }}
        />
      </DarkBg>
    </div>
  );
};
