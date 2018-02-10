import VglObject3d from './vgl-object3d.js';
import { parseVector3, parseSpherical, update, validatePropVector3, validatePropSpherical } from './utils.js';
import { cameras } from './object-stores.js';
import { Camera, Vector3 } from './three.js';

function setPositionAndRotation(vm, orbitPosition, orbitTarget) {
  if (orbitPosition || orbitTarget) {
    const target = parseVector3(orbitTarget);
    if (orbitPosition) {
      const position = vm.inst.position.setFromSpherical(parseSpherical(orbitPosition));
      if (target) position.add(target);
    }
    vm.inst.lookAt(target || new Vector3());
    update(vm);
  }
}

export default {
  mixins: [VglObject3d],
  inject: ['vglCameras'],
  props: {
    orbitTarget: validatePropVector3,
    orbitPosition: validatePropSpherical,
  },
  computed: {
    inst: () => new Camera(),
  },
  watch: {
    inst: {
      handler(inst, oldInst) {
        if (oldInst) delete cameras[oldInst.uuid];
        cameras[inst.uuid] = inst;
        this.$set(this.vglCameras.forSet, this.name, inst.uuid);
        setPositionAndRotation(this, this.orbitPosition, this.orbitTarget);
      },
      immediate: true,
    },
    name(name, oldName) {
      if (this.vglCameras.forGet[oldName] === this.inst.uuid) this.$delete(this.vglCameras.forSet, oldName);
      this.$set(this.vglCameras.forSet, name, this.inst.uuid);
    },
    orbitTarget(target) {
      setPositionAndRotation(this, this.orbitPosition, target);
    },
    orbitPosition(position) {
      setPositionAndRotation(this, position, this.orbitTarget);
    },
  },
  beforeDestroy() {
    delete cameras[this.inst.uuid];
    if (this.vglCameras.forGet[this.name] === this.inst.uuid) this.$delete(this.vglCameras.forSet, this.name);
  },
};
