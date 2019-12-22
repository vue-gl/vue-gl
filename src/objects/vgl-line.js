import { Line } from 'three';
import { VglObject3dWithMatarialAndGeometry } from '../mixins';
import { name } from '../types';
import { validateName } from '../validators';

/**
 * A continuous line component,
 * corresponding [THREE.Line](https://threejs.org/docs/index.html#api/objects/Line).
 *
 * Properties of [VglObject3d](../core/vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3dWithMatarialAndGeometry],
  props: {
    /** Name of the geometry, representing the line segment(s). */
    geometry: { type: name, validator: validateName },
    /** Name of the material for the line. */
    material: { type: name, validator: validateName },
  },
  computed: {
    /** The THREE.Line instance. */
    inst: () => new Line(),
  },
  methods: {
    computeLineDistances() {
      if (this.inst.material.isLineDashedMaterial) this.inst.computeLineDistances();
    },
  },
  beforeDestroy() {
    if (this.geometry !== undefined) {
      this.vglNamespace.geometries.unlisten(this.geometry, this.computeLineDistances);
    }
    if (this.material !== undefined) {
      this.vglNamespace.materials.unlisten(this.material, this.computeLineDistances);
    }
  },
  watch: {
    geometry: {
      handler(geometry, oldGeometry) {
        if (oldGeometry !== undefined) {
          this.vglNamespace.geometries.unlisten(oldGeometry, this.computeLineDistances);
        }
        if (geometry !== undefined) {
          this.vglNamespace.geometries.listen(geometry, this.computeLineDistances);
          this.computeLineDistances();
        }
      },
      immediate: true,
    },
    material: {
      handler(material, oldMaterial) {
        if (oldMaterial !== undefined) {
          this.vglNamespace.materials.unlisten(oldMaterial, this.computeLineDistances);
        }
        if (material !== undefined) {
          this.vglNamespace.materials.listen(material, this.computeLineDistances);
          this.computeLineDistances();
        }
      },
      immediate: true,
    },
  },
};
