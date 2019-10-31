import Vue from 'vue/dist/vue';
import { WebGLRenderer, Scene, PerspectiveCamera } from 'three';
import { VglRenderer } from '../../src';

jest.mock('three');
WebGLRenderer.mockImplementation(function MockedWebGLRenderer() {
  this.dispose = jest.fn();
  this.domElement = global.document.createElement('canvas');
  this.render = jest.fn();
  this.setSize = jest.fn();
  this.shadowMap = {};
});

describe('VglRenderer', () => {
  afterEach(() => WebGLRenderer.mockClear());
  test('the inst property should be an instance of the WebGLRenderer', () => {
    expect(new Vue(VglRenderer).inst).toBeInstanceOf(WebGLRenderer);
  });
  test('the mounted element should have the domElement of the instance', () => {
    expect(new Vue(VglRenderer).$mount().$el.querySelector('canvas')).toBe(WebGLRenderer.mock.instances[0].domElement);
  });
  test('the constructor of the instance should be called with options specified by props', () => {
    // eslint-disable-next-line no-new
    new (Vue.extend(VglRenderer))({
      propsData: {
        precision: 'mediump',
        alpha: true,
        disablePremultipliedAlpha: true,
        antialias: true,
        disableStencil: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
        disableDepth: true,
        logarithmicDepthBuffer: true,
      },
    });
    expect(WebGLRenderer).toHaveBeenCalledWith({
      precision: 'mediump',
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
      stencil: false,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
      depth: false,
      logarithmicDepthBuffer: true,
    });
  });
  test('the properties of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglRenderer))({ propsData: { shadowMapEnabled: true } });
    expect(inst.shadowMap).toHaveProperty('enabled', true);
  });
  describe('the instance should be reinstantiated after props change', () => {
    [
      ['precision', 'mediump'],
      ['alpha', true],
      ['disablePremultipliedAlpha', true],
      ['antialias', true],
      ['disableStencil', true],
      ['preserveDrawingBuffer', true],
      ['powerPreference', 'high-performance'],
      ['disableDepth', true],
      ['logarithmicDepthBuffer', true],
    ]
      .forEach((t) => {
        test(`in case ${t[0]} changes`, () => {
          const vm = new Vue(VglRenderer);
          const { inst } = vm;
          const [name, value] = t;
          vm[name] = value;
          expect(vm.inst).not.toBe(inst);
        });
      });
  });
  test('the mounted element should have a new domElement after reinstantiate', async () => {
    const vm = new Vue(VglRenderer).$mount();
    vm.precision = 'mediump';
    await vm.$nextTick();
    expect(vm.$el.querySelector('canvas')).toBe(vm.inst.domElement);
  });
  describe('render method', () => {
    test('should be called with unnamed scene and camera', async () => {
      const vm = new Vue(VglRenderer).$mount();
      const scene = new Scene();
      const camera = new PerspectiveCamera();
      vm.vglNamespace.scenes.set(undefined, scene);
      vm.vglNamespace.cameras.set(undefined, camera);
      await vm.$nextTick();
      expect(vm.inst.render).toHaveBeenLastCalledWith(scene, camera);
    });
    test('should render with named scene and camera', async () => {
      const vm = new (Vue.extend(VglRenderer))({ propsData: { camera: 'c1', scene: 's1' } }).$mount();
      const scene = new Scene();
      const camera = new PerspectiveCamera();
      vm.vglNamespace.scenes.set('s1', scene);
      vm.vglNamespace.scenes.set('s2', new Scene());
      vm.vglNamespace.cameras.set('c1', camera);
      vm.vglNamespace.cameras.set('c2', new PerspectiveCamera());
      await vm.$nextTick();
      expect(vm.inst.render).toHaveBeenLastCalledWith(scene, camera);
    });
    test('should render with replaced scene and camera', async () => {
      const vm = new (Vue.extend(VglRenderer))({ propsData: { camera: 'c1', scene: 's1' } }).$mount();
      const scene = new Scene();
      const camera = new PerspectiveCamera();
      vm.vglNamespace.scenes.set('s1', new Scene());
      vm.vglNamespace.cameras.set('c1', new PerspectiveCamera());
      await vm.$nextTick();
      vm.vglNamespace.scenes.set('s1', scene);
      vm.vglNamespace.cameras.set('c1', camera);
      await vm.$nextTick();
      expect(vm.inst.render).toHaveBeenLastCalledWith(scene, camera);
    });
  });
  describe('specifying scene and camera to render', () => {
    beforeAll(() => { Vue.config.errorHandler = jest.fn(); });
    afterEach(() => Vue.config.errorHandler.mockClear());
    afterAll(() => { Vue.config.errorHandler = undefined; });
    test('an error shoud be thrown when multiple scenes are defined but scene prop is undefined', async () => {
      const vm = new Vue(VglRenderer);
      vm.vglNamespace.scenes.set('s1', new Scene());
      vm.vglNamespace.scenes.set('s2', new Scene());
      await vm.$mount().$nextTick();
      expect(Vue.config.errorHandler).toHaveBeenCalledWith(expect.any(ReferenceError), vm, 'nextTick');
    });
    test('any errors shoud not be thrown when scene prop is undefined but only one scene is defined', async () => {
      const vm = new Vue(VglRenderer);
      vm.vglNamespace.scenes.set('s1', new Scene());
      await vm.$mount().$nextTick();
      expect(Vue.config.errorHandler).not.toHaveBeenCalled();
    });
    test('an error shoud be thrown when multiple cameras are defined but camera prop is undefined', async () => {
      const vm = new Vue(VglRenderer);
      vm.vglNamespace.cameras.set('c1', new PerspectiveCamera());
      vm.vglNamespace.cameras.set('c2', new PerspectiveCamera());
      await vm.$mount().$nextTick();
      expect(Vue.config.errorHandler).toHaveBeenCalledWith(expect.any(ReferenceError), vm, 'nextTick');
    });
    test('any errors shoud not be thrown when camera prop is undefined but only one camera is defined', async () => {
      const vm = new Vue(VglRenderer);
      vm.vglNamespace.cameras.set('c1', new PerspectiveCamera());
      await vm.$mount().$nextTick();
      expect(Vue.config.errorHandler).not.toHaveBeenCalled();
    });
  });
});
