/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { ShapeBufferGeometry, Shape } from 'three';
import { VglShapeGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglShapeGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the ShapeBufferGeometry', () => {
    expect(new (Vue.extend(VglShapeGeometry))({ inject }).inst)
      .toBeInstanceOf(ShapeBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglShapeGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the curveSegments option of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglShapeGeometry))({ inject, propsData: { curveSegments: '21' } });
    expect(inst.parameters).toHaveProperty('curveSegments', 21);
  });
  test('the shape of the instance should be specified by props', () => {
    const shape = new Shape();
    inject.vglNamespace.default.curves.set('testShape', shape);
    const { inst } = new (Vue.extend(VglShapeGeometry))({ inject, propsData: { shapes: 'testShape' } });
    expect(inst.parameters).toHaveProperty('shapes', [shape]);
  });
  test('the shapes props as an array of string', () => {
    const shape1 = new Shape();
    const shape2 = new Shape();
    inject.vglNamespace.default.curves.set('shape1', shape1);
    inject.vglNamespace.default.curves.set('shape2', shape2);
    const { inst } = new (Vue.extend(VglShapeGeometry))({ inject, propsData: { shapes: 'shape1 shape2' } });
    expect(inst.parameters).toHaveProperty('shapes', [shape1, shape2]);
  });
});
