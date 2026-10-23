import React from 'react';
import {C, SH, SW, fontFamily, shadow} from '../theme';
import {IconHome, IconLearn, IconScan, IconTranslate, IconUser} from './icons';

/** Android-style status bar matching the screenshots. */
export const StatusBar: React.FC<{time?: string; recording?: boolean}> = ({
  time = '9:41',
  recording,
}) => (
  <div
    style={{
      height: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 22px',
      flexShrink: 0,
    }}
  >
    <div style={{fontSize: 15, fontWeight: 600, color: '#111'}}>{time}</div>
    <div
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 26,
        height: 26,
        borderRadius: 26,
        background: '#111',
      }}
    />
    <div style={{display: 'flex', alignItems: 'center', gap: 5}}>
      <span style={{fontSize: 13, fontWeight: 700, color: '#111'}}>5G</span>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 12}}>
        {[4, 7, 9, 12].map((h, i) => (
          <div key={i} style={{width: 2.5, height: h, background: '#111', borderRadius: 1}} />
        ))}
      </div>
      <div
        style={{
          width: 22,
          height: 12,
          borderRadius: 3,
          background: '#111',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -3,
            top: 3.5,
            width: 2,
            height: 5,
            borderRadius: 1,
            background: '#111',
          }}
        />
      </div>
      {recording ? (
        <div style={{width: 7, height: 7, borderRadius: 7, background: '#19B955'}} />
      ) : null}
    </div>
  </div>
);

export type Tab = 'home' | 'terjemah' | 'scan' | 'belajar' | 'profil';

const TABS: {key: Tab; label: string; Icon: React.FC<any>}[] = [
  {key: 'home', label: 'Home', Icon: IconHome},
  {key: 'terjemah', label: 'Terjemah', Icon: IconTranslate},
  {key: 'scan', label: 'Scan', Icon: IconScan},
  {key: 'belajar', label: 'Belajar', Icon: IconLearn},
  {key: 'profil', label: 'Profil', Icon: IconUser},
];

export const BottomNav: React.FC<{active: Tab}> = ({active}) => (
  <div
    style={{
      flexShrink: 0,
      background: C.nav,
      borderTop: `1px solid ${C.hairline}`,
      paddingTop: 8,
    }}
  >
    <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
      {TABS.map(({key, label, Icon}) => {
        const on = key === active;
        return (
          <div
            key={key}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              width: 76,
            }}
          >
            <div
              style={{
                width: 52,
                height: 32,
                borderRadius: 16,
                background: on ? C.blue : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={21} color={on ? '#fff' : '#48586a'} strokeWidth={1.9} />
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: on ? 700 : 500,
                color: on ? C.blue : C.inkMid,
              }}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
    <div style={{display: 'flex', justifyContent: 'center', padding: '9px 0 8px'}}>
      <div style={{width: 128, height: 5, borderRadius: 3, background: '#C3C9CE'}} />
    </div>
  </div>
);

/** A full app screen: status bar, content, bottom nav. */
export const Screen: React.FC<{
  active: Tab;
  time?: string;
  recording?: boolean;
  children: React.ReactNode;
}> = ({active, time, recording, children}) => (
  <div
    style={{
      width: SW,
      height: SH,
      background: C.screen,
      display: 'flex',
      flexDirection: 'column',
      fontFamily,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <StatusBar time={time} recording={recording} />
    <div style={{flex: 1, overflow: 'hidden', padding: '0 22px'}}>{children}</div>
    <BottomNav active={active} />
  </div>
);

const BEZEL = 11;

/**
 * Device frame that hosts a screen, scaled to fit the 1080p canvas.
 * The bezel is added *outside* the screen box so the content area stays
 * exactly SW x SH and nothing gets clipped.
 */
export const Phone: React.FC<{
  children: React.ReactNode;
  scale?: number;
  style?: React.CSSProperties;
}> = ({children, scale = 0.84, style}) => (
  <div
    style={{
      width: (SW + BEZEL * 2) * scale,
      height: (SH + BEZEL * 2) * scale,
      ...style,
    }}
  >
    <div
      style={{
        width: SW + BEZEL * 2,
        height: SH + BEZEL * 2,
        boxSizing: 'border-box',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        borderRadius: 46,
        padding: BEZEL,
        background: 'linear-gradient(160deg, #2b3440, #0f1720 60%, #242d38)',
        boxShadow: shadow.phone,
      }}
    >
      <div
        style={{
          width: SW,
          height: SH,
          borderRadius: 36,
          overflow: 'hidden',
          background: C.screen,
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  </div>
);

/** Translucent finger-tap indicator used to show interactions. */
export const Tap: React.FC<{x: number; y: number; progress: number}> = ({x, y, progress}) => {
  if (progress <= 0 || progress >= 1) return null;
  const scale = 0.4 + progress * 1.6;
  const opacity = progress < 0.25 ? progress / 0.25 : 1 - (progress - 0.25) / 0.75;
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 86,
          height: 86,
          marginLeft: -43,
          marginTop: -43,
          borderRadius: 99,
          border: `3px solid ${C.orange}`,
          transform: `scale(${scale})`,
          opacity: opacity * 0.8,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: 99,
          background: 'rgba(232,135,58,0.35)',
          opacity: opacity,
        }}
      />
    </>
  );
};
