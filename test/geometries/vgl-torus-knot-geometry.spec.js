/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { TorusKnotBufferGeometry } from 'three';
import { VglTorusKnotGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglTorusKnotGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the TorusKnotBufferGeometry', () => {
    expect(new (Vue.extend(VglTorusKnotGeometry))({ inject }).inst)
      .toBeInstanceOf(TorusKnotBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglTorusKnotGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the attributes of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglTorusKnotGeometry))({
      inject,
      propsData: {
        radius: '15.8',
        tube: '6.2',
        radialSegments: '20',
        tubularSegments: '30',
        p: '3',
        q: '4',
      },
    });
    const { index, attributes } = new TorusKnotBufferGeometry(15.8, 6.2, 30, 20, 3, 4);
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
  test('the attributes of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglTorusKnotGeometry))({ inject });
    const { index, attributes } = new TorusKnotBufferGeometry();
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
});
