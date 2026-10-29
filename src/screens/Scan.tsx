import React from 'react';
import {C} from '../theme';
import {AppScreen} from '../ui/AppScreen';

/**
 * Authentic Scan Camera screen from the Brailly app, with an interactive
 * laser sweep line and shutter flash.
 */
export const ScanCameraScreen: React.FC<{sweep?: number; flash?: number}> = ({
  sweep = 0,
  flash = 0,
}) => {
  // Viewfinder bounding in phone coordinates:
  // Top ~ 160px, bottom ~ 580px, left ~ 32px, right ~ 32px
  const laserY = 175 + sweep * 380;

  return (
    <AppScreen name="scan_camera.png">
      {/* Dynamic Laser Scanning Line */}
      <div
        style={{
          position: 'absolute',
          left: 36,
          right: 36,
          top: laserY,
          height: 3,
          borderRadius: 3,
          background: C.orange,
          boxShadow: `0 0 18px 5px rgba(232, 135, 58, 0.75), 0 0 6px 2px #fff`,
          pointerEvents: 'none',
          opacity: sweep > 0 ? 0.95 : 0,
        }}
      />

      {/* Focus / Detection Reticle Pulse */}
      <div
        style={{
          position: 'absolute',
          left: 50,
          top: 200,
          right: 50,
          height: 330,
          borderRadius: 16,
          border: '1.5px dashed rgba(232, 135, 58, 0.35)',
          pointerEvents: 'none',
        }}
      />

      {/* Camera Shutter Flash */}
      {flash > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#ffffff',
            opacity: flash,
            pointerEvents: 'none',
          }}
        />
      )}
    </AppScreen>
  );
};

/**
 * Authentic Scan Result screen from the Brailly app.
 */
export const ScanResultScreen: React.FC<{reveal?: number}> = ({reveal = 1}) => {
  return (
    <AppScreen name="scan_result.png">
      {/* Subtle pulse highlight over translated card */}
      <div
        style={{
          position: 'absolute',
          left: 20,
          top: 155,
          right: 20,
          height: 180,
          borderRadius: 20,
          border: `2px solid rgba(44, 108, 153, ${0.4 * reveal})`,
          boxShadow: `0 0 20px rgba(44, 108, 153, ${0.2 * reveal})`,
          pointerEvents: 'none',
        }}
      />
    </AppScreen>
  );
};

/**
 * Authentic Scan History screen from the Brailly app.
 */
export const ScanHistoryScreen: React.FC = () => {
  return <AppScreen name="scan_history.png" />;
};
