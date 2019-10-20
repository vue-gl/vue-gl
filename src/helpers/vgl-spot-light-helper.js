import { SpotLightHelper } from 'three';
import VglObject3d from '../core/vgl-object3d';
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
      const { vglNamespace: { object3ds }, inst } = this;
      if (inst.children.length) {
        const [helper] = inst.children;
        if (helper.light === object3ds.get(this.light)) {
          helper.color = this.color;
          helper.update();
        } else {
          inst.remove(helper);
          helper.dispose();
          inst.add(new SpotLightHelper(object3ds.get(this.light), this.color));
        }
      } else {
        inst.add(new SpotLightHelper(object3ds.get(this.light), this.color));
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
