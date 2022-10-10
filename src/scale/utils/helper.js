/**
 * @description: 解决浮点数 精度丢失问题
 * @param {*} n
 * @return {*}
 */
export function round(n) {
  return Math.round(n * 1e12) / 1e12;
}

export function floor(n, base) {
  return base * Math.floor(n / base);
}

export function ceil(n, base) {
  return base * Math.ceil(n / base);
}

export function nice(domain, interval) {
  const [min, max] = domain;
  return [interval.floor(min), interval.ceil(max)];
}
