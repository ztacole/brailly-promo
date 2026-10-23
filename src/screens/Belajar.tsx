import React from 'react';
import {C, shadow} from '../theme';
import {BRAILLE, BrailleCell, BrailleWord} from '../ui/Braille';
import {Card, Chip, PrimaryButton, ScreenTitle, SectionTitle} from '../ui/kit';
import {
  IconCheck,
  IconChevronLeft,
  IconLock,
  IconPlay,
  IconSearch,
  IconTrophy,
} from '../ui/icons';
import {Screen} from '../ui/Phone';

const LETTERS = 'ABCDEFGHIJKLMNOP'.split('');

/** Belajar tab: quiz entry + braille dictionary. `letters` staggers the grid in. */
export const BelajarScreen: React.FC<{letters?: number}> = ({letters = 16}) => (
  <Screen active="belajar" time="9:45">
    <ScreenTitle title="Belajar" />
    <div
      style={{
        marginTop: 14,
        background: C.blueSoft,
        borderRadius: 18,
        padding: 18,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
        <IconTrophy size={26} color={C.orange} />
        <div>
          <div style={{fontSize: 19, fontWeight: 700, color: C.ink}}>Jalur Kuis</div>
          <div style={{fontSize: 14, color: C.inkMid, marginTop: 1}}>3 dari 10 level selesai</div>
        </div>
      </div>
      <PrimaryButton style={{marginTop: 14, height: 54}}>
        <IconPlay size={18} color="#fff" />
        Lanjutkan Kuis
      </PrimaryButton>
    </div>

    <SectionTitle>Kamus Braille</SectionTitle>
    <div style={{display: 'flex', gap: 10}}>
      <Chip label="Alfabet" active />
      <Chip label="Angka" />
      <Chip label="Simbol" />
    </div>

    <Card
      style={{
        marginTop: 12,
        height: 52,
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        boxSizing: 'border-box',
      }}
    >
      <IconSearch size={19} color={C.inkSoft} strokeWidth={1.9} />
      <div style={{fontSize: 15, color: C.inkSoft}}>Cari huruf</div>
    </Card>

    <div
      style={{
        marginTop: 14,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
      }}
    >
      {LETTERS.map((l, i) => (
        <Card
          key={l}
          style={{
            height: 92,
            padding: 10,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            opacity: i < letters ? 1 : 0,
            transform: `translateY(${i < letters ? 0 : 10}px)`,
          }}
        >
          <BrailleCell dots={BRAILLE[l.toLowerCase()]} size={10} gap={6} />
          <div style={{fontSize: 17, fontWeight: 700, color: C.blue}}>{l}</div>
        </Card>
      ))}
    </div>
  </Screen>
);

const PATH = [
  {label: 'Huruf A–J', score: '5/5', state: 'done', x: 0},
  {label: 'Huruf K–T', score: '3/5', state: 'done', x: 70},
  {label: 'Huruf U–Z', score: '3/5', state: 'done', x: -70},
  {label: 'Angka 0–9', score: '', state: 'current', x: -70},
  {label: 'Kata Pendek', score: '', state: 'locked', x: 0},
];

/** The level path. `nodes` controls how many have popped in. */
export const JalurKuisScreen: React.FC<{nodes?: number; pulse?: number}> = ({
  nodes = 5,
  pulse = 0,
}) => (
  <Screen active="belajar" time="9:45">
    <div style={{display: 'flex', alignItems: 'center', gap: 12, paddingTop: 14}}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: C.card,
          boxShadow: shadow.card,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconChevronLeft size={20} color={C.ink} strokeWidth={2.2} />
      </div>
      <div style={{flex: 1}}>
        <div style={{fontSize: 24, fontWeight: 800, color: C.ink}}>Jalur Kuis</div>
        <div style={{fontSize: 13.5, color: C.inkSoft}}>3 dari 10 level selesai</div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
        <IconTrophy size={22} color={C.orange} />
        <div style={{fontSize: 17, fontWeight: 700, color: C.ink}}>3</div>
      </div>
    </div>

    <div style={{marginTop: 24, display: 'flex', flexDirection: 'column', gap: 18}}>
      {PATH.map((n, i) => {
        const visible = i < nodes;
        const isCurrent = n.state === 'current';
        const size = n.state === 'locked' ? 78 : isCurrent ? 84 : 92;
        const bg =
          n.state === 'done' ? C.orange : isCurrent ? C.blue : '#E3E7EA';
        return (
          <div
            key={n.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              transform: `translateX(${n.x}px) scale(${visible ? 1 : 0.7})`,
              opacity: visible ? 1 : 0,
            }}
          >
            <div
              style={{
                width: size,
                height: size,
                borderRadius: size,
                background: bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow:
                  isCurrent && pulse > 0
                    ? `0 0 0 ${pulse * 14}px rgba(44,108,153,${0.22 * (1 - pulse)})`
                    : '0 6px 16px rgba(31,41,51,0.12)',
              }}
            >
              {n.state === 'done' ? <IconCheck size={36} color="#fff" strokeWidth={3.4} /> : null}
              {isCurrent ? (
                <div style={{fontSize: 30, fontWeight: 800, color: '#fff'}}>4</div>
              ) : null}
              {n.state === 'locked' ? <IconLock size={26} color="#9AA5AD" /> : null}
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: n.state === 'locked' ? C.inkSoft : C.ink,
              }}
            >
              {n.label}
            </div>
            {n.score ? (
              <div style={{fontSize: 12, color: C.inkSoft, marginTop: -6}}>{n.score}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  </Screen>
);

const OPTIONS = ['nasi', 'ibu', 'susu', 'roti'];

/**
 * Quiz question. `picked` marks the chosen option, `correct` turns it into a
 * success state, `progress` drives the bar, `score` the label.
 */
export const QuizScreen: React.FC<{
  picked?: number | null;
  correct?: boolean;
  progress?: number;
  score?: string;
  questionIndex?: string;
  cellsShown?: number;
}> = ({
  picked = null,
  correct = false,
  progress = 0.4,
  score = '2/5',
  questionIndex = 'Soal 2 dari 5',
  cellsShown = 4,
}) => (
  <Screen active="belajar" time="9:47">
    <div style={{display: 'flex', alignItems: 'center', gap: 12, paddingTop: 14}}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: C.card,
          boxShadow: shadow.card,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconChevronLeft size={20} color={C.ink} strokeWidth={2.2} />
      </div>
      <div>
        <div style={{fontSize: 24, fontWeight: 800, color: C.ink}}>Level 5</div>
        <div style={{fontSize: 13.5, color: C.inkSoft}}>Skor {score}</div>
      </div>
    </div>

    <div
      style={{
        marginTop: 16,
        height: 8,
        borderRadius: 4,
        background: C.orangeSoft,
        overflow: 'hidden',
      }}
    >
      <div style={{width: `${progress * 100}%`, height: '100%', background: C.blue}} />
    </div>
    <div style={{fontSize: 13, color: C.inkSoft, marginTop: 8}}>{questionIndex}</div>

    <div style={{marginTop: 14, background: C.blueSoft, borderRadius: 18, padding: 20}}>
      <div style={{fontSize: 17, fontWeight: 700, color: C.blueDeep}}>
        Teks apa yang ditunjukkan braille ini?
      </div>
      <div style={{display: 'flex', justifyContent: 'center', margin: '20px 0 22px'}}>
        <BrailleWord text="nasi" size={15} gap={9} cellGap={18} shown={cellsShown} />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {OPTIONS.map((o, i) => {
          const chosen = picked === i;
          const good = chosen && correct;
          return (
            <div
              key={o}
              style={{
                height: 58,
                borderRadius: 29,
                background: good ? C.orange : C.blue,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                fontSize: 17,
                fontWeight: good ? 700 : 500,
                transform: `scale(${chosen ? 1.025 : 1})`,
                boxShadow: good ? '0 8px 22px rgba(232,135,58,0.4)' : 'none',
              }}
            >
              {good ? <IconCheck size={22} color="#fff" strokeWidth={3.2} /> : null}
              {o}
            </div>
          );
        })}
      </div>
    </div>
  </Screen>
);
