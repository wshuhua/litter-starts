import { createRenderder } from './renderer';

const renderder = createRenderder(600, 400);
renderder.save();
renderder.translate(200, 100);
renderder.rotate(60);
renderder.scale(2, 3);

console.log(renderder, 'renderder');
