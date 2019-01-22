import Vue from 'vue/dist/vue';
import { LineBasicMaterial } from 'three';
import { VglLineBasicMaterial, VglNamespace } from '../src';

describe('VglLineBasicMaterial:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-line-basic-material ref="m" /></vgl-namespace>',
      components: { VglLineBasicMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new LineBasicMaterial();
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
      template: '<vgl-namespace><vgl-line-basic-material color="#8aeda3" lights linewidth="3.5" linecap="butt" linejoin="miter" ref="m" /></vgl-namespace>',
      components: { VglLineBasicMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new LineBasicMaterial({
          color: 0x8aeda3,
          lights: true,
          linewidth: 3.5,
          linecap: 'butt',
          linejoin: 'miter',
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
      template: '<vgl-namespace><vgl-line-basic-material :color="color" :lights="lights" :linewidth="linewidth" :linecap="linecap" :linejoin="linejoin" ref="m" /></vgl-namespace>',
      components: { VglLineBasicMaterial, VglNamespace },
      data: {
        color: '#dafbc4',
        lights: false,
        linewidth: 5,
        linecap: 'butt',
        linejoin: 'miter',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#abbcaf';
      vm.lights = true;
      vm.linewidth = 4.88;
      vm.linecap = 'square';
      vm.linejoin = 'bevel';
      vm.$nextTick(() => {
        try {
          const expected = new LineBasicMaterial({
            color: 0xabbcaf,
            lights: true,
            linewidth: 4.88,
            linecap: 'square',
            linejoin: 'bevel',
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
