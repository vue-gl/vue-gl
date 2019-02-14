import VglObject3d from '../core/vgl-object3d';
import { SpotLightHelper } from '../three';
import { string } from '../validators';

/**
 * This component displays a cone shaped helper object for a SpotLight,
 * corresponding [THREE.SpotLightHelper](https://threejs.org/docs/index.html#api/helpers/SpotLightHelper).
 *
 * Properties of [VglObject3d](vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /** If this is not the set the helper will take the color of the light. */
    color: { type: string },
    /** Name of the spot light being visualized. */
    light: string,
  },
  methods: {
    setHelper() {
      if (this.inst.children.length) {
        const [helper] = this.inst.children;
        if (helper.light === this.vglNamespace.object3ds[this.light]) {
          helper.color = this.color;
          helper.update();
        } else {
          this.inst.remove(helper);
          helper.dispose();
          this.inst.add(new SpotLightHelper(this.vglNamespace.object3ds[this.light], this.color));
        }
      } else {
        this.inst.add(new SpotLightHelper(this.vglNamespace.object3ds[this.light], this.color));
      }
    },
  },
  created() { this.vglNamespace.beforeRender.push(this.setHelper); },
  beforeDestroy() {
    const { vglNamespace: { beforeRender }, setHelper, inst: { children } } = this;
    beforeRender.splice(beforeRender.indexOf(setHelper), 1);
    if (children.length) children[0].dispose();
  },
};
