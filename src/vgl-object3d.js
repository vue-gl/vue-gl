import { VglMinimumRenderer } from './mixins.js';
import { parseVector3, parseEuler } from './parsers.js';
import { vector3, euler, boolean, string } from './constructor-arrays.js';
import { Object3D } from './three.js';

export default {
  mixins: [VglMinimumRenderer],
  inject: {
    vglObject3d: {
      default() {
        const listeners = [];
        let toBeUpdated;
        return {
          listeners,
          update: () => {
            if (!toBeUpdated) {
              this.$nextTick(() => {
                listeners.forEach((listener) => { listener(); });
                toBeUpdated = false;
              });
              toBeUpdated = true;
            }
          },
        };
      },
    },
  },
  provide() {
    return {
      vglObject3d: Object.create(this.vglObject3d, { inst: { get: () => this.inst } }),
    };
  },
  beforeDestroy() {
    if (this.inst.parent) {
      this.inst.parent.remove(this.inst);
    }
  },
  computed: {
    inst: () => new Object3D(),
  },
  props: {
    position: vector3,
    rotation: euler,
    scale: vector3,
    castShadow: boolean,
    receiveShadow: boolean,
    name: string,
  },
  watch: {
    inst: {
      handler(inst, oldInst) {
        if (oldInst) {
          oldInst.removeEventListener('added', this.vglObject3d.update);
          oldInst.removeEventListener('removed', this.vglObject3d.update);
          const { children, parent } = oldInst;
          if (children.length) {
            inst.add(...children);
          }
          if (parent) {
            parent.remove(oldInst);
          }
        }
        inst.addEventListener('added', this.vglObject3d.update);
        inst.addEventListener('removed', this.vglObject3d.update);
        if (this.vglObject3d.inst) {
          this.vglObject3d.inst.add(inst);
        }
        if (this.position) {
          this.inst.position.copy(parseVector3(this.position));
        }
        if (this.rotation) {
          this.inst.rotation.copy(parseEuler(this.rotation));
        }
        if (this.scale) {
          this.inst.scale.copy(parseVector3(this.scale));
        }
        Object.assign(inst, {
          castShadow: this.castShadow,
          receiveShadow: this.receiveShadow,
        });
        this.vglObject3d.update();
      },
      immediate: true,
    },
    position(position) {
      this.inst.position.copy(parseVector3(position));
      this.vglObject3d.update();
    },
    rotation(rotation) {
      this.inst.rotation.copy(parseEuler(rotation));
      this.vglObject3d.update();
    },
    scale(scale) {
      this.inst.scale.copy(parseVector3(scale));
      this.vglObject3d.update();
    },
    castShadow(castShadow) {
      Object.assign(this.inst, { castShadow });
      this.vglObject3d.update();
    },
    receiveShadow(receiveShadow) {
      Object.assign(this.inst, { receiveShadow });
      this.vglObject3d.update();
    },
  },
};
