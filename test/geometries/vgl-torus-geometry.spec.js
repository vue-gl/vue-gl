/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { TorusBufferGeometry } from 'three';
import { VglTorusGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglTorusGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the TorusBufferGeometry', () => {
    expect(new (Vue.extend(VglTorusGeometry))({ inject }).inst).toBeInstanceOf(TorusBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglTorusGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the attributes of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglTorusGeometry))({
      inject,
      propsData: {
        radius: '5.8',
        tube: '2',
        radialSegments: '20',
        tubularSegments: '30',
        arc: '1.1',
      },
    });
    const { index, attributes } = new TorusBufferGeometry(5.8, 2, 20, 30, 1.1);
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
  test('the attributes of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglTorusGeometry))({ inject });
    const { index, attributes } = new TorusBufferGeometry();
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
});
