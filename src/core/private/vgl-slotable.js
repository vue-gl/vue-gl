import {
  add, remove, change, inst,
} from '../../constants';

export default {
  inject: { $_vglSlot: { default: { $emit() {} } } },
  created() { this.$_vglSlot.$emit(add, this[inst]); },
  beforeDestroy() { this.$_vglSlot.$emit(remove, this[inst]); },
  beforeUpdate() { this.$_vglSlot.$emit(change); },
  watch: {
    [inst](newInst, oldInst) {
      this.$_vglSlot.$emit(remove, oldInst);
      this.$_vglSlot.$emit(add, newInst);
    },
  },
  methods: {
    [change]() { this.$_vglSlot.$emit(change); },
  },
};
