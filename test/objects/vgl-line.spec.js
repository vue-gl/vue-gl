/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { Line } from 'three';
import { VglLine, VglObject3d, VglNamespace } from '../../src';

describe('VglLine', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the Line', () => {
    expect(new (Vue.extend(VglLine))({ inject }).inst).toBeInstanceOf(Line);
  });
  test('the component should have common props with VglObject3d', () => {
    const { $props } = new (Vue.extend(VglObject3d))({ inject });
    expect(Object.keys(new (Vue.extend(VglLine))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
});
