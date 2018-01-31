import VglGeometry from './vgl-geometry.js';
import { number, string } from './constructor-arrays.js';

export const VglMinimumRenderer = {
  render(h) {
    const { default: slot } = this.$slots;
    return slot ? h('div', slot) : undefined;
  },
};

export const VglHedronGeometry = {
  mixins: [VglGeometry],
  props: {
    radius: { type: number, default: 1 },
    detail: { type: number, default: 0 },
  },
};

export const VglMaterialListener = {
  inject: ['vglNamespace'],
  props: { material: string },
  computed: {
    materialObject() { return this.vglNamespace.materials[this.material]; },
  },
  watch: {
    inst: {
      handler(inst, oldInst) {
        if (this.materialObject) {
          if (!oldInst) {
            this.materialObject.addEventListener('update', this.vglObject3d.update);
          }
          Object.assign(inst, { material: this.materialObject });
        }
      },
      immediate: true,
    },
    materialObject(material, oldMaterial) {
      if (material !== oldMaterial) {
        if (oldMaterial) {
          oldMaterial.removeEventListener('update', this.vglObject3d.update);
        }
        if (material) {
          material.addEventListener('update', this.vglObject3d.update);
          Object.assign(this.inst, { material });
        }
        this.vglObject3d.update();
      }
    },
  },
  beforeDestroy() {
    if (this.materialObject) {
      this.materialObject.removeEventListener('update', this.vglObject3d.update);
    }
  },
};

export const VglGeometryListener = {
  inject: ['vglNamespace'],
  props: { geometry: string },
  computed: {
    geometryObject() { return this.vglNamespace.geometries[this.geometry]; },
  },
  watch: {
    inst: {
      handler(inst, oldInst) {
        if (this.geometryObject) {
          if (!oldInst) {
            this.geometryObject.addEventListener('update', this.vglObject3d.update);
          }
          Object.assign(inst, { geometry: this.geometryObject });
        }
      },
      immediate: true,
    },
    geometryObject(geometry, oldGeometry) {
      if (geometry !== oldGeometry) {
        if (oldGeometry) {
          oldGeometry.removeEventListener('update', this.vglObject3d.update);
        }
        if (geometry) {
          geometry.addEventListener('update', this.vglObject3d.update);
          Object.assign(this.inst, { geometry });
        }
        this.vglObject3d.update();
      }
    },
  },
  beforeDestroy() {
    if (this.geometryObject) {
      this.geometryObject.removeEventListener('update', this.vglObject3d.update);
    }
  },
};

export const VglMapListener = {
  inject: ['vglNamespace'],
  props: { map: string },
  computed: {
    texture() { return this.vglNamespace.textures[this.map]; },
  },
  watch: {
    inst: {
      handler(inst, oldInst) {
        if (this.texture) {
          if (oldInst) {
            this.texture.removeEventListener('update', oldInst.update);
          }
          this.texture.addEventListener('update', inst.update);
        }
        Object.assign(inst, { map: this.texture || null });
      },
      immediate: true,
    },
    texture(texture, oldTexture) {
      if (oldTexture) {
        oldTexture.removeEventListener('update', this.inst.update);
      }
      if (texture) {
        texture.addEventListener('update', this.inst.update);
      }
      Object.assign(this.inst, { map: texture || null });
      this.inst.update();
    },
  },
};
