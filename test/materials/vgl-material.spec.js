import Vue from 'vue/dist/vue';
import { Material, BackSide } from 'three';
import { VglMaterial, VglNamespace } from '../../src';

describe('VglMaterial', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the Material', () => {
    expect(new (Vue.extend(VglMaterial))({ inject }).inst).toBeInstanceOf(Material);
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglMaterial))({ inject, propsData: { vertexColors: true, side: 'back' } });
    expect(inst).toHaveProperty('vertexColors', true);
    expect(inst).toHaveProperty('side', BackSide);
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglMaterial))({ inject });
    const { inst } = vm;
    vm.vertexColors = 'vertex';
    vm.side = 'back';
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglMaterial))({ inject });
    vm.vertexColors = true;
    vm.side = 'back';
    await vm.$nextTick();
    expect(vm.inst).toHaveProperty('vertexColors', true);
    expect(vm.inst).toHaveProperty('side', BackSide);
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglMaterial))({ inject });
    const { vertexColors, side } = new Material();
    expect(inst).toHaveProperty('vertexColors', vertexColors);
    expect(inst).toHaveProperty('side', side);
  });
  describe('rendered real DOM', () => {
    test('is nothing when the component has no children', () => {
      const vm = new (Vue.extend(VglMaterial))({ inject }).$mount();
      expect(vm.$el).toBeInstanceOf(Comment);
    });
    test('is template element when the component has children', () => {
      const vm = new Vue({
        components: { VglMaterial, VglNamespace },
        render(h) {
          return h('vgl-namespace', [h('vgl-material', { ref: 'examin' }, ['child text'])]);
        },
      }).$mount();
      expect(vm.$refs.examin.$el.tagName.toLowerCase()).toBe('template');
    });
  });
});
