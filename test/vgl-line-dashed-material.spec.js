import Vue from 'vue/dist/vue';
import { LineDashedMaterial } from 'three';
import { VglLineDashedMaterial, VglNamespace } from '../src';

describe('VglLineDashedMaterial:', () => {
  test('without properties', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-line-dashed-material ref="m" /></vgl-namespace>',
      components: { VglLineDashedMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new LineDashedMaterial();
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
      template: '<vgl-namespace><vgl-line-dashed-material color="#8aeda3" lights linewidth="3.5" dash-size="2" gap-size="0.8" ref="m" /></vgl-namespace>',
      components: { VglLineDashedMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new LineDashedMaterial({
          color: 0x8aeda3,
          lights: true,
          linewidth: 3.5,
          dashSize: 2,
          gapSize: 0.8,
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
      template: '<vgl-namespace><vgl-line-dashed-material :color="color" :lights="lights" :linewidth="linewidth" :dash-size="dashSize" :gap-size="gapSize" ref="m" /></vgl-namespace>',
      components: { VglLineDashedMaterial, VglNamespace },
      data: {
        color: '#dafbc4',
        lights: false,
        linewidth: 5,
        dashSize: 2.2,
        gapSize: 0.7,
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#abbcaf';
      vm.lights = true;
      vm.linewidth = 4.88;
      vm.dashSize = 3.4;
      vm.gapSize = 1.2;
      vm.$nextTick(() => {
        try {
          const expected = new LineDashedMaterial({
            color: 0xabbcaf,
            lights: true,
            linewidth: 4.88,
            dashSize: 3.4,
            gapSize: 1.2,
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
