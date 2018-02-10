import VglObject3d from './vgl-object3d.js';
import { validatePropString } from './utils.js';
import { Scene } from './three.js';

export default {
  mixins: [VglObject3d],
  inject: ['vglScenes'],
  provide() {
    if (!this.vglUpdate) {
      return {
        vglUpdate() {
          this.inst.dispatchEvent({ type: 'update' });
        },
      };
    }
    return {};
  },
  props: {
    name: validatePropString,
  },
  computed: {
    inst: () => new Scene(),
  },
  watch: {
    inst: {
      handler(inst) {
        this.$set(this.vglScenes.forSet, this.name, inst);
      },
      immediate: true,
    },
    name(name, oldName) {
      if (this.vglScenes.forGet[oldName] === this.inst) this.$delete(this.vglScenes.forSet, oldName);
      this.$set(this.vglScenes.forSet, name, this.inst);
    },
  },
  beforeDestroy() {
    if (this.vglScenes.forGet[this.name] === this.inst) this.$delete(this.vglScenes.forSet, this.name);
  },
};
