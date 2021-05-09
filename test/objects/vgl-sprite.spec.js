/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { Sprite } from 'three';
import { VglSprite, VglObject3d, VglNamespace } from '../../src';

describe('VglSprite', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the Group', () => {
    expect(new (Vue.extend(VglSprite))({ inject }).inst).toBeInstanceOf(Sprite);
  });
  test('the component should have common props with VglObject3d', () => {
    const { $props } = new (Vue.extend(VglObject3d))({ inject });
    expect(Object.keys(new (Vue.extend(VglSprite))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
});
