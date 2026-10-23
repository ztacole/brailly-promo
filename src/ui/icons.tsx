import React from 'react';

type P = {size?: number; color?: string; strokeWidth?: number};

const S: React.FC<P & {children: React.ReactNode; fill?: boolean}> = ({
  size = 24,
  color = '#2C6C99',
  strokeWidth = 2,
  children,
  fill,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={fill ? 'none' : color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const IconHome: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5.5 9.5V20h13V9.5" />
  </S>
);

/**
 * Translate glyph — the app pairs a CJK character with a Latin "A". The CJK
 * glyph is drawn as paths because no CJK font ships in the render environment.
 */
export const IconTranslate: React.FC<P> = ({size = 24, color = '#2C6C99', strokeWidth = 1.7}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <g
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      {/* 文 */}
      <path d="M4.2 3.2 2.8 5.4" />
      <path d="M1.4 6.6h11" />
      <path d="M9.4 8.4c-1.6 3.4-4 6-7.4 7.8" />
      <path d="M4.4 9.6c1.8 2.6 4.2 4.9 7 6.6" />
      {/* A */}
      <path d="M12.6 21 17 11.4 21.4 21" />
      <path d="M14.3 17.6h5.4" />
    </g>
  </svg>
);

export const IconScan: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M4 8.5V5.5a1.5 1.5 0 0 1 1.5-1.5h3" />
    <path d="M20 8.5V5.5A1.5 1.5 0 0 0 18.5 4h-3" />
    <path d="M4 15.5v3A1.5 1.5 0 0 0 5.5 20h3" />
    <path d="M20 15.5v3a1.5 1.5 0 0 1-1.5 1.5h-3" />
  </S>
);

/** "Belajar" glyph from the app: an open bracket beside a rounded block. */
export const IconLearn: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M4 4v16" />
    <path d="M4 4h4" />
    <rect x="10" y="4" width="10" height="10" rx="2.5" />
  </S>
);

export const IconUser: React.FC<P> = (p) => (
  <S {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.6 3.1-5.5 7-5.5s7 1.9 7 5.5" />
  </S>
);

export const IconCamera: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2L8 5h8l1.5 2h2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
    <circle cx="12" cy="13" r="3.5" />
  </S>
);

export const IconFlame: React.FC<P> = ({size = 24, color = '#E8873A'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2.5c2.2 3 1 4.8.2 5.9-1 1.4-.5 2.9.9 2.9 1.2 0 1.7-1 1.8-1.9 1.6 1.4 2.6 3.3 2.6 5.3 0 3.3-2.5 5.8-5.5 5.8S6.5 18 6.5 14.7c0-4.2 3.3-5.6 4.4-8.1.5-1.2.7-2.6 1.1-4.1z"
      fill={color}
    />
  </svg>
);

export const IconTrophy: React.FC<P> = ({size = 24, color = '#E8873A'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M7 4h10v4.5a5 5 0 0 1-10 0z"
      fill={color}
    />
    <path d="M7 5H4.8v1.6A3.4 3.4 0 0 0 8 10" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M17 5h2.2v1.6A3.4 3.4 0 0 1 16 10" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M12 13.5V17" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M8.5 20h7" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const IconSearch: React.FC<P> = (p) => (
  <S {...p}>
    <circle cx="11" cy="11" r="6" />
    <path d="M15.5 15.5 20 20" />
  </S>
);

export const IconCheck: React.FC<P> = ({size = 24, color = '#fff', strokeWidth = 3}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12.5 10 17.5 19 7"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconLock: React.FC<P> = ({size = 24, color = '#9AA5AD'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" stroke={color} strokeWidth="2" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke={color} strokeWidth="2" />
  </svg>
);

export const IconPlay: React.FC<P> = ({size = 24, color = '#fff'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M8 5.5 18 12 8 18.5z" fill={color} />
  </svg>
);

export const IconChevronLeft: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M14.5 5 8 12l6.5 7" />
  </S>
);

export const IconCopy: React.FC<P> = (p) => (
  <S {...p} strokeWidth={1.8}>
    <rect x="4" y="4" width="11" height="11" rx="2" />
    <path d="M8 19h9a2 2 0 0 0 2-2V9" />
  </S>
);

export const IconShare: React.FC<P> = (p) => (
  <S {...p} strokeWidth={1.8}>
    <circle cx="18" cy="5.5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="18.5" r="2.5" />
    <path d="M8.2 10.8 15.8 6.7M8.2 13.2l7.6 4.1" />
  </S>
);

export const IconClose: React.FC<P> = (p) => (
  <S {...p} strokeWidth={2}>
    <path d="M6 6l12 12M18 6 6 18" />
  </S>
);

export const IconPencil: React.FC<P> = (p) => (
  <S {...p} strokeWidth={1.8}>
    <path d="M4 20l3.5-.8 11-11a2 2 0 0 0-2.8-2.8l-11 11z" />
  </S>
);

export const IconSun: React.FC<P> = (p) => (
  <S {...p} strokeWidth={1.8}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
  </S>
);

/**
 * Right arrow drawn as a path. The "→" character is outside the Latin subset of
 * the loaded webfont, so it would render as a missing glyph.
 */
export const IconArrowRight: React.FC<P> = ({size = 18, color = '#1F2933', strokeWidth = 2}) => (
  <svg width={size} height={size * 0.62} viewBox="0 0 20 12" fill="none">
    <path
      d="M1 6h17"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <path
      d="M13.2 1.6 18 6l-4.8 4.4"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
