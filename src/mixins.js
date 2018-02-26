import VglGeometry from './vgl-geometry.js';
import VglMaterial from './vgl-material.js';
import VglObject3d from './vgl-object3d.js';
import { string, number } from './validators.js';

export const VglObject3dWithMatarial = {
  mixins: [VglObject3d],
  props: { material: string },
  methods: {
    setMaterial() {
      const { vglNamespace: { materials }, material, inst } = this;
      if (materials[material]) inst.material = materials[material];
    },
  },
  created() { this.vglNamespace.beforeRender.unshift(this.setMaterial); },
  beforeDestroy() {
    const { vglNamespace: { beforeRender }, setMaterial } = this;
    beforeRender.splice(beforeRender.indexOf(setMaterial), 1);
  },
};

export const VglObject3dWithMatarialAndGeometry = {
  mixins: [VglObject3dWithMatarial],
  props: { geometry: string },
  methods: {
    setGeometry() {
      const { vglNamespace: { geometries }, geometry, inst } = this;
      if (geometries[geometry]) inst.geometry = geometries[geometry];
    },
  },
  created() { this.vglNamespace.beforeRender.unshift(this.setGeometry); },
  beforeDestroy() {
    const { vglNamespace: { beforeRender }, setGeometry } = this;
    beforeRender.splice(beforeRender.indexOf(setGeometry), 1);
  },
};

export const VglMaterialWithMap = {
  mixins: [VglMaterial],
  props: { map: string },
  methods: {
    setMap() {
      const { vglNamespace: { textures }, inst, map } = this;
      if (map in textures) inst.map = textures[map];
    },
  },
  created() { this.vglNamespace.beforeRender.unshift(this.setMap); },
  beforeDestroy() {
    const { vglNamespace: { beforeRender }, setMap } = this;
    beforeRender.splice(beforeRender.indexOf(setMap), 1);
  },
};

export const VglHedronGeometry = {
  mixins: [VglGeometry],
  props: {
    radius: { type: number, default: 1 },
    detail: { type: number, default: 0 },
  },
};
