import VglMaterial from './materials/vgl-material';
import VglObject3d from './core/vgl-object3d';

export const VglObject3dWithMatarial = {
  mixins: [VglObject3d],
  methods: {
    setMaterial() {
      const { vglNamespace: { materials }, material, inst } = this;
      if (Array.isArray(material)) {
        inst.material = material.reduce(
          (acc, current) => (materials.get(current) ? [...acc, materials.get(current)] : acc), [],
        );
      } else if (materials.get(material)) inst.material = materials.get(material);
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
      if (geometries.get(geometry)) inst.geometry = geometries.get(geometry);
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
      if (map in textures.keys()) inst.map = textures.get(map);
    },
  },
  created() { this.vglNamespace.beforeRender.unshift(this.setMap); },
  beforeDestroy() {
    const { vglNamespace: { beforeRender }, setMap } = this;
    beforeRender.splice(beforeRender.indexOf(setMap), 1);
  },
};
