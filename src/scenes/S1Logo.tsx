import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {fade, sceneOpacity} from '../anim';
import {C} from '../theme';
import {LogoLockup} from '../ui/Logo';
import {DarkBg} from '../ui/stage';

export const S1_LEN = 105;

export const S1Logo: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  const reveal = spring({frame: f, fps, config: {damping: 14, mass: 0.8, stiffness: 90}});
  const scale = interpolate(f, [0, S1_LEN], [0.97, 1.04]);

  return (
    <div style={{position: 'absolute', inset: 0, opacity: sceneOpacity(f, S1_LEN, 8)}}>
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
            transform: `scale(${scale})`,
          }}
        >
          <LogoLockup size={210} reveal={reveal} wordOpacity={fade(f, 20, 42)} light />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              opacity: fade(f, 44, 66),
              transform: `translateY(${interpolate(f, [44, 66], [16, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}px)`,
            }}
          >
            <div style={{width: 48, height: 3, background: C.orange, borderRadius: 2}} />
            <div
              style={{
                fontSize: 42,
                fontWeight: 700,
                letterSpacing: 0.5,
                color: 'rgba(255,255,255,0.95)',
              }}
            >
              Setiap Karya Berhak Terbaca.
            </div>
            <div style={{width: 48, height: 3, background: C.orange, borderRadius: 2}} />
          </div>

          <div
            style={{
              opacity: fade(f, 62, 80),
              transform: `translateY(${interpolate(f, [62, 80], [12, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}px)`,
              fontSize: 22,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Belajar & Terjemahkan Braille Lebih Mudah
          </div>
        </div>

        {/* Bottom brand accent */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: 8,
            width: `${fade(f, 10, 95) * 100}%`,
            background: `linear-gradient(90deg, ${C.orange}, ${C.blue})`,
          }}
        />
      </DarkBg>
    </div>
  );
};
