import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { VglObject3d } from 'vue-gl';

let loader;
export default {
  extends: VglObject3d,
  beforeCreate() { if (!loader) loader = new OBJLoader(); },
  data: () => ({ obj: null }),
  computed: {
    inst() { return this.obj ? this.obj : VglObject3d.computed.inst.call(this); },
  },
  props: {
    /** The path to the source OBJ file */
    src: { type: String, required: true },
  },
  watch: {
    src: {
      handler(src) {
        loader.load(src, (obj) => {
          this.obj = obj;
          this.change();
        });
      },
      immediate: true,
    },
  },
};
