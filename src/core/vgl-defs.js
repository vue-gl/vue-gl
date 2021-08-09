import VglSlotHolder from './private/vgl-slot-holder';
import { add, change, remove } from '../constants';

/**
 * This component registers reusable resources (attributes, geometries, materials, textures, etc.)
 * to the root Vue instance (as a `$_vglDefs` property) and makes them to be callable at
 * anywhere. To call registered resources, put the `vgl-use` component there.
 *
 * Note that objects (lights, lines, meshes, etc.) are unique so that they cannot be used multiple
 * times as other object's children. However, this restriction does not exist outside object tree.
 * For instance, lights cannot be added to more than one scene but a scene can be shared between
 * multiple renderers.
 */
export default {
  extends: VglSlotHolder,
  beforeCreate() {
    if (this.$root.$_vglDefs) this.$root.$_vglDefs.defs += 1;
    else {
      this.$root.$_vglDefs = {
        defs: 1, use: 0, slots: Object.create(null), users: Object.create(null),
      };
    }
  },
  beforeDestroy() {
    this.$root.$_vglDefs.defs -= 1;
    if (!this.$root.$_vglDefs.defs && !this.$root.$_vglDefs.use) delete this.$root.$_vglDefs;
  },
  methods: {
    [add](slot, obj) {
      if (this.$root.$_vglDefs.slots[slot]) this.$root.$_vglDefs.slots[slot].push(obj);
      else this.$root.$_vglDefs.slots[slot] = [obj];
      if (this.$root.$_vglDefs.users[slot]) {
        this.$root.$_vglDefs.users[slot].forEach((user) => { user.$_vglSlot.$emit(add, obj); });
      }
    },
    [remove](slot, obj) {
      if (this.$root.$_vglDefs.users[slot]) {
        this.$root.$_vglDefs.users[slot].forEach((user) => { user.$_vglSlot.$emit(remove, obj); });
      }
      this.$root.$_vglDefs.slots[slot].splice(this.$root.$_vglDefs.slots[slot].indexOf(obj), 1);
      if (!this.$root.$_vglDefs.slots[slot].length) delete this.$root.$_vglDefs.slots[slot];
    },
    [change](slot) {
      if (this.$root.$_vglDefs.users[slot]) {
        this.$root.$_vglDefs.users[slot].forEach((user) => { user.$_vglSlot.$emit(change); });
      }
    },
  },
  /**
   * Resources defined in each named slot can be reffered from the `vgl-use` component by the name.
   * @slot Any
   */
  render: undefined,
};
