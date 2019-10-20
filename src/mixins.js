import VglMaterial from './materials/vgl-material';
import VglObject3d from './core/vgl-object3d';

export const VglObject3dWithMatarial = {
  mixins: [VglObject3d],
  methods: {
    setMaterial(material) {
      const { vglNamespace: { materials }, inst } = this;
      if (Array.isArray(this.material)) {
        inst.material = this.material.reduce(
          (acc, current) => (materials.get(current) ? [...acc, materials.get(current)] : acc), [],
        );
      } else if (material) inst.material = material;
    },
  },
  watch: {
    inst() {
      if (this.material !== undefined) {
        this.setMaterial(this.vglNamespace.materials.get(this.material));
      }
    },
    material: {
      handler(material, oldMaterial) {
        const { vglNamespace: { materials }, setMaterial } = this;
        if (oldMaterial !== undefined) {
          if (Array.isArray(oldMaterial)) {
            oldMaterial.forEach((oldName) => materials.unlisten(oldName, setMaterial));
          } else {
            materials.unlisten(oldMaterial, setMaterial);
          }
        }
        if (material !== undefined) {
          if (Array.isArray(material)) {
            material.forEach((name) => materials.listen(name, setMaterial));
            setMaterial();
          } else {
            materials.listen(material, setMaterial);
            setMaterial(materials.get(material));
          }
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    const { vglNamespace: { materials }, material, setMaterial } = this;
    if (Array.isArray(material)) {
      material.forEach((name) => materials.unlisten(name, setMaterial));
    } else {
      materials.unlisten(material, setMaterial);
    }
  },
};

export const VglObject3dWithMatarialAndGeometry = {
  mixins: [VglObject3dWithMatarial],
  methods: {
    setGeometry(geometry) { if (geometry) this.inst.geometry = geometry; },
  },
  watch: {
    inst() {
      if (this.geometry !== undefined) {
        this.setGeometry(this.vglNamespace.geometries.get(this.geometry));
      }
    },
    geometry: {
      handler(geometry, oldGeometry) {
        const { vglNamespace: { geometries }, setGeometry } = this;
        if (oldGeometry !== undefined) geometries.unlisten(oldGeometry, setGeometry);
        if (geometry !== undefined) {
          geometries.listen(geometry, setGeometry);
          setGeometry(geometries.get(geometry));
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() { this.vglNamespace.geometries.unlisten(this.geometry, this.setGeometry); },
};

export const VglMaterialWithMap = {
  mixins: [VglMaterial],
  methods: {
    setMap() {
      const { vglNamespace: { textures }, inst, map } = this;
      if (map in textures.keys()) inst.map = textures.get(map);
    },
  },
  watch: {
    inst() {
      if (this.map !== undefined) this.setMap(this.vglNamespace.textures.get(this.map));
    },
    map: {
      handler(map, oldMap) {
        const { vglNamespace: { textures }, setMap } = this;
        if (oldMap !== undefined) textures.unlisten(oldMap, setMap);
        if (map !== undefined) {
          textures.listen(map, setMap);
          setMap(textures.get(map));
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() { this.vglNamespace.textures.unlisten(this.map, this.setMap); },
};
