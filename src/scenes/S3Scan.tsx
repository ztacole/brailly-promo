import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {rise, sceneOpacity} from '../anim';
import {C} from '../theme';
import {HomeScreen} from '../screens/Home';
import {ScanCameraScreen, ScanResultScreen} from '../screens/Scan';
import {Phone, Tap} from '../ui/Phone';
import {Bullet, Headline, Kicker, LightBg, ScreenLayer, Sub} from '../ui/stage';

export const S3_LEN = 360;

const RESULT_TEXT = 'One joy dispels a hundred cares. (orientalwisdom)';

export const S3Scan: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  // viewfinder scan line loops while the camera is live
  const sweep = f < 150 ? ((f - 84) % 42) / 42 : 0;
  // shutter flash
  const flash =
    f >= 152 && f <= 170
      ? interpolate(f, [152, 157, 170], [0, 0.95, 0], {extrapolateRight: 'clamp'})
      : 0;
  const chars = Math.floor(
    interpolate(f, [188, 272], [0, RESULT_TEXT.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const confidence = interpolate(f, [274, 296], [0, 86], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{position: 'absolute', inset: 0, opacity: sceneOpacity(f, S3_LEN)}}>
      <LightBg>
        {/* copy column */}
        <div style={{position: 'absolute', left: 130, top: 232, width: 820}}>
          <div style={rise(f, fps, 0, 30)}>
            <Kicker>Fitur 01 · Scan</Kicker>
          </div>
          <Headline style={{marginTop: 26, ...rise(f, fps, 6, 40)}}>
            Foto braille,
            <br />
            <span style={{color: C.orange}}>langsung jadi teks.</span>
          </Headline>
          <Sub style={{marginTop: 24, ...rise(f, fps, 14, 30)}}>
            Arahkan kamera ke halaman braille fisik — Brailly membacanya untukmu.
          </Sub>

          <div style={{marginTop: 42, display: 'flex', flexDirection: 'column', gap: 18}}>
            <div style={rise(f, fps, 34, 30)}>
              <Bullet dots={[1, 4]}>Cukup satu foto dari kamera ponsel</Bullet>
            </div>
            <div style={rise(f, fps, 158, 30)}>
              <Bullet dots={[1, 2, 5]}>Teks muncul dalam hitungan detik</Bullet>
            </div>
            <div style={rise(f, fps, 276, 30)}>
              <Bullet dots={[2, 4, 5]}>Siap disalin dan dibagikan ke siapa pun</Bullet>
            </div>
          </div>
        </div>

        {/* device */}
        <div style={{position: 'absolute', left: 1232, top: 108, ...rise(f, fps, 8, 70)}}>
          <Phone scale={0.84}>
            <ScreenLayer frame={f} inAt={[6, 18]} outAt={[70, 80]}>
              <HomeScreen />
            </ScreenLayer>
            <ScreenLayer frame={f} inAt={[76, 86]} outAt={[170, 178]}>
              <ScanCameraScreen sweep={sweep} flash={flash} />
            </ScreenLayer>
            <ScreenLayer frame={f} inAt={[174, 184]}>
              <ScanResultScreen chars={chars} confidence={confidence} />
            </ScreenLayer>
            {/* taps: Scan tab, then the shutter button */}
            <Tap x={229} y={967} progress={(f - 54) / 20} />
            <Tap x={229} y={548} progress={(f - 138) / 20} />
          </Phone>
        </div>

      </LightBg>
    </div>
  );
};
