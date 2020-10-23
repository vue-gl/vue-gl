import Vue from 'vue/dist/vue';
import { Object3D } from 'three';
import { VglObject3d, VglNamespace } from '../../src';

describe('VglObject3d', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the Object3D', () => {
    expect(new (Vue.extend(VglObject3d))({ inject }).inst).toBeInstanceOf(Object3D);
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglObject3d))({
      inject,
      propsData: {
        position: '8 3 -3.5',
        rotation: '0.8 0.8 0.5 XZY',
        scale: '1.3 1.4 1.1',
        castShadow: true,
        receiveShadow: true,
      },
    });
    expect(inst.position).toHaveProperty('x', 8);
    expect(inst.position).toHaveProperty('y', 3);
    expect(inst.position).toHaveProperty('z', -3.5);
    expect(inst.rotation).toHaveProperty('x', 0.8);
    expect(inst.rotation).toHaveProperty('y', 0.8);
    expect(inst.rotation).toHaveProperty('z', 0.5);
    expect(inst.rotation).toHaveProperty('order', 'XZY');
    expect(inst.scale).toHaveProperty('x', 1.3);
    expect(inst.scale).toHaveProperty('y', 1.4);
    expect(inst.scale).toHaveProperty('z', 1.1);
    expect(inst).toHaveProperty('castShadow', true);
    expect(inst).toHaveProperty('receiveShadow', true);
  });
  test('quaternion property of the instance should correspond to rotationQuaternion prop', () => {
    const { inst } = new (Vue.extend(VglObject3d))({
      inject,
      propsData: {
        position: '8 3 -3.5',
        rotationQuaternion: '0.671749 0.051361 0.124275 0.728472',
      },
    });
    expect(inst.position).toHaveProperty('x', 8);
    expect(inst.position).toHaveProperty('y', 3);
    expect(inst.position).toHaveProperty('z', -3.5);
    expect(inst.quaternion).toHaveProperty('x', 0.671749);
    expect(inst.quaternion).toHaveProperty('y', 0.051361);
    expect(inst.quaternion).toHaveProperty('z', 0.124275);
    expect(inst.quaternion).toHaveProperty('w', 0.728472);
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglObject3d))({ inject });
    const { inst } = vm;
    vm.position = '8 3 -3.5';
    vm.rotation = '0.8 0.8 0.5 XZY';
    vm.scale = '1.3 1.4 1.1';
    vm.castShadow = true;
    vm.receiveShadow = true;
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglObject3d))({ inject });
    vm.position = '8 3 -3.5';
    vm.rotation = '0.8 0.8 0.5 XZY';
    vm.scale = '1.3 1.4 1.1';
    vm.castShadow = true;
    vm.receiveShadow = true;
    await vm.$nextTick();
    expect(vm.inst.position).toHaveProperty('x', 8);
    expect(vm.inst.position).toHaveProperty('y', 3);
    expect(vm.inst.position).toHaveProperty('z', -3.5);
    expect(vm.inst.rotation).toHaveProperty('x', 0.8);
    expect(vm.inst.rotation).toHaveProperty('y', 0.8);
    expect(vm.inst.rotation).toHaveProperty('z', 0.5);
    expect(vm.inst.rotation).toHaveProperty('order', 'XZY');
    expect(vm.inst.scale).toHaveProperty('x', 1.3);
    expect(vm.inst.scale).toHaveProperty('y', 1.4);
    expect(vm.inst.scale).toHaveProperty('z', 1.1);
    expect(vm.inst).toHaveProperty('castShadow', true);
    expect(vm.inst).toHaveProperty('receiveShadow', true);
  });
  test('quaternion property of the instance should change after a change prop change', async () => {
    const vm = new (Vue.extend(VglObject3d))({ inject });
    vm.rotationQuaternion = '0.671749 0.051361 0.124275 0.728472';
    await vm.$nextTick();
    expect(vm.inst.quaternion).toHaveProperty('x', 0.671749);
    expect(vm.inst.quaternion).toHaveProperty('y', 0.051361);
    expect(vm.inst.quaternion).toHaveProperty('z', 0.124275);
    expect(vm.inst.quaternion).toHaveProperty('w', 0.728472);
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglObject3d))({ inject });
    const {
      position,
      rotation,
      quaternion,
      scale,
      castShadow,
      receiveShadow,
    } = new Object3D();
    expect(inst.position).toHaveProperty('x', position.x);
    expect(inst.position).toHaveProperty('y', position.y);
    expect(inst.position).toHaveProperty('z', position.z);
    expect(inst.rotation).toHaveProperty('x', rotation.x);
    expect(inst.rotation).toHaveProperty('y', rotation.y);
    expect(inst.rotation).toHaveProperty('z', rotation.z);
    expect(inst.rotation).toHaveProperty('order', rotation.order);
    expect(inst.quaternion).toHaveProperty('x', quaternion.x);
    expect(inst.quaternion).toHaveProperty('y', quaternion.y);
    expect(inst.quaternion).toHaveProperty('z', quaternion.z);
    expect(inst.quaternion).toHaveProperty('w', quaternion.w);
    expect(inst.scale).toHaveProperty('x', scale.x);
    expect(inst.scale).toHaveProperty('y', scale.y);
    expect(inst.scale).toHaveProperty('z', scale.z);
    expect(inst).toHaveProperty('castShadow', castShadow);
    expect(inst).toHaveProperty('receiveShadow', receiveShadow);
  });
  test('the instance should have the instances of child components as children', async () => {
    const vm = new (Vue.extend(VglObject3d))({ inject });
    const child = new (Vue.extend(VglObject3d))({ inject, parent: vm });
    await vm.$nextTick();
    expect(vm.inst.children).toContain(child.inst);
  });
  test('a child instance should be removed after the child component destroyed', async () => {
    const vm = new (Vue.extend(VglObject3d))({ inject });
    const child = new (Vue.extend(VglObject3d))({ inject, parent: vm });
    await vm.$nextTick();
    child.$destroy();
    expect(vm.inst.children).not.toContain(child.inst);
  });
  test('the instance should have the name applied on ThreeJS Object inst', () => {
    const { inst } = new (Vue.extend(VglObject3d))({ inject, propsData: { name: 'test' } });
    expect(inst.name).toBe('test');
  });
  test('the properties "name" of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglObject3d))({ inject, propsData: { name: 'test' } });
    vm.name = 'newName';
    await vm.$nextTick();
    expect(vm.inst.name).toBe('newName');
  });
  describe('rendered real DOM', () => {
    test('is nothing when the component has no children', () => {
      const vm = new (Vue.extend(VglObject3d))({ inject }).$mount();
      expect(vm.$el).toBeInstanceOf(Comment);
    });
    test('is template element when the component has children', () => {
      const vm = new Vue({
        components: { VglObject3d, VglNamespace },
        render(h) {
          return h('vgl-namespace', [h('vgl-object3d', { ref: 'examin' }, ['child text'])]);
        },
      }).$mount();
      expect(vm.$refs.examin.$el.tagName.toLowerCase()).toBe('template');
    });
  });
});
