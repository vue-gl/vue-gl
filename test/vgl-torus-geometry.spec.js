import Vue from 'vue/dist/vue';
import { TorusBufferGeometry, BufferGeometry } from 'three';
import { VglTorusGeometry, VglNamespace } from '../src';

describe('VglTorusGeometry:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-torus-geometry ref="g" /></vgl-namespace>',
      components: { VglTorusGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new BufferGeometry();
        const expected = mediator.copy(new TorusBufferGeometry()).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('with properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-torus-geometry ref="g" radius="5.8" tube="2" radial-segments="20" tubular-segments="30" arc="1.1" /></vgl-namespace>',
      components: { VglTorusGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new BufferGeometry();
        const expected = mediator.copy(new TorusBufferGeometry(5.8, 2, 20, 30, 1.1)).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('after properties are changed', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-torus-geometry ref="g" :radius="r" tube="6" radial-segments="20" :tubular-segments="s" arc="1" /></vgl-namespace>',
      components: { VglTorusGeometry, VglNamespace },
      data: { r: 25, s: 5 },
    }).$mount();
    vm.$nextTick(() => {
      vm.r = 125;
      vm.s = 7;
      vm.$nextTick(() => {
        try {
          const mediator = new BufferGeometry();
          const expected = mediator.copy(new TorusBufferGeometry(125, 6, 20, 7, 1)).toJSON();
          expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
