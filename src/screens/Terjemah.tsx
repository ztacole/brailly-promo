import React from 'react';
import {AppScreen} from '../ui/AppScreen';

/**
 * Authentic Terjemah screen: Teks ke Braille.
 */
export const TerjemahTextScreen: React.FC = () => {
  return <AppScreen name="translate_text.png" />;
};

/**
 * Authentic Terjemah screen: Braille ke Teks with 6-dot interactive keyboard.
 */
export const TerjemahDotsScreen: React.FC = () => {
  return <AppScreen name="translate_dots_result.png" />;
};
