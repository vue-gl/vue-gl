import Vue from 'vue/dist/vue';
import { Object3D, RectAreaLightHelper, RectAreaLight } from 'three';
import { VglRectAreaLight, VglRectAreaLightHelper, VglNamespace } from '../src';

// eslint-disable-next-line jest/no-disabled-tests
describe.skip('VglRectAreaLightHelper:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-rect-area-light position="3.8 2 0.5" color="#e2f3b4" name="l" /><vgl-rect-area-light-helper light="l" ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglRectAreaLight, VglRectAreaLightHelper },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = new Object3D().copy(vm.$refs.o.inst.children[0]);
        actual.updateMatrixWorld();
        const light = new RectAreaLight(0xe2f3b4);
        light.position.set(3.8, 2, 0.5);
        const expected = new Object3D().copy(new RectAreaLightHelper(light));
        expected.updateMatrixWorld();
        actual.traverse((obj) => {
          Object.assign(obj, { uuid: '' });
          if (obj.geometry) Object.assign(obj.geometry, { uuid: '' });
          if (obj.material) Object.assign(obj.material, { uuid: '' });
        });
        expected.traverse((obj) => {
          Object.assign(obj, { uuid: '' });
          if (obj.geometry) Object.assign(obj.geometry, { uuid: '' });
          if (obj.material) Object.assign(obj.material, { uuid: '' });
        });
        expect(actual.toJSON()).toEqual(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('with properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-rect-area-light position="3.8 2 0.5" color="#e2f3b4" name="l" /><vgl-rect-area-light-helper light="l" color="#ddf2ee" ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglRectAreaLight, VglRectAreaLightHelper },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = new Object3D().copy(vm.$refs.o.inst.children[0]);
        actual.updateMatrixWorld();
        const light = new RectAreaLight(0xe2f3b4);
        light.position.set(3.8, 2, 0.5);
        const helper = new RectAreaLightHelper(light, 0xddf2ee);
        const expected = new Object3D().copy(helper);
        expected.updateMatrixWorld();
        actual.traverse((obj) => {
          Object.assign(obj, { uuid: '' });
          if (obj.geometry) Object.assign(obj.geometry, { uuid: '' });
          if (obj.material) Object.assign(obj.material, { uuid: '' });
        });
        expected.traverse((obj) => {
          Object.assign(obj, { uuid: '' });
          if (obj.geometry) Object.assign(obj.geometry, { uuid: '' });
          if (obj.material) Object.assign(obj.material, { uuid: '' });
        });
        expect(actual.toJSON().materials).toEqual(expected.toJSON().materials);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('after properties are changed', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-rect-area-light position="3.8 2 0.5" color="#e2f3b4" name="l" /><vgl-rect-area-light-helper light="l" :color="c" ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglRectAreaLight, VglRectAreaLightHelper },
      data: { c: '#dd678e' },
    }).$mount();
    vm.$nextTick(() => {
      vm.c = '#8e8e25';
      vm.$nextTick(() => {
        // watchers called.
        vm.$refs.o.vglNamespace.update();
        vm.$nextTick(() => {
          try {
            const actual = new Object3D().copy(vm.$refs.o.inst.children[0]);
            actual.updateMatrixWorld();
            const light = new RectAreaLight(0xe2f3b4);
            light.position.set(3.8, 2, 0.5);
            const helper = new RectAreaLightHelper(light, 0x8e8e25);
            const expected = new Object3D().copy(helper);
            expected.updateMatrixWorld();
            actual.traverse((obj) => {
              Object.assign(obj, { uuid: '' });
              if (obj.geometry) Object.assign(obj.geometry, { uuid: '' });
              if (obj.material) Object.assign(obj.material, { uuid: '' });
            });
            expected.traverse((obj) => {
              Object.assign(obj, { uuid: '' });
              if (obj.geometry) Object.assign(obj.geometry, { uuid: '' });
              if (obj.material) Object.assign(obj.material, { uuid: '' });
            });
            expect(actual.toJSON()).toEqual(expected.toJSON());
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
});
