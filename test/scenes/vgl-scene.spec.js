import Vue from 'vue/dist/vue';
import { Scene, TextureLoader } from 'three';
import { VglScene, VglObject3d, VglNamespace } from '../../src';

describe('VglScene', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the Scene', () => {
    expect(new (Vue.extend(VglScene))({ inject }).inst).toBeInstanceOf(Scene);
  });
  test('the component should have common props with VglObject3d', () => {
    const { $props } = new (Vue.extend(VglObject3d))({ inject });
    expect(Object.keys(new (Vue.extend(VglScene))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the propertie "backgroundColor" of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglScene))({ inject, propsData: { backgroundColor: '#8aeda3' } });
    expect(inst.background.getHex()).toBe(0x8aeda3);
  });
  test('the propertie "backgroundTexture" of the instance should be specified by props', () => {
    const texture = new TextureLoader().load('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    inject.vglNamespace.default.textures.set('test tx', texture);
    const { inst } = new (Vue.extend(VglScene))({ inject, propsData: { backgroundTexture: 'test tx' } });
    expect(inst.background).toBe(texture);
  });
  test('the propertie "fog" of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglScene))({ inject, propsData: { fog: '#8aeda3 10 100' } });
    expect(inst.fog.color.getHex()).toBe(0x8aeda3);
    expect(inst.fog.near).toBe(parseFloat(10));
    expect(inst.fog.far).toBe(parseFloat(100));
  });
  test('the properties "backgroundColor" of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglScene))({ inject });
    vm.backgroundColor = '#6751f2';
    await vm.$nextTick();
    expect(vm.inst.background.getHex()).toBe(0x6751f2);
  });
  test('the properties "backgroundTexture" of the instance should change after props change', async () => {
    const texture = new TextureLoader().load('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
    inject.vglNamespace.default.textures.set('test tx', texture);
    const vm = new (Vue.extend(VglScene))({ inject });
    vm.backgroundTexture = 'test tx';
    await vm.$nextTick();
    expect(vm.inst.background).toBe(texture);
  });
  test('the properties "backgroundTexture" of the instance should change after texture change', async () => {
    const texture1 = new TextureLoader().load('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    const texture2 = new TextureLoader().load('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
    inject.vglNamespace.default.textures.set('test tx1', texture1);
    inject.vglNamespace.default.textures.set('test tx2', texture2);
    const vm = new (Vue.extend(VglScene))({ inject, propsData: { backgroundTexture: 'test tx1' } });
    vm.backgroundTexture = 'test tx2';
    await vm.$nextTick();
    expect(vm.inst.background).toBe(texture2);
  });
  test('the properties "fog" of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglScene))({ inject });
    vm.fog = '#6751f2 10 100';
    await vm.$nextTick();
    expect(vm.inst.fog.color.getHex()).toBe(0x6751f2);
    expect(vm.inst.fog.near).toBe(parseFloat(10));
    expect(vm.inst.fog.far).toBe(parseFloat(100));
  });
  describe('the instance should be registered to scenes namespace', () => {
    test('after created', () => {
      const vm = new (Vue.extend(VglScene))({ inject, propsData: { name: 'test name 1' } });
      expect(inject.vglNamespace.default.scenes.get('test name 1')).toBe(vm.inst);
    });
    test('after the name prop changes', async () => {
      const vm = new (Vue.extend(VglScene))({ inject, propsData: { name: 'test scene 1' } });
      vm.name = 'test scene 2';
      await Vue.nextTick();
      expect(inject.vglNamespace.default.scenes.get('test scene 1')).toBeUndefined();
      expect(inject.vglNamespace.default.scenes.get('test scene 2')).toBe(vm.inst);
    });
    test('after destroyed', async () => {
      const vm = new (Vue.extend(VglScene))({ inject, propsData: { name: 'test name 1' } });
      vm.$destroy();
      await Vue.nextTick();
      expect(inject.vglNamespace.default.scenes.get('test name 1')).toBeUndefined();
    });
  });
});
