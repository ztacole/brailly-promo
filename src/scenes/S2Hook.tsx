import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {fade, rise, sceneOpacity} from '../anim';
import {C} from '../theme';
import {BraillePaper} from '../ui/kit';
import {DarkBg, Headline} from '../ui/stage';

export const S2_LEN = 150;

export const S2Hook: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{position: 'absolute', inset: 0, opacity: sceneOpacity(f, S2_LEN)}}>
      <DarkBg>
        {/* photographed braille page */}
        <div
          style={{
            position: 'absolute',
            left: 120,
            top: 300,
            ...rise(f, fps, 2, 60),
          }}
        >
          <div
            style={{
              transform: `rotate(-6deg) translateY(${Math.sin(f / 46) * 9}px)`,
              boxShadow: '0 50px 90px rgba(0,0,0,0.45)',
              borderRadius: 26,
            }}
          >
            <BraillePaper
              width={660}
              height={470}
              radius={26}
              dot={11}
              tilt={1.2}
              lines={['karya yang', 'belum terbaca']}
            />
          </div>
        </div>

        {/* copy */}
        <div
          style={{
            position: 'absolute',
            left: 930,
            top: 300,
            width: 860,
            display: 'flex',
            flexDirection: 'column',
            gap: 34,
          }}
        >
          <Headline light size={66} style={{...rise(f, fps, 12, 36)}}>
            Banyak karya lahir
            <br />
            dari ujung jari.
          </Headline>
          <Headline light size={66} style={{...rise(f, fps, 42, 36)}}>
            Tapi <span style={{color: C.orange}}>sedikit</span> yang
            <br />
            bisa membacanya.
          </Headline>
          <div
            style={{
              marginTop: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              opacity: fade(f, 84, 106),
            }}
          >
            <div
              style={{
                width: 92,
                height: 6,
                borderRadius: 4,
                background: C.orange,
                transform: `scaleX(${fade(f, 84, 106)})`,
                transformOrigin: 'left center',
              }}
            />
            <div style={{fontSize: 38, fontWeight: 700, color: '#fff'}}>
              Brailly menjembatani keduanya.
            </div>
          </div>
        </div>
      </DarkBg>
    </div>
  );
};
