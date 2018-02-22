import VglGeometry from './vgl-geometry.js';
import VglMaterial from './vgl-material.js';
import VglObject3d from './vgl-object3d.js';
import { string, number } from './validators.js';

export const VglObject3dWithMatarial = {
  mixins: [VglObject3d],
  props: { material: string },
  methods: {
    setMaterial() { this.inst.material = this.vglNamespace.materials[this.material]; },
  },
  created() { this.vglNamespace.beforeRender.push(this.setMaterial); },
  beforeDestroy() {
    const { vglNamespace: { beforeRender }, setMaterial } = this;
    beforeRender.splice(beforeRender.indexOf(setMaterial), 1);
  },
};

export const VglObject3dWithMatarialAndGeometry = {
  mixins: [VglObject3dWithMatarial],
  props: { geometry: string },
  methods: {
    setGeometry() { this.inst.geometry = this.vglNamespace.geometries[this.geometry]; },
  },
  created() { this.vglNamespace.beforeRender.push(this.setGeometry); },
  beforeDestroy() {
    const { vglNamespace: { beforeRender }, setGeometry } = this;
    beforeRender.splice(beforeRender.indexOf(setGeometry), 1);
  }
};

export const VglMaterialWithMap = {
  mixins: [VglMaterial],
  props: { map: string },
  methods: {
    setMap() { this.inst.map = this.vglNamespace.textures[this.map]; },
  },
  created() { this.vglNamespace.beforeRender.push(this.setMap); },
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
