import { add, remove, change } from '../../constants';

export default {
  emits: [add, remove, change],
  provide() { return { $_vglSlot: this }; },
  render(h) { return h('template', this.$slots.default); },
};
