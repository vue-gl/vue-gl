import { assetFactory } from './mixins.js';
import { Curve } from './three.js';

export default {
  mixins: [assetFactory(Curve, 'vglCurves')],
};
