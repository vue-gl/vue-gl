import VglObject3d from './vgl-object3d.js';
import { DirectionalLightHelper } from './three.js';
import { string, number } from './constructor-arrays.js';

export default {
  mixins: [VglObject3d],
  props: {
    color: string,
    size: { type: number, default: 1 },
  },
  computed: {
    inst() {
      return new DirectionalLightHelper(new THREE.DirectionalLight(), parseFloat(this.size));
    },
  },
  watch: {
    inst: {
      handler(inst) {
        this.vglObject3d.inst.updateMatrixWorld();
        Object.assign(inst, {
          color: this.color,
          light: this.vglObject3d.inst,
          matrix: this.vglObject3d.inst.matrixWorld,
        });
        this.inst.update();
      },
      immediate: true,
    },
    color(color) {
      Object.assign(this.inst, {
        color,
      });
      this.inst.update();
      this.vglObject3d.update();
    },
  },
};
