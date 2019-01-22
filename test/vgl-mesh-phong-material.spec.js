import Vue from 'vue/dist/vue';
import { MeshPhongMaterial } from 'three';
import { VglMeshPhongMaterial, VglNamespace } from '../src';

describe('VglMeshPhongMaterial:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-mesh-phong-material ref="m" /></vgl-namespace>',
      components: { VglMeshPhongMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new MeshPhongMaterial();
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
      template: '<vgl-namespace><vgl-mesh-phong-material color="#8aeda3" specular="#18283e" shininess="44" ref="m" /></vgl-namespace>',
      components: { VglMeshPhongMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new MeshPhongMaterial({
          color: 0x8aeda3,
          specular: 0x18283e,
          shininess: 44,
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
      template: '<vgl-namespace><vgl-mesh-phong-material :color="color" :specular="specular" :shininess="shininess" ref="m" /></vgl-namespace>',
      components: { VglMeshPhongMaterial, VglNamespace },
      data: {
        color: '#dafbc4',
        specular: '#2dafe3',
        shininess: '31',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#abbcaf';
      vm.specular = '#ffeedd';
      vm.shininess = '17.8';
      vm.$nextTick(() => {
        try {
          const expected = new MeshPhongMaterial({
            color: 0xabbcaf,
            specular: 0xffeedd,
            shininess: 17.8,
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
