import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {rise, sceneOpacity} from '../anim';
import {C} from '../theme';
import {BelajarScreen, JalurKuisScreen, QuizScreen} from '../screens/Belajar';
import {Phone, Tap} from '../ui/Phone';
import {Bullet, Headline, Kicker, LightBg, ScreenLayer, Sub} from '../ui/stage';

export const S4_LEN = 360;

export const S4Belajar: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  const letters = Math.max(0, Math.min(16, Math.floor((f - 34) / 4)));
  const nodes = Math.max(0, Math.min(5, Math.floor((f - 152) / 8)));
  const pulse = f > 196 && f < 236 ? ((f - 196) % 40) / 40 : 0;

  const cellsShown = Math.max(0, Math.min(4, Math.floor((f - 266) / 7)));
  const answered = f >= 302;
  const picked = f >= 296 ? 0 : null;
  const progress = interpolate(f, [302, 322], [0.4, 0.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{position: 'absolute', inset: 0, opacity: sceneOpacity(f, S4_LEN)}}>
      <LightBg>
        {/* device on the left this time, for rhythm */}
        <div style={{position: 'absolute', left: 250, top: 108, ...rise(f, fps, 8, 70)}}>
          <Phone scale={0.84}>
            <ScreenLayer frame={f} inAt={[6, 18]} outAt={[144, 154]}>
              <BelajarScreen letters={letters} />
            </ScreenLayer>
            <ScreenLayer frame={f} inAt={[150, 160]} outAt={[242, 252]}>
              <JalurKuisScreen nodes={nodes} pulse={pulse} />
            </ScreenLayer>
            <ScreenLayer frame={f} inAt={[248, 258]}>
              <QuizScreen
                cellsShown={cellsShown}
                picked={picked}
                correct={answered}
                progress={progress}
                score={answered ? '3/5' : '2/5'}
                questionIndex="Soal 2 dari 5"
              />
            </ScreenLayer>
            <Tap x={229} y={221} progress={(f - 112) / 20} />
            <Tap x={159} y={603} progress={(f - 212) / 20} />
            <Tap x={229} y={339} progress={(f - 288) / 20} />
          </Phone>
        </div>

        {/* copy column */}
        <div style={{position: 'absolute', left: 800, top: 222, width: 1000}}>
          <div style={rise(f, fps, 0, 30)}>
            <Kicker>Fitur 02 · Belajar</Kicker>
          </div>
          <Headline style={{marginTop: 26, ...rise(f, fps, 6, 40)}}>
            Belajar braille
            <br />
            <span style={{color: C.orange}}>dari titik pertama.</span>
          </Headline>
          <Sub style={{marginTop: 24, ...rise(f, fps, 14, 30)}}>
            Kamus, kuis bertingkat, dan streak harian — semuanya dalam satu aplikasi.
          </Sub>

          <div style={{marginTop: 42, display: 'flex', flexDirection: 'column', gap: 18}}>
            <div style={rise(f, fps, 38, 30)}>
              <Bullet dots={[1, 2, 3]}>Kamus alfabet, angka, dan simbol</Bullet>
            </div>
            <div style={rise(f, fps, 168, 30)}>
              <Bullet dots={[1, 4, 5]}>10 level kuis, dari huruf sampai kata</Bullet>
            </div>
            <div style={rise(f, fps, 276, 30)}>
              <Bullet dots={[2, 3, 4, 6]}>Streak harian yang menjaga kebiasaan</Bullet>
            </div>
          </div>
        </div>
      </LightBg>
    </div>
  );
};
