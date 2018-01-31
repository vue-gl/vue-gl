import { VglMinimumRenderer } from './mixins.js';

export default {
  mixins: [VglMinimumRenderer],
  inject: {
    vglNamespace: {
      default() {
        return Object.defineProperties({}, {
          cameras: { get: () => this.cameras },
          scenes: { get: () => this.scenes },
        });
      },
    },
  },
  data() {
    const data = {}.hasOwnProperty.call(this.vglNamespace, 'cameras') ? {
      cameras: Object.create(null),
      scenes: Object.create(null),
    } : {};
    return Object.assign(data, {
      curves: Object.create(this.vglNamespace.curves || null),
      fonts: Object.create(this.vglNamespace.fonts || null),
      geometries: Object.create(this.vglNamespace.geometries || null),
      materials: Object.create(this.vglNamespace.materials || null),
      textures: Object.create(this.vglNamespace.textures || null),
    });
  },
  watch: {
    'vglNamespace.curves': function curves(proto) {
      this.curves = Object.assign(Object.create(proto), this.curves);
    },
    'vglNamespace.fonts': function fonts(proto) {
      this.fonts = Object.assign(Object.create(proto), this.fonts);
    },
    'vglNamespace.geometries': function geometries(proto) {
      this.geometries = Object.assign(Object.create(proto), this.geometries);
    },
    'vglNamespace.materials': function materials(proto) {
      this.materials = Object.assign(Object.create(proto), this.materials);
    },
    'vglNamespace.textures': function textures(proto) {
      this.textures = Object.assign(Object.create(proto), this.textures);
    },
  },
  provide() {
    return {
      vglNamespace: Object.create(this.vglNamespace, {
        curves: { get: () => this.curves },
        fonts: { get: () => this.fonts },
        geometries: { get: () => this.geometries },
        materials: { get: () => this.materials },
        textures: { get: () => this.textures },
      }),
    };
  },
};
