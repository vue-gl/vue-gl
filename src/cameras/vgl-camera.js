import { Camera, Vector3 } from 'three';
import VglObject3d from '../core/vgl-object3d';
import { parseVector3, parseSpherical } from '../parsers';
import { vector3, spherical, name } from '../types';
import { validateVector3, validateSpherical, validateName } from '../validators';

/**
 * This is abstract base component for cameras,
 * corresponding [THREE.Camera](https://threejs.org/docs/index.html#api/cameras/Camera).
 * This component should always be mixined (inherited).
 * You probably want a [VglPerspectiveCamera](vgl-perspective-camera)
 * and [VglOrthographicCamera](vgl-orthographic-camera).
 *
 * Properties of [VglObject3d](../core/vgl-object3d) are also available as mixin.
 */

export default {
  mixins: [VglObject3d],
  props: {
    /**
     * Position in 3D space for the camera to point towards.
     * This property overwrite rotation property when both defined.
     */
    orbitTarget: { type: vector3, validator: validateVector3 },
    /**
     * Spherical position around orbitTarget.
     * This property overwrite position and rotation properties.
     * If orbitTarget is not defined, automatically set to (0, 0, 0).
     */
    orbitPosition: { type: spherical, validator: validateSpherical },
    /** Name of the camera */
    name: { type: name, required: true, validator: validateName },
  },
  computed: {
    /** The THREE.Camera instance. */
    inst: () => new Camera(),
  },
  methods: {
    /** Emit an event in the `cameras` namespace. */
    emitAsCamera() { this.vglNamespace.cameras.emit(this.name, this.inst); },
  },
  created() {
    this.vglObject3d.listen(this.emitAsCamera);
  },
  beforeDestroy() {
    this.vglObject3d.unlisten(this.emitAsCamera);
    this.vglNamespace.cameras.delete(this.name, this.inst);
  },
  watch: {
    inst: {
      handler(inst) {
        if (this.orbitPosition || this.orbitTarget) {
          let target;
          if (this.orbitTarget) target = parseVector3(this.orbitTarget);
          if (this.orbitPosition) {
            inst.position.setFromSpherical(parseSpherical(this.orbitPosition));
            if (target) inst.position.add(target);
          }
          inst.lookAt(target || new Vector3());
        }
        this.vglNamespace.cameras.set(this.name, inst);
      },
      immediate: true,
    },
    name(newName, oldName) {
      this.vglNamespace.cameras.delete(oldName, this.inst);
      this.vglNamespace.cameras.set(newName, this.inst);
    },
    orbitTarget(orbitTarget) {
      const target = parseVector3(orbitTarget);
      if (this.orbitPosition) {
        this.inst.position.setFromSpherical(parseSpherical(this.orbitPosition)).add(target);
      }
      this.inst.lookAt(target);
      this.vglObject3d.emit();
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
      this.vglObject3d.emit();
    },
  },
};
