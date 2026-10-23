/**
 * Generates public/music.wav — an original, royalty-free backing track for the
 * Brailly promo video. Pure Node (no deps): additive synthesis -> 16-bit PCM WAV.
 *
 * Musical plan: D major, 96 BPM (bar = 2.5s), 18 bars = 45s.
 * I - V - vi - IV progression, warm pad + marimba arpeggio + pentatonic melody,
 * with section intensity that follows the video's scene changes.
 */
import {writeFileSync, mkdirSync} from 'node:fs';
import {dirname, resolve} from 'node:path';

const SR = 44100;
const BPM = 96;
const BAR = (60 / BPM) * 4; // 2.5s
const BARS = 19; // 18 bars of music + 1 bar of tail
const DUR = BARS * BAR;
const N = Math.ceil(DUR * SR);

const L = new Float64Array(N);
const R = new Float64Array(N);

const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

/** Write one voice into the stereo buffers. */
/**
 * Deterministic per-voice phase offset. Without this, every voice in a chord
 * starts at phase 0 and sums constructively, which makes note onsets several dB
 * louder than the rest of the track and eats all the headroom.
 */
let voiceSeed = 0;
const nextPhase = () => {
  voiceSeed = (voiceSeed * 1103515245 + 12345) & 0x7fffffff;
  return (voiceSeed / 0x7fffffff) * 2 * Math.PI;
};

function add(t0, dur, freq, amp, pan, shape) {
  const start = Math.max(0, Math.floor(t0 * SR));
  const len = Math.floor(dur * SR);
  const gl = Math.cos(((pan + 1) * Math.PI) / 4);
  const gr = Math.sin(((pan + 1) * Math.PI) / 4);
  const ph = nextPhase();
  for (let i = 0; i < len; i++) {
    const idx = start + i;
    if (idx >= N) break;
    const t = i / SR;
    const s = shape(t, freq, dur, ph) * amp;
    L[idx] += s * gl;
    R[idx] += s * gr;
  }
}

// ---------- instrument shapes ----------

// Warm pad: slightly detuned sines + soft 2nd/3rd harmonics, slow attack/release.
const pad = (t, f, dur, ph = 0) => {
  const atk = Math.min(0.9, dur * 0.35);
  const rel = Math.min(1.2, dur * 0.45);
  let env;
  if (t < atk) env = t / atk;
  else if (t > dur - rel) env = Math.max(0, (dur - t) / rel);
  else env = 1;
  env = env * env * (3 - 2 * env); // smoothstep
  const vib = 1 + 0.0015 * Math.sin(2 * Math.PI * 4.5 * t);
  const w =
    Math.sin(2 * Math.PI * f * t * vib + ph) * 0.6 +
    Math.sin(2 * Math.PI * f * 1.003 * t + ph * 1.7) * 0.3 +
    Math.sin(2 * Math.PI * f * 2 * t + ph) * 0.12 +
    Math.sin(2 * Math.PI * f * 3 * t + ph) * 0.05;
  return w * env;
};

// Marimba-ish pluck: fast attack, exponential decay, woody harmonics.
const pluck = (t, f, _dur, ph = 0) => {
  const env = Math.exp(-t * 6.5) * (1 - Math.exp(-t * 400));
  const w =
    Math.sin(2 * Math.PI * f * t + ph) +
    Math.sin(2 * Math.PI * f * 2 * t + ph) * 0.3 * Math.exp(-t * 11) +
    Math.sin(2 * Math.PI * f * 4 * t + ph) * 0.1 * Math.exp(-t * 18);
  return w * env;
};

// Soft melody voice: rounded sine lead with gentle attack.
const lead = (t, f, dur, ph = 0) => {
  const atk = 0.05;
  const rel = Math.min(0.5, dur * 0.6);
  let env;
  if (t < atk) env = t / atk;
  else if (t > dur - rel) env = Math.max(0, (dur - t) / rel);
  else env = 1;
  const w =
    Math.sin(2 * Math.PI * f * t + ph) * 0.8 +
    Math.sin(2 * Math.PI * f * 2 * t + ph) * 0.14 +
    Math.sin(2 * Math.PI * f * 3 * t + ph) * 0.04;
  return w * env * (0.85 + 0.15 * Math.sin(2 * Math.PI * 5 * t));
};

// Bell accent for scene changes (inharmonic partials).
const bell = (t, f) => {
  const p = [1, 2.0, 2.76, 5.4, 8.9];
  const g = [1, 0.4, 0.28, 0.1, 0.04];
  let w = 0;
  for (let k = 0; k < p.length; k++) {
    w += Math.sin(2 * Math.PI * f * p[k] * t) * g[k] * Math.exp(-t * (1.1 + k * 0.9));
  }
  return w * (1 - Math.exp(-t * 300)) * 0.5;
};

// ---------- arrangement ----------

// I - V - vi - IV in D major, voiced low for the pad.
const PROG = [
  {name: 'D', pad: [50, 57, 62, 66], arp: [62, 66, 69, 74]},
  {name: 'A', pad: [45, 52, 61, 64], arp: [61, 64, 69, 73]},
  {name: 'Bm', pad: [47, 54, 59, 66], arp: [59, 62, 66, 71]},
  {name: 'G', pad: [43, 50, 55, 62], arp: [59, 62, 67, 71]},
];

// Scene-following intensity: quiet intro, build through features, resolve at end.
function intensity(t) {
  if (t < 3.5) return 0.35; // logo
  if (t < 8.5) return 0.5; // hook
  if (t < 20.5) return 0.78; // scan
  if (t < 32.5) return 0.95; // belajar
  if (t < 38) return 0.9; // terjemah
  return 0.72; // closing
}

for (let b = 0; b < 18; b++) {
  const t0 = b * BAR;
  const ch = PROG[b % 4];
  const inten = intensity(t0);

  // Pad
  ch.pad.forEach((m, i) => {
    const pan = (i - 1.5) * 0.22;
    add(t0, BAR + 0.5, mtof(m), 0.052 * (0.7 + 0.5 * inten), pan, pad);
  });

  // Arpeggio from bar 2 onward (8th notes)
  if (b >= 1) {
    const pattern = [0, 1, 2, 3, 2, 1, 2, 3];
    for (let s = 0; s < 8; s++) {
      const t = t0 + s * (BAR / 8);
      if (t > 44.6) break;
      const m = ch.arp[pattern[s]] + (b >= 8 && s % 4 === 0 ? 12 : 0);
      const accent = s % 4 === 0 ? 1 : 0.62;
      add(t, 1.1, mtof(m), 0.085 * inten * accent, s % 2 === 0 ? -0.28 : 0.28, pluck);
    }
  }

  // Melody: pentatonic phrases over the feature sections
  const MEL = {
    4: [[0, 1.25, 66], [1.25, 0.625, 69], [1.875, 0.625, 71]],
    5: [[0, 1.25, 69], [1.25, 1.25, 64]],
    6: [[0, 0.625, 66], [0.625, 0.625, 71], [1.25, 1.25, 69]],
    7: [[0, 1.25, 67], [1.25, 1.25, 69]],
    8: [[0, 0.625, 74], [0.625, 0.625, 73], [1.25, 1.25, 69]],
    9: [[0, 1.25, 73], [1.25, 1.25, 76]],
    10: [[0, 0.625, 74], [0.625, 0.625, 71], [1.25, 1.25, 69]],
    11: [[0, 2.5, 67]],
    12: [[0, 1.25, 66], [1.25, 1.25, 69]],
    13: [[0, 2.5, 73]],
    14: [[0, 1.25, 71], [1.25, 1.25, 69]],
    15: [[0, 2.5, 66]],
    16: [[0, 1.25, 69], [1.25, 1.25, 74]],
    17: [[0, 2.5, 62]],
  }[b];
  if (MEL) {
    for (const [off, d, m] of MEL) {
      add(t0 + off, d + 0.25, mtof(m), 0.075 * inten, 0.08, lead);
    }
  }

  // Gentle off-beat pluck accents for momentum in the busiest section
  if (b >= 8 && b <= 15) {
    for (const beat of [1, 3]) {
      add(t0 + beat * (BAR / 4) + BAR / 8, 0.35, mtof(ch.arp[3] + 12), 0.03 * inten, 0.42, pluck);
    }
  }
}

// Bell accents on scene boundaries (seconds)
for (const [t, m, a] of [
  [0.05, 86, 0.05],
  [3.5, 81, 0.05],
  [8.5, 86, 0.055],
  [20.5, 86, 0.055],
  [32.5, 88, 0.055],
  [38.0, 81, 0.05],
  [38.05, 86, 0.035],
]) {
  add(t, 3.2, mtof(m), a, 0, bell);
}

// Final resolved chord under the closing logo
for (const [i, m] of [50, 57, 62, 69, 74].entries()) {
  add(38.0, 7.2, mtof(m), 0.05, (i - 2) * 0.2, pad);
}

// ---------- mix ----------

// Cheap stereo reverb: a few decaying taps.
function reverb(buf, taps) {
  const out = Float64Array.from(buf);
  for (const [delayMs, gain] of taps) {
    const d = Math.floor((delayMs / 1000) * SR);
    for (let i = d; i < buf.length; i++) out[i] += buf[i - d] * gain;
  }
  return out;
}
const wetL = reverb(L, [[57, 0.26], [113, 0.17], [191, 0.11], [307, 0.06]]);
const wetR = reverb(R, [[71, 0.26], [131, 0.17], [211, 0.11], [331, 0.06]]);

// Global fades
const fadeIn = 1.1 * SR;
const fadeOutStart = 42.6 * SR;
const fadeOutEnd = 45.0 * SR;

let peak = 0;
const outL = new Float64Array(N);
const outR = new Float64Array(N);
for (let i = 0; i < N; i++) {
  let g = 1;
  if (i < fadeIn) g = i / fadeIn;
  if (i > fadeOutStart) g = Math.max(0, (fadeOutEnd - i) / (fadeOutEnd - fadeOutStart));
  // soft-clip for glue
  const a = Math.tanh(wetL[i] * 1.25) * g;
  const b = Math.tanh(wetR[i] * 1.25) * g;
  outL[i] = a;
  outR[i] = b;
  peak = Math.max(peak, Math.abs(a), Math.abs(b));
}

// Normalize to -4 dBFS. Leaves headroom for AAC encoding overshoot on transients;
// background music with no voice-over to duck under.
const target = Math.pow(10, -4 / 20);
const norm = peak > 0 ? target / peak : 1;

const bytes = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) {
  const l = Math.max(-1, Math.min(1, outL[i] * norm));
  const r = Math.max(-1, Math.min(1, outR[i] * norm));
  bytes.writeInt16LE(Math.round(l * 32767), i * 4);
  bytes.writeInt16LE(Math.round(r * 32767), i * 4 + 2);
}

const header = Buffer.alloc(44);
header.write('RIFF', 0);
header.writeUInt32LE(36 + bytes.length, 4);
header.write('WAVE', 8);
header.write('fmt ', 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20); // PCM
header.writeUInt16LE(2, 22); // stereo
header.writeUInt32LE(SR, 24);
header.writeUInt32LE(SR * 4, 28);
header.writeUInt16LE(4, 32);
header.writeUInt16LE(16, 34);
header.write('data', 36);
header.writeUInt32LE(bytes.length, 40);

const out = resolve(process.argv[2] ?? 'public/music.wav');
mkdirSync(dirname(out), {recursive: true});
writeFileSync(out, Buffer.concat([header, bytes]));
console.log(
  `wrote ${out} — ${(DUR).toFixed(2)}s, peak before norm ${peak.toFixed(3)}, gain x${norm.toFixed(3)}`
);
