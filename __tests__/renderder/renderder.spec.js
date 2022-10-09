import { createRenderder } from '../../src/renderer';
import { createDiv, mount } from '../utils';

describe('createRenderder', () => {
  test('createContext(width, height) return s expected context', () => {
    const renderder = createRenderder(600, 400);
    const node = renderder.node();
    const group = renderder.group();

    expect(node.tagName).toBe('svg');
    expect(node.getAttribute('width')).toBe('600');
    expect(node.getAttribute('height')).toBe('400');
    expect(node.getAttribute('viewBox')).toBe('0 0 600 400');

    expect(group.tagName).toBe('g');
    expect(group.parentNode).toBe(node);

    mount(createDiv(), node);
  });
});
