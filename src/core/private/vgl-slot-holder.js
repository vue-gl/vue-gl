import VglSlot from './vgl-slot';
import { add, remove, change } from '../../constants';

export default {
  render(h) {
    return h('template', Object.entries(this.$slots).map(([name, slot]) => h(VglSlot, {
      key: name,
      on: {
        [add]: (obj) => this[add](name, obj),
        [remove]: (obj) => this[remove](name, obj),
        [change]: () => this[change](name),
      },
    }, slot)));
  },
};
