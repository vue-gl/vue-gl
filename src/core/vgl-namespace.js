class Namespace {
  constructor(parent) {
    this.parent = parent;
    this.children = [];
    this.hash = Object.create(null);
    this.listeners = Object.create(null);
    if (parent) parent.children.push(this);
  }

  listen(key, fn) {
    if (key in this.listeners) {
      if (this.listeners[key].includes(fn)) return;
      this.listeners[key].push(fn);
    } else {
      this.listeners[key] = [fn];
    }
  }

  get(key) {
    if (key in this.hash) return this.hash[key];
    return this.parent && this.parent.get(key);
  }

  set(key, inst) {
    if (this.hash[key] === inst) return;
    this.hash[key] = inst;
    this.emit(key, inst);
  }

  keys() {
    const keys = Object.keys(this.hash);
    if (!this.parent) return keys;
    const parentKeys = this.parent.keys().filter((key) => !(key in this.hash));
    return [...parentKeys, ...keys];
  }

  delete(key, inst) {
    if (this.hash[key] !== inst) return;
    delete this.hash[key];
    this.emit(key, undefined);
  }

  emit(key, inst) {
    if (key in this.listeners) this.listeners[key].forEach((fn) => fn(inst));
    this.children.forEach((child) => { if (!(key in child.hash)) child.emit(key, inst); });
  }

  destroy() {
    if (this.parent) {
      const { children } = this.parent;
      children.splice(children.indexOf(this), 1);
    }
  }

  fork() { return new Namespace(this); }
}

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
