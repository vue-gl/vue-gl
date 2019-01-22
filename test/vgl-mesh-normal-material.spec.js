import Vue from 'vue/dist/vue';
import { MeshNormalMaterial } from 'three';
import { VglMeshNormalMaterial, VglNamespace } from '../src';

describe('VglMeshNormalMaterial:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-mesh-normal-material ref="m" /></vgl-namespace>',
      components: { VglMeshNormalMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new MeshNormalMaterial();
        const { inst } = vm.$refs.m;
        expect(inst).toEqual(Object.assign(expected, { uuid: inst.uuid }));
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('with properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-mesh-normal-material fog ref="m" /></vgl-namespace>',
      components: { VglMeshNormalMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new MeshNormalMaterial({
          fog: true,
        });
        const { inst } = vm.$refs.m;
        expect(inst).toEqual(Object.assign(expected, { uuid: inst.uuid }));
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('after properties are changed', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-mesh-normal-material :fog="fog" ref="m" /></vgl-namespace>',
      components: { VglMeshNormalMaterial, VglNamespace },
      data: { fog: true },
    }).$mount();
    vm.$nextTick(() => {
      vm.fog = false;
      vm.$nextTick(() => {
        try {
          const expected = new MeshNormalMaterial({
            fog: false,
          });
          const { inst } = vm.$refs.m;
          expect(inst).toEqual(Object.assign(expected, { uuid: inst.uuid }));
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
