import { applyTransform, createSVGElement, mount } from './utils';

// type: rotate | tranlate | scale
function transform(type, context, ...params) {
  const { group } = context;
  applyTransform(group, `${type}(${params.join(', ')})`);
}

export function translate(context, tx, ty) {
  transform('translate', context, tx, ty);
}

export function rotate(context, degree) {
  transform('rotate', context, degree);
}

export function scale(context, sx, sy) {
  transform('scale', context, sx, sy);
}

export function save(context) {
  const { group } = context;
  const newGroup = createSVGElement('g');
  mount(group, newGroup);
  context.group = newGroup;
}

export function restore(context) {
  const { group } = context;
  const { parentNode } = group;
  context.group = parentNode;
}
