import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {fontFamily} from './theme';
import {S1Logo, S1_LEN} from './scenes/S1Logo';
import {S2Hook, S2_LEN} from './scenes/S2Hook';
import {S3Scan, S3_LEN} from './scenes/S3Scan';
import {S4Belajar, S4_LEN} from './scenes/S4Belajar';
import {S5Terjemah, S5_LEN} from './scenes/S5Terjemah';
import {S6Closing, S6_LEN} from './scenes/S6Closing';

export const SCENES = [
  {Comp: S1Logo, len: S1_LEN},
  {Comp: S2Hook, len: S2_LEN},
  {Comp: S3Scan, len: S3_LEN},
  {Comp: S4Belajar, len: S4_LEN},
  {Comp: S5Terjemah, len: S5_LEN},
  {Comp: S6Closing, len: S6_LEN},
];

export const TOTAL = SCENES.reduce((a, s) => a + s.len, 0);

export const Promo: React.FC = () => {
  let at = 0;
  return (
    <AbsoluteFill style={{backgroundColor: '#0E2C41', fontFamily}}>
      {SCENES.map(({Comp, len}, i) => {
        const from = at;
        at += len;
        return (
          <Sequence key={i} from={from} durationInFrames={len} layout="none">
            <Comp />
          </Sequence>
        );
      })}
      <Audio src={staticFile('music.wav')} />
    </AbsoluteFill>
  );
};
