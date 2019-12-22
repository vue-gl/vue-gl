import { SpotLight } from 'three';
import VglLight from './vgl-light';
import { parseVector3 } from '../parsers';
import { vector3, float } from '../types';
import { validateVector3 } from '../validators';

/**
 * This light gets emitted from a single point in one direction, along a cone that increases in size the further from the light it gets. Corresponding [THREE.SpotLight](https://threejs.org/docs/index.html#api/lights/SpotLight). This light can cast shadows.
 *
 * Properties of [VglLight](vgl-light) are also available as mixin.
 */

export default {
  mixins: [VglLight],
  props: {
    /**
     * The distance from the light where the intensity is 0.
     * When set to 0, then the light never stops.
     */
    distance: { type: float, default: 0 },
    /**
     * The amount the light dims along the distance of the light.
     * For physically correct lighting, set this to 2.
     */
    decay: { type: float, default: 1 },
    /**
     * Maximum extent of the spotlight, in radians, from its direction.
     * Should be no more than Math.PI/2.
     */
    angle: { type: float, default: Math.PI / 3 },
    /**
     * Percent of the spotlight cone that is attenuated due to penumbra.
     * Takes values between zero and 1.
     */
    penumbra: { type: float, default: 0 },
    /** The spotlight's pointing position. */
    target: { type: vector3, validator: validateVector3 },
  },
  computed: {
    /** The THREE.SpotLight instance. */
    inst: () => new SpotLight(),
  },
  beforeDestroy() {
    if (this.inst.target.parent) this.inst.target.parent.remove(this.inst.target);
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          distance: parseFloat(this.distance),
          decay: parseFloat(this.decay),
          angle: parseFloat(this.angle),
          penumbra: parseFloat(this.penumbra),
        });
        if (this.target) inst.target.position.copy(parseVector3(this.target));
        if (this.parent) this.parent.add(inst.target);
      },
      immediate: true,
    },
    parent(parent) {
      parent.add(this.inst.target);
    },
    distance(distance) {
      this.inst.distance = parseFloat(distance);
      this.vglObject3d.emit();
    },
    decay(decay) {
      this.inst.decay = parseFloat(decay);
      this.vglObject3d.emit();
    },
    angle(angle) {
      this.inst.angle = parseFloat(angle);
      this.vglObject3d.emit();
    },
    penumbra(penumbra) {
      this.inst.penumbra = parseFloat(penumbra);
      this.vglObject3d.emit();
    },
    target(target) {
      this.inst.target.position.copy(parseVector3(target));
      this.vglObject3d.emit();
    },
  },
};
