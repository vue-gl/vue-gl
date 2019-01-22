import Vue from 'vue/dist/vue';
import { Light } from 'three';
import { VglLight, VglNamespace } from '../src';

describe('VglLight:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-light ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglLight },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
        const expected = new Light();
        expected.uuid = actual.uuid;
        expect(actual.toJSON()).toEqual(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
