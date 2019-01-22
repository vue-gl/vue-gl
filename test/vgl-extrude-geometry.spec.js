import Vue from 'vue/dist/vue';
import { BufferGeometry, ExtrudeBufferGeometry } from 'three';
import { VglExtrudeGeometry, VglNamespace } from '../src';

describe('VglExtrudeGeometry:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-extrude-geometry ref="g" /></vgl-namespace>',
      components: { VglExtrudeGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new BufferGeometry();
        const expected = mediator.copy(new ExtrudeBufferGeometry([], {})).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
