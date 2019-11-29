import Vue from 'vue/dist/vue';
import { ExtrudeBufferGeometry, Shape } from 'three';
import { VglExtrudeGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglExtrudeGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the ExtrudeBufferGeometry', () => {
    expect(new (Vue.extend(VglExtrudeGeometry))({ inject }).inst)
      .toBeInstanceOf(ExtrudeBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglExtrudeGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the options of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglExtrudeGeometry))({
      inject,
      propsData: {
        curveSegments: '12',
        steps: '1',
        depth: '100',
        bevelEnabled: true,
        bevelThickness: '6',
        bevelSize: '4',
        bevelOffset: '0',
        bevelSegments: '3',
      },
    });
    const {
      curveSegments,
      steps,
      depth,
      bevelEnabled,
      bevelThickness,
      bevelSize,
      bevelOffset,
      bevelSegments,
    } = inst.parameters.options;
    expect(curveSegments).toStrictEqual(12);
    expect(steps).toStrictEqual(1);
    expect(depth).toStrictEqual(100);
    expect(bevelEnabled).toStrictEqual(true);
    expect(bevelThickness).toStrictEqual(6);
    expect(bevelSize).toStrictEqual(4);
    expect(bevelOffset).toStrictEqual(0);
    expect(bevelSegments).toStrictEqual(3);
  });
  test('the shape of the instance should be specified by props', () => {
    const shape = new Shape();
    inject.vglNamespace.default.curves.set('testShape', shape);
    const { inst } = new (Vue.extend(VglExtrudeGeometry))({
      inject,
      propsData: {
        shapes: 'testShape',
      },
    });
    const { shapes } = inst.parameters;
    expect(shapes).toStrictEqual([shape]);
  });
  test('the shapes props as an array of string', () => {
    const shape1 = new Shape();
    const shape2 = new Shape();
    inject.vglNamespace.default.curves.set('shape1', shape1);
    inject.vglNamespace.default.curves.set('shape2', shape2);
    const { inst } = new (Vue.extend(VglExtrudeGeometry))({
      inject,
      propsData: {
        shapes: 'shape1,shape2',
      },
    });
    const { shapes } = inst.parameters;
    expect(shapes).toStrictEqual([shape1, shape2]);
  });
});
