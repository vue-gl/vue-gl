import VglCamera from './vgl-camera.js';
import { PerspectiveCamera } from './three.js';
import { number } from './validators.js';

export default {
  mixins: [VglCamera],
  props: {
    zoom: { type: number, default: 1 },
    near: { type: number, default: 0.1 },
    far: { type: number, default: 2000 },
    fov: { type: number, default: 50 },
  },
  computed: {
    inst: () => new PerspectiveCamera(),
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          zoom: parseFloat(this.zoom),
          near: parseFloat(this.near),
          far: parseFloat(this.far),
          fov: parseFloat(this.fov),
        });
      },
      immediate: true,
    },
    zoom(zoom) {
      this.inst.zoom = parseFloat(zoom);
      if (this.vglUpdate) this.vglUpdate();
    },
    near(near) {
      this.inst.near = parseFloat(near);
      if (this.vglUpdate) this.vglUpdate();
    },
    far(far) {
      this.inst.far = parseFloat(far);
      if (this.vglUpdate) this.vglUpdate();
    },
    fov(fov) {
      this.inst.fov = parseFloat(fov);
      if (this.vglUpdate) this.vglUpdate();
    },
  },
};
