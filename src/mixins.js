import VglMaterial from './materials/vgl-material';
import VglObject3d from './core/vgl-object3d';

export const VglObject3dWithMatarial = {
  mixins: [VglObject3d],
  methods: {
    setMaterial() {
      const { vglNamespace: { materials }, material, inst } = this;
      if (Array.isArray(material)) {
        inst.material = material.reduce(
          (acc, current) => (materials[current] ? [...acc, materials[current]] : acc), [],
        );
      } else if (materials[material]) inst.material = materials[material];
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
