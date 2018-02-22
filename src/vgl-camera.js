import VglObject3d from './vgl-object3d.js';
import { parseVector3, parseSpherical } from './parsers.js';
import { vector3, spherical } from './validators.js';
import { Camera, Vector3 } from './three.js';

function setPositionAndRotation(vm, orbitPosition, orbitTarget) {
  if (orbitPosition || orbitTarget) {
    const target = orbitTarget ? parseVector3(orbitTarget) : orbitTarget;
    if (orbitPosition) {
      const position = vm.inst.position.setFromSpherical(parseSpherical(orbitPosition));
      if (target) position.add(target);
    }
    vm.inst.lookAt(target || new Vector3());
  }
}

export default {
  mixins: [VglObject3d],
  props: {
    orbitTarget: vector3,
    orbitPosition: spherical,
  },
  computed: {
    inst: () => new Camera(),
  },
  watch: {
    inst: {
      handler(inst) {
        setPositionAndRotation(this, this.orbitPosition, this.orbitTarget);
        this.vglNamespace.cameras[this.name] = inst;
      },
      immediate: true,
    },
    name(name, oldName) {
      const { vglNamespace: { cameras }, inst } = this;
      if (cameras[oldName] === inst) delete cameras[oldName];
      cameras[name] = inst;
    },
    orbitTarget(target) {
      setPositionAndRotation(this, this.orbitPosition, target);
    },
    orbitPosition(position) {
      setPositionAndRotation(this, position, this.orbitTarget);
    },
  },
  beforeDestroy() {
    const { vglNamespace: { cameras }, inst } = this;
    if (cameras[this.name] === inst) delete cameras[this.name];
  },
};
