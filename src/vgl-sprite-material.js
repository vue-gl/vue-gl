import VglMaterial from './vgl-material.js';
import { SpriteMaterial } from './three.js';
import { validatePropString, dispatchUpdate } from './utils.js';

export default {
  mixins: [VglMaterial],
  props: {
    color: { type: validatePropString, default: '#fff' },
    map: validatePropString,
  },
  inject: ['vglTextures'],
  computed: {
    inst: () => new SpriteMaterial(),
    mapObject() { return this.vglTextures.forGet[this.map] || null; },
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
