import { TextureLoader } from './three.js';
import { string } from './validators.js';

export default {
  inject: ['vglNamespace'],
  props: {
    src: string,
    name: string,
  },
  computed: {
    inst() { return new TextureLoader().load(this.src, () => { this.vglNamespace.update(); }); },
  },
  watch: {
    inst: {
      handler(inst) { this.vglNamespace.textures[this.name] = inst; },
      immediate: true,
    },
    name(name, oldName) {
      const { vglNamespace: { textures }, inst } = this;
      if (textures[oldName] === inst) delete textures[oldName];
      textures[name] = inst;
    },
  },
  beforeDestroy() {
    const  { vglNamespace: { textures }, inst, name } = this;
    if (textures[name] === inst) delete textures[name];
  },
  render(h) {
    return this.$slots.default ? h('div', this.$slots.default) : undefined;
  },
};
