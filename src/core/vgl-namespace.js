import Namespace from './namespace';

export default {
  computed: {
    vglNamespace() {
      return Object.create(this.vglNamespaceParent, {
        geometries: { value: this.vglNamespaceParent.geometries.fork() },
        materials: { value: this.vglNamespaceParent.materials.fork() },
        textures: { value: this.vglNamespaceParent.textures.fork() },
        object3ds: { value: this.vglNamespaceParent.object3ds.fork() },
      });
    },
  },
  inject: {
    vglNamespaceParent: {
      from: 'vglNamespace',
      default() {
        const renderers = [];
        const beforeRender = [];
        let updated;
        return {
          renderers,
          cameras: new Namespace(),
          scenes: new Namespace(),
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
          geometries: new Namespace(),
          materials: new Namespace(),
          textures: new Namespace(),
          object3ds: new Namespace(),
        };
      },
    },
  },
  provide() { return { vglNamespace: this.vglNamespace }; },
  beforeDestroy() {
    this.vglNamespace.geometries.destroy();
    this.vglNamespace.materials.destroy();
    this.vglNamespace.textures.destroy();
    this.vglNamespace.object3ds.destroy();
  },
  render(h) { return this.$slots.default ? h('div', this.$slots.default) : undefined; },
};
