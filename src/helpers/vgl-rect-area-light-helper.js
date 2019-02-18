import { RectAreaLightHelper } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { string } from '../validators';

/**
 * Creates a visual aid for a RectAreaLight, corresponding [THREE.RectAreaLightHelper](https://threejs.org/docs/#api/en/helpers/RectAreaLightHelper).
 *
 * Properties of [VglObject3d](vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /** If this is not the set the helper will take the color of the light. */
    color: { type: string },
    /** Name of the RectAreaLight being visualized. */
    light: { type: string, required: true },
  },
  methods: {
    setHelper() {
      const light = this.vglNamespace.object3ds[this.light];
      if (this.inst.children.length) {
        const [helper] = this.inst.children;
        if (helper.light === light) {
          helper.color = this.color;
          helper.update();
          return;
        }
        this.inst.remove(helper);
      }
      this.inst.add(new RectAreaLightHelper(
        light,
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
