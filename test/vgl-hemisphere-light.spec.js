import Vue from 'vue/dist/vue';
import { HemisphereLight } from 'three';
import { VglHemisphereLight, VglNamespace } from '../src';

describe('VglHemisphereLight:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-hemisphere-light ref="o" /></vgl-namespace>',
      components: { VglHemisphereLight, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
        const expected = new HemisphereLight();
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
      template: '<vgl-namespace><vgl-hemisphere-light color="#f8054a" ground-color="#6751f2" intensity="0.88" ref="o" /></vgl-namespace>',
      components: { VglHemisphereLight, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
        const expected = new HemisphereLight(0xf8054a, 0x6751f2, 0.88);
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
      template: '<vgl-namespace><vgl-hemisphere-light ref="o" :color="c" :ground-color="g" :intensity="i" /></vgl-namespace>',
      components: { VglHemisphereLight, VglNamespace },
      data: { c: '#f8054a', i: 0.88, g: '#6751f2' },
    }).$mount();
    vm.$nextTick(() => {
      vm.c = '#8899da';
      vm.i = '0.76';
      vm.g = '#77645a';
      vm.$nextTick(() => {
        try {
          const actual = vm.$refs.o.inst.clone();
          const expected = new HemisphereLight(0x8899da, 0x77645a, 0.76);
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
