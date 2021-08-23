import { Curve } from 'three';
import VglSlotable from '../../core/private/vgl-slotable';
import { inst } from '../../constants';

export default {
  extends: VglSlotable,
  computed: {
    /** The THREE.Curve instance. */
    [inst]: () => new Curve(),
  },
  render() {},
};
