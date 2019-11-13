import { BoxHelper } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { string } from '../validators';

/**
 * A helper component to show the world-axis-aligned bounding box around its parent,
 * corresponding [THREE.BoxHelper](https://threejs.org/docs/index.html#api/helpers/BoxHelper).
 *
 * Properties of [VglObject3d](../core/vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /** Size of the lines representing the axes. */
    color: { type: string, default: '#ff0' },
    /** Name of the object to show the world-axis-aligned boundingbox. */
    object: string,
  },
  computed: {
    inst() { return new BoxHelper(undefined, this.color); },
  },
  methods: {
    setFromObject(obj) { this.inst.setFromObject(obj); },
  },
  watch: {
    inst() {
      if (this.object !== undefined) {
        this.setFromObject(this.vglNamespace.object3ds.get(this.object));
      }
    },
    object: {
      handler(name, oldName) {
        const { vglNamespace: { object3ds }, setFromObject } = this;
        if (oldName !== undefined) object3ds.unlisten(oldName, setFromObject);
        if (name !== undefined) {
          object3ds.listen(name, setFromObject);
          setFromObject(this.vglNamespace.object3ds.get(name));
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    if (this.object !== undefined) {
      this.vglNamespace.object3ds.unlisten(this.object, this.setFromObject);
    }
  },
};
