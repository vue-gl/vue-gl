import VglExtrudeGeometry from './vgl-extrude-geometry.js';
import { TextGeometry, Geometry } from './three.js';
import { validatePropNumber, validatePropString, validatePropBoolean } from './utils.js';

function getText(nodes) {
  return nodes ? nodes.map(node => (node.children ? getText(node.children) : node.text)).join('') : '';
}

export default {
  mixins: [VglExtrudeGeometry],
  inject: ['vglFonts'],
  props: {
    font: validatePropString,
    size: { type: validatePropNumber, default: 100 },
    height: { type: validatePropNumber, default: 50 },
    curveSegments: { type: validatePropNumber, default: 12 },
    bevelEnabled: validatePropBoolean,
    bevelThickness: { type: validatePropNumber, default: 10 },
    bevelSize: { type: validatePropNumber, default: 8 },
    bevelSegments: { type: validatePropNumber, default: 3 },
  },
  computed: {
    inst() {
      const font = this.vglFonts.forGet[this.font];
      const nodes = this.$slots.default;
      if (font) {
        return new TextGeometry(getText(nodes), {
          font,
          size: parseFloat(this.size),
          height: parseFloat(this.height),
          curveSegments: parseInt(this.curveSegments, 10),
          bevelEnabled: this.bevelEnabled,
          bevelThickness: parseFloat(this.bevelThickness),
          bevelSize: parseFloat(this.bevelSize),
          bevelSegments: parseInt(this.bevelSegments, 10),
        });
      }
      return new Geometry();
    },
  },
};
