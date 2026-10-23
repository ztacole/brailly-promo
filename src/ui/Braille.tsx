import React from 'react';
import {C} from '../theme';

/** Standard Grade-1 braille dot patterns (dots numbered 1-3 left column, 4-6 right). */
export const BRAILLE: Record<string, number[]> = {
  a: [1],
  b: [1, 2],
  c: [1, 4],
  d: [1, 4, 5],
  e: [1, 5],
  f: [1, 2, 4],
  g: [1, 2, 4, 5],
  h: [1, 2, 5],
  i: [2, 4],
  j: [2, 4, 5],
  k: [1, 3],
  l: [1, 2, 3],
  m: [1, 3, 4],
  n: [1, 3, 4, 5],
  o: [1, 3, 5],
  p: [1, 2, 3, 4],
  q: [1, 2, 3, 4, 5],
  r: [1, 2, 3, 5],
  s: [2, 3, 4],
  t: [2, 3, 4, 5],
  u: [1, 3, 6],
  v: [1, 2, 3, 6],
  w: [2, 4, 5, 6],
  x: [1, 3, 4, 6],
  y: [1, 3, 4, 5, 6],
  z: [1, 3, 5, 6],
  ' ': [],
  '.': [2, 5, 6],
  ',': [2],
  '(': [2, 3, 6],
  ')': [3, 5, 6],
};

/** Prefix cell that marks the following letters as digits. */
export const NUMBER_SIGN = [3, 4, 5, 6];

export const cellsFor = (text: string): number[][] =>
  text
    .toLowerCase()
    .split('')
    .map((ch) => BRAILLE[ch] ?? [])
    .filter((_, i, arr) => arr[i] !== undefined);

type CellProps = {
  dots: number[];
  size?: number;
  gap?: number;
  on?: string;
  off?: string;
  /** 0..1 — lets dots light up progressively during animations. */
  reveal?: number;
};

/** One braille cell: 2 columns x 3 rows of dots. */
export const BrailleCell: React.FC<CellProps> = ({
  dots,
  size = 12,
  gap = 6,
  on = C.orange,
  off = C.grey,
  reveal = 1,
}) => (
  <div style={{display: 'flex', gap}}>
    {[
      [1, 2, 3],
      [4, 5, 6],
    ].map((col, ci) => (
      <div key={ci} style={{display: 'flex', flexDirection: 'column', gap}}>
        {col.map((d) => {
          const active = dots.includes(d);
          return (
            <div
              key={d}
              style={{
                position: 'relative',
                width: size,
                height: size,
                borderRadius: size,
                background: off,
              }}
            >
              {active ? (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: size,
                    background: on,
                    opacity: Math.max(0, Math.min(1, reveal)),
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    ))}
  </div>
);

/** A run of cells for a whole word or sentence. */
export const BrailleWord: React.FC<{
  text: string;
  size?: number;
  gap?: number;
  cellGap?: number;
  on?: string;
  off?: string;
  /** number of cells revealed so far (for typing-style animation) */
  shown?: number;
  numberPrefix?: boolean;
}> = ({text, size = 12, gap = 6, cellGap = 14, on, off, shown, numberPrefix}) => {
  const cells = cellsFor(text);
  const all = numberPrefix ? [NUMBER_SIGN, ...cells] : cells;
  const limit = shown ?? all.length;
  return (
    <div style={{display: 'flex', gap: cellGap, alignItems: 'flex-start'}}>
      {all.map((dots, i) => (
        <BrailleCell
          key={i}
          dots={i < limit ? dots : []}
          size={size}
          gap={gap}
          on={on}
          off={off}
        />
      ))}
    </div>
  );
};
