import {
  NoBlending,
  NormalBlending,
  AdditiveBlending,
  SubtractiveBlending,
  MultiplyBlending,
  CustomBlending,
  Color,
} from './three.js';
import { string, number } from './constructor-arrays.js';
import { VglMinimumRenderer } from './mixins.js';

const blendingMode = {
  no: NoBlending,
  normal: NormalBlending,
  additive: AdditiveBlending,
  subtractive: SubtractiveBlending,
  multiply: MultiplyBlending,
  custom: CustomBlending,
};

export default {
  mixins: [VglMinimumRenderer],
  inject: ['vglTextures', 'vglLensFlare'],
  props: {
    texture: string,
    size: { type: number, default: -1 },
    distance: { type: number, default: 0 },
    blending: { type: number, default: 'normal' },
    color: { type: string, default: '#fff' },
    opacity: { type: number, default: 1 },
  },
  data() {
    return {
      inst: {
        size: -1,
        distance: 0,
        blending: NormalBlending,
        color: new Color('#fff'),
        opacity: 1,
      },
    };
  },
  computed: {
    textureObject() { return this.vglNamespace[this.texture]; },
  },
  beforeDestroy() {
    if (this.inst.texture) {
      const { lensFlares } = this.vglLensFlare.inst;
      lensFlares.splice(lensFlares.indexOf(this.inst), 1);
      this.vglLensFlare.update();
    }
  },
  watch: {
    textureObject: {
      handler(texture, oldTexture) {
        if (texture && oldTexture) {
          Object.assign(this.inst, { texture });
        } else if (texture) {
          this.vglLensFlare.inst.add(
            texture,
            this.inst.size,
            this.inst.distance,
            this.inst.blending,
            this.inst.color,
            this.inst.opacity,
          );
          [this.inst] = this.vglLensFlare.lensFlares.slice(-1);
        } else {
          const { lensFlares } = this.vglLensFlare.inst;
          lensFlares.splice(lensFlares.indexOf(this.inst), 1);
          this.$delete(this.inst, 'texture');
        }
        this.vglLensFlare.update();
      },
      immediate: true,
    },
    size(size) {
      Object.assign(this.inst, { size: parseFloat(size) });
      this.vglLensFlare.update();
    },
    distance(distance) {
      Object.assign(this.inst, { distance: parseFloat(distance) });
      this.vglLensFlare.update();
    },
    blending(blending) {
      Object.assign(this.inst, { blending: blendingMode[blending] });
      this.vglLensFlare.update();
    },
    color(color) {
      this.inst.color.setStyle(color);
      this.vglLensFlare.update();
    },
    opacity(opacity) {
      Object.assign(this.inst, { opacity: parseFloat(opacity) });
      this.vglLensFlare.update();
    },
  },
};
