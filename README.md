# Brailly — Video Promosi

Video promosi aplikasi Brailly: **45 detik, 1920×1080 (16:9), 30 fps**, teks di layar + musik
instrumental, tanpa narasi.

## Unduh videonya

| File | Resolusi | Ukuran |
|---|---|---|
| [`out/brailly-promo.mp4`](out/brailly-promo.mp4) | 1920×1080 | 7,8 MB |
| [`out/brailly-promo-720p.mp4`](out/brailly-promo-720p.mp4) | 1280×720 | 1,5 MB |

Buka salah satu file di atas lewat GitHub, lalu klik tombol **Download** (atau *View raw*).
Pratinjau per scene ada di [`out/preview/`](out/preview).

## Isi video

| Waktu | Scene | Isi |
|---|---|---|
| 0:00–0:03.5 | Logo | Logo resmi Brailly muncul + wordmark, slogan "Setiap Karya Berhak Terbaca." |
| 0:03.5–0:08.5 | Hook | Halaman braille fisik + "Banyak karya lahir dari ujung jari. Tapi sedikit yang bisa membacanya." |
| 0:08.5–0:20.5 | **Fitur Scan** | Home → tab Scan → viewfinder dengan garis pindai → shutter → hasil teks muncul diketik |
| 0:20.5–0:32.5 | **Fitur Belajar** | Kamus huruf → Jalur Kuis 10 level → soal kuis dijawab benar, skor 2/5 → 3/5 |
| 0:32.5–0:38 | Fitur Terjemah | Dua ponsel: teks→braille dan papan ketik 6 titik |
| 0:38–0:45 | Closing | Logo + "Setiap Karya Berhak Terbaca." / "Membuka akses, menghubungkan karya, merangkul kesetaraan." |

Fitur Scan dan Belajar masing-masing dapat porsi 12 detik — 24 dari 45 detik total, sesuai
permintaan untuk menonjolkan kedua fitur itu.

## Warna brand

| Token | Hex | Pemakaian |
|---|---|---|
| `C.blue` | `#2C6C99` | Warna utama, tombol, judul |
| `C.orange` | `#E8873A` | Aksen, titik braille aktif, kata kunci |
| `C.grey` | `#E8E8E8` | Titik braille non-aktif, permukaan netral |

Shade turunan (`blueDeep`, `orangeSoft`, dll.) ada di `src/theme.ts`.

## Cara render ulang

```bash
npm install
npm run render    # -> out/brailly-promo.mp4
```

`public/music.wav` tidak disimpan di repo (8 MB dan bisa dibuat ulang). Script `prerender`
menjalankan `npm run music` otomatis sebelum render, jadi tidak perlu dipanggil manual.

Untuk membuat versi 720p yang lebih ringan dari hasil render:

```bash
npx remotion ffmpeg -i out/brailly-promo.mp4 -vf scale=1280:720 -c:v libx264 -crf 30 \
  -preset slow -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 112k \
  -y out/brailly-promo-720p.mp4
```

Pratinjau interaktif dengan timeline (butuh browser, jalankan di mesin lokal):

```bash
npm run studio
```

## Struktur

```
scripts/make-music.mjs   sintesis trek musik (Node murni, tanpa dependensi) -> WAV
src/theme.ts             palet warna, font, ukuran layar aplikasi
src/anim.ts              helper animasi (rise, pop, fade, sceneOpacity)
src/Root.tsx             definisi composition (1920x1080, 30fps, 1350 frame)
src/Promo.tsx            susunan scene + trek audio
src/scenes/              S1Logo, S2Hook, S3Scan, S4Belajar, S5Terjemah, S6Closing
src/screens/             rekonstruksi layar aplikasi: Home, Scan, Belajar, Terjemah
src/ui/                  Phone (frame perangkat), Braille (sel titik), Logo, icons, kit, stage
```

## Catatan teknis

**Layar aplikasi dibangun ulang sebagai komponen, bukan screenshot.** Ukurannya mengikuti
screenshot asli (459×1024) sehingga bisa dianimasikan: garis pindai bergerak, titik braille
menyala satu per satu, progress kuis naik, indikator sentuh muncul di posisi tombol.

**Musik dibuat dari nol** lewat sintesis aditif di `scripts/make-music.mjs` — progresi I–V–vi–IV
di D mayor, 96 BPM, pad + marimba + melodi pentatonik. Intensitasnya naik mengikuti pergantian
scene dan ada aksen bell tepat di tiap batas scene (0 / 3.5 / 8.5 / 20.5 / 32.5 / 38 detik).
Karena dihasilkan sendiri, tidak ada masalah lisensi musik.

**Logo memakai file asli** `public/logo.png` (512×512), disalin dari
`app/src/main/ic_launcher-playstore.png` di repo aplikasi `ztacole/brailly`. Latar logonya putih,
jadi di scene gelap logo tampil sebagai ikon kotak putih bersudut bulat. Untuk mengganti logo,
cukup timpa `public/logo.png` lalu render ulang.

**Font**: Inter dimuat lewat `@remotion/google-fonts` dengan subset `latin`. Karakter di luar
subset itu (misalnya `→` dan karakter CJK) tidak punya glyph, jadi ikon Terjemah dan tanda panah
digambar sebagai path SVG di `src/ui/icons.tsx`.

## Teks yang muncul di video

Semua teks terkumpul untuk memudahkan revisi:

- Setiap Karya Berhak Terbaca.
- Banyak karya lahir dari ujung jari.
- Tapi **sedikit** yang bisa membacanya.
- Brailly menjembatani keduanya.
- Fitur 01 · Scan — Foto braille, **langsung jadi teks.**
- Arahkan kamera ke halaman braille fisik — Brailly membacanya untukmu.
- Cukup satu foto dari kamera ponsel / Teks muncul dalam hitungan detik / Siap disalin dan dibagikan ke siapa pun
- Fitur 02 · Belajar — Belajar braille **dari titik pertama.**
- Kamus, kuis bertingkat, dan streak harian — semuanya dalam satu aplikasi.
- Kamus alfabet, angka, dan simbol / 10 level kuis, dari huruf sampai kata / Streak harian yang menjaga kebiasaan
- Fitur 03 · Terjemah — Dua arah, **tanpa hambatan.**
- Teks ke braille untuk menulis. Braille ke teks untuk membaca.
- Setiap Karya **Berhak Terbaca.**
- Membuka akses, menghubungkan karya, merangkul kesetaraan.
- Scan · Terjemah · Belajar
- Brailly · v1.0

## Verifikasi hasil render

Yang sudah diperiksa pada `out/brailly-promo.mp4`:

- **Kontainer**: durasi 45,01 s · 1920×1080 · DAR 16:9 · 30 fps · H.264 + AAC stereo
- **Video**: 1350 paket (= 1350 frame), 8 keyframe, rata-rata 4,2 KB/frame, dan setiap blok 5 detik
  membawa data gambar yang signifikan (bukan frame kosong/hitam)
- **Audio**: didecode ulang dari MP4 lalu diukur — durasi 45,01 s, puncak −4,0 dBFS, RMS −18,9 dBFS,
  identik dengan `public/music.wav`, jadi tidak ada kliping dan musik terisi dari awal sampai akhir
- **Visual**: tiap scene dicek lewat render frame statis (`out/preview/*.png`)

Catatan lingkungan: binary compositor Remotion (dipakai `OffthreadVideo` untuk membaca ulang frame
dari MP4) butuh GLIBC 2.35 dan tidak jalan di sandbox ini. Pemeriksaan gambar karena itu dilakukan
lewat `remotion still` dari komponen sumber, bukan dengan membaca balik MP4-nya.
