import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {rise, sceneOpacity} from '../anim';
import {C} from '../theme';
import {TerjemahDotsScreen, TerjemahTextScreen} from '../screens/Terjemah';
import {Phone, Tap} from '../ui/Phone';
import {Headline, Kicker, LightBg, Sub} from '../ui/stage';

export const S5_LEN = 150;

export const S5Terjemah: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{position: 'absolute', inset: 0, opacity: sceneOpacity(f, S5_LEN)}}>
      <LightBg>
        {/* Copy Column */}
        <div style={{position: 'absolute', left: 120, top: 290, width: 800}}>
          <div style={rise(f, fps, 0, 26)}>
            <Kicker>Fitur 03 · Terjemah Dua Arah</Kicker>
          </div>
          <Headline size={66} style={{marginTop: 24, ...rise(f, fps, 5, 36)}}>
            Teks ke Braille,
            <br />
            <span style={{color: C.orange}}>Braille ke Teks.</span>
          </Headline>
          <Sub style={{marginTop: 22, ...rise(f, fps, 12, 28)}}>
            Ketik kata untuk melihat pola titik braille, atau tekan kombinasi 6 titik
            untuk menerjemahkan ke teks biasa secara langsung.
          </Sub>
        </div>

        {/* Dual Phone Showcase */}
        <div style={{position: 'absolute', left: 980, top: 170, ...rise(f, fps, 10, 70)}}>
          <div
            style={{
              transform: 'rotate(-4deg)',
              filter: 'drop-shadow(0 20px 40px rgba(12,38,56,0.18))',
            }}
          >
            <Phone scale={0.68}>
              <TerjemahTextScreen />
            </Phone>
          </div>
        </div>

        <div style={{position: 'absolute', left: 1400, top: 210, ...rise(f, fps, 20, 70)}}>
          <div
            style={{
              transform: 'rotate(4deg)',
              filter: 'drop-shadow(0 20px 40px rgba(12,38,56,0.18))',
            }}
          >
            <Phone scale={0.68}>
              <TerjemahDotsScreen />
              {/* Interactive tap on dot 2 */}
              <Tap x={140} y={430} progress={(f - 40) / 18} />
            </Phone>
          </div>
        </div>
      </LightBg>
    </div>
  );
};
