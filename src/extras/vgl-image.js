/* eslint-env browser */
import VglSlotable from '../core/private/vgl-slotable';
import { change, inst, src } from '../constants';

/**
 * The image wrapper component to be used as the resource of other components.
 */
export default {
  extends: VglSlotable,
  props: {
    /** The path to an image. */
    [src]: { type: String, default: '' },
  },
  computed: {
    [inst]() {
      const img = document.createElement('img');
      img.addEventListener('load', () => { this.$_vglSlot.$emit(change); }, false);
      return img;
    },
  },
  watch: {
    [src]: { handler(s) { this.inst.src = s; }, immediate: true },
  },
  render() {},
};
