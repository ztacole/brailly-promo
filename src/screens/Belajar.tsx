import React from 'react';
import {C} from '../theme';
import {AppScreen} from '../ui/AppScreen';

/**
 * Authentic Belajar main screen: Jalur Kuis progress + Kamus Braille (Alfabet/Angka/Simbol).
 */
export const BelajarScreen: React.FC = () => {
  return <AppScreen name="learn_main.png" />;
};

/**
 * Authentic Jalur Kuis screen showing level roadmap and progress.
 */
export const JalurKuisScreen: React.FC<{pulse?: number}> = ({pulse = 0}) => {
  return (
    <AppScreen name="learn_levels.png">
      {pulse > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 240,
            right: 20,
            height: 90,
            borderRadius: 18,
            boxShadow: `0 0 0 ${pulse * 10}px rgba(44, 108, 153, ${0.4 * (1 - pulse)})`,
            pointerEvents: 'none',
          }}
        />
      )}
    </AppScreen>
  );
};

/**
 * Authentic Video Materi lesson screen from the Brailly app.
 */
export const VideoMateriScreen: React.FC = () => {
  return <AppScreen name="learn_video.png" />;
};

/**
 * Authentic Quiz interactive screen with correct answer state ("✓ Tepat sekali!").
 */
export const QuizScreen: React.FC<{celebrate?: number}> = ({celebrate = 0}) => {
  return (
    <AppScreen name="quiz_correct.png">
      {celebrate > 0 && (
        <>
          {/* Glowing aura around "Tepat sekali!" banner */}
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: 760,
              right: 20,
              height: 70,
              borderRadius: 16,
              background: 'radial-gradient(ellipse at center, rgba(34,197,94,0.3) 0%, rgba(34,197,94,0) 70%)',
              boxShadow: `0 0 30px rgba(34, 197, 94, ${0.5 * celebrate})`,
              pointerEvents: 'none',
            }}
          />

          {/* Simple fun floating star particles */}
          {[
            {x: 60, y: 740, s: 18},
            {x: 400, y: 745, s: 20},
            {x: 230, y: 720, s: 16},
          ].map((pt, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: pt.x,
                top: pt.y - celebrate * 24,
                fontSize: pt.s,
                color: C.orange,
                opacity: celebrate * (1 - celebrate * 0.4),
                transform: `scale(${0.6 + celebrate * 0.7}) rotate(${celebrate * 45}deg)`,
                pointerEvents: 'none',
              }}
            >
              ✦
            </div>
          ))}
        </>
      )}
    </AppScreen>
  );
};

/**
 * Authentic Quiz Victory screen: "Level Tuntas! Level berikutnya sudah terbuka."
 */
export const QuizVictoryScreen: React.FC = () => {
  return <AppScreen name="quiz_victory.png" />;
};
