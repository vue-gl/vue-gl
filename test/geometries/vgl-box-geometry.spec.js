/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { BoxBufferGeometry } from 'three';
import { VglBoxGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglBoxGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the BoxBufferGeometry', () => {
    expect(new (Vue.extend(VglBoxGeometry))({ inject }).inst).toBeInstanceOf(BoxBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglBoxGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the attributes of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglBoxGeometry))({
      inject,
      propsData: {
        width: '100.85',
        height: '64.24',
        depth: '85.55',
        widthSegments: '3',
        heightSegments: '4',
        depthSegments: '7',
      },
    });
    const { index, attributes } = new BoxBufferGeometry(100.85, 64.24, 85.55, 3, 4, 7);
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
  test('the attributes of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglBoxGeometry))({ inject });
    const { index, attributes } = new BoxBufferGeometry();
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
});
