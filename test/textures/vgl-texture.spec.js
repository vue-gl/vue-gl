import Vue from 'vue/dist/vue';
import {
  ImageLoader,
  Texture,
  CubeReflectionMapping,
  RepeatWrapping,
  MirroredRepeatWrapping,
  NearestFilter,
  DepthFormat,
  UnsignedIntType,
  LogLuvEncoding,
} from 'three';
import { VglTexture, VglNamespace } from '../../src';

describe('VglTexture', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  beforeAll(() => jest.spyOn(ImageLoader.prototype, 'load'));
  afterAll(() => ImageLoader.prototype.load.mockRestore());
  afterEach(() => ImageLoader.prototype.load.mockClear());
  test('the inst property should be an instance of the Texture', () => {
    expect(new (Vue.extend(VglTexture))({ inject }).inst).toBeInstanceOf(Texture);
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglTexture))({
      inject,
      propsData: {
        src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        mapping: 'cube-reflection',
        wrapS: 'repeat',
        wrapT: 'mirrored-repeat',
        magFilter: 'nearest',
        minFilter: 'nearest',
        anisotropy: '2',
        format: 'depth',
        type: 'unsigned-int',
        offset: '2 3',
        repeat: '2 2',
        rotation: '32',
        center: '3 -3',
        premultiplyAlpha: true,
        unpackAlignment: '2',
        encoding: 'log-luv',
      },
    });
    // Manually trigger an onload event.
    const evt = global.document.createEvent('HTMLEvents');
    evt.initEvent('load', true, true);
    ImageLoader.prototype.load.mock.results[0].value.dispatchEvent(evt);
    expect(inst).toHaveProperty('mapping', CubeReflectionMapping);
    expect(inst).toHaveProperty('wrapS', RepeatWrapping);
    expect(inst).toHaveProperty('wrapT', MirroredRepeatWrapping);
    expect(inst).toHaveProperty('magFilter', NearestFilter);
    expect(inst).toHaveProperty('minFilter', NearestFilter);
    expect(inst).toHaveProperty('anisotropy', 2);
    expect(inst).toHaveProperty('type', UnsignedIntType);
    expect(inst).toHaveProperty('rotation', 32);
    expect(inst).toHaveProperty('premultiplyAlpha', true);
    expect(inst).toHaveProperty('unpackAlignment', 2);
    expect(inst).toHaveProperty('encoding', LogLuvEncoding);
    expect(inst).toHaveProperty('format', DepthFormat);
    expect(inst.offset).toHaveProperty('x', 2);
    expect(inst.offset).toHaveProperty('y', 3);
    expect(inst.repeat).toHaveProperty('x', 2);
    expect(inst.repeat).toHaveProperty('y', 2);
    expect(inst.center).toHaveProperty('x', 3);
    expect(inst.center).toHaveProperty('y', -3);
  });
  test('the instance sould not be reinstantiated after props change', async () => {
    const vm = new (Vue.extend(VglTexture))({ inject });
    const { inst } = vm;
    vm.mapping = 'cube-reflection';
    vm.wrapS = 'repeat';
    vm.wrapT = 'mirrored-repeat';
    vm.magFilter = 'nearest';
    vm.minFilter = 'nearest';
    vm.anisotropy = '2';
    vm.format = 'depth';
    vm.type = 'unsigned-int';
    vm.offset = '2 3';
    vm.repeat = '2 2';
    vm.rotation = '32';
    vm.center = '3 -3';
    vm.premultiplyAlpha = true;
    vm.unpackAlignment = '2';
    vm.encoding = 'log-luv';
    await vm.$nextTick();
    expect(inst).toBe(vm.inst);
  });
  describe('the properties of the instance should change after props change', () => {
    test('in case mapping changes', async () => {
      const vm = new (Vue.extend(VglTexture))({ inject });
      vm.mapping = 'cube-reflection';
      await vm.$nextTick();
      expect(vm.inst).toHaveProperty('mapping', CubeReflectionMapping);
    });
    test('in case wrapS changes', async () => {
      const vm = new (Vue.extend(VglTexture))({ inject });
      vm.wrapS = 'repeat';
      await vm.$nextTick();
      expect(vm.inst).toHaveProperty('wrapS', RepeatWrapping);
    });
    test('in case wrapT changes', async () => {
      const vm = new (Vue.extend(VglTexture))({ inject });
      vm.wrapT = 'mirrored-repeat';
      await vm.$nextTick();
      expect(vm.inst).toHaveProperty('wrapT', MirroredRepeatWrapping);
    });
    test('in case magFilter changes', async () => {
      const vm = new (Vue.extend(VglTexture))({ inject });
      vm.magFilter = 'nearest';
      await vm.$nextTick();
      expect(vm.inst).toHaveProperty('magFilter', NearestFilter);
    });
    test('in case minFilter changes', async () => {
      const vm = new (Vue.extend(VglTexture))({ inject });
      vm.minFilter = 'nearest';
      await vm.$nextTick();
      expect(vm.inst).toHaveProperty('minFilter', NearestFilter);
    });
    test('in case anisotropy changes', async () => {
      const vm = new (Vue.extend(VglTexture))({ inject });
      vm.anisotropy = '2';
      await vm.$nextTick();
      expect(vm.inst).toHaveProperty('anisotropy', 2);
    });
    test('in case format changes', async () => {
      const vm = new (Vue.extend(VglTexture))({ inject });
      vm.format = 'depth';
      await vm.$nextTick();
      expect(vm.inst).toHaveProperty('format', DepthFormat);
    });
    test('in case type changes', async () => {
      const vm = new (Vue.extend(VglTexture))({ inject });
      vm.type = 'unsigned-int';
      await vm.$nextTick();
      expect(vm.inst).toHaveProperty('type', UnsignedIntType);
    });
    test('in case offset changes', async () => {
      const vm = new (Vue.extend(VglTexture))({ inject });
      vm.offset = '2 3';
      await vm.$nextTick();
      expect(vm.inst.offset).toHaveProperty('x', 2);
      expect(vm.inst.offset).toHaveProperty('y', 3);
    });
    test('in case repeat changes', async () => {
      const vm = new (Vue.extend(VglTexture))({ inject });
      vm.repeat = '2 2';
      await vm.$nextTick();
      expect(vm.inst.repeat).toHaveProperty('x', 2);
      expect(vm.inst.repeat).toHaveProperty('y', 2);
    });
    test('in case rotation changes', async () => {
      const vm = new (Vue.extend(VglTexture))({ inject });
      vm.rotation = '32';
      await vm.$nextTick();
      expect(vm.inst).toHaveProperty('rotation', 32);
    });
    test('in case center changes', async () => {
      const vm = new (Vue.extend(VglTexture))({ inject });
      vm.center = '3 -3';
      await vm.$nextTick();
      expect(vm.inst.center).toHaveProperty('x', 3);
      expect(vm.inst.center).toHaveProperty('y', -3);
    });
    test('in case premultiplyAlpha changes', async () => {
      const vm = new (Vue.extend(VglTexture))({ inject });
      vm.premultiplyAlpha = true;
      await vm.$nextTick();
      expect(vm.inst).toHaveProperty('premultiplyAlpha', true);
    });
    test('in case unpackAlignment changes', async () => {
      const vm = new (Vue.extend(VglTexture))({ inject });
      vm.unpackAlignment = '2';
      await vm.$nextTick();
      expect(vm.inst).toHaveProperty('unpackAlignment', 2);
    });
    test('in case encoding changes', async () => {
      const vm = new (Vue.extend(VglTexture))({ inject });
      vm.encoding = 'log-luv';
      await vm.$nextTick();
      expect(vm.inst).toHaveProperty('encoding', LogLuvEncoding);
    });
  });
  test('the instance should be reinstantiated after src changes', async () => {
    const vm = new (Vue.extend(VglTexture))({ inject });
    const { inst } = vm;
    vm.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    await vm.$nextTick();
    expect(vm.inst).not.toBe(inst);
  });
  test('the properties of the instance should be defaults without props', () => {
    const { inst } = new (Vue.extend(VglTexture))({ inject });
    const {
      mapping,
      wrapS,
      wrapT,
      magFilter,
      minFilter,
      anisotropy,
      type,
      rotation,
      premultiplyAlpha,
      unpackAlignment,
      encoding,
      format,
      offset,
      repeat,
      center,
    } = new Texture();
    expect(inst).toHaveProperty('mapping', mapping);
    expect(inst).toHaveProperty('wrapS', wrapS);
    expect(inst).toHaveProperty('wrapT', wrapT);
    expect(inst).toHaveProperty('magFilter', magFilter);
    expect(inst).toHaveProperty('minFilter', minFilter);
    expect(inst).toHaveProperty('anisotropy', anisotropy);
    expect(inst).toHaveProperty('type', type);
    expect(inst).toHaveProperty('rotation', rotation);
    expect(inst).toHaveProperty('premultiplyAlpha', premultiplyAlpha);
    expect(inst).toHaveProperty('unpackAlignment', unpackAlignment);
    expect(inst).toHaveProperty('encoding', encoding);
    expect(inst).toHaveProperty('format', format);
    expect(inst.offset).toHaveProperty('x', offset.x);
    expect(inst.offset).toHaveProperty('y', offset.y);
    expect(inst.repeat).toHaveProperty('x', repeat.x);
    expect(inst.repeat).toHaveProperty('y', repeat.y);
    expect(inst.center).toHaveProperty('x', center.x);
    expect(inst.center).toHaveProperty('y', center.y);
  });
  describe('rendered real DOM', () => {
    test('is nothing when the component has no children', () => {
      const vm = new (Vue.extend(VglTexture))({ inject }).$mount();
      expect(vm.$el).toBeInstanceOf(Comment);
    });
    test('is template element when the component has children', () => {
      const vm = new Vue({
        components: { VglTexture, VglNamespace },
        render(h) {
          return h('vgl-namespace', [h('vgl-texture', { ref: 'examin' }, ['child text'])]);
        },
      }).$mount();
      expect(vm.$refs.examin.$el.tagName.toLowerCase()).toBe('template');
    });
  });
});
