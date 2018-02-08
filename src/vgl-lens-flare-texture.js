import { NormalBlending, Color } from './three.js';
import { validatePropString, validatePropNumber, update } from './utils.js';

function findParent(vm, key) {
  const { $parent } = vm;
  if ($parent) return $parent.$options[key] ? $parent : findParent($parent, key);
  return undefined;
}

function findLensFlareParent(vm) {
  return findParent(vm, 'isVglLensFlare');
}

export default {
  inject: ['vglTextures'],
  props: {
    texture: validatePropString,
    size: { type: validatePropNumber, default: -1 },
    distance: { type: validatePropNumber, default: 0 },
    blending: { type: validatePropNumber, default: NormalBlending },
    color: { type: validatePropString, default: '#fff' },
  },
  data() {
    return { inst: null };
  },
  computed: {
    opts() {
      return [
        this.vglTextures.forGet[this.texture],
        parseInt(this.size, 10),
        parseFloat(this.distance),
        parseInt(this.blending, 10),
        new Color(this.color),
      ];
    },
  },
  beforeDestroy() {
    const parent = findLensFlareParent(this);
    this.remove(parent);
    update(parent);
  },
  watch: {
    opts: {
      handler(opts) {
        const parent = findLensFlareParent(this);
        if (parent) {
          if (this.inst) {
            if (opts[0]) {
              this.replace(parent);
            } else {
              this.remove(parent);
              this.inst = null;
            }
            update(parent);
          } else if (opts[0]) {
            this.add(parent);
            update(parent);
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    add(parent) {
      parent.inst.add(...this.opts);
      [this.inst] = parent.inst.lensFlares.slice(-1);
    },
    remove(parent) {
      parent.inst.lensFlares.splice(parent.inst.lensFlares.indexOf(this.inst), 1);
    },
    replace(parent) {
      this.remove(parent);
      this.add(parent);
    },
  },
  render(h) {
    if (this.$slots.default) return h('div', this.$slots.default);
    return undefined;
  },
};
