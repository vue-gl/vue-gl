import VglLight from './vgl-light.js';
import { SpotLight } from './three.js';
import { parseVector3 } from './parsers.js';
import { number, vector3 } from './constructor-arrays.js';

export default {
  mixins: [VglLight],
  props: {
    distance: { type: number, default: 0 },
    decay: { type: number, default: 1 },
    angle: { type: number, default: Math.PI / 3 },
    penumbra: { type: number, default: 0 },
    target: { type: vector3 },
  },
  computed: {
    inst: () => new SpotLight(),
  },
  beforeDestroy() {
    if (this.inst.target.parent) {
      this.inst.target.parent.remove(this.inst.target);
    }
  },
  watch: {
    inst: {
      handler(inst, oldInst) {
        if (oldInst && oldInst.target.parent) {
          oldInst.target.parent.remove(oldInst.target);
        }
        if (this.vglObject3d.inst) {
          this.vglObject3d.inst.add(inst.target);
        }
        parseVector3(this.target, inst.target);
        Object.assign(inst, {
          distance: parseFloat(this.distance),
          decay: parseFloat(this.decay),
          angle: parseFloat(this.angle),
          penumbra: parseFloat(this.penumbra),
        });
      },
      immediate: true,
    },
    distance(distance) {
      Object.assign(this.inst, { distance: parseFloat(distance) });
      this.vglObject3d.update();
    },
    decay(decay) {
      Object.assign(this.inst, { decay: parseFloat(decay) });
      this.vglObject3d.update();
    },
    angle(angle) {
      Object.assign(this.inst, { angle: parseFloat(angle) });
      this.vglObject3d.update();
    },
    penumbra(penumbra) {
      Object.assign(this.inst, { penumbra: parseFloat(penumbra) });
      this.vglObject3d.update();
    },
    target(target) {
      parseVector3(target, this.inst.target.position);
      this.vglObject3d.update();
    },
  },
};
