import VglObject3d from './vgl-object3d.js';
import { parseVector3, parseSpherical } from './parsers.js';
import { vector3, spherical } from './validators.js';
import { Camera, Vector3 } from './three.js';

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
