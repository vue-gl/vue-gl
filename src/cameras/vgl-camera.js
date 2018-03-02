import VglObject3d from '../core/vgl-object3d.js';
import { parseVector3, parseSpherical } from '../parsers.js';
import { vector3, spherical } from '../validators.js';
import { Camera, Vector3 } from '../three.js';

/**
 * This is abstract base component for cameras,
 * corresponding [THREE.Camera](https://threejs.org/docs/index.html#api/cameras/Camera).
 * This component should always be mixined (inherited).
 * You probably want a [VglPerspectiveCamera](vgl-perspective-camera)
 * and [VglOrthographicCamera](vgl-orthographic-camera).
 *
 * Properties of [VglObject3d](vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /**
     * Position in 3D space for the camera to point towards.
     * This property overwrite rotation property when both defined.
     */
    orbitTarget: vector3,
    /**
     * Spherical position around orbitTarget.
     * This property overwrite position and rotation properties.
     * If orbitTarget is not defined, automatically set to (0, 0, 0).
     */
    orbitPosition: spherical,
  },
  computed: {
    inst: () => new Camera(),
  },
  watch: {
    inst: {
      handler(inst) {
        this.vglNamespace.cameras[this.name] = inst;
        if (this.orbitPosition || this.orbitTarget) {
          let target;
          if (this.orbitTarget) target = parseVector3(this.orbitTarget);
          if (this.orbitPosition) {
            inst.position.setFromSpherical(parseSpherical(this.orbitPosition));
            if (target) inst.position.add(target);
          }
          inst.lookAt(target || new Vector3());
        }
      },
      immediate: true,
    },
    name(name, oldName) {
      const { vglNamespace: { cameras }, inst } = this;
      if (cameras[oldName] === inst) delete cameras[oldName];
      cameras[name] = inst;
    },
    orbitTarget(orbitTarget) {
      const target = parseVector3(orbitTarget);
      if (this.orbitPosition) {
        this.inst.position.setFromSpherical(parseSpherical(this.orbitPosition)).add(target);
      }
      this.inst.lookAt(target);
    },
    orbitPosition(orbitPosition) {
      this.inst.position.setFromSpherical(parseSpherical(orbitPosition));
      if (this.orbitTarget) {
        const target = parseVector3(this.orbitTarget);
        this.inst.position.add(target);
        this.inst.lookAt(target);
      } else {
        this.inst.lookAt(new Vector3());
      }
    },
  },
  beforeDestroy() {
    const { vglNamespace: { cameras }, inst } = this;
    if (cameras[this.name] === inst) delete cameras[this.name];
  },
};
