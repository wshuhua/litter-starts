import { createSVGElement, mount, applyAttribute } from './utils';

export function shape(type, context, attribute) {
  const { group } = context;
  const el = createSVGElement(type);
  applyAttribute(el, attribute);

  mount(group, el);
  return el;
}

export function line(context, attribute) {
  return shape('line', context, attribute);
}

export function circle(context, attribute) {
  return shape('circle', context, attribute);
}

export function text(context, attribute) {
  const { text, ...rest } = attribute;
  const textElement = shape('text', context, rest);
  textElement.textContent = text; // 通过 textContent 设置标签内的内容
  return textElement;
}

export function rect(context, attribute) {
  const {
    width, height, x, y,
  } = attribute;
  return shape('rect', context, {
    ...attribute,
    width: Math.abs(width),
    height: Math.abs(height),
    x: width > 0 ? x : x + width,
    y: height > 0 ? y : y + height,
  });
}

// [
//  ['M', 10, 10],
//  ['L', 100, 100],
//  ['L', 100, 10],
//  ['Z'],
// ];
// 上面的二维数组会被转换成如下的字符串
// 'M 10 10 L 100 100 L 100 10 Z'
export function path(context, attribute) {
  const { d } = attribute;
  return shape('path', context, {
    ...attribute,
    d: d.flat().join(' '),
  });
}

export function ring(context, attribute) {
  const {
    cx, cy, r1, r2, ...styles
  } = attribute;
  const { stroke, strokeWidth, fill } = styles;
  const defaultStrokeWidth = 1;
  const innerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r1,
  });
  const ring = circle(context, {
    ...styles,
    strokeWidth: r2 - r1 - (strokeWidth || defaultStrokeWidth),
    stroke: fill,
    fill: 'transparent',
    cx,
    cy,
    r: (r1 + r2) / 2,
  });
  const outerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r2,
  });
  return [innerStroke, ring, outerStroke];
}
