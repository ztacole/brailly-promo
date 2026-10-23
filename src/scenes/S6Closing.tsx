import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {fade, pop, rise, sceneOpacity} from '../anim';
import {C} from '../theme';
import {IconLearn, IconScan, IconTranslate} from '../ui/icons';
import {LogoLockup} from '../ui/Logo';
import {DarkBg} from '../ui/stage';

export const S6_LEN = 210;

const Chip: React.FC<{Icon: React.FC<any>; label: string; style?: React.CSSProperties}> = ({
  Icon,
  label,
  style,
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '18px 32px',
      borderRadius: 999,
      background: 'rgba(255,255,255,0.12)',
      border: '1px solid rgba(255,255,255,0.2)',
      fontSize: 30,
      fontWeight: 600,
      color: '#fff',
      ...style,
    }}
  >
    <Icon size={30} color={C.orange} strokeWidth={2} />
    {label}
  </div>
);

export const S6Closing: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{position: 'absolute', inset: 0, opacity: sceneOpacity(f, S6_LEN, 12)}}>
      <DarkBg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 40,
          }}
        >
          <div style={pop(f, fps, 0, 0.82)}>
            <LogoLockup size={172} light />
          </div>

          <div style={{textAlign: 'center', ...rise(f, fps, 22, 30)}}>
            <div style={{fontSize: 60, fontWeight: 800, color: '#fff', lineHeight: 1.2}}>
              Setiap Karya <span style={{color: C.orange}}>Berhak Terbaca.</span>
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: 32,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.8)',
                ...rise(f, fps, 34, 24),
              }}
            >
              Membuka akses, menghubungkan karya, merangkul kesetaraan.
            </div>
          </div>

          <div style={{display: 'flex', gap: 22, marginTop: 14}}>
            <Chip Icon={IconScan} label="Scan" style={pop(f, fps, 44)} />
            <Chip Icon={IconTranslate} label="Terjemah" style={pop(f, fps, 54)} />
            <Chip Icon={IconLearn} label="Belajar" style={pop(f, fps, 64)} />
          </div>

          <div
            style={{
              marginTop: 26,
              fontSize: 26,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
              opacity: fade(f, 84, 108),
            }}
          >
            Brailly · v1.0
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: 8,
            width: `${interpolate(f, [0, S6_LEN], [40, 100], {
              extrapolateRight: 'clamp',
            })}%`,
            background: `linear-gradient(90deg, ${C.orange}, ${C.blue})`,
          }}
        />
      </DarkBg>
    </div>
  );
};
