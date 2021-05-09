/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { ConeBufferGeometry } from 'three';
import { VglConeGeometry, VglCylinderGeometry, VglNamespace } from '../../src';

describe('VglConeGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the ConeBufferGeometry', () => {
    expect(new (Vue.extend(VglConeGeometry))({ inject }).inst)
      .toBeInstanceOf(ConeBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglCylinderGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglConeGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the attributes of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglConeGeometry))({
      inject,
      propsData: {
        radius: '103.2',
        height: '19.586',
        radialSegments: '11',
        heightSegments: '5',
        openEnded: true,
        thetaStart: '0.63',
        thetaLength: '2.21',
      },
    });
    const { index, attributes } = new ConeBufferGeometry(103.2, 19.586, 11, 5, true, 0.63, 2.21);
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
  test('the attributes of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglConeGeometry))({ inject });
    const { index, attributes } = new ConeBufferGeometry();
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
});
