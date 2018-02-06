import VglObject3d from './vgl-object3d.js';
import { ArrowHelper, Color, Vector3 } from './three.js';
import { parseVector3, validatePropNumber, validatePropString, validatePropVector3 } from './utils.js';

export default {
  mixins: [VglObject3d],
  props: {
    dir: validatePropVector3,
    length: { type: validatePropNumber, default: 1 },
    color: { type: validatePropString, default: '#ff0' },
    headLength: validatePropNumber,
    headWidth: validatePropNumber,
  },
  computed: {
    inst: () => new ArrowHelper(new Vector3(0, 1, 0), new Vector3()),
    len() {
      return [
        parseFloat(this.length),
        this.headLength !== undefined ? parseFloat(this.headLength) : undefined,
        this.headWidth !== undefined ? parseFloat(this.headWidth) : undefined,
      ];
    },
  },
  watch: {
    inst: {
      handler(inst) {
        if (this.dir) inst.setDirection(parseVector3(this.dir).normalize());
        inst.setLength(...this.len);
        inst.setColor(new Color(this.color));
      },
      immediate: true,
    },
    dir(dir) { this.inst.setDirection(parseVector3(dir).normalize()); },
    len(len) { this.inst.setLength(...len); },
    color(color) { this.inst.setColor(new Color(color)); },
  },
};
