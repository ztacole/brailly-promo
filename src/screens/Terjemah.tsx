import React from 'react';
import {C} from '../theme';
import {BrailleWord} from '../ui/Braille';
import {Card, PrimaryButton, ScreenTitle} from '../ui/kit';
import {IconArrowRight, IconCheck, IconClose, IconCopy, IconShare} from '../ui/icons';
import {Screen} from '../ui/Phone';

const Segmented: React.FC<{active: 0 | 1}> = ({active}) => (
  <div
    style={{
      marginTop: 16,
      display: 'flex',
      background: C.card,
      borderRadius: 14,
      border: `1px solid ${C.hairline}`,
      overflow: 'hidden',
      height: 52,
    }}
  >
    {[
      ['Teks', 'Braille'],
      ['Braille', 'Teks'],
    ].map(([from, to], i) => {
      const on = active === i;
      return (
        <div
          key={from + to}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 7,
            background: on ? C.orangeSoft : 'transparent',
            color: on ? C.ink : C.inkMid,
            fontSize: 15,
            fontWeight: on ? 700 : 500,
          }}
        >
          {on ? <IconCheck size={16} color={C.ink} strokeWidth={3} /> : null}
          {from}
          <IconArrowRight size={17} color={on ? C.ink : C.inkMid} strokeWidth={1.9} />
          {to}
        </div>
      );
    })}
  </div>
);

const RoundAction: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div
    style={{
      width: 54,
      height: 54,
      borderRadius: 16,
      background: '#E9ECEE',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
);

/** Teks → Braille direction. `typed` types the input, `cells` lights up output cells. */
export const TerjemahTextScreen: React.FC<{typed?: number; cells?: number}> = ({
  typed = 7,
  cells = 7,
}) => {
  const word = 'Brailly';
  return (
    <Screen active="terjemah" time="9:42">
      <ScreenTitle title="Terjemah" sub="Braille dua arah" />
      <Segmented active={0} />

      <div
        style={{
          marginTop: 16,
          border: `1px solid ${C.hairline}`,
          borderRadius: 14,
          background: '#FCFCFD',
          padding: '12px 16px 22px',
        }}
      >
        <div style={{fontSize: 12.5, color: C.inkSoft}}>Masukkan teks</div>
        <div style={{fontSize: 21, color: C.ink, marginTop: 10, minHeight: 56}}>
          {word.slice(0, typed)}
          {typed < word.length ? (
            <span style={{color: C.orange, fontWeight: 700}}>|</span>
          ) : null}
        </div>
      </div>

      <div style={{fontSize: 17, fontWeight: 700, color: C.ink, marginTop: 20}}>Hasil Braille</div>
      <Card style={{marginTop: 10, padding: '22px 18px'}}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <BrailleWord text={word} size={13} gap={8} cellGap={13} shown={cells} />
        </div>
      </Card>

      <div
        style={{
          marginTop: 14,
          background: '#E9ECEE',
          borderRadius: 14,
          padding: '14px 16px',
        }}
      >
        <div style={{fontSize: 12.5, color: C.inkSoft}}>Unicode Braille</div>
        <div style={{display: 'flex', marginTop: 10, gap: 7}}>
          <BrailleWord text={word} size={7} gap={4} cellGap={9} on="#4A5A66" off="#D4D8DB" />
        </div>
      </div>

      <div style={{display: 'flex', gap: 12, marginTop: 16}}>
        <RoundAction>
          <IconCopy size={22} color="#4A5A66" />
        </RoundAction>
        <RoundAction>
          <IconShare size={22} color="#4A5A66" />
        </RoundAction>
        <RoundAction>
          <IconClose size={22} color="#4A5A66" />
        </RoundAction>
      </div>
    </Screen>
  );
};

/** Braille → Teks direction: the six-dot keypad. */
export const TerjemahDotsScreen: React.FC<{pressed?: number[]; result?: string}> = ({
  pressed = [1, 2],
  result = 'b',
}) => (
  <Screen active="terjemah" time="9:42">
    <ScreenTitle title="Terjemah" sub="Braille dua arah" />
    <Segmented active={1} />
    <div style={{fontSize: 14, color: C.inkMid, marginTop: 14}}>
      Tekan kombinasi titik lalu tambahkan sebagai huruf
    </div>

    <Card style={{marginTop: 12, padding: 18}}>
      <div style={{display: 'flex', gap: 18, justifyContent: 'center'}}>
        {[
          [1, 2, 3],
          [4, 5, 6],
        ].map((col, ci) => (
          <div key={ci} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            {col.map((d) => {
              const on = pressed.includes(d);
              return (
                <div
                  key={d}
                  style={{
                    width: 132,
                    height: 132,
                    borderRadius: 132,
                    background: on ? C.orange : '#fff',
                    border: on ? 'none' : `1.5px solid ${C.grey}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 26,
                    fontWeight: 600,
                    color: on ? '#fff' : C.inkSoft,
                    boxShadow: on ? '0 8px 20px rgba(232,135,58,0.32)' : 'none',
                  }}
                >
                  {d}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Card>

    <div style={{display: 'flex', gap: 12, marginTop: 14}}>
      <PrimaryButton style={{flex: 1, height: 52}}>
        <IconCheck size={18} color="#fff" strokeWidth={3} />
        Tambah huruf
      </PrimaryButton>
      <PrimaryButton outline style={{flex: 1, height: 52}}>
        Spasi
      </PrimaryButton>
    </div>

    <div style={{fontSize: 17, fontWeight: 700, color: C.ink, marginTop: 18}}>Hasil Teks</div>
    <div
      style={{
        marginTop: 10,
        background: '#E9ECEE',
        borderRadius: 14,
        height: 56,
        display: 'flex',
        alignItems: 'center',
        padding: '0 18px',
        fontSize: 20,
        fontWeight: 700,
        color: C.ink,
      }}
    >
      {result}
    </div>
  </Screen>
);
