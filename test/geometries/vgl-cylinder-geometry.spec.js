/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { CylinderBufferGeometry } from 'three';
import { VglCylinderGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglCylinderGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the CylinderBufferGeometry', () => {
    expect(new (Vue.extend(VglCylinderGeometry))({ inject }).inst)
      .toBeInstanceOf(CylinderBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglCylinderGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the attributes of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglCylinderGeometry))({
      inject,
      propsData: {
        radiusTop: '103.2',
        radiusBottom: '64.23',
        height: '19.586',
        radialSegments: '11',
        heightSegments: '5',
        openEnded: true,
        thetaStart: '0.63',
        thetaLength: '2.21',
      },
    });
    const { index, attributes } = new CylinderBufferGeometry(
      103.2, 64.23, 19.586, 11, 5, true, 0.63, 2.21,
    );
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
  test('the attributes of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglCylinderGeometry))({ inject });
    const { index, attributes } = new CylinderBufferGeometry();
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
});
