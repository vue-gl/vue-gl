import VglGeometry from './vgl-geometry.js';
import VglObject3d from './vgl-object3d.js';
import { validatePropString, validatePropNumber, update } from './utils.js';
import { geometries, materials } from './object-stores.js';

export const VglObject3dWithMatarial = {
  mixins: [VglObject3d],
  props: {
    material: validatePropString,
  },
  inject: ['vglMaterials'],
  computed: {
    materialObject() { return materials[this.vglMaterials.forGet[this.material]]; },
  },
  mounted() {
    if (this.materialObject) {
      this.inst.material = this.materialObject;
      this.materialObject.addEventListener('update', this.ud);
    }
  },
  methods: {
    ud() { update(this); },
  },
  watch: {
    materialObject(material, oldMaterial) {
      if (material !== oldMaterial) {
        this.inst.material = material;
        if (oldMaterial) oldMaterial.removeEventListener('update', this.ud);
        if (material) material.addEventListener('update', this.ud);
        this.ud();
      }
    },
  },
};

export const VglObject3dWithMatarialAndGeometry = {
  mixins: [VglObject3dWithMatarial],
  props: {
    geometry: validatePropString,
  },
  inject: ['vglGeometries'],
  computed: {
    geometryObject() { return geometries[this.vglGeometries.forGet[this.geometry]]; },
  },
  mounted() {
    if (this.geometryObject) {
      this.inst.geometry = this.geometryObject;
      this.geometryObject.addEventListener('update', this.ud);
    }
  },
  methods: {
    ud() { update(this); },
  },
  watch: {
    geometryObject(geometry, oldGeometry) {
      if (geometry !== oldGeometry) {
        this.inst.geometry = geometry;
        if (oldGeometry) oldGeometry.removeEventListener('update', this.ud);
        if (geometry) geometry.addEventListener('update', this.ud);
        this.ud();
      }
    },
  },
};

export const VglHedronGeometry = {
  mixins: [VglGeometry],
  props: {
    radius: { type: validatePropNumber, default: 1 },
    detail: { type: validatePropNumber, default: 0 },
  },
};
