import VglObject3d from '../core/vgl-object3d.js';
import { DirectionalLightHelper } from '../three.js';
import { string, number } from '../validators.js';

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
  data() { return { needsUpdate: false, needsRecreate: true }; },
  watch: {
    color() { this.needsUpdate = true },
    size() { this.needsRecreate = true; },
    light() { this.needsRecreate = true; },
  },
  beforeUpdate() { this.vglNamespace.update(); },
  methods: {
    setHelper() {
      if (this.needsRecreate) {
        if (this.inst.children.length) this.inst.remove(this.inst.children[0]);
        this.inst.add(new DirectionalLightHelper(
          this.vglNamespace.object3ds[this.light],
          parseFloat(this.size),
          this.color,
        ));
        this.needsRecreate = false;
        this.needsUpdate = false;
      } else if (this.needsUpdate) {
        this.inst.children[0].color = this.color;
        this.inst.children[0].update();
        this.needsUpdate = false;
      }
    },
  },
  created() { this.vglNamespace.beforeRender.push(this.setHelper); },
  beforeDestroy() {
    const { vglNamespace: { beforeRender }, setHelper } = this;
    beforeRender.splice(beforeRender.indexOf(setHelper), 1);
  },
};
