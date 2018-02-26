import VglObject3d from './vgl-object3d.js';
import { GridHelper } from './three.js';
import { number, string } from './validators.js';

export default {
  mixins: [VglObject3d],
  props: {
    size: { type: number, default: 10 },
    divisions: { type: number, default: 10 },
    colorCenterLine: { type: string, default: '#444444' },
    colorGrid: { type: string, default: '#888888' },
  },
  computed: {
    inst() {
      return new GridHelper(
        parseFloat(this.size),
        parseInt(this.divisions, 10),
        this.colorCenterLine,
        this.colorGrid,
      );
    },
  },
};
