import React from 'react';
import {Img, staticFile} from 'remotion';
import {SH, SW} from '../theme';

export interface AppScreenProps {
  name: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Renders an authentic screen from the Brailly app screenshots in public/screens/,
 * scaled pixel-perfect to the phone viewport with optional animated overlays.
 */
export const AppScreen: React.FC<AppScreenProps> = ({name, style, children}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: SW,
        height: SH,
        overflow: 'hidden',
        backgroundColor: '#F5F6F8',
        ...style,
      }}
    >
      <Img
        src={staticFile(`screens/${name}`)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          userSelect: 'none',
        }}
      />
      {children}
    </div>
  );
};
