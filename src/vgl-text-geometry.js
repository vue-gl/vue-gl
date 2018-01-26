import VglExtrudeGeometry from './vgl-extrude-geometry.js';
import { TextGeometry } from './three.js';
import { string, number, boolean } from './constructor-arrays.js';

export default {
  mixins: [VglExtrudeGeometry],
  inject: ['vglNamespace'],
  props: {
    text: string,
    font: string,
    size: { type: number, default: 100 },
    height: { type: number, default: 50 },
    curveSegments: { type: number, default: 12 },
    bevelEnabled: boolean,
    bevelThickness: { type: number, default: 10 },
    bevelSize: { type: number, default: 8 },
    bevelSegments: { type: number, default: 3 },
  },
  computed: {
    inst() {
      return new TextGeometry(this.text, {
        font: this.vglNamespace.fonts[this.font],
        size: parseFloat(this.size),
        height: parseFloat(this.height),
        curveSegments: parseInt(this.curveSegments, 10),
        bevelEnabled: this.bevelEnabled,
        bevelThickness: parseFloat(this.bevelThickness),
        bevelSize: parseFloat(this.bevelSize),
        bevelSegments: parseInt(this.bevelSegments, 10),
      });
    },
  },
};
