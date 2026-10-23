import React from 'react';
import {C} from '../theme';
import {Card, PrimaryButton, ScreenTitle, BraillePaper} from '../ui/kit';
import {IconCamera} from '../ui/icons';
import {Screen} from '../ui/Phone';

/** Scan tab with a live viewfinder. `sweep` (0..1) drives the scanning line. */
export const ScanCameraScreen: React.FC<{sweep?: number; flash?: number}> = ({
  sweep = 0,
  flash = 0,
}) => (
  <Screen active="scan" time="9:44" recording>
    <ScreenTitle title="Scan Braille" sub="Arahkan kamera ke teks braille fisik" />
    <div style={{marginTop: 16, position: 'relative'}}>
      <BraillePaper width={415} height={360} radius={18} tilt={-0.6} />
      {/* framing brackets */}
      <div style={{position: 'absolute', inset: 0}}>
        {[
          {top: 18, left: 18, borderTop: 1, borderLeft: 1},
          {top: 18, right: 18, borderTop: 1, borderRight: 1},
          {bottom: 18, left: 18, borderBottom: 1, borderLeft: 1},
          {bottom: 18, right: 18, borderBottom: 1, borderRight: 1},
        ].map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 36,
              height: 36,
              top: p.top,
              left: p.left,
              right: p.right,
              bottom: p.bottom,
              borderTop: p.borderTop ? '3px solid rgba(255,255,255,0.92)' : undefined,
              borderLeft: p.borderLeft ? '3px solid rgba(255,255,255,0.92)' : undefined,
              borderRight: p.borderRight ? '3px solid rgba(255,255,255,0.92)' : undefined,
              borderBottom: p.borderBottom ? '3px solid rgba(255,255,255,0.92)' : undefined,
              borderRadius: 6,
            }}
          />
        ))}
      </div>
      {/* scanning line */}
      <div
        style={{
          position: 'absolute',
          left: 10,
          right: 10,
          top: 20 + sweep * 300,
          height: 3,
          borderRadius: 3,
          background: C.orange,
          boxShadow: `0 0 22px 6px rgba(232,135,58,0.55)`,
          opacity: 0.95,
        }}
      />
      {/* shutter flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 18,
          background: '#fff',
          opacity: flash,
        }}
      />
    </div>
    <PrimaryButton style={{marginTop: 18}}>
      <IconCamera size={20} color="#fff" strokeWidth={1.9} />
      Ambil Gambar
    </PrimaryButton>
  </Screen>
);

/** Result card. `chars` types the recognised text in; `confidence` counts up. */
export const ScanResultScreen: React.FC<{chars?: number; confidence?: number}> = ({
  chars = 999,
  confidence = 86,
}) => {
  const text = 'One joy dispels a hundred cares. (orientalwisdom)';
  const shown = text.slice(0, chars);
  return (
    <Screen active="scan" time="9:45">
      <ScreenTitle title="Scan Braille" sub="Arahkan kamera ke teks braille fisik" />
      <Card style={{marginTop: 16, padding: 18}}>
        <div style={{fontSize: 18, fontWeight: 700, color: C.ink}}>Hasil Scan</div>
        <div
          style={{
            fontSize: 17,
            color: C.ink,
            lineHeight: 1.45,
            marginTop: 8,
            minHeight: 50,
          }}
        >
          {shown}
          {chars < text.length ? (
            <span style={{color: C.orange, fontWeight: 700}}>|</span>
          ) : null}
        </div>
        <div style={{fontSize: 12.5, color: C.inkSoft, marginTop: 10}}>
          Keyakinan deteksi: {Math.round(confidence)}% · 45 sel · 1 paragraf
        </div>
      </Card>
      <PrimaryButton outline style={{marginTop: 16}}>
        <IconCamera size={20} color={C.blue} strokeWidth={1.9} />
        Scan Lagi
      </PrimaryButton>
    </Screen>
  );
};
