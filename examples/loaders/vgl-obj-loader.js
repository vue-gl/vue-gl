import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Object3D } from 'three';
import { VglObject3d } from '../../src/index';
import { string } from '../../src/types';

const loader = new OBJLoader();

export default {
  mixins: [VglObject3d],
  props: {
    src: string,
  },
  data: () => ({
    objUuid: null,
  }),
  computed: {
    inst() {
      return this.objUuid ? this.obj : new Object3D();
    },
  },
  watch: {
    src: {
      handler(src) {
        loader.load(src, (obj) => {
          this.obj = obj;
          this.objUuid = obj.uuid;
        });
      },
      immediate: true,
    },
  },
};
