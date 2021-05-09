/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { ArrowHelper, Vector3 } from 'three';
import { VglArrowHelper, VglObject3d, VglNamespace } from '../../src';

describe('VglArrowHelper', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of ArrowHelper', () => {
    expect(new (Vue.extend(VglArrowHelper))({ inject }).inst).toBeInstanceOf(ArrowHelper);
  });
  test('the component should have common props with VglObject3d', () => {
    const { $props } = new (Vue.extend(VglObject3d))({ inject });
    expect(Object.keys(new (Vue.extend(VglArrowHelper))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  describe('the state of the inst object should be specified by props', () => {
    test('in case with default values', () => {
      const vm = new (Vue.extend(VglArrowHelper))({ inject });
      const expected = new ArrowHelper();
      // Inspect dir argument
      expect(vm.inst).toHaveProperty('matrix', expected.matrix);
      // Inspect length, headLength, headWidth arguments
      expect(vm.inst.line).toHaveProperty('matrix', expected.line.matrix);
      expect(vm.inst.cone).toHaveProperty('matrix', expected.cone.matrix);
      // Inspect color arguments
      expect(vm.inst.cone.material).toHaveProperty('color', expected.cone.material.color);
    });
    test('in case props given', () => {
      const vm = new (Vue.extend(VglArrowHelper))({
        inject,
        propsData: {
          dir: '1.1 2.3 -5.9',
          length: '8.8',
          color: '#9992fc',
          headLength: '2.1',
          headWidth: '1.31',
        },
      });
      const expected = new ArrowHelper(
        new Vector3(1.1, 2.3, -5.9).normalize(),
        undefined,
        8.8,
        0x9992fc,
        2.1,
        1.31,
      );
      // Inspect dir argument
      expect(vm.inst).toHaveProperty('matrix', expected.matrix);
      // Inspect length, headLength, headWidth arguments
      expect(vm.inst.line).toHaveProperty('matrix', expected.line.matrix);
      expect(vm.inst.cone).toHaveProperty('matrix', expected.cone.matrix);
      // Inspect color arguments
      expect(vm.inst.cone.material).toHaveProperty('color', expected.cone.material.color);
    });
    test('in case dir changes', () => {
      const vm = new (Vue.extend(VglArrowHelper))({ inject });
      vm.dir = '12 23 -30';
      // Inspect dir argument
      expect(vm.inst).toHaveProperty('matrix', new ArrowHelper(new Vector3(12, 23, -30).normalize()).matrix);
    });
    test('in case length changes', async () => {
      const vm = new (Vue.extend(VglArrowHelper))({ inject });
      vm.length = '8.8';
      await vm.$nextTick();
      const expected = new ArrowHelper(undefined, undefined, 8.8);
      // Inspect length, headLength, headWidth arguments
      expect(vm.inst.line).toHaveProperty('matrix', expected.line.matrix);
      expect(vm.inst.cone).toHaveProperty('matrix', expected.cone.matrix);
    });
    test('in case headLength changes', async () => {
      const vm = new (Vue.extend(VglArrowHelper))({ inject });
      vm.headLength = '3.1';
      await vm.$nextTick();
      const expected = new ArrowHelper(undefined, undefined, undefined, undefined, 3.1);
      // Inspect length, headLength, headWidth arguments
      expect(vm.inst.line).toHaveProperty('matrix', expected.line.matrix);
      expect(vm.inst.cone).toHaveProperty('matrix', expected.cone.matrix);
    });
    test('in case headWidth changes', async () => {
      const vm = new (Vue.extend(VglArrowHelper))({ inject });
      vm.headWidth = '1.11';
      await vm.$nextTick();
      const expected = new ArrowHelper(undefined, undefined, undefined, undefined, undefined, 1.11);
      // Inspect length, headLength, headWidth arguments
      expect(vm.inst.line).toHaveProperty('matrix', expected.line.matrix);
      expect(vm.inst.cone).toHaveProperty('matrix', expected.cone.matrix);
    });
    test('in case color changes', () => {
      const vm = new (Vue.extend(VglArrowHelper))({ inject });
      vm.color = '#87fa60';
      // Inspect color arguments
      expect(vm.inst.cone.material).toHaveProperty('color', new ArrowHelper(undefined, undefined, 0x87fa60).cone.material.color);
    });
  });
});
