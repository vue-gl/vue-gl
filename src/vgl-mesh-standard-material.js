import VglMaterial from './vgl-material.js';
import { MeshStandardMaterial } from './three.js';
import { validatePropString, dispatchUpdate } from './utils.js';
import { textures } from './object-stores.js';

export default {
  mixins: [VglMaterial],
  inject: ['vglTextures'],
  props: {
    color: { type: validatePropString, default: '#fff' },
    map: validatePropString,
  },
  computed: {
    inst: () => new MeshStandardMaterial(),
    mapObject() { return textures[this.vglTextures.forGet[this.map]] || null; },
  },
  watch: {
    inst: {
      handler(inst) {
        inst.color.setStyle(this.color);
        Object.assign(inst, { map: this.mapObject });
      },
      immediate: true,
    },
    color(color) {
      this.inst.color.setStyle(color);
      dispatchUpdate(this);
    },
    mapObject(map, oldMap) {
      this.inst.map = map;
      if (!oldMap) this.inst.needsUpdate = true;
      dispatchUpdate(this);
    },
  },
};
