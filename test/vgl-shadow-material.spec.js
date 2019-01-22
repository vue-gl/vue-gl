import Vue from 'vue/dist/vue';
import { ShadowMaterial } from 'three';
import { VglShadowMaterial, VglNamespace } from '../src';

describe('VglShadowMaterial:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-shadow-material ref="m" /></vgl-namespace>',
      components: { VglShadowMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new ShadowMaterial();
        const { inst } = vm.$refs.m;
        expect(inst).toEqual(Object.assign(expected, { uuid: inst.uuid }));
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
