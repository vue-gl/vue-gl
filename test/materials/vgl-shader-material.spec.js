import Vue from 'vue/dist/vue';
import { ShaderMaterial } from 'three';
import { VglShaderMaterial, VglMaterial, VglNamespace } from '../../src';

describe('VglShaderMaterial', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });

  test('the inst property should be an instance of ShaderMaterial', () => {
    expect(new (Vue.extend(VglShaderMaterial))({ inject }).inst)
      .toBeInstanceOf(ShaderMaterial);
  });
  test('the component should have common props with VglMaterial', () => {
    const { $props } = new (Vue.extend(VglMaterial))({ inject });
    expect(Object.keys(new (Vue.extend(VglShaderMaterial))({ inject }).$props))
      .toEqual(expect.arrayContaining(Object.keys($props)));
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglShaderMaterial))({
      inject,
      propsData: {
        defines: { FOO: 1 },
        fog: true,
        fragmentShader: 'frag shader',
        lights: true,
        linewidth: 2.0,
        flatShading: true,
        uniforms: { u: { value: 0.0 } },
        vertexShader: 'vert shader',
        wireframe: true,
        wireframeLinewidth: 3.0,
      },
    });
    expect(inst).toHaveProperty('defines', { FOO: 1 });
    expect(inst).toHaveProperty('fog', true);
    expect(inst).toHaveProperty('fragmentShader', 'frag shader');
    expect(inst).toHaveProperty('lights', true);
    expect(inst).toHaveProperty('linewidth', 2.0);
    expect(inst).toHaveProperty('flatShading', true);
    expect(inst).toHaveProperty('uniforms', { u: { value: 0.0 } });
    expect(inst).toHaveProperty('vertexShader', 'vert shader');
    expect(inst).toHaveProperty('wireframe', true);
    expect(inst).toHaveProperty('wireframeLinewidth', 3.0);
  });
  test('the instance sould not be reinstantiated after most props change', async () => {
    const vm = new (Vue.extend(VglShaderMaterial))({ inject });
    const { inst } = vm;
    vm.defines = { FOO: 1 };
    vm.fragmentShader = 'frag shader';
    vm.linewidth = 2.0;
    vm.flatShading = true;
    vm.uniforms = { u: { value: 0.0 } };
    vm.vertexShader = 'vert shader';
    vm.wireframe = true;
    vm.wireframeLinewidth = 3.0;
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  test('the instance sould be reinstantiated after fog/lights change', async () => {
    const vm = new (Vue.extend(VglShaderMaterial))({ inject });
    const { inst } = vm;
    vm.fog = true;
    vm.lights = true;
    await vm.$nextTick();
    expect(inst).not.toBe(vm.inst);
  });
  test('the properties of the instance should change after props change', async () => {
    const vm = new (Vue.extend(VglShaderMaterial))({ inject });
    vm.defines = { FOO: 1 };
    vm.fragmentShader = 'frag shader';
    vm.linewidth = 2.0;
    vm.flatShading = true;
    vm.uniforms = { u: { value: 0.0 } };
    vm.vertexShader = 'vert shader';
    vm.wireframe = true;
    vm.wireframeLinewidth = 3.0;
    await vm.$nextTick();
    expect(vm.inst).toHaveProperty('defines', { FOO: 1 });
    expect(vm.inst).toHaveProperty('fragmentShader', 'frag shader');
    expect(vm.inst).toHaveProperty('linewidth', 2.0);
    expect(vm.inst).toHaveProperty('flatShading', true);
    expect(vm.inst).toHaveProperty('uniforms', { u: { value: 0.0 } });
    expect(vm.inst).toHaveProperty('vertexShader', 'vert shader');
    expect(vm.inst).toHaveProperty('wireframe', true);
    expect(vm.inst).toHaveProperty('wireframeLinewidth', 3.0);
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglShaderMaterial))({ inject });
    const {
      defines,
      fog,
      fragmentShader,
      lights,
      linewidth,
      // flatShading,
      uniforms,
      vertexShader,
      wireframe,
      wireframeLinewidth,
    } = new ShaderMaterial();
    expect(inst).toHaveProperty('defines', defines);
    expect(inst).toHaveProperty('fog', fog);
    expect(inst).toHaveProperty('fragmentShader', fragmentShader);
    expect(inst).toHaveProperty('lights', lights);
    expect(inst).toHaveProperty('linewidth', linewidth);
    expect(inst).toHaveProperty('flatShading', false); // Three.js is missing initialization?
    expect(inst).toHaveProperty('uniforms', uniforms);
    expect(inst).toHaveProperty('vertexShader', vertexShader);
    expect(inst).toHaveProperty('wireframe', wireframe);
    expect(inst).toHaveProperty('wireframeLinewidth', wireframeLinewidth);
  });
});
