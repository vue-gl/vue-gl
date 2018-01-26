import VglCamera from './vgl-camera.js';
import { OrthographicCamera } from './three.js';
import { number } from './constructor-arrays.js';

export default {
  mixins: [VglCamera],
  props: {
    zoom: { type: number, default: 1 },
    near: { type: number, default: 0.1 },
    far: { type: number, default: 2000 },
  },
  computed: {
    inst: () => new OrthographicCamera(),
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          zoom: parseFloat(this.zoom),
          near: parseFloat(this.near),
          far: parseFloat(this.far),
        });
      },
      immediate: true,
    },
    zoom(zoom) {
      Object.assign(this.inst, { zoom: parseFloat(zoom) });
      this.vglObject3d.update();
    },
    near(near) {
      Object.assign(this.inst, { near: parseFloat(near) });
      this.vglObject3d.update();
    },
    far(far) {
      Object.assign(this.inst, { far: parseFloat(far) });
      this.vglObject3d.update();
    },
  },
};
