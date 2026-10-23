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

  const draw = spring({frame: f, fps, config: {damping: 200, mass: 0.9, stiffness: 70}});
  const dots = interpolate(f, [16, 58], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
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
          <LogoLockup size={210} draw={draw} dots={dots} wordOpacity={fade(f, 34, 56)} light />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              opacity: fade(f, 58, 80),
              transform: `translateY(${interpolate(f, [58, 80], [16, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}px)`,
            }}
          >
            <div style={{width: 46, height: 3, background: 'rgba(255,255,255,0.35)'}} />
            <div
              style={{
                fontSize: 30,
                fontWeight: 600,
                letterSpacing: 9,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.86)',
              }}
            >
              Braille untuk semua
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
