/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { GridHelper } from 'three';
import { VglGridHelper, VglObject3d, VglNamespace } from '../../src';

describe('VglGridHelper:', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the GridHelper', () => {
    expect(new (Vue.extend(VglGridHelper))({ inject }).inst).toBeInstanceOf(GridHelper);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglObject3d))({ inject });
    expect(Object.keys(new (Vue.extend(VglGridHelper))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the state of the instance should be specified by props', () => {
    const vm = new (Vue.extend(VglGridHelper))({
      inject,
      propsData: {
        size: '88.73',
        divisions: '22',
        colorCenterLine: '#8fedc3',
        colorGrid: '#ff24f5',
      },
    });
    const expected = new GridHelper(88.73, 22, 0x8fedc3, 0xff24f5);
    expect(vm.inst.geometry).toHaveProperty('attributes', expected.geometry.attributes);
    expect(vm.inst.material).toHaveProperty('color', expected.material.color);
  });
  test('the state of the instance should be defaults without props', () => {
    const vm = new (Vue.extend(VglGridHelper))({ inject });
    const expected = new GridHelper();
    expect(vm.inst.geometry).toHaveProperty('attributes', expected.geometry.attributes);
    expect(vm.inst.material).toHaveProperty('color', expected.material.color);
  });
});
