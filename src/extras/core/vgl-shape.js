import { Shape } from 'three';
import VglPath from './vgl-path';
import VglSlotHolder from '../../core/private/vgl-slot-holder';
import {
  add, holes, inst, remove,
} from '../../constants';

export default {
  mixins: [VglPath, VglSlotHolder],
  computed: {
    /** The THREE.Shape instance. */
    [inst]() { return this.path(new Shape()); },
  },
  watch: {
    [inst](obj, { holes: h }) { Object.assign(obj, { holes: h }); },
  },
  methods: {
    [add](slot, obj) { if (slot === holes) this.inst.holes.push(obj); },
    [remove](slot, obj) {
      if (slot === holes) this.inst.holes.splice(this.inst.holes.indexOf(obj), 1);
    },
  },
  /**
   * Paths representing lacking parts of the shape.
   * @slot holes
   */
  render: undefined,
};
