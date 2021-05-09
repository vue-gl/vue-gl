/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { OctahedronBufferGeometry } from 'three';
import { VglOctahedronGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglOctahedronGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the OctahedronBufferGeometry', () => {
    expect(new (Vue.extend(VglOctahedronGeometry))({ inject }).inst)
      .toBeInstanceOf(OctahedronBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglOctahedronGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the attributes of the instance should be specified by props', () => {
    const vm = new (Vue.extend(VglOctahedronGeometry))({ inject, propsData: { radius: '103.2', detail: '2' } });
    const expected = new OctahedronBufferGeometry(103.2, 2);
    expect(vm.inst).toHaveProperty('index', expected.index);
    expect(vm.inst).toHaveProperty('attributes', expected.attributes);
  });
  test('the attributes of the instance should be defaults without props', () => {
    const vm = new (Vue.extend(VglOctahedronGeometry))({ inject });
    const expected = new OctahedronBufferGeometry();
    expect(vm.inst).toHaveProperty('index', expected.index);
    expect(vm.inst).toHaveProperty('attributes', expected.attributes);
  });
});
