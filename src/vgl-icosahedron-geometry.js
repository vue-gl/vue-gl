import VglGeometry from './vgl-geometry.js';
import { IcosahedronGeometry } from './three.js';
import { hedronFactory } from './mixins.js';

export default {
  mixins: [VglGeometry, hedronFactory(IcosahedronGeometry)],
};
