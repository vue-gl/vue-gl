import Vue from 'vue/dist/vue';
import { MeshLambertMaterial } from 'three';
import { VglMeshLambertMaterial, VglNamespace } from '../src';

describe('VglMeshLambertMaterial:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-mesh-lambert-material ref="m" /></vgl-namespace>',
      components: { VglMeshLambertMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new MeshLambertMaterial();
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
      template: '<vgl-namespace><vgl-mesh-lambert-material color="#8aeda3" ref="m" /></vgl-namespace>',
      components: { VglMeshLambertMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new MeshLambertMaterial({
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
      template: '<vgl-namespace><vgl-mesh-lambert-material :color="color" ref="m" /></vgl-namespace>',
      components: { VglMeshLambertMaterial, VglNamespace },
      data: { color: '#dafbc4' },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#abbcaf';
      vm.$nextTick(() => {
        try {
          const expected = new MeshLambertMaterial({
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
