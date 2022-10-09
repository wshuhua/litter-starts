import { createContext } from './context';
import {
  line, circle, text, rect, path, ring,
} from './shape';
import {
  restore, save, scale, translate, rotate,
} from './transform';

export function createRenderder(width = 400, height = 400) {
  const context = createContext(width, height);
  return {
    line: (options) => line(context, options),
    circle: (options) => circle(context, options),
    text: (options) => text(context, options),
    rect: (options) => rect(context, options),
    path: (options) => path(context, options),
    ring: (options) => ring(context, options),
    restore: (options) => restore(context, options),
    save: (options) => save(context, options),
    scale: (...options) => scale(context, ...options),
    translate: (...options) => translate(context, ...options),
    rotate: (...options) => rotate(context, ...options),
    node: () => context.node,
    group: () => context.group,
  };
}
