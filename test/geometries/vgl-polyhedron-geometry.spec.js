/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { PolyhedronBufferGeometry } from 'three';
import { VglPolyhedronGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglPolyhedronGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the PolyhedronBufferGeometry', () => {
    expect(new (Vue.extend(VglPolyhedronGeometry))({
      inject,
      propsData: {
        vertices: [1, 1, 0, 1, -1, 0, -1, -1, 0],
        indices: [0, 1, 2],
      },
    }).inst).toBeInstanceOf(PolyhedronBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglPolyhedronGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the attributes of the instance should be specified by props', () => {
    const vm = new (Vue.extend(VglPolyhedronGeometry))({
      inject,
      propsData: {
        vertices: '-1.5,-1.5,-1.5,1.5,-1.5,-1.5,1.5,1.5,-1.5,-1.5,1.5,-1.5,-1.5,-1.5,1.5,1.5,-1.5,1.5,1.5,1.5,1.5,-1.5,1.5,1.5',
        indices: '2,1,0,0,3,2,0,4,7,7,3,0,0,1,5,5,4,0,1,2,6,6,5,1,2,3,7,7,6,2,4,5,6,6,7,4',
        radius: '103.2',
        detail: '2',
      },
    });
    const expected = new PolyhedronBufferGeometry(
      [-1.5, -1.5, -1.5, 1.5, -1.5, -1.5, 1.5, 1.5, -1.5, -1.5, 1.5, -1.5,
        -1.5, -1.5, 1.5, 1.5, -1.5, 1.5, 1.5, 1.5, 1.5, -1.5, 1.5, 1.5],
      [2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0,
        0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1,
        2, 3, 7, 7, 6, 2, 4, 5, 6, 6, 7, 4],
      103.2,
      2,
    );
    expect(vm.inst).toHaveProperty('index', expected.index);
    expect(vm.inst).toHaveProperty('attributes', expected.attributes);
  });
  test('the attributes of the instance should be defaults without props', () => {
    const vm = new (Vue.extend(VglPolyhedronGeometry))({
      inject,
      propsData: {
        vertices: '-1.5,-1.5,-1.5,1.5,-1.5,-1.5,1.5,1.5,-1.5,-1.5,1.5,-1.5,-1.5,-1.5,1.5,1.5,-1.5,1.5,1.5,1.5,1.5,-1.5,1.5,1.5',
        indices: '2,1,0,0,3,2,0,4,7,7,3,0,0,1,5,5,4,0,1,2,6,6,5,1,2,3,7,7,6,2,4,5,6,6,7,4',
      },
    });
    const expected = new PolyhedronBufferGeometry(
      [-1.5, -1.5, -1.5, 1.5, -1.5, -1.5, 1.5, 1.5, -1.5, -1.5, 1.5, -1.5,
        -1.5, -1.5, 1.5, 1.5, -1.5, 1.5, 1.5, 1.5, 1.5, -1.5, 1.5, 1.5],
      [2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0,
        0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1,
        2, 3, 7, 7, 6, 2, 4, 5, 6, 6, 7, 4],
    );
    expect(vm.inst).toHaveProperty('index', expected.index);
    expect(vm.inst).toHaveProperty('attributes', expected.attributes);
  });
});
