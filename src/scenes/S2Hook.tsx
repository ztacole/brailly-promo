import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {fade, rise, sceneOpacity} from '../anim';
import {C} from '../theme';
import {BraillePaper} from '../ui/kit';
import {DarkBg, Headline} from '../ui/stage';

export const S2_LEN = 135;

export const S2Hook: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{position: 'absolute', inset: 0, opacity: sceneOpacity(f, S2_LEN)}}>
      <DarkBg>
        {/* Photographed braille page with physical dots */}
        <div
          style={{
            position: 'absolute',
            left: 130,
            top: 290,
            ...rise(f, fps, 2, 50),
          }}
        >
          <div
            style={{
              transform: `rotate(-5deg) translateY(${Math.sin(f / 46) * 8}px)`,
              boxShadow: '0 50px 90px rgba(0,0,0,0.45)',
              borderRadius: 26,
            }}
          >
            <BraillePaper
              width={640}
              height={470}
              radius={26}
              dot={11}
              tilt={1.2}
              lines={['karya yang', 'belum terbaca']}
            />
          </div>
        </div>

        {/* Copy Column */}
        <div
          style={{
            position: 'absolute',
            left: 880,
            top: 280,
            width: 920,
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
          }}
        >
          <Headline light size={64} style={{...rise(f, fps, 10, 36)}}>
            Banyak karya indah lahir
            <br />
            dari <span style={{color: C.orange}}>ujung jari</span> tunanetra.
          </Headline>
          <Headline light size={60} style={{...rise(f, fps, 38, 36), opacity: 0.9}}>
            Namun sulit dibaca oleh
            <br />
            masyarakat umum.
          </Headline>
          <div
            style={{
              marginTop: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              opacity: fade(f, 74, 96),
            }}
          >
            <div
              style={{
                width: 76,
                height: 6,
                borderRadius: 4,
                background: C.orange,
                transform: `scaleX(${fade(f, 74, 96)})`,
                transformOrigin: 'left center',
              }}
            />
            <div style={{fontSize: 36, fontWeight: 700, color: '#fff'}}>
              Brailly hadir membuka akses untuk semua.
            </div>
          </div>
        </div>
      </DarkBg>
    </div>
  );
};
