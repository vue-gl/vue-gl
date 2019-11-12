import Namespace from './namespace';

/**
 * This component provides maps for managing objects by name (string), and also provides utility
 * methods. `vglNamespace` object can be injected to descendant components for using it.
 * It has following namespaces:
 *
 * - `vglNamespace.cameras`
 * - `vglNamespace.scenes`
 * - `vglNamespace.geometries`
 * - `vglNamespace.materials`
 * - `vglNamespace.textures`
 * - `vglNamespace.object3ds`
 *
 * Each namespace internally has a map of strings and objects, and has methods to access them.
 * Each namespace has following methods:
 *
 * - `Namespace.prototype.get(key: string)`
 *   Get an instance corresponding passed `key`.
 * - `Namespace.prototype.set(key: string, inst: any)`
 *   Set an instance corresponding passed `key`.
 * - `Namespace.prototype.delete(key: string, inst: any)`
 *   Delete an instance corresponding passed `key`, only if the instance exactly equals passed
 *   `inst`.
 * - `Namespace.prototype.listen(key: string, callback: func)`
 *   Add a listener function that will be called when the instance corresponding passed key changes.
 * - `Namespace.prototype.unlisten(key: string, callback: func)`
 *   Remove a listener function registered to passed key.
 *
 * When `VglNamespace` components are nested, they create nested namespaces except for `cameras` and
 * `scenes`. Since a nested namespace search instances only in its ancestors, you can use same key
 * string in sibling namespaces.
 */

export default {
  computed: {
    vglNamespace() {
      const {
        vglNamespaceParent: {
          geometries,
          materials,
          textures,
          object3ds,
        },
      } = this;
      return Object.create(this.vglNamespaceParent, {
        geometries: { value: geometries ? geometries.fork() : new Namespace() },
        materials: { value: materials ? materials.fork() : new Namespace() },
        textures: { value: textures ? textures.fork() : new Namespace() },
        object3ds: { value: object3ds ? object3ds.fork() : new Namespace() },
      });
    },
  },
  inject: {
    vglNamespaceParent: {
      from: 'vglNamespace',
      default() {
        const beforeRender = [];
        return {
          cameras: new Namespace(),
          scenes: new Namespace(),
          beforeRender,
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
