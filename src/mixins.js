import VglGeometry from './vgl-geometry.js';
import { validatePropString, validatePropNumber, update } from './utils.js';

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
