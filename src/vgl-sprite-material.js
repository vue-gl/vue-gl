import VglMaterial from './vgl-material.js';
import { SpriteMaterial } from './three.js';
import { string } from './validators.js';

export default {
  mixins: [VglMaterial],
  props: {
    color: { type: string, default: '#fff' },
    map: string,
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
      this.inst.dispatchEvent({ type: 'update' });
    },
    mapObject(map, oldMap) {
      this.inst.map = map;
      if (!oldMap) this.inst.needsUpdate = true;
      this.inst.dispatchEvent({ type: 'update' });
    },
  },
};
