import Vue from 'vue/dist/vue';
import { BufferGeometry, PlaneBufferGeometry } from 'three';
import { VglPlaneGeometry, VglNamespace } from '../src';

describe('VglPlaneGeometry:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-plane-geometry ref="g" /></vgl-namespace>',
      components: { VglPlaneGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new BufferGeometry();
        const expected = mediator.copy(new PlaneBufferGeometry()).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('with properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-plane-geometry ref="g" width="100" height="60" width-segments="3" height-segments="4" /></vgl-namespace>',
      components: { VglPlaneGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new BufferGeometry();
        const expected = mediator.copy(new PlaneBufferGeometry(100, 60, 3, 4)).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('after properties are changed', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-plane-geometry ref="g" :width="w" height="6" :width-segments="s" height-segments="4" /></vgl-namespace>',
      components: { VglPlaneGeometry, VglNamespace },
      data: { w: 10, s: 3 },
    }).$mount();
    vm.$nextTick(() => {
      vm.w = 12.5;
      vm.s = 5;
      vm.$nextTick(() => {
        try {
          const mediator = new BufferGeometry();
          const expected = mediator.copy(new PlaneBufferGeometry(12.5, 6, 5, 4)).toJSON();
          expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
