import VglObject3d from './vgl-object3d.js';
import { ArrowHelper, Vector3, Color } from './three.js';
import { parseVector3 } from './parsers.js';
import { string, number, vector3 } from './constructor-arrays.js';

export default {
  mixins: [VglObject3d],
  props: {
    dir: vector3,
    length: { type: number, default: 1 },
    headLength: number,
    headWidth: number,
    color: { type: string, default: '#ff0' },
  },
  computed: {
    inst: () => new ArrowHelper(new Vector3(0, 1), new Vector3()),
    lengths() {
      return [
        parseFloat(this.length),
        this.headLength ? parseFloat(this.headLength) : undefined,
        this.headWidth ? parseFloat(this.headWidth) : undefined,
      ];
    },
  },
  watch: {
    inst: {
      handler(inst) {
        inst.setDirection(parseVector3(this.dir).normalize());
        inst.setLength(...this.lengths);
        inst.setColor(new Color(this.color));
      },
      immediate: true,
    },
    dir(dir) {
      this.inst.setDirection(parseVector3(dir).normalize());
      this.vglObject3d.update();
    },
    lengths(lengths) {
      this.inst.setLength(...lengths);
      this.vglObject3d.update();
    },
    color(color) {
      this.inst.setColor(new Color(color));
      this.vglObject3d.update();
    },
  },
};
