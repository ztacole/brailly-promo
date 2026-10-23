import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {rise, sceneOpacity} from '../anim';
import {C} from '../theme';
import {TerjemahDotsScreen, TerjemahTextScreen} from '../screens/Terjemah';
import {Phone} from '../ui/Phone';
import {Headline, Kicker, LightBg, Sub} from '../ui/stage';

export const S5_LEN = 165;

export const S5Terjemah: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  const typed = Math.floor(
    interpolate(f, [26, 66], [0, 7], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
  );
  const cells = Math.floor(
    interpolate(f, [58, 104], [0, 7], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
  );
  const pressed = f < 52 ? [] : f < 72 ? [1] : [1, 2];
  const result = f < 86 ? '' : 'b';

  return (
    <div style={{position: 'absolute', inset: 0, opacity: sceneOpacity(f, S5_LEN)}}>
      <LightBg>
        <div style={{position: 'absolute', left: 130, top: 330, width: 760}}>
          <div style={rise(f, fps, 0, 26)}>
            <Kicker>Fitur 03 · Terjemah</Kicker>
          </div>
          <Headline size={68} style={{marginTop: 26, ...rise(f, fps, 5, 36)}}>
            Dua arah,
            <br />
            <span style={{color: C.orange}}>tanpa hambatan.</span>
          </Headline>
          <Sub style={{marginTop: 24, ...rise(f, fps, 12, 28)}}>
            Teks ke braille untuk menulis. Braille ke teks untuk membaca.
          </Sub>
        </div>

        <div style={{position: 'absolute', left: 1010, top: 250, ...rise(f, fps, 10, 70)}}>
          <div style={{transform: 'rotate(-5deg)'}}>
            <Phone scale={0.6}>
              <TerjemahTextScreen typed={typed} cells={cells} />
            </Phone>
          </div>
        </div>
        <div style={{position: 'absolute', left: 1390, top: 310, ...rise(f, fps, 20, 70)}}>
          <div style={{transform: 'rotate(5deg)'}}>
            <Phone scale={0.6}>
              <TerjemahDotsScreen pressed={pressed} result={result} />
            </Phone>
          </div>
        </div>
      </LightBg>
    </div>
  );
};
