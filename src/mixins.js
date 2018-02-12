import VglGeometry from './vgl-geometry.js';
import VglObject3d from './vgl-object3d.js';
import { string, number } from './validators.js';
import { geometries, materials } from './object-stores.js';

export const VglObject3dWithMatarial = {
  mixins: [VglObject3d],
  props: {
    material: string,
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
    ud() { if (this.vglUpdate) this.vglUpdate(); },
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
    geometry: string,
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
    radius: { type: number, default: 1 },
    detail: { type: number, default: 0 },
  },
};
