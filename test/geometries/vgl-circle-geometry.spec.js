/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { CircleBufferGeometry } from 'three';
import { VglCircleGeometry, VglGeometry, VglNamespace } from '../../src';

describe('VglCircleGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the CircleBufferGeometry', () => {
    expect(new (Vue.extend(VglCircleGeometry))({ inject }).inst)
      .toBeInstanceOf(CircleBufferGeometry);
  });
  test('the component should have common props with VglGeometry', () => {
    const { $props } = new (Vue.extend(VglGeometry))({ inject });
    expect(Object.keys(new (Vue.extend(VglCircleGeometry))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the attributes of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglCircleGeometry))({
      inject,
      propsData: {
        radius: '103.2',
        segments: '60',
        thetaStart: '0.1',
        thetaLength: '3.3',
      },
    });
    const { index, attributes } = new CircleBufferGeometry(103.2, 60, 0.1, 3.3);
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
  test('the attributes of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglCircleGeometry))({ inject });
    const { index, attributes } = new CircleBufferGeometry();
    expect(inst).toHaveProperty('index', index);
    expect(inst).toHaveProperty('attributes', attributes);
  });
});
