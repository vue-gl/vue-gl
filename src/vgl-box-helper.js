import VglObject3d from './vgl-object3d.js';
import { BoxHelper } from './three.js';
import { string } from './validators.js';

export default {
  mixins: [VglObject3d],
  props: {
    color: { type: string, default: '#ff0' },
  },
  computed: {
    inst() { return new BoxHelper(undefined, this.color); },
  },
  methods: {
    setFromObject() { this.inst.setFromObject(this.vglObject3d.inst); },
  },
  created() { this.vglNamespace.beforeRender.push(this.setFromObject); },
  beforeDestroy() {
    const { vglNamespace: { beforeRender }, setFromObject } = this;
    beforeRender.splice(beforeRender.indexOf(setFromObject), 1);
  },
};
