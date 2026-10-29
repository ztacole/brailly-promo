import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {rise, sceneOpacity} from '../anim';
import {C} from '../theme';
import {
  BelajarScreen,
  JalurKuisScreen,
  QuizScreen,
  QuizVictoryScreen,
  VideoMateriScreen,
} from '../screens/Belajar';
import {Phone, Tap} from '../ui/Phone';
import {Bullet, Headline, Kicker, LightBg, ScreenLayer, Sub} from '../ui/stage';

export const S4_LEN = 390;

export const S4Belajar: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Pulse animation for the active level node
  const levelPulse = f >= 100 && f <= 165 ? ((f - 100) % 30) / 30 : 0;

  // Celebration particle burst when quiz answer is correct
  const celebrate =
    f >= 280
      ? interpolate(f, [280, 310, 340], [0, 1, 0.6], {extrapolateRight: 'clamp'})
      : 0;

  return (
    <div style={{position: 'absolute', inset: 0, opacity: sceneOpacity(f, S4_LEN)}}>
      <LightBg>
        {/* Device on left side for visual dynamic rhythm */}
        <div style={{position: 'absolute', left: 210, top: 96, ...rise(f, fps, 8, 70)}}>
          <Phone scale={0.85}>
            {/* Step 1: Real Belajar Hub & Dictionary */}
            <ScreenLayer frame={f} inAt={[0, 14]} outAt={[78, 88]}>
              <BelajarScreen />
            </ScreenLayer>

            {/* Step 2: Real Level Progression Roadmap */}
            <ScreenLayer frame={f} inAt={[84, 94]} outAt={[170, 180]}>
              <JalurKuisScreen pulse={levelPulse} />
            </ScreenLayer>

            {/* Step 3: Real Video Learning Material */}
            <ScreenLayer frame={f} inAt={[176, 186]} outAt={[250, 260]}>
              <VideoMateriScreen />
            </ScreenLayer>

            {/* Step 4: Real Interactive Quiz with Correct State */}
            <ScreenLayer frame={f} inAt={[256, 266]} outAt={[335, 345]}>
              <QuizScreen celebrate={celebrate} />
            </ScreenLayer>

            {/* Step 5: Real Level Victory Celebration */}
            <ScreenLayer frame={f} inAt={[340, 350]}>
              <QuizVictoryScreen />
            </ScreenLayer>

            {/* Tap 1: Tap "LANJUTKAN KUIS" on main Belajar screen */}
            <Tap x={229} y={225} progress={(f - 56) / 18} />

            {/* Tap 2: Tap Level on roadmap */}
            <Tap x={229} y={310} progress={(f - 146) / 18} />

            {/* Tap 3: Tap "TONTON UNTUK MELANJUTKAN" on Video lesson */}
            <Tap x={229} y={870} progress={(f - 226) / 18} />

            {/* Tap 4: Tap "LANJUT" on Quiz Screen */}
            <Tap x={229} y={837} progress={(f - 316) / 18} />
          </Phone>
        </div>

        {/* Copy Column on right side */}
        <div style={{position: 'absolute', left: 810, top: 210, width: 980}}>
          <div style={rise(f, fps, 0, 30)}>
            <Kicker>Fitur 02 · Pembelajaran Braille</Kicker>
          </div>
          <Headline style={{marginTop: 24, ...rise(f, fps, 6, 40)}}>
            Belajar braille menyenangkan,
            <br />
            <span style={{color: C.orange}}>dari titik pertama.</span>
          </Headline>
          <Sub style={{marginTop: 22, ...rise(f, fps, 14, 30)}}>
            Mulai dari mengenal alfabet, menonton video panduan, hingga tantangan
            kuis bertingkat yang interaktif.
          </Sub>

          <div style={{marginTop: 38, display: 'flex', flexDirection: 'column', gap: 16}}>
            <div style={rise(f, fps, 34, 30)}>
              <Bullet dots={[1, 2, 3]}>Kamus lengkap: Alfabet, Angka, & Simbol</Bullet>
            </div>
            <div style={rise(f, fps, 140, 30)}>
              <Bullet dots={[1, 4, 5]}>Materi video interaktif untuk setiap modul</Bullet>
            </div>
            <div style={rise(f, fps, 250, 30)}>
              <Bullet dots={[2, 3, 4, 6]}>10 level kuis latihan & streak penjaga kebiasaan</Bullet>
            </div>
          </div>
        </div>
      </LightBg>
    </div>
  );
};
