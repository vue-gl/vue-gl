import { RectAreaLightHelper, Object3D } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { string } from '../validators';

/**
 * Creates a visual aid for a RectAreaLight, corresponding [THREE.RectAreaLightHelper](https://threejs.org/docs/#api/en/helpers/RectAreaLightHelper).
 *
 * Properties of [VglObject3d](../core/vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /** If this is not the set the helper will take the color of the light. */
    color: { type: string },
    /** Name of the RectAreaLight being visualized. */
    light: { type: string },
  },
  data: () => ({
    /**
     * Light object's UUID. This would be null if light object is not specified by `light` prop. Do
     * not set this data manually.
     */
    lightUuid: null,
  }),
  computed: {
    /**
     * The THREE.RectAreaLightHelper instance. If any cameras specified by the name, it returns a
     * THREE.Object3D instance.
     */
    inst() {
      if (!this.lightUuid) return new Object3D();
      const light = this.vglNamespace.object3ds.get(this.light);
      return new RectAreaLightHelper(light);
    },
  },
  methods: {
    /** Set `lightUuid` data to given object's UUID. */
    setLightUuid(light) {
      this.lightUuid = light ? light.uuid : null;
      this.inst.update();
    },
  },
  beforeDestroy() {
    if (this.light !== undefined) {
      this.vglNamespace.object3ds.unlisten(this.light, this.setLightUuid);
    }
  },
  watch: {
    inst(inst) {
      if (this.lightUuid && this.color !== undefined) {
        Object.assign(inst, { color: this.color }).update();
      }
    },
    light: {
      handler(name, oldName) {
        if (oldName !== undefined) this.vglNamespace.object3ds.unlisten(oldName, this.setLightUuid);
        if (name !== undefined) {
          this.vglNamespace.object3ds.listen(name, this.setLightUuid);
          const light = this.vglNamespace.object3ds.get(this.light);
          this.setLightUuid(light);
        }
      },
      immediate: true,
    },
    color: {
      handler(color) {
        if (!this.lightUuid) return;
        this.inst.color = color;
        this.inst.update();
      },
      immediate: true,
    },
  },
};
