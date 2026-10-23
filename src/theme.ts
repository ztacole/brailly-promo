import {loadFont} from '@remotion/google-fonts/Inter';

export const {fontFamily} = loadFont('normal', {
  weights: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

/** Brand palette supplied by the client, plus neutrals derived from the app screens. */
export const C = {
  blue: '#2C6C99',
  orange: '#E8873A',
  grey: '#E8E8E8',

  // derived shades
  blueDeep: '#143F5C',
  blueDark: '#1E567C',
  blueSoft: '#D7E7F2',
  blueTint: '#EAF2F8',
  orangeSoft: '#FAE2CE',
  orangeDeep: '#C96A1E',

  screen: '#F6F7F8',
  card: '#FFFFFF',
  nav: '#EDF0F2',
  ink: '#1F2933',
  inkMid: '#5B6B78',
  inkSoft: '#8B99A3',
  hairline: '#E4E8EB',
};

/** Logical size of the app screens, matching the supplied screenshots. */
export const SW = 459;
export const SH = 1024;

export const shadow = {
  card: '0 1px 2px rgba(31,41,51,0.04), 0 4px 14px rgba(31,41,51,0.05)',
  phone: '0 40px 90px rgba(12,38,56,0.28), 0 10px 26px rgba(12,38,56,0.16)',
  pill: '0 6px 18px rgba(44,108,153,0.28)',
};
