import React from 'react';
import {C, fontFamily} from '../theme';

const RING_R = 120;
const RING_C = 2 * Math.PI * RING_R;
const RING_GAP = RING_C * 0.195; // opening on the right where the traces exit

/**
 * Brailly mark, rebuilt as SVG from the supplied logo: an open blue ring, a
 * rounded block holding a braille cell in brand orange/grey, and circuit traces
 * running out to a node.
 *
 * `draw` (0..1) animates the ring stroke drawing itself in.
 * `dots` (0..1) staggers the braille dots lighting up.
 */
export const LogoMark: React.FC<{size?: number; draw?: number; dots?: number}> = ({
  size = 260,
  draw = 1,
  dots = 1,
}) => {
  const blockIn = Math.max(0, Math.min(1, (draw - 0.3) / 0.35));
  const traceIn = Math.max(0, Math.min(1, (draw - 0.62) / 0.38));
  const cell: {cx: number; cy: number; on: boolean}[] = [
    {cx: 120, cy: 118, on: true},
    {cx: 120, cy: 144, on: true},
    {cx: 120, cy: 170, on: true},
    {cx: 168, cy: 118, on: true},
    {cx: 168, cy: 144, on: false},
    {cx: 168, cy: 170, on: false},
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 288 288" fill="none">
      {/* open ring */}
      <circle
        cx="144"
        cy="144"
        r={RING_R}
        stroke={C.blue}
        strokeWidth="16"
        strokeLinecap="round"
        strokeDasharray={`${RING_C - RING_GAP} ${RING_GAP}`}
        strokeDashoffset={(RING_C - RING_GAP) * (1 - draw)}
        transform="rotate(35 144 144)"
      />

      {/* rounded block */}
      <g opacity={blockIn} style={{transformOrigin: '144px 144px'}} transform={`scale(${0.92 + blockIn * 0.08})`}>
        <rect x="76" y="76" width="136" height="136" rx="32" fill={C.blue} />
        <rect x="93" y="93" width="102" height="102" rx="19" fill="#fff" />
        {cell.map((d, i) => {
          const t = Math.max(0, Math.min(1, dots * 7 - i));
          return (
            <circle
              key={i}
              cx={d.cx}
              cy={d.cy}
              r="13"
              fill={d.on ? C.orange : C.grey}
              opacity={t}
            />
          );
        })}
      </g>

      {/* circuit traces */}
      <g opacity={traceIn}>
        <path
          d="M206 116c22 0 24 14 36 28"
          stroke={C.blue}
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M206 172c22 0 24-14 36-28"
          stroke={C.blue}
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="244" cy="144" r="11" fill={C.blue} />
        <circle cx="244" cy="144" r="4" fill="#fff" />
      </g>
    </svg>
  );
};

/** Horizontal lockup: mark + "Brailly" wordmark. */
export const LogoLockup: React.FC<{
  size?: number;
  draw?: number;
  dots?: number;
  wordOpacity?: number;
  light?: boolean;
}> = ({size = 190, draw = 1, dots = 1, wordOpacity = 1, light}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: size * 0.08}}>
    <LogoMark size={size} draw={draw} dots={dots} />
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: size * 0.1,
        opacity: wordOpacity,
      }}
    >
      <div
        style={{
          width: 5,
          height: size * 0.46,
          borderRadius: 4,
          background: light ? 'rgba(255,255,255,0.45)' : C.blue,
        }}
      />
      <div
        style={{
          fontFamily,
          fontSize: size * 0.54,
          fontWeight: 800,
          letterSpacing: -size * 0.014,
          color: light ? '#fff' : C.blue,
        }}
      >
        Brail
        <span style={{color: C.orange}}>ly</span>
      </div>
    </div>
  </div>
);
