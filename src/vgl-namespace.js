export default {
  inject: {
    vglNamespace: {
      default() {
        const renderers = [];
        const beforeRender = [];
        let updated;
        return {
          renderers,
          cameras: Object.create(null),
          scenes: Object.create(null),
          update: () => {
            if (!updated) {
              this.$nextTick(() => {
                beforeRender.forEach((hook) => { hook(); });
                renderers.forEach((vm) => { vm.render(); });
                updated = false;
              });
              updated = true;
            }
          },
          beforeRender,
          geometries: Object.create(null),
          materials: Object.create(null),
          textures: Object.create(null),
        };
      },
    },
    vglGeometries: { default: null },
    vglTextures: { default: null },
  },
  data() {
    const data = {
      textures: Object.create(Object.assign(
        Object.create(null),
        this.vglTextures ? Object.getPrototypeOf(this.vglTextures.forGet) : {},
        this.vglTextures ? this.vglTextures.forGet : {},
      )),
    };
    return data;
  },
  watch: {
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
      vglNamespace: Object.create(this.vglNamespace, {
        geometries: { value: Object.create(this.vglNamespace.geometries) },
        materials: { value: Object.create(this.vglNamespace.materials) },
        textures: { value: Object.create(this.vglNamespace.textures) },
      }),
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
