import { createRenderder } from '../../src/renderer';
import { createDiv, mount } from '../utils';

describe('transform', () => {
  test('Renderder should apply specified transform and can save or restore transforms context', () => {
    const renderder = createRenderder(600, 400);

    renderder.save();
    renderder.translate(200, 100);
    renderder.rotate(60);
    renderder.scale(2, 3);

    const r1 = renderder.rect({
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    });
    renderder.restore();

    const r2 = renderder.rect({
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    });

    mount(createDiv(), renderder.node());
    expect(r1.parentNode.getAttribute('transform')).toBe('translate(200, 100) rotate(60) scale(2, 3)');
    expect(r2.parentNode.getAttribute('transform')).toBeNull();
  });
});
