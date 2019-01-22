import Vue from 'vue/dist/vue';
import * as THREE from 'three';
import gl from 'gl';
import { VglPerspectiveCamera, VglRenderer, VglScene } from '../src';

describe('VglRenderer:', () => {
  let mock;
  beforeAll((done) => {
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      value() { return gl(this.width, this.height); },
    });
    mock = jest.spyOn(THREE, 'WebGLRenderer');
    done();
  });
  afterAll((done) => {
    done();
  });
  beforeEach((done) => {
    mock.mockClear();
    done();
  });
  test('mounted element should have a canvas', (done) => {
    const vm = new Vue({
      template: '<vgl-renderer />',
      components: { VglRenderer },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const canvases = vm.$el.querySelectorAll('canvas');
        expect(canvases).toHaveLength(1);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('canvas should be replaced when renderer is replaced', (done) => {
    const vm = new Vue({
      template: '<vgl-renderer :antialias="antialias" />',
      components: { VglRenderer },
      data: { antialias: true },
    }).$mount();
    vm.$nextTick(() => {
      const previousCanvas = vm.$el.querySelector('canvas');
      vm.antialias = false;
      vm.$nextTick(() => {
        try {
          const canvases = vm.$el.querySelectorAll('canvas');
          expect(canvases).toHaveLength(1);
          expect(canvases[0]).not.toBe(previousCanvas);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  test('after created without properties', (done) => {
    const defaultParameters = {
      precision: undefined,
      alpha: false,
      premultipliedAlpha: true,
      antialias: false,
      stencil: true,
      preserveDrawingBuffer: false,
      powerPreference: undefined,
      depth: true,
      logarithmicDepthBuffer: false,
    };
    const vm = new Vue(VglRenderer);
    vm.$nextTick(() => {
      try {
        expect(mock.mock.calls).toEqual([[defaultParameters]]);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('after created with properties', (done) => {
    const expectedParameters = {
      precision: 'mediump',
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
      stencil: false,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
      depth: false,
      logarithmicDepthBuffer: true,
    };
    const vm = new (Vue.extend(VglRenderer))({
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
    vm.$nextTick(() => {
      try {
        expect(mock.mock.calls).toEqual([[expectedParameters]]);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  test('should throw an error when multiple scenes are defined and the scene prop is undefined', (done) => {
    const vm = new Vue({
      template: '<vgl-renderer><vgl-scene name="s1" /><vgl-scene name="s2" /><vgl-perspective-camera /></vgl-renderer>',
      components: { VglRenderer, VglScene, VglPerspectiveCamera },
    }).$mount();
    expect(vm.$nextTick()).rejects.toEqual(new ReferenceError());
    done();
  });
  test('should not throw errors when multiple scenes are defined and the scene prop is defined', (done) => {
    const vm = new Vue({
      template: '<vgl-renderer scene="s2"><vgl-scene name="s1" /><vgl-scene name="s2" /><vgl-perspective-camera /></vgl-renderer>',
      components: { VglRenderer, VglScene, VglPerspectiveCamera },
    }).$mount();
    expect(vm.$nextTick()).resolves.toBe(undefined);
    done();
  });
  test('should not throw errors when only one scene is defined and the scene prop is undefined', (done) => {
    const vm = new Vue({
      template: '<vgl-renderer><vgl-scene name="s2" /><vgl-perspective-camera /></vgl-renderer>',
      components: { VglRenderer, VglScene, VglPerspectiveCamera },
    }).$mount();
    expect(vm.$nextTick()).resolves.toBe(undefined);
    done();
  });
  test('should throw an error when multiple cameras are defined and the camera prop is undefined', (done) => {
    const vm = new Vue({
      template: '<vgl-renderer><vgl-scene /><vgl-perspective-camera name="c1" /><vgl-perspective-camera name="c2" /></vgl-renderer>',
      components: { VglRenderer, VglScene, VglPerspectiveCamera },
    }).$mount();
    expect(vm.$nextTick()).rejects.toEqual(new ReferenceError());
    done();
  });
  test('should not throw errors when multiple cameras are defined and the camera prop is defined', (done) => {
    const vm = new Vue({
      template: '<vgl-renderer camera="c2"><vgl-scene /><vgl-perspective-camera name="c1" /><vgl-perspective-camera name="c2" /></vgl-renderer>',
      components: { VglRenderer, VglScene, VglPerspectiveCamera },
    }).$mount();
    expect(vm.$nextTick()).resolves.toBe(undefined);
    done();
  });
  test('should not throw errors when only one camera is defined and the camera prop is undefined', (done) => {
    const vm = new Vue({
      template: '<vgl-renderer><vgl-scene /><vgl-perspective-camera name="c1" /></vgl-renderer>',
      components: { VglRenderer, VglScene, VglPerspectiveCamera },
    }).$mount();
    expect(vm.$nextTick()).resolves.toBe(undefined);
    done();
  });
});
