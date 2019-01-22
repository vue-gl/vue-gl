import Vue from 'vue/dist/vue';
import {
  Material, FaceColors, DoubleSide, VertexColors, BackSide,
} from 'three';
import { VglMaterial, VglNamespace } from '../src';

describe('VglMaterial:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-material ref="m" /></vgl-namespace>',
      components: { VglMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new Material();
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
      template: '<vgl-namespace><vgl-material vertex-colors="vertex" side="back" ref="m" /></vgl-namespace>',
      components: { VglMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new Material();
        expected.setValues({
          vertexColors: VertexColors,
          side: BackSide,
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
      template: '<vgl-namespace><vgl-material :vertex-colors="vertexColors" :side="side" ref="m" /></vgl-namespace>',
      components: { VglMaterial, VglNamespace },
      data: {
        vertexColors: 'vertex',
        side: 'back',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.vertexColors = 'face';
      vm.side = 'double';
      vm.$nextTick(() => {
        try {
          const expected = new Material();
          expected.setValues({
            vertexColors: FaceColors,
            side: DoubleSide,
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
