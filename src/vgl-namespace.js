export default {
  inject: {
    vglCameras: {
      default() {
        const vm = this;
        return {
          get forGet() { return vm.cameras; },
          get forSet() { return this.forGet; },
        };
      },
    },
    vglScenes: {
      default() {
        const vm = this;
        return {
          get forGet() { return vm.scenes; },
          get forSet() { return this.forGet; },
        };
      },
    },
    vglGeometries: { default: null },
    vglMaterials: { default: null },
    vglTextures: { default: null },
    vglFonts: { default: null },
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
      fonts: Object.create(Object.assign(
        Object.create(null),
        this.vglFonts ? Object.getPrototypeOf(this.vglFonts.forGet) : {},
        this.vglFonts ? this.vglFonts.forGet : {},
      )),
    };
    if (!this.vglCameras.forGet) {
      data.cameras = Object.create(null);
      data.scenes = Object.create(null);
    }
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
    'vglFonts.forGet': function watcher(fonts) {
      this.fonts = Object.assign(
        Object.create(Object.assign(
          Object.create(null),
          Object.getPrototypeOf(fonts),
          fonts,
        )),
        this.fonts,
      );
    },
  },
  provide() {
    const vm = this;
    const provide = {
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
      vglFonts: {
        get forGet() { return vm.fonts; },
        get forSet() { return this.forGet; },
      },
    };
    if (this.cameras) {
      provide.vglCameras = this.vglCameras;
      provide.vglScenes = this.vglScenes;
    }
    return provide;
  },
  render(h) {
    if (this.$slots.default) return h('div', this.$slots.default);
    return undefined;
  },
};
