import VglGeometry from './vgl-geometry.js';
import { validatePropString, validatePropNumber, update, dispatchUpdate } from './utils.js';

export function assetFactory(ThreeClass, namespace) {
  const t = {
    props: {
      name: validatePropString,
    },
    inject: [namespace],
    created() {
      this.$set(this[namespace].forSet, this.name, this.inst);
    },
    watch: {
      inst(inst) {
        this[namespace].forSet[this.name] = inst;
      },
    },
    beforeDestroy() {
      if (this[namespace].forSet[this.name] === this.inst) {
        this.$delete(this[namespace].forSet, this.name);
      }
    },
    render(h) {
      if (this.$slots.default) return h('div', this.$slots.default);
      return undefined;
    },
  };
  if (ThreeClass) t.computed = { inst: () => new ThreeClass() };
  return t;
}

function hasAssetsMixinFactory(propname, namespace) {
  const computedPropname = `${propname}_`;
  return {
    props: { [propname]: validatePropString },
    inject: [namespace],
    computed: {
      [computedPropname]() {
        return this[namespace].forGet[this[propname]];
      },
    },
    mounted() {
      const prop = this[computedPropname];
      if (prop) {
        this.inst[propname] = prop;
        prop.addEventListener('update', this.ud);
      }
    },
    methods: {
      ud() {
        update(this);
      },
    },
    watch: {
      [computedPropname](prop, old) {
        if (prop !== old) {
          this.inst[propname] = prop;
          if (old) old.removeEventListener('update', this.ud);
          if (prop) prop.addEventListener('update', this.ud);
          update(this);
        }
      },
    },
  };
}

export function objectMixinFactory(hasGeometry) {
  const mixins = [hasAssetsMixinFactory('material', 'vglMaterials')];
  if (hasGeometry) mixins.push(hasAssetsMixinFactory('geometry', 'vglGeometries'));
  return { mixins };
}

export const VglHedronGeometry = {
  mixins: [VglGeometry],
  props: {
    radius: { type: validatePropNumber, default: 1 },
    detail: { type: validatePropNumber, default: 0 },
  },
};

export function hasColorFactory(defaultColor) {
  return {
    props: {
      color: {
        type: validatePropString,
        default: defaultColor,
      },
    },
    watch: {
      color: {
        handler(color) {
          this.inst.color.setStyle(color);
          dispatchUpdate(this);
        },
        immediate: true,
      },
    },
  };
}

export const hasMap = {
  props: {
    map: validatePropString,
  },
  inject: ['vglTextures'],
  computed: {
    tex() {
      return this.vglTextures.forGet[this.map] || null;
    },
  },
  watch: {
    tex: {
      handler(texture, before) {
        this.inst.map = texture;
        if (!before) this.inst.needsUpdate = true;
        dispatchUpdate(this);
      },
      immediate: true,
    },
  },
};
