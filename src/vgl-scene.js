import VglObject3d from './vgl-object3d.js';
import { Scene } from './three.js';

export default {
  mixins: [VglObject3d],
  inject: ['vglNamespace'],
  computed: {
    inst: () => new Scene(),
  },
  created() {
    this.vglObject3d.listeners.push(this.dispatchUpdate);
  },
  beforeDestroy() {
    this.vglObject3d.listeners.splice(this.vglObject3d.listeners.indexOf(this.dispatchUpdate), 1);
    if (this.vglNamespace.scenes[this.name] === this.inst) {
      this.$delete(this.vglNamespace.scenes, this.name);
    }
  },
  methods: {
    dispatchUpdate() {
      this.inst.dispatchEvent({ type: 'update' });
    },
  },
  watch: {
    inst: {
      handler(inst) {
        this.$set(this.vglNamespace.scenes, this.name, inst);
      },
      immediate: true,
    },
    name(name, oldName) {
      if (this.vglNamespace.scenes[oldName] === this.inst) {
        this.$delete(this.vglNamespace.scenes, oldName);
      }
      this.$set(this.vglNamespace.scenes, name, this.inst);
    },
  },
};
