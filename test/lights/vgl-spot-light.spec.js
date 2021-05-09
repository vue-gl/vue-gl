/* global describe, test, beforeEach, expect */
import Vue from 'vue/dist/vue';
import { SpotLight, Vector3 } from 'three';
import { VglSpotLight, VglLight, VglNamespace } from '../../src';

describe('VglSpotLight:', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the SpotLight', () => {
    expect(new (Vue.extend(VglSpotLight))({ inject }).inst).toBeInstanceOf(SpotLight);
  });
  test('the component should have common props with Light', () => {
    expect(Object.keys(new (Vue.extend(VglSpotLight))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys(new (Vue.extend(VglLight))({ inject }).$props)));
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglSpotLight))({
      inject,
      propsData: {
        castShadow: true,
        angle: '1.1',
        decay: '2',
        distance: '203.2',
        penumbra: '0.776',
        target: '-3 -8 -22',
      },
    });
    expect(inst).toHaveProperty('castShadow', true);
    expect(inst).toHaveProperty('angle', 1.1);
    expect(inst).toHaveProperty('decay', 2);
    expect(inst).toHaveProperty('distance', 203.2);
    expect(inst).toHaveProperty('penumbra', 0.776);
    expect(inst.target).toHaveProperty('position', new Vector3(-3, -8, -22));
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglSpotLight))({ inject });
    const { inst } = vm;
    vm.castShadow = true;
    vm.angle = '1.1';
    vm.decay = '2';
    vm.distance = '203.2';
    vm.penumbra = '0.776';
    vm.target = '-3 -8 -22';
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglSpotLight))({ inject });
    vm.castShadow = true;
    vm.angle = '1.1';
    vm.decay = '2';
    vm.distance = '203.2';
    vm.penumbra = '0.776';
    vm.target = '-3 -8 -22';
    await vm.$nextTick();
    expect(vm.inst).toHaveProperty('castShadow', true);
    expect(vm.inst).toHaveProperty('angle', 1.1);
    expect(vm.inst).toHaveProperty('decay', 2);
    expect(vm.inst).toHaveProperty('distance', 203.2);
    expect(vm.inst).toHaveProperty('penumbra', 0.776);
    expect(vm.inst.target).toHaveProperty('position', new Vector3(-3, -8, -22));
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglSpotLight))({ inject });
    const {
      color,
      intensity,
      castShadow,
      angle,
      decay,
      distance,
      penumbra,
      target,
    } = new SpotLight();
    expect(inst.color.getHex()).toBe(color.getHex());
    expect(inst).toHaveProperty('intensity', intensity);
    expect(inst).toHaveProperty('castShadow', castShadow);
    expect(inst).toHaveProperty('angle', angle);
    expect(inst).toHaveProperty('decay', decay);
    expect(inst).toHaveProperty('distance', distance);
    expect(inst).toHaveProperty('penumbra', penumbra);
    expect(inst.target).toHaveProperty('position', target.position);
  });
});
