/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { LineLoop } from 'three';
import { VglLineLoop, VglObject3d, VglNamespace } from '../../src';

describe('VglLineLoop:', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the LineLoop', () => {
    expect(new (Vue.extend(VglLineLoop))({ inject }).inst).toBeInstanceOf(LineLoop);
  });
  test('the component should have common props with VglObject3d', () => {
    const { $props } = new (Vue.extend(VglObject3d))({ inject });
    expect(Object.keys(new (Vue.extend(VglLineLoop))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
});
