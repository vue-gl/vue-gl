import Vue from 'vue/dist/vue';
import { MeshBasicMaterial } from 'three';
import { VglMeshBasicMaterial, VglNamespace } from '../src';

describe('VglMeshBasicMaterial:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-mesh-basic-material ref="m" /></vgl-namespace>',
      components: { VglMeshBasicMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new MeshBasicMaterial();
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
      template: '<vgl-namespace><vgl-mesh-basic-material color="#8aeda3" ref="m" /></vgl-namespace>',
      components: { VglMeshBasicMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new MeshBasicMaterial({
          color: 0x8aeda3,
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
      template: '<vgl-namespace><vgl-mesh-basic-material :color="color" ref="m" /></vgl-namespace>',
      components: { VglMeshBasicMaterial, VglNamespace },
      data: { color: '#dafbc4' },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#abbcaf';
      vm.$nextTick(() => {
        try {
          const expected = new MeshBasicMaterial({
            color: 0xabbcaf,
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
