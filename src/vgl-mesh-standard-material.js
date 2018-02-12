import VglMaterial from './vgl-material.js';
import { MeshStandardMaterial } from './three.js';
import { string } from './validators.js';
import { textures } from './object-stores.js';

export default {
  mixins: [VglMaterial],
  inject: ['vglTextures'],
  props: {
    color: { type: string, default: '#fff' },
    map: string,
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
      this.inst.dispatchEvent({ type: 'update' });
    },
    mapObject(map, oldMap) {
      this.inst.map = map;
      if (!oldMap) this.inst.needsUpdate = true;
      this.inst.dispatchEvent({ type: 'update' });
    },
  },
};
