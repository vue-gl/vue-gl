import { add, remove } from '../constants';

/** This component behaves as other components registered by the `vgl-defs` component. */
export default {
  inject: { $_vglSlot: { default: { $emit() {} } } },
  props: {
    /** The reffering slot name of the `vgl-defs` component. */
    href: { type: String, required: true },
  },
  watch: {
    href: {
      handler(curr, prev) {
        if (prev !== undefined) {
          if (this.$root.$_vglDefs.slots[prev]) {
            this.$root.$_vglDefs.slots[prev].forEach((obj) => {
              this.$_vglSlot.$emit(remove, obj);
            });
          }
          this.$root.$_vglDefs.users[prev].splice(
            this.$root.$_vglDefs.users[prev].indexOf(this), 1,
          );
          if (!this.$root.$_vglDefs.users[prev].length) delete this.$root.$_vglDefs.users[prev];
        }
        if (this.$root.$_vglDefs.users[curr]) this.$root.$_vglDefs.users[curr].push(this);
        else this.$root.$_vglDefs.users[curr] = [this];
        if (this.$root.$_vglDefs.slots[curr]) {
          this.$root.$_vglDefs.slots[curr].forEach((obj) => { this.$_vglSlot.$emit(add, obj); });
        }
      },
      immediate: true,
    },
  },
  beforeCreate() {
    if (this.$root.$_vglDefs) this.$root.$_vglDefs.use += 1;
    else {
      this.$root.$_vglDefs = {
        defs: 0, use: 1, slots: Object.create(null), users: Object.create(null),
      };
    }
  },
  beforeDestroy() {
    if (this.$root.$_vglDefs.slots[this.href]) {
      this.$root.$_vglDefs.slots[this.href].forEach((obj) => {
        this.$_vglSlot.$emit(remove, obj);
      });
    }
    this.$root.$_vglDefs.users[this.href].splice(
      this.$root.$_vglDefs.users[this.href].indexOf(this), 1,
    );
    if (!this.$root.$_vglDefs.users[this.href].length) delete this.$root.$_vglDefs.users[this.href];
    this.$root.$_vglDefs.use -= 1;
    if (!this.$root.$_vglDefs.defs && !this.$root.$_vglDefs.use) delete this.$root.$_vglDefs;
  },
  render() {},
};
