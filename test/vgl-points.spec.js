import Vue from 'vue/dist/vue';
import { Points } from 'three';
import { VglPoints, VglNamespace } from '../src';

describe('VglPoints:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-points ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglPoints },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
        actual.updateMatrixWorld();
        const expected = new Points();
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expected.geometry = actual.geometry;
        expected.material = actual.material;
        expect(actual.toJSON()).toEqual(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('with properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-points position="8 3 -3.5" rotation="0.8 0.8 0.5 XZY" scale="1.3 1.4 1.1" ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglPoints },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
        actual.updateMatrixWorld();
        const expected = new Points();
        expected.position.set(8, 3, -3.5);
        expected.rotation.set(0.8, 0.8, 0.5, 'XZY');
        expected.scale.set(1.3, 1.4, 1.1);
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expected.geometry = actual.geometry;
        expected.material = actual.material;
        expect(actual.toJSON()).toEqual(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('after properties are changed', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-points :position="p" :rotation="r" :scale="s" ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglPoints },
      data: {
        p: '0 1 0',
        r: '0 0 0.2 XYZ',
        s: '1.1 0.9 0.8',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.p = '1.1 2 0.8';
      vm.r = '0.23 0.4 1.1 YZX';
      vm.s = '0.8 0.7 0.9';
      vm.$nextTick(() => {
        try {
          const actual = vm.$refs.o.inst.clone();
          actual.updateMatrixWorld();
          const expected = new Points();
          expected.position.set(1.1, 2, 0.8);
          expected.rotation.set(0.23, 0.4, 1.1, 'YZX');
          expected.scale.set(0.8, 0.7, 0.9);
          expected.updateMatrixWorld();
          expected.uuid = actual.uuid;
          expected.geometry = actual.geometry;
          expected.material = actual.material;
          expect(actual.toJSON()).toEqual(expected.toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
