import { Font } from 'three';
import VglSlotable from '../../core/private/vgl-slotable';
import { data, inst } from '../../constants';

export default {
  extends: VglSlotable,
  props: {
    /** A data object representing the font. */
    [data]: Object,
  },
  computed: {
    [inst]() { return new Font(this[data]); },
  },
  render() {},
};
