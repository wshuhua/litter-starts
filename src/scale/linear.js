import { normalize, ticks, tickStep } from './utils';
import { ceil, floor, nice } from './utils/helper';

/**
 * @description: 线性比例尺
 * @return {*}
 */
export function createLinear({
  domain: [d0, d1],
  range: [r0, r1],
  interpolate = interpolateNumber,
}) {
  const scale = (x) => {
    const t = normalize(x, d0, d1);
    return interpolate(t, r0, r1);
  };
  scale.ticks = (tickCount = 10) => ticks(d0, d1, tickCount);
  scale.nice = (tickCount = 10) => {
    if (d0 === d1) return;
    const step = tickStep(d0, d1, tickCount);
    [d0, d1] = nice([d0, d1], {
      floor: (x) => floor(x, step),
      ceil: (x) => ceil(x, step),
    });
  };
}

export function interpolateNumber(t, start, stop) {
  return start * (1 - t) + stop * t;
}
