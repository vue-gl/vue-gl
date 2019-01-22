import Vue from 'vue/dist/vue';
import {
  TextureLoader,
  Texture,
  CubeReflectionMapping,
  CubeRefractionMapping,
  RepeatWrapping,
  MirroredRepeatWrapping,
  ClampToEdgeWrapping,
  LinearFilter,
  NearestFilter,
  NearestMipMapLinearFilter,
  // DepthFormat,
  AlphaFormat,
  UnsignedIntType,
  UnsignedByteType,
  LogLuvEncoding,
  LinearEncoding,
} from 'three';
import { VglTexture, VglNamespace } from '../src';

describe('VglTexture:', () => {
  test('without properties', async () => {
    const mockLoad = jest.spyOn(TextureLoader.prototype, 'load');
    new Vue({
      template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" ref="t" /></vgl-namespace>',
      components: { VglNamespace, VglTexture },
    }).$mount();
    expect(mockLoad.mock.calls).toEqual([['data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', expect.any(Function)]]);
    mockLoad.mockRestore();
  });
  test('with properties', async () => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" mapping="cube-reflection" wrap-s="repeat" wrap-t="mirrored-repeat" mag-filter="nearest" min-filter="nearest" anisotropy="2" format="depth" type="unsigned-int" offset="2 3" repeat="2 2" rotation="32" center="3 -3" premultiply-alpha unpack-alignment="2" encoding="log-luv" ref="t" /></vgl-namespace>',
      components: { VglNamespace, VglTexture },
    }).$mount();
    const expected = Object.assign(new Texture(), {
      mapping: CubeReflectionMapping,
      wrapS: RepeatWrapping,
      wrapT: MirroredRepeatWrapping,
      magFilter: NearestFilter,
      minFilter: NearestFilter,
      anisotropy: 2,
      // format: DepthFormat,
      type: UnsignedIntType,
      rotation: 32,
      premultiplyAlpha: true,
      unpackAlignment: 2,
      encoding: LogLuvEncoding,
    });
    expected.offset.set(2, 3);
    expected.repeat.set(2, 2);
    expected.center.set(3, -3);
    await new Promise(r => setTimeout(r, 1000));
    ['mapping', 'wrapS', 'wrapT', 'magFilter', 'minFilter', 'anisotropy', 'format', 'type', 'rotation', 'premultiplyAlpha', 'unpackAlignment', 'encoding', 'offset', 'repeat', 'center'].forEach((key) => {
      expect(vm.$refs.t.inst).toHaveProperty(key, expected[key]);
    });
  });
  test('after properties are changed', async () => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" :mapping="mapping" :wrap-s="wrapS" :wrap-t="wrapT" :mag-filter="magFilter" :min-filter="minFilter" :anisotropy="anisotropy" :format="format" :type="type" :offset="offset" :repeat="repeat" :rotation="rotation" :center="center" :premultiply-alpha="premultiplyAlpha" :unpack-alignment="unpackAlignment" :encoding="encoding" ref="t" /></vgl-namespace>',
      components: { VglNamespace, VglTexture },
      data: {
        mapping: 'cube-reflection',
        wrapS: 'repeat',
        wrapT: 'mirrored-repeat',
        magFilter: 'nearest',
        minFilter: 'linear',
        anisotropy: 2,
        // format: 'depth',
        type: 'unsigned-int',
        rotation: 42,
        premultiplyAlpha: false,
        unpackAlignment: 2,
        encoding: 'log-luv',
        offset: '1 1',
        repeat: '2 2',
        center: '3 -3',
      },
    }).$mount();
    await vm.$nextTick();
    vm.mapping = 'cube-refraction';
    vm.wrapS = 'mirrored-repeat';
    vm.wrapT = 'clamp-to-edge';
    vm.magFilter = 'linear';
    vm.minFilter = 'nearest-mip-map-linear';
    vm.anisotropy = 4;
    vm.format = 'alpha';
    vm.type = 'unsigned-byte';
    vm.rotation = 52;
    vm.premultiplyAlpha = true;
    vm.unpackAlignment = 8;
    vm.encoding = 'linear';
    vm.offset = '2 1';
    vm.repeat = '1 1';
    vm.center = '-2 2';
    await vm.$nextTick();
    const expected = new Texture();
    Object.assign(expected, {
      mapping: CubeRefractionMapping,
      wrapS: MirroredRepeatWrapping,
      wrapT: ClampToEdgeWrapping,
      magFilter: LinearFilter,
      minFilter: NearestMipMapLinearFilter,
      anisotropy: 4,
      format: AlphaFormat,
      type: UnsignedByteType,
      rotation: 52,
      premultiplyAlpha: true,
      unpackAlignment: 8,
      encoding: LinearEncoding,
    });
    expected.offset.set(2, 1);
    expected.repeat.set(1, 1);
    expected.center.set(-2, 2);
    ['mapping', 'wrapS', 'wrapT', 'magFilter', 'minFilter', 'anisotropy', 'format', 'type', 'rotation', 'premultiplyAlpha', 'unpackAlignment', 'encoding', 'offset', 'repeat', 'center'].forEach((key) => {
      expect(vm.$refs.t.inst).toHaveProperty(key, expected[key]);
    });
  });
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('after src is changed', (done) => {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-texture :src="src" ref="t" /></vgl-namespace>',
      components: { VglNamespace, VglTexture },
      data: { src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' },
    }).$mount();
    setTimeout(() => {
      vm.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
      new TextureLoader().load('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=', (expected) => {
        try {
          expect(vm.$refs.t.inst.image.src).toEqual(expected.image.src);
          vm.$refs.t.inst.image = Texture.DEFAULT_IMAGE;
          Object.assign(expected, {
            uuid: vm.$refs.t.inst.uuid,
            image: Texture.DEFAULT_IMAGE,
          });
          expect(vm.$refs.t.inst).toEqual(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    }, 500);
  });
});
