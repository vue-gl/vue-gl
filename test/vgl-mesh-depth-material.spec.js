import Vue from 'vue/dist/vue';
import { MeshDepthMaterial } from 'three';
import { VglMeshDepthMaterial, VglNamespace } from '../src';

describe('VglMeshDepthMaterial:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-mesh-depth-material ref="m" /></vgl-namespace>',
      components: { VglMeshDepthMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new MeshDepthMaterial();
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
      template: '<vgl-namespace><vgl-mesh-depth-material fog ref="m" /></vgl-namespace>',
      components: { VglMeshDepthMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new MeshDepthMaterial({
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
      template: '<vgl-namespace><vgl-mesh-depth-material :fog="fog" ref="m" /></vgl-namespace>',
      components: { VglMeshDepthMaterial, VglNamespace },
      data: { fog: true },
    }).$mount();
    vm.$nextTick(() => {
      vm.fog = false;
      vm.$nextTick(() => {
        try {
          const expected = new MeshDepthMaterial({
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
