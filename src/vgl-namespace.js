export default {
  inject: {
    vglNamespace: {
      default() {
        const renderers = [];
        let updated;
        return {
          renderers,
          cameras: Object.create(null),
          scenes: Object.create(null),
          update: () => {
            if (!updated) {
              this.$nextTick(() => {
                renderers.forEach((vm) => { vm.render(); });
                updated = false;
              });
              updated = true;
            }
          },
        };
      },
    },
    vglGeometries: { default: null },
    vglMaterials: { default: null },
    vglTextures: { default: null },
  },
  data() {
    const data = {
      geometries: Object.create(Object.assign(
        Object.create(null),
        this.vglGeometries ? Object.getPrototypeOf(this.vglGeometries.forGet) : {},
        this.vglGeometries ? this.vglGeometries.forGet : {},
      )),
      materials: Object.create(Object.assign(
        Object.create(null),
        this.vglMaterials ? Object.getPrototypeOf(this.vglMaterials.forGet) : {},
        this.vglMaterials ? this.vglMaterials.forGet : {},
      )),
      textures: Object.create(Object.assign(
        Object.create(null),
        this.vglTextures ? Object.getPrototypeOf(this.vglTextures.forGet) : {},
        this.vglTextures ? this.vglTextures.forGet : {},
      )),
    };
    return data;
  },
  watch: {
    'vglGeometries.forGet': function watcher(geometries) {
      this.geometries = Object.assign(
        Object.create(Object.assign(
          Object.create(null),
          Object.getPrototypeOf(geometries),
          geometries,
        )),
        this.geometries,
      );
    },
    'vglMaterials.forGet': function watcher(materials) {
      this.materials = Object.assign(
        Object.create(Object.assign(
          Object.create(null),
          Object.getPrototypeOf(materials),
          materials,
        )),
        this.materials,
      );
    },
    'vglTextures.forGet': function watcher(textures) {
      this.textures = Object.assign(
        Object.create(Object.assign(
          Object.create(null),
          Object.getPrototypeOf(textures),
          textures,
        )),
        this.textures,
      );
    },
  },
  provide() {
    const vm = this;
    const provide = {
      vglNamespace: Object.create(this.vglNamespace, {}),
      vglGeometries: {
        get forGet() { return vm.geometries; },
        get forSet() { return this.forGet; },
      },
      vglMaterials: {
        get forGet() { return vm.materials; },
        get forSet() { return this.forGet; },
      },
      vglTextures: {
        get forGet() { return vm.textures; },
        get forSet() { return this.forGet; },
      },
    };
    return provide;
  },
  render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined;
  },
};
