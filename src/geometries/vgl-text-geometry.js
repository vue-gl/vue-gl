import { BufferGeometry, TextGeometry } from 'three';
import VglExtrudeGeometry from './vgl-extrude-geometry';
import {
  bevelEnabled, bevelOffset, bevelSegments, bevelSize, bevelThickness, curveSegments, depth,
  extrudePath, font, inst, remove, size, steps, text, uvGenerator, add,
} from '../constants';

export default {
  extends: VglExtrudeGeometry,
  props: {
    /** The text to be shown. */
    [text]: { type: String, default: '' },
    /** The size of the text. */
    [size]: { type: Number, default: 100 },
  },
  data: () => ({ font: undefined }),
  computed: {
    /** The THREE.TextGeometry instance. */
    [inst]() {
      if (!this.font) return new BufferGeometry();
      return new TextGeometry(this[text], {
        font: this.font,
        size: this[size],
        height: this[depth],
        curveSegments: this[curveSegments],
        steps: this[steps],
        bevelEnabled: this[bevelEnabled],
        bevelThickness: this[bevelThickness],
        bevelSize: this[bevelSize],
        bevelOffset: this[bevelOffset],
        extrudePath: this.extrudePath,
        bevelSegments: this[bevelSegments],
        UVGenerator: this[uvGenerator],
      });
    },
  },
  methods: {
    [add](slot, obj) {
      if (slot === font) this.font = obj;
      else if (slot === extrudePath) this.extrudePath = obj;
    },
    [remove](slot, obj) {
      if (slot === font) {
        if (this.font === obj) this.font = undefined;
      } else if (slot === extrudePath && this.extrudePath === obj) {
        this.extrudePath = undefined;
      }
    },
  },
};
