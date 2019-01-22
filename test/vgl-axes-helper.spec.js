import Vue from 'vue/dist/vue';
import { AxesHelper, LineSegments } from 'three';
import { VglAxesHelper, VglNamespace } from '../src';

describe('VglAxesHelper', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-axes-helper ref="h" /></vgl-namespace>',
      components: { VglAxesHelper, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = new LineSegments().copy(vm.$refs.h.inst);
        actual.geometry = vm.$refs.h.inst.geometry;
        actual.material = vm.$refs.h.inst.material;
        actual.updateMatrixWorld();
        const expected = new AxesHelper();
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expected.geometry.uuid = actual.geometry.uuid;
        expected.material.uuid = actual.material.uuid;
        expect(actual.toJSON()).toEqual(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('with properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-axes-helper size="88.73" position="3 3.5 0.2" rotation="0.3 0.3 0.2 XYZ" scale="1.1 1.2 0.9" ref="h" /></vgl-namespace>',
      components: { VglAxesHelper, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = new LineSegments().copy(vm.$refs.h.inst);
        actual.geometry = vm.$refs.h.inst.geometry;
        actual.material = vm.$refs.h.inst.material;
        actual.updateMatrixWorld();
        const expected = new AxesHelper(88.73);
        expected.position.set(3, 3.5, 0.2);
        expected.rotation.set(0.3, 0.3, 0.2, 'XYZ');
        expected.scale.set(1.1, 1.2, 0.9);
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expected.geometry.uuid = actual.geometry.uuid;
        expected.material.uuid = actual.material.uuid;
        expect(actual.toJSON()).toEqual(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('after properties are changed', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-axes-helper :size="sz" :position="p" :rotation="r" :scale="sc" ref="h" /></vgl-namespace>',
      components: { VglAxesHelper, VglNamespace },
      data: {
        sz: '1.1',
        p: '3 3.5 0.2',
        r: '0.3 0.3 0.2 XYZ',
        sc: '1.1 1.2 0.9',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.sz = '12';
      vm.p = '3.5 4 0.5';
      vm.r = '0.4 0.4 0.3 XYZ';
      vm.sc = '1 1 1.1';
      vm.$nextTick(() => {
        try {
          const actual = new LineSegments().copy(vm.$refs.h.inst);
          actual.geometry = vm.$refs.h.inst.geometry;
          actual.material = vm.$refs.h.inst.material;
          actual.updateMatrixWorld();
          const expected = new AxesHelper(12);
          expected.position.set(3.5, 4, 0.5);
          expected.rotation.set(0.4, 0.4, 0.3, 'XYZ');
          expected.scale.set(1, 1, 1.1);
          expected.updateMatrixWorld();
          expected.uuid = actual.uuid;
          expected.geometry.uuid = actual.geometry.uuid;
          expected.material.uuid = actual.material.uuid;
          expect(actual.toJSON()).toEqual(expected.toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
