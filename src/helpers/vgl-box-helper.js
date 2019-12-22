import { BoxHelper } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { name, color } from '../types';
import { validateName } from '../validators';

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
    color: { type: color, default: '#ff0' },
    /** Name of the object to show the world-axis-aligned boundingbox. */
    object: { type: name, required: true, validator: validateName },
  },
  computed: {
    /** The THREE.BoxHelper instance. */
    inst() { return new BoxHelper(undefined, this.color); },
  },
  methods: {
    /** Set the geometry of the helper box from given object. */
    setFromObject(obj) { this.inst.setFromObject(obj); },
  },
  beforeDestroy() {
    if (this.object !== undefined) {
      this.vglNamespace.object3ds.unlisten(this.object, this.setFromObject);
    }
  },
  watch: {
    inst() {
      if (this.object !== undefined) {
        this.setFromObject(this.vglNamespace.object3ds.get(this.object));
      }
    },
    object: {
      handler(newName, oldName) {
        const { vglNamespace: { object3ds }, setFromObject } = this;
        if (oldName !== undefined) object3ds.unlisten(oldName, setFromObject);
        if (newName !== undefined) {
          object3ds.listen(newName, setFromObject);
          setFromObject(this.vglNamespace.object3ds.get(newName));
        }
      },
      immediate: true,
    },
  },
};
