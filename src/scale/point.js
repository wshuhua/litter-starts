import { createBand } from './brand';

export function createPoint(options) {
  return createBand({
    ...options,
    padding: 1,
  });
}
