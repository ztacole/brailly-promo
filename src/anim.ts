import {interpolate, spring} from 'remotion';

/** Rise + fade in, the default entrance used across the video. */
export const rise = (
  frame: number,
  fps: number,
  delay = 0,
  dist = 44,
  damping = 200
) => {
  const s = spring({
    frame: frame - delay,
    fps,
    config: {damping, mass: 0.7, stiffness: 110},
  });
  return {
    opacity: interpolate(s, [0, 1], [0, 1], {extrapolateRight: 'clamp'}),
    transform: `translateY(${interpolate(s, [0, 1], [dist, 0])}px)`,
  };
};

/** Pop in with a touch of overshoot — used for badges, nodes, check marks. */
export const pop = (frame: number, fps: number, delay = 0, from = 0.6) => {
  const s = spring({
    frame: frame - delay,
    fps,
    config: {damping: 11, mass: 0.6, stiffness: 150},
  });
  return {
    opacity: interpolate(frame - delay, [0, 4], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    transform: `scale(${interpolate(s, [0, 1], [from, 1])})`,
  };
};

/** Plain eased fade between two frames. */
export const fade = (frame: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(frame, [a, b], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Scene-level fade in/out so cuts never hard-pop. */
export const sceneOpacity = (frame: number, duration: number, len = 9) =>
  interpolate(
    frame,
    [0, len, duration - len, duration],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );
