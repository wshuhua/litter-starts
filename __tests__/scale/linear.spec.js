import { createLinear, interpolateNumber } from '../../src/scale/linear';

describe('createLinear', () => {
  test('createLinear(options) returns a linear function', () => {
    const s = createLinear({
      domain: [0, 1],
      range: [0, 100],
    });

    expect(s(0)).toBe(0);
    expect(s(0.3)).toBe(30);
    expect(s(0.7)).toBe(70);
  });
  test('createLinear(options) uses custom interpolate', () => {
    const s = createLinear({
      domain: [0, 1],
      range: ['a', 'z'],
      interpolate: (t, start, end) => {
        const charCode = interpolateNumber(
          t,
          start.charCodeAt(),
          end.charCodeAt(),
        );
        return String.fromCharCode(charCode);
      },
    });
    expect(s(0)).toBe('a');
    expect(s(1)).toBe('z');
    expect(s(0.5)).toBe('m');
  });
});
