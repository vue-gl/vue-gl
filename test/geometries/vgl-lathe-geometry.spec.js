/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { LatheBufferGeometry, Vector2 } from 'three';
import { VglLatheGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglLatheGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the LatheBufferGeometry', () => {
    expect(new (Vue.extend(VglLatheGeometry))({
      inject,
      propsData: { points: '1 -2, 2 1, 3 3.2' },
    }).inst)
      .toBeInstanceOf(LatheBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglLatheGeometry))({
      inject,
      propsData: { points: '1 -2, 2 1, 3 3.2' },
    }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the attributes of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglLatheGeometry))({
      inject,
      propsData: {
        points: '1 -2, 2 1, 3 3.2',
        segments: '60',
        phiStart: '0.1',
        phiLength: '3.3',
      },
    });
    const { index, attributes } = new LatheBufferGeometry(
      [new Vector2(1, -2), new Vector2(2, 1), new Vector2(3, 3.2)], 60, 0.1, 3.3,
    );
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
  test('the attributes of the instance should be defaults with only required props', () => {
    const { inst } = new (Vue.extend(VglLatheGeometry))({ inject, propsData: { points: '1 -2, 2 1, 3 3.2' } });
    const { index, attributes } = new LatheBufferGeometry(
      [new Vector2(1, -2), new Vector2(2, 1), new Vector2(3, 3.2)],
    );
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
});
