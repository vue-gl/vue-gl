import { DirectionalLightHelper } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { string, number } from '../validators';

/**
 * A helper component to assist with visualizing a DirectionalLight's effect on the scene,
 * corresponding [THREE.DirectionalLightHelper](https://threejs.org/docs/index.html#api/helpers/DirectionalLightHelper).
 *
 * Properties of [VglObject3d](vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /** If this is not the set the helper will take the color of the light. */
    color: { type: string },
    /** Dimensions of the plane. */
    size: { type: number, default: 1 },
    /** Name of the directional light being visualized. */
    light: string,
  },
  data() { return { s: undefined }; },
  methods: {
    setHelper() {
      const light = this.vglNamespace.object3ds[this.light];
      if (this.inst.children.length) {
        const [helper] = this.inst.children;
        if (helper.light === light && this.s === this.size) {
          helper.color = this.color;
          helper.update();
          return;
        }
        this.inst.remove(helper);
      }
      this.s = this.size;
      this.inst.add(new DirectionalLightHelper(
        light,
        parseFloat(this.size),
        this.color,
      ));
    },
  },
  created() { this.vglNamespace.beforeRender.push(this.setHelper); },
  beforeDestroy() {
    const { vglNamespace: { beforeRender }, setHelper } = this;
    beforeRender.splice(beforeRender.indexOf(setHelper), 1);
  },
};
