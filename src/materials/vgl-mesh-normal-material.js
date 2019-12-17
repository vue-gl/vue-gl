import { MeshNormalMaterial } from 'three';
import VglMaterial from './vgl-material';
import { boolean } from '../types';

/**
 * A material that maps the normal vectors to RGB colors,
 * corresponding [THREE.MeshNormalMaterial](https://threejs.org/docs/index.html#api/materials/MeshNormalMaterial).
 *
 * Properties of [VglMaterial](vgl-material) are also available as mixin.
 */

export default {
  mixins: [VglMaterial],
  props: {
    /** Whether the material is affected by fog. */
    fog: boolean,
  },
  computed: {
    /** The THREE.MeshNormalMaterial instance. */
    inst: () => new MeshNormalMaterial(),
  },
  watch: {
    inst: {
      handler(inst) { Object.assign(inst, { fog: this.fog }); },
      immediate: true,
    },
    fog(fog) {
      this.inst.fog = fog;
      this.update();
    },
  },
};
