import Vue from 'vue/dist/vue';
import { PolarGridHelper } from 'three';
import { VglPolarGridHelper, VglObject3d, VglNamespace } from '../../src';

describe('VglPolarGridHelper:', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the PolarGridHelper', () => {
    expect(new (Vue.extend(VglPolarGridHelper))({ inject }).inst).toBeInstanceOf(PolarGridHelper);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglObject3d))({ inject });
    expect(Object.keys(new (Vue.extend(VglPolarGridHelper))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the state of the instance should be specified by props', () => {
    const vm = new (Vue.extend(VglPolarGridHelper))({
      inject,
      propsData: {
        radius: '88.73',
        radials: '54',
        circles: '33',
        divisions: '22',
        color1: '#8fedc3',
        color2: '#ff24f5',
      },
    });
    const expected = new PolarGridHelper(88.73, 54, 33, 22, 0x8fedc3, 0xff24f5);
    expect(vm.inst.geometry).toHaveProperty('attributes', expected.geometry.attributes);
  });
  test('the state of the instance should be defaults without props', () => {
    const vm = new (Vue.extend(VglPolarGridHelper))({ inject });
    expect(vm.inst.geometry).toHaveProperty('attributes', new PolarGridHelper().geometry.attributes);
  });
});
