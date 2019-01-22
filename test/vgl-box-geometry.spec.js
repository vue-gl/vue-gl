import Vue from 'vue/dist/vue';
import { BoxBufferGeometry, BufferGeometry } from 'three';
import { VglBoxGeometry, VglNamespace } from '../src';

describe('VglBoxGeometry:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-box-geometry ref="g" /></vgl-namespace>',
      components: { VglBoxGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new BufferGeometry();
        const expected = mediator.copy(new BoxBufferGeometry()).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('with properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-box-geometry ref="g" width="100" height="60" depth="80" width-segments="3" height-segments="4" depth-segments="7" /></vgl-namespace>',
      components: { VglBoxGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new BufferGeometry();
        const expected = mediator.copy(new BoxBufferGeometry(100, 60, 80, 3, 4, 7)).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('after properties are changed', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-box-geometry ref="g" :width="w" :height="h" :depth="d" width-segments="3" height-segments="4" depth-segments="7" /></vgl-namespace>',
      components: { VglBoxGeometry, VglNamespace },
      data: { w: 10, h: 6, d: 3.8 },
    }).$mount();
    vm.$nextTick(() => {
      vm.w = 1.5;
      vm.h = 7;
      vm.d = 22;
      vm.$nextTick(() => {
        try {
          const mediator = new BufferGeometry();
          const expected = mediator.copy(new BoxBufferGeometry(1.5, 7, 22, 3, 4, 7)).toJSON();
          expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
