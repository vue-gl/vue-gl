import VglObject3d from './vgl-object3d.js';
import { parseVector3, parseSpherical } from './parsers.js';
import { Camera, Vector3 } from './three.js';
import { vector3, spherical } from './constructor-arrays.js';

export default {
  mixins: [VglObject3d],
  inject: ['vglNamespace'],
  computed: {
    inst: () => new Camera(),
  },
  props: {
    orbitTarget: vector3,
    orbitPosition: spherical,
  },
  created() {
    this.vglObject3d.listeners.push(this.dispatchUpdate);
  },
  beforeDestroy() {
    this.vglObject3d.listeners.splice(this.vglObject3d.listeners.indexOf(this.dispatchUpdate), 1);
    if (this.vglNamespace.cameras[this.name] === this.inst) {
      this.$delete(this.vglNamespace.cameras, this.name);
    }
  },
  methods: {
    dispatchUpdate() {
      this.inst.dispatchEvent({ type: 'update' });
    },
    setOrbit() {
      if (this.orbitPosition || this.orbitTarget) {
        const target = this.orbitTarget && parseVector3(this.orbitTarget);
        if (this.orbitPosition) {
          const position = this.inst.position.setFromSpherical(parseSpherical(this.orbitPosition));
          if (target) {
            position.add(target);
          }
        }
        this.inst.lookAt(target || new Vector3());
      }
    },
  },
  watch: {
    inst: {
      handler(inst) {
        this.$set(this.vglNamespace.cameras, this.name, inst);
        this.setOrbit();
      },
      immediate: true,
    },
    name(name, oldName) {
      if (this.vglNamespace.cameras[oldName] === this.inst) {
        this.$delete(this.vglNamespace.cameras, oldName);
      }
      this.$set(this.vglNamespace.cameras, name, this.inst);
    },
    orbitTarget() {
      this.setOrbit();
      this.vglObject3d.update();
    },
    orbitPosition() {
      this.setOrbit();
      this.vglObject3d.update();
    },
  },
};
