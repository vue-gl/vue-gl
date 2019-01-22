import Vue from 'vue/dist/vue';
import { DirectionalLight } from 'three';
import { VglDirectionalLight, VglNamespace } from '../src';

describe('VglDirectionalLight:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-directional-light ref="o" /></vgl-namespace>',
      components: { VglDirectionalLight, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
        actual.updateMatrixWorld();
        const expected = new DirectionalLight();
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expected.shadow.camera.uuid = actual.shadow.camera.uuid;
        expect(actual.toJSON()).toEqual(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('with properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-directional-light ref="o" position="1 2 -1" intensity="0.792" color="#081f0e" cast-shadow /></vgl-namespace>',
      components: { VglDirectionalLight, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
        actual.updateMatrixWorld();
        const expected = new DirectionalLight(0x081f0e, 0.792);
        expected.position.set(1, 2, -1);
        expected.castShadow = true;
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expected.shadow.camera.uuid = actual.shadow.camera.uuid;
        expect(actual.toJSON()).toEqual(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('after properties are changed', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-directional-light ref="o" :position="p" :intensity="i" :color="c" :cast-shadow="s" /></vgl-namespace>',
      components: { VglNamespace, VglDirectionalLight },
      data: {
        p: '1 2 -1',
        i: 0.792,
        c: '#081f0e',
        s: true,
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.p = '0 3 1';
      vm.i = 0.898;
      vm.c = '#8899fd';
      vm.s = false;
      vm.$nextTick(() => {
        try {
          const actual = vm.$refs.o.inst.clone();
          actual.updateMatrixWorld();
          const expected = new DirectionalLight(0x8899fd, 0.898);
          expected.position.set(0, 3, 1);
          expected.castShadow = false;
          expected.updateMatrixWorld();
          expected.uuid = actual.uuid;
          expected.shadow.camera.uuid = actual.shadow.camera.uuid;
          expect(actual.toJSON()).toEqual(expected.toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
