import { createRenderder } from '../../src/renderer';
import { shape } from '../../src/renderer/shape';
import { createDiv, mount, getAttributes } from '../utils';

describe('shapes', () => {
  test('shape(name, context, attribute) create SVG elements width specified attributes and mounts it to group', () => {
    const renderder = createRenderder(600, 400);
    const context = { group: renderder.group() };

    const s = shape('circle', context, {
      cx: 100,
      cy: 100,
      r: 50,
      fill: 'red',
      stroke: 'yellow',
      strokeWidth: 10,
    });

    mount(createDiv(), renderder.node());

    expect(s.tagName).toBe('circle');
    expect(s.parentNode).toBe(renderder.group());
    expect(getAttributes(s, ['cx', 'cy', 'r', 'fill', 'stroke', 'stroke-width'])).toEqual({
      cx: '100',
      cy: '100',
      r: '50',
      fill: 'red',
      stroke: 'yellow',
      'stroke-width': '10',
    });
  });

  test('circle() creates circle element', () => {
    const renderder = createRenderder(600, 400);
    const circle = renderder.circle({
      cx: 100,
      cy: 100,
      r: 50,
      fill: 'red',
      stroke: 'yellow',
      strokeWidth: 10,
    });
    mount(createDiv(), renderder.node());
    expect(circle.tagName).toBe('circle');
  });

  test('rect() creates rect element and accepts negative width and height', () => {
    const renderder = createRenderder(600, 400);
    const rect = renderder.rect({
      x: 100,
      y: 100,
      width: -50,
      height: -50,
    });

    expect(getAttributes(rect, ['x', 'y', 'width', 'height'])).toEqual({
      x: '50',
      y: '50',
      width: '50',
      height: '50',
    });
    mount(createDiv(), renderder.node());
    expect(rect.tagName).toBe('rect');
  });

  test('line() creates line element', () => {
    const renderder = createRenderder(600, 400);
    const line = renderder.line({
      x1: 0,
      y1: 0,
      x2: 50,
      y2: 50,
      stroke: 'black',
    });

    mount(createDiv(), renderder.node());
    expect(line.tagName).toEqual('line');
  });

  test('text() creates text element and sets textContent', () => {
    const renderder = createRenderder(600, 400);
    const text = renderder.text({
      x: 100,
      y: 100,
      text: 'hello world',
    });
    mount(createDiv(), renderder.node());

    expect(text.tagName).toBe('text');
    expect(text.textContent).toBe('hello world');
  });

  test('path() creates path element and accepts array to specify path', () => {
    const renderder = createRenderder(600, 400);
    const d = [
      ['M', 10, 10],
      ['L', 100, 100],
      ['L', 100, 10],
      ['Z'],
    ];
    const path = renderder.path({
      d,
      stroke: 'black',
      fill: 'red',
    });
    mount(createDiv(), renderder.node());

    expect(path.tagName).toBe('path');
    expect(path.getAttribute('d')).toBe('M 10 10 L 100 100 L 100 10 Z');
  });
});
