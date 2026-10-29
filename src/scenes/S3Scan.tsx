import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {rise, sceneOpacity} from '../anim';
import {C} from '../theme';
import {HomeScreen} from '../screens/Home';
import {ScanCameraScreen, ScanHistoryScreen, ScanResultScreen} from '../screens/Scan';
import {Phone, Tap} from '../ui/Phone';
import {Bullet, Headline, Kicker, LightBg, ScreenLayer, Sub} from '../ui/stage';

export const S3_LEN = 390;

export const S3Scan: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Scanning laser beam sweeping in the camera viewfinder
  const sweep = f >= 60 && f < 165 ? (Math.sin((f - 60) * 0.14) + 1) / 2 : 0;

  // Shutter flash triggered on button press
  const flash =
    f >= 155 && f <= 175
      ? interpolate(f, [155, 160, 175], [0, 0.95, 0], {extrapolateRight: 'clamp'})
      : 0;

  const resultReveal = interpolate(f, [195, 230], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{position: 'absolute', inset: 0, opacity: sceneOpacity(f, S3_LEN)}}>
      <LightBg>
        {/* Copy Column */}
        <div style={{position: 'absolute', left: 120, top: 210, width: 840}}>
          <div style={rise(f, fps, 0, 30)}>
            <Kicker>Fitur 01 · Scan Braille</Kicker>
          </div>
          <Headline style={{marginTop: 24, ...rise(f, fps, 6, 40)}}>
            Foto braille fisik,
            <br />
            <span style={{color: C.orange}}>langsung jadi teks.</span>
          </Headline>
          <Sub style={{marginTop: 22, ...rise(f, fps, 14, 30)}}>
            Arahkan kamera ke kertas atau buku braille — Brailly mengenali titik dan
            menerjemahkannya seketika ke teks digital.
          </Sub>

          <div style={{marginTop: 38, display: 'flex', flexDirection: 'column', gap: 16}}>
            <div style={rise(f, fps, 30, 30)}>
              <Bullet dots={[1, 4]}>Deteksi cerdas berbasis visual kamera</Bullet>
            </div>
            <div style={rise(f, fps, 140, 30)}>
              <Bullet dots={[1, 2, 5]}>Hasil akurat lengkap dengan analisis sel & paragraf</Bullet>
            </div>
            <div style={rise(f, fps, 250, 30)}>
              <Bullet dots={[2, 4, 5]}>Tersimpan rapi di riwayat & siap dibagikan</Bullet>
            </div>
          </div>
        </div>

        {/* Device with authentic app screens */}
        <div style={{position: 'absolute', left: 1220, top: 96, ...rise(f, fps, 8, 70)}}>
          <Phone scale={0.85}>
            {/* Phase 1: Real Home Screen */}
            <ScreenLayer frame={f} inAt={[0, 14]} outAt={[58, 68]}>
              <HomeScreen />
            </ScreenLayer>

            {/* Phase 2: Real Camera Viewfinder */}
            <ScreenLayer frame={f} inAt={[64, 74]} outAt={[170, 180]}>
              <ScanCameraScreen sweep={sweep} flash={flash} />
            </ScreenLayer>

            {/* Phase 3: Real Scan Result */}
            <ScreenLayer frame={f} inAt={[175, 185]} outAt={[310, 320]}>
              <ScanResultScreen reveal={resultReveal} />
            </ScreenLayer>

            {/* Phase 4: Real Scan History */}
            <ScreenLayer frame={f} inAt={[315, 325]}>
              <ScanHistoryScreen />
            </ScreenLayer>

            {/* Tap 1: Tap Scan quick action on Home screen */}
            <Tap x={290} y={660} progress={(f - 40) / 18} />

            {/* Tap 2: Tap "AMBIL GAMBAR" shutter button */}
            <Tap x={229} y={649} progress={(f - 146) / 18} />
          </Phone>
        </div>
      </LightBg>
    </div>
  );
};
