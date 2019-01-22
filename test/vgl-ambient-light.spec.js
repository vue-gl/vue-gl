import Vue from 'vue/dist/vue';
import { AmbientLight } from 'three';
import { VglAmbientLight, VglNamespace } from '../src';

describe('VglAmbientLight:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-ambient-light ref="o" /></vgl-namespace>',
      components: { VglAmbientLight, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
        const expected = new AmbientLight();
        expected.uuid = actual.uuid;
        expect(actual.toJSON()).toEqual(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('with properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-ambient-light color="#f8054a" intensity="0.88" ref="o" /></vgl-namespace>',
      components: { VglAmbientLight, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
        const expected = new AmbientLight(0xf8054a, 0.88);
        expected.uuid = actual.uuid;
        expect(actual.toJSON()).toEqual(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('after properties are changed', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-ambient-light ref="o" :color="c" :intensity="i" /></vgl-namespace>',
      components: { VglAmbientLight, VglNamespace },
      data: { c: '#f8054a', i: 0.88 },
    }).$mount();
    vm.$nextTick(() => {
      vm.c = '#8899da';
      vm.i = '0.76';
      vm.$nextTick(() => {
        try {
          const actual = vm.$refs.o.inst.clone();
          const expected = new AmbientLight(0x8899da, 0.76);
          expected.uuid = actual.uuid;
          expect(actual.toJSON()).toEqual(expected.toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
