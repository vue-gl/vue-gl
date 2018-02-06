import VglLight from './vgl-light.js';
import { SpotLight } from './three.js';
import { parseVector3, findParent, validatePropNumber, validatePropVector3, update } from './utils.js';

export default {
  mixins: [VglLight],
  props: {
    distance: { type: validatePropNumber, default: 0 },
    decay: { type: validatePropNumber, default: 1 },
    angle: { type: validatePropNumber, default: Math.PI / 3 },
    penumbra: { type: validatePropNumber, default: 0 },
    target: validatePropVector3,
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
        if (this.target) {
          inst.target.position.copy(parseVector3(this.target));
          const $parent = findParent(this, 'isVglObject3d');
          if ($parent) {
            this.$watch(() => $parent.inst, (parent, old) => {
              if (old) old.remove(inst.target);
              parent.add(inst.target);
              update(this);
            }, { immediate: true });
          }
        }
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
      this.inst.distance = parseFloat(distance);
      update(this);
    },
    decay(decay) {
      this.inst.decay = parseFloat(decay);
      update(this);
    },
    angle(angle) {
      this.inst.angle = parseFloat(angle);
      update(this);
    },
    penumbra(penumbra) {
      this.inst.penumbra = parseFloat(penumbra);
      update(this);
    },
    target(target) {
      this.inst.target.position.copy(parseVector3(target));
      update(this);
    },
  },
};
