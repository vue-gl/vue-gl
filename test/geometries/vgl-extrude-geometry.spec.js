import Vue from 'vue/dist/vue';
import { ExtrudeBufferGeometry, Shape, Vector2 } from 'three';
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
    const points = [[350, 0], [350, 1181], [0, 1181], [0, 79], [15, 79], [15, 0]];
    const virtualShape = new Shape(points.map((e) => new Vector2(...e)));
    const { inst } = new (Vue.extend(VglExtrudeGeometry))({
      inject,
      propsData: {
        shapes: points,
      },
    });
    const { shapes } = inst.parameters;
    expect(shapes.type).toStrictEqual('Shape');
    expect(virtualShape.currentPoint.equals(shapes.currentPoint)).toStrictEqual(true);
    expect(JSON.stringify(shapes.extractPoints()))
      .toStrictEqual(JSON.stringify(virtualShape.extractPoints()));
  });
  test('the shapes props as an Array of string', () => {
    const points = [[350, 0], [350, 1181], [0, 1181], [0, 79], [15, 79], [15, 0]];
    const virtualShape = new Shape(points.map((e) => new Vector2(...e)));
    const { inst } = new (Vue.extend(VglExtrudeGeometry))({
      inject,
      propsData: {
        shapes: points.map((e) => e.join(' ')),
      },
    });
    const { shapes } = inst.parameters;
    expect(shapes.type).toStrictEqual('Shape');
    expect(virtualShape.currentPoint.equals(shapes.currentPoint)).toStrictEqual(true);
    expect(JSON.stringify(shapes.extractPoints()))
      .toStrictEqual(JSON.stringify(virtualShape.extractPoints()));
  });
  test('the shapes props as an Array of Vector2', () => {
    const points = [[350, 0], [350, 1181], [0, 1181], [0, 79], [15, 79], [15, 0]];
    const virtualShape = new Shape(points.map((e) => new Vector2(...e)));
    const { inst } = new (Vue.extend(VglExtrudeGeometry))({
      inject,
      propsData: {
        shapes: points.map((e) => new Vector2(...e)),
      },
    });
    const { shapes } = inst.parameters;
    expect(shapes.type).toStrictEqual('Shape');
    expect(virtualShape.currentPoint.equals(shapes.currentPoint)).toStrictEqual(true);
    expect(JSON.stringify(shapes.extractPoints()))
      .toStrictEqual(JSON.stringify(virtualShape.extractPoints()));
  });
  test('the shapes props as a THREE.Shape', () => {
    const points = [[350, 0], [350, 1181], [0, 1181], [0, 79], [15, 79], [15, 0]];
    const virtualShape = new Shape(points.map((e) => new Vector2(...e)));
    const propShapes = virtualShape.clone();
    const { inst } = new (Vue.extend(VglExtrudeGeometry))({
      inject,
      propsData: {
        shapes: propShapes,
      },
    });
    const { shapes } = inst.parameters;
    expect(shapes.type).toStrictEqual('Shape');
    expect(virtualShape.currentPoint.equals(shapes.currentPoint)).toStrictEqual(true);
    expect(JSON.stringify(shapes.extractPoints()))
      .toStrictEqual(JSON.stringify(virtualShape.extractPoints()));
  });
});
