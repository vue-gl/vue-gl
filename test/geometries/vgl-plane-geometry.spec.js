/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { PlaneBufferGeometry } from 'three';
import { VglPlaneGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglPlaneGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the PlaneBufferGeometry', () => {
    expect(new (Vue.extend(VglPlaneGeometry))({ inject }).inst).toBeInstanceOf(PlaneBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglPlaneGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the attributes of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglPlaneGeometry))({
      inject,
      propsData: {
        width: '100.85',
        height: '64.24',
        widthSegments: '3',
        heightSegments: '4',
      },
    });
    const { index, attributes } = new PlaneBufferGeometry(100.85, 64.24, 3, 4);
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
  test('the attributes of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglPlaneGeometry))({ inject });
    const { index, attributes } = new PlaneBufferGeometry();
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
});
