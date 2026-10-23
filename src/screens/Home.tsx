import React from 'react';
import {C, shadow} from '../theme';
import {BrailleCell} from '../ui/Braille';
import {Card, SectionTitle} from '../ui/kit';
import {IconFlame, IconLearn, IconScan, IconTranslate, IconUser} from '../ui/icons';
import {Screen} from '../ui/Phone';

const Quick: React.FC<{Icon: React.FC<any>; title: string; sub: string}> = ({
  Icon,
  title,
  sub,
}) => (
  <Card style={{flex: 1, padding: 16, height: 112, boxSizing: 'border-box'}}>
    <Icon size={24} color={C.blue} strokeWidth={1.9} />
    <div style={{fontSize: 17, fontWeight: 700, color: C.ink, marginTop: 16}}>{title}</div>
    <div style={{fontSize: 13, color: C.inkSoft, marginTop: 2}}>{sub}</div>
  </Card>
);

export const HomeScreen: React.FC = () => (
  <Screen active="home" time="9:41">
    <div style={{fontSize: 17, color: C.inkSoft, marginTop: 16}}>Selamat datang di</div>
    <div
      style={{
        fontSize: 34,
        fontWeight: 800,
        color: C.blue,
        letterSpacing: -0.6,
        marginTop: -2,
      }}
    >
      Brailly
    </div>

    <div
      style={{
        marginTop: 16,
        background: C.blue,
        borderRadius: 18,
        padding: '18px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        boxShadow: shadow.pill,
      }}
    >
      <IconFlame size={30} color={C.orange} />
      <div>
        <div style={{fontSize: 19, fontWeight: 700, color: '#fff'}}>3 hari beruntun</div>
        <div style={{fontSize: 14, color: 'rgba(255,255,255,0.82)', lineHeight: 1.35, marginTop: 2}}>
          Lanjutkan belajar hari ini untuk menjaga streak-mu
        </div>
      </div>
    </div>

    <SectionTitle>Fitur Cepat</SectionTitle>
    <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
      <div style={{display: 'flex', gap: 14}}>
        <Quick Icon={IconTranslate} title="Terjemah" sub="Teks ke Braille" />
        <Quick Icon={IconScan} title="Scan" sub="Foto braille" />
      </div>
      <div style={{display: 'flex', gap: 14}}>
        <Quick Icon={IconLearn} title="Belajar" sub="Alfabet & kuis" />
        <Quick Icon={IconUser} title="Profil" sub="Pengaturan" />
      </div>
    </div>

    <SectionTitle>Cuplikan Alfabet</SectionTitle>
    <Card style={{padding: '20px 16px'}}>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        {['A', 'B', 'C', 'D', 'E'].map((l) => (
          <div key={l} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
            <BrailleCell
              dots={{A: [1], B: [1, 2], C: [1, 4], D: [1, 4, 5], E: [1, 5]}[l]!}
              size={12}
              gap={7}
            />
            <div style={{fontSize: 13, color: C.inkMid, fontWeight: 500}}>{l}</div>
          </div>
        ))}
      </div>
    </Card>
  </Screen>
);
