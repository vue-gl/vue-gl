import Vue from 'vue/dist/vue';
import { BufferGeometry, BufferAttribute } from 'three';
import { VglGeometry, VglNamespace } from '../src';

describe('VglGeometry:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-geometry ref="g" /></vgl-namespace>',
      components: { VglGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new BufferGeometry();
        expect(expected.toJSON()).toEqual(expected.copy(vm.$refs.g.inst).toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('with properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-geometry position-attribute="3, 1, 2, 2, -5, 6.3" color-attribute="0.8, 0.7, 0.9, 1, 0.1, 0.2" normal-attribute="2, 0, 0, -3, 4, 3" ref="g" /></vgl-namespace>',
      components: { VglGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new BufferGeometry();
        expected.addAttribute('position', new BufferAttribute(new Float32Array([3, 1, 2, 2, -5, 6.3]), 3));
        expected.addAttribute('color', new BufferAttribute(new Float32Array([0.8, 0.7, 0.9, 1, 0.1, 0.2]), 3));
        expected.addAttribute('normal', new BufferAttribute(new Float32Array([2, 0, 0, -3, 4, 3]), 3));
        expect(expected.toJSON()).toEqual(expected.copy(vm.$refs.g.inst).toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('after properties are changed', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-geometry :position-attribute="positionAttribute" :color-attribute="colorAttribute" :normal-attribute="normalAttribute" ref="g" /></vgl-namespace>',
      components: { VglGeometry, VglNamespace },
      data: {
        positionAttribute: '3, 1, 2, 2, -5, 6.3',
        colorAttribute: '0.8, 0.7, 0.9, 1, 0.1, 0.2',
        normalAttribute: '2, 0, 0, -3, 4, 3',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.positionAttribute = '3.21, -1, 2.3, 2.08, -5, 6.3';
      vm.colorAttribute = '0.85, 0.7, 0.9, 0.99, 0.11, 0.25';
      vm.normalAttribute = '2.2, 0, -10, 3, 4.8, 3';
      vm.$nextTick(() => {
        try {
          const expected = new BufferGeometry();
          expected.addAttribute('position', new BufferAttribute(new Float32Array([3.21, -1, 2.3, 2.08, -5, 6.3]), 3));
          expected.addAttribute('color', new BufferAttribute(new Float32Array([0.85, 0.7, 0.9, 0.99, 0.11, 0.25]), 3));
          expected.addAttribute('normal', new BufferAttribute(new Float32Array([2.2, 0, -10, 3, 4.8, 3]), 3));
          expect(expected.toJSON()).toEqual(expected.copy(vm.$refs.g.inst).toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  test('after attribute lengths are extended', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-geometry :position-attribute="positionAttribute" :color-attribute="colorAttribute" :normal-attribute="normalAttribute" ref="g" /></vgl-namespace>',
      components: { VglGeometry, VglNamespace },
      data: {
        positionAttribute: '3, 1, 2, 2, -5, 6.3',
        colorAttribute: '0.8, 0.7, 0.9, 1, 0.1, 0.2',
        normalAttribute: '2.2, 0, -10, 3, 4.8, 3',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.positionAttribute = '3.21, -1, 2.3, 2.08, -5, 6.3, 2.4, 3.1, 1.1';
      vm.colorAttribute = '0.85, 0.7, 0.9, 0.99, 0.11, 0.25, 0.1, 0.99, 0.5';
      vm.normalAttribute = '-2.2, 0, -10, 3, 4.8, 3, 4, 4, 4';
      vm.$nextTick(() => {
        try {
          const expected = new BufferGeometry();
          expected.addAttribute('position', new BufferAttribute(new Float32Array([3.21, -1, 2.3, 2.08, -5, 6.3, 2.4, 3.1, 1.1]), 3));
          expected.addAttribute('color', new BufferAttribute(new Float32Array([0.85, 0.7, 0.9, 0.99, 0.11, 0.25, 0.1, 0.99, 0.5]), 3));
          expected.addAttribute('normal', new BufferAttribute(new Float32Array([-2.2, 0, -10, 3, 4.8, 3, 4, 4, 4]), 3));
          expect(expected.toJSON()).toEqual(expected.copy(vm.$refs.g.inst).toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  test('after attribute lengths are shortened', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-geometry :position-attribute="positionAttribute" :color-attribute="colorAttribute" :normal-attribute="normalAttribute" ref="g" /></vgl-namespace>',
      components: { VglGeometry, VglNamespace },
      data: {
        positionAttribute: '3, 1, 2, 2, -5, 6.3',
        colorAttribute: '0.8, 0.7, 0.9, 1, 0.1, 0.2',
        normalAttribute: '2.2, 0, -10, 3, 4.8, 3',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.positionAttribute = '3.21, -1, 2.3';
      vm.colorAttribute = '0.85, 0.7, 0.95';
      vm.normalAttribute = '-2, -1.1, 5';
      vm.$nextTick(() => {
        try {
          const expected = new BufferGeometry();
          expected.addAttribute('position', new BufferAttribute(new Float32Array([3.21, -1, 2.3]), 3));
          expected.addAttribute('color', new BufferAttribute(new Float32Array([0.85, 0.7, 0.95]), 3));
          expected.addAttribute('normal', new BufferAttribute(new Float32Array([-2, -1.1, 5]), 3));
          expect(expected.toJSON()).toEqual(expected.copy(vm.$refs.g.inst).toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
