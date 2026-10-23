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
            gap: 44,
            transform: `scale(${scale})`,
          }}
        >
          <LogoLockup size={200} reveal={reveal} wordOpacity={fade(f, 22, 44)} light />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              opacity: fade(f, 46, 68),
              transform: `translateY(${interpolate(f, [46, 68], [16, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}px)`,
            }}
          >
            <div style={{width: 46, height: 3, background: 'rgba(255,255,255,0.35)'}} />
            <div
              style={{
                fontSize: 40,
                fontWeight: 600,
                letterSpacing: 1,
                color: 'rgba(255,255,255,0.92)',
              }}
            >
              Setiap Karya Berhak Terbaca.
            </div>
            <div style={{width: 46, height: 3, background: 'rgba(255,255,255,0.35)'}} />
          </div>
        </div>
        {/* bottom accent */}
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
