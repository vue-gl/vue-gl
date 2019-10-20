import { BoxHelper } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { string } from '../validators';

/**
 * A helper component to show the world-axis-aligned bounding box around its parent,
 * corresponding [THREE.BoxHelper](https://threejs.org/docs/index.html#api/helpers/BoxHelper).
 *
 * Properties of [VglObject3d](vgl-object3d) are also available as mixin.
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
    setFromObject() { this.inst.setFromObject(this.vglNamespace.object3ds.get(this.object)); },
  },
  created() { this.vglNamespace.beforeRender.push(this.setFromObject); },
  beforeDestroy() {
    const { vglNamespace: { beforeRender }, setFromObject } = this;
    beforeRender.splice(beforeRender.indexOf(setFromObject), 1);
  },
};
