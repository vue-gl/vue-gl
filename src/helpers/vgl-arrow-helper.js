import { ArrowHelper, Color, Vector3 } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { parseVector3 } from '../parsers';
import { float, color, vector3 } from '../types';
import { validateVector3 } from '../validators';

/**
 * An 3D arrow object for visualizing directions,
 * corresponding [THREE.ArrowHelper](https://threejs.org/docs/index.html#api/helpers/ArrowHelper).
 *
 * Properties of [VglObject3d](../core/vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /** Direction from origin. */
    dir: { type: vector3, validator: validateVector3 },
    /** Length of the arrow. */
    length: { type: float, default: 1 },
    /** Color of the arrow. */
    color: { type: color, default: '#ff0' },
    /** The length of the head of the arrow. */
    headLength: float,
    /** The width of the head of the arrow. */
    headWidth: float,
  },
  computed: {
    /** The THREE.ArrowHelper instance. */
    inst: () => new ArrowHelper(new Vector3(0, 1, 0), new Vector3()),
    /** Array(3) of helper properties. Arrow length, head length, and head width. */
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
    dir(dir) {
      this.inst.setDirection(parseVector3(dir).normalize());
      this.vglObject3d.emit();
    },
    len(len) {
      this.inst.setLength(...len);
      this.vglObject3d.emit();
    },
    color(newColor) {
      this.inst.setColor(new Color(newColor));
      this.vglObject3d.emit();
    },
  },
};
