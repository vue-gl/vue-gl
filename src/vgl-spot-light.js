import VglLight from './vgl-light.js';
import { SpotLight } from './three.js';
import { parseVector3 } from './parsers.js';
import { number, vector3 } from './validators.js';

export default {
  mixins: [VglLight],
  props: {
    distance: { type: number, default: 0 },
    decay: { type: number, default: 1 },
    angle: { type: number, default: Math.PI / 3 },
    penumbra: { type: number, default: 0 },
    target: vector3,
  },
  computed: {
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
        if (this.vglObject3d.inst) this.vglObject3d.inst.add(inst.target);
      },
      immediate: true,
    },
    'vglObject3d.inst': function parentInst(inst) { inst.add(this.inst.target); },
    distance(distance) { this.inst.distance = parseFloat(distance); },
    decay(decay) { this.inst.decay = parseFloat(decay); },
    angle(angle) { this.inst.angle = parseFloat(angle); },
    penumbra(penumbra) { this.inst.penumbra = parseFloat(penumbra); },
    target(target) { this.inst.target.position.copy(parseVector3(target)); },
  },
};
