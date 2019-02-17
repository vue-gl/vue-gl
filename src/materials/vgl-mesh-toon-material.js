import VglMeshPhongMaterial from './vgl-mesh-phong-material';
import { MeshToonMaterial } from '../three';

/**
 * An extension of the mesh phong material with toon shading,
 * corresponding [THREE.MeshToonMaterial](https://threejs.org/docs/index.html#api/materials/MeshToonMaterial).
 *
 * Properties of [VglMeshPhongMaterial](vgl-mesh-phong-material) are also available as mixin.
 */

export default {
  mixins: [VglMeshPhongMaterial],
  computed: {
    inst: () => new MeshToonMaterial(),
  },
};
