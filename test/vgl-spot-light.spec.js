import Vue from 'vue/dist/vue';
import { SpotLight } from 'three';
import { VglSpotLight, VglNamespace } from '../src';

describe('VglSpotLight:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-spot-light ref="o" /></vgl-namespace>',
      components: { VglSpotLight, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
        actual.updateMatrixWorld();
        const expected = new SpotLight();
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expected.shadow.camera.uuid = actual.shadow.camera.uuid;
        expect(actual.toJSON()).toEqual(expected.toJSON());
        const actualTarget = actual.target;
        actualTarget.updateMatrixWorld();
        const expectedTarget = expected.target;
        expectedTarget.updateMatrixWorld();
        expectedTarget.uuid = actualTarget.uuid;
        expect(actualTarget.toJSON()).toEqual(expectedTarget.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('with properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-spot-light ref="o" position="1 2 -1" intensity="0.792" color="#081f0e" cast-shadow angle="1" decay="2" distance="200" penumbra="0.776" target="-3 -8 -22" /></vgl-namespace>',
      components: { VglSpotLight, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
        actual.updateMatrixWorld();
        const expected = Object.assign(new SpotLight(0x081f0e, 0.792, 200, 1, 0.776, 2), {
          castShadow: true,
        });
        expected.position.set(1, 2, -1);
        expected.target.position.set(-3, -8, -22);
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expected.shadow.camera.uuid = actual.shadow.camera.uuid;
        expect(actual.toJSON()).toEqual(expected.toJSON());
        const actualTarget = actual.target;
        actualTarget.updateMatrixWorld();
        const expectedTarget = expected.target;
        expectedTarget.updateMatrixWorld();
        expectedTarget.uuid = actualTarget.uuid;
        expect(actualTarget.toJSON()).toEqual(expectedTarget.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('after properties are changed', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-spot-light ref="o" :position="p" :intensity="i" :color="c" :cast-shadow="cs" :angle="a" :decay="dc" :distance="dt" :penumbra="n" :target="t" /></vgl-namespace>',
      components: { VglNamespace, VglSpotLight },
      data: {
        p: '1 2 -1',
        i: 0.792,
        c: '#081f0e',
        cs: true,
        a: 1.1,
        dc: 3,
        dt: 224,
        n: 0.66,
        t: '-8 -7 -43',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.p = '0 3 1';
      vm.i = 0.898;
      vm.c = '#8899fd';
      vm.cs = false;
      vm.a = 1.2;
      vm.dc = 2;
      vm.dt = 193;
      vm.n = 0.85;
      vm.t = '10 22 35';
      vm.$nextTick(() => {
        try {
          const actual = vm.$refs.o.inst.clone();
          actual.updateMatrixWorld();
          const expected = Object.assign(new SpotLight(0x8899fd, 0.898, 193, 1.2, 0.85, 2), {
            castShadow: false,
          });
          expected.position.set(0, 3, 1);
          expected.target.position.set(10, 22, 35);
          expected.updateMatrixWorld();
          expected.uuid = actual.uuid;
          expected.shadow.camera.uuid = actual.shadow.camera.uuid;
          expect(actual.toJSON()).toEqual(expected.toJSON());
          const actualTarget = actual.target;
          actualTarget.updateMatrixWorld();
          const expectedTarget = expected.target;
          expectedTarget.updateMatrixWorld();
          expectedTarget.uuid = actualTarget.uuid;
          expect(actualTarget.toJSON()).toEqual(expectedTarget.toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
