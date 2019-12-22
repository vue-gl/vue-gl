import { SpotLightHelper, Object3D } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { color, name } from '../types';
import { validateName } from '../validators';

/**
 * This component displays a cone shaped helper object for a SpotLight,
 * corresponding [THREE.SpotLightHelper](https://threejs.org/docs/index.html#api/helpers/SpotLightHelper).
 *
 * Properties of [VglObject3d](../core/vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /** If this is not the set the helper will take the color of the light. */
    color,
    /** Name of the spot light being visualized. */
    light: { type: name, required: true, validator: validateName },
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
     * The THREE.SpotLightHelper instance. If any cameras specified by the name, it returns a
     * THREE.Object3D instance.
     */
    inst() {
      if (!this.lightUuid) return new Object3D();
      const light = this.vglNamespace.object3ds.get(this.light);
      return new SpotLightHelper(light);
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
      handler(newName, oldName) {
        if (oldName !== undefined) this.vglNamespace.object3ds.unlisten(oldName, this.setLightUuid);
        if (newName !== undefined) {
          this.vglNamespace.object3ds.listen(newName, this.setLightUuid);
          const light = this.vglNamespace.object3ds.get(this.light);
          this.setLightUuid(light);
        }
      },
      immediate: true,
    },
    color: {
      handler(newColor) {
        if (!this.lightUuid) return;
        this.inst.color = newColor;
        this.inst.update();
      },
      immediate: true,
    },
  },
};
