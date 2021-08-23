import { AxesHelper } from 'three';
import VglLineSegments from '../objects/vgl-line-segments';
import {
  inst, size, xAxisColor, yAxisColor, zAxisColor,
} from '../constants';

export default {
  extends: VglLineSegments,
  props: {
    /** The size of axis lines. */
    [size]: { type: Number, default: 1 },
    [xAxisColor]: [String, Number],
    [yAxisColor]: [String, Number],
    [zAxisColor]: [String, Number],
  },
  computed: {
    /** The THREE.AxesHelper instance. */
    [inst]() { return new AxesHelper(this[size]); },
    colors() { return [this[xAxisColor], this[yAxisColor], this[zAxisColor]]; },
  },
  watch: {
    [inst](obj, { geometry }) {
      obj.geometry.getAttribute('color').set(geometry.getAttribute('color').array);
    },
    colors: {
      handler(colors, prevColors) {
        if (colors.includes(undefined)) {
          if (!prevColors) return;
          const attr = this[inst].geometry.getAttribute('color');
          attr.set([1, 0, 0, 1, 0.6, 0, 0, 1, 0, 0.6, 1, 0, 0, 0, 1, 0, 0.6, 1]);
          attr.needsUpdate = true;
        } else this[inst].setColors(...colors);
      },
      immediate: true,
    },
  },
  beforeDestroy() { this[inst].dispose(); },
};
