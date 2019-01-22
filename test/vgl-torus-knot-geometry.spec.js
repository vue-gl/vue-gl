import Vue from 'vue/dist/vue';
import { TorusKnotBufferGeometry, BufferGeometry } from 'three';
import { VglTorusKnotGeometry, VglNamespace } from '../src';

describe('VglTorusKnotGeometry:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-torus-knot-geometry ref="g" /></vgl-namespace>',
      components: { VglTorusKnotGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new BufferGeometry();
        const expected = mediator.copy(new TorusKnotBufferGeometry()).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('with properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-torus-knot-geometry ref="g" radius="15.8" tube="6.2" radial-segments="20" tubular-segments="30" p="3" q="4" /></vgl-namespace>',
      components: { VglTorusKnotGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new BufferGeometry();
        const expected = mediator.copy(new TorusKnotBufferGeometry(
          15.8,
          6.2,
          30,
          20,
          3,
          4,
        )).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('after properties are changed', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-torus-knot-geometry ref="g" radius="15.8" tube="6.2" radial-segments="20" tubular-segments="10" :p="p" :q="q" /></vgl-namespace>',
      components: { VglTorusKnotGeometry, VglNamespace },
      data: { p: 3, q: 4 },
    }).$mount();
    vm.$nextTick(() => {
      vm.p = 4;
      vm.q = 5;
      vm.$nextTick(() => {
        try {
          const mediator = new BufferGeometry();
          const expected = mediator.copy(new TorusKnotBufferGeometry(
            15.8,
            6.2,
            10,
            20,
            4,
            5,
          )).toJSON();
          expect(mediator.copy(vm.$refs.g.inst).toJSON()).toEqual(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
