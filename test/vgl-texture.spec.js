describe('VglTexture:', function suite() {
  const { VglTexture, VglNamespace } = VueGL;
  let load;
  let onload;
  before(function hook(done) {
    ({ load } = THREE.TextureLoader.prototype);
    THREE.TextureLoader.prototype.load = function replacedLoad(src, onLoad, ...remains) {
      return load.call(this, src, (...args) => {
        const result = onLoad(...args);
        onload();
        return result;
      }, ...remains);
    };
    done();
  });
  after(function hook(done) {
    THREE.TextureLoader.prototype.load = load;
    done();
  });
  beforeEach(function hook(done) {
    onload = () => {};
    done();
  });
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" ref="t" /></vgl-namespace>',
      components: { VglNamespace, VglTexture },
    }).$mount();
    onload = () => {
      load.call(new THREE.TextureLoader(), 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', (expected) => {
        try {
          expect(vm.$refs.t.inst.image.src).to.equal(expected.image.src);
          vm.$refs.t.inst.image = THREE.Texture.DEFAULT_IMAGE;
          Object.assign(expected, {
            uuid: vm.$refs.t.inst.uuid,
            image: THREE.Texture.DEFAULT_IMAGE,
          });
          expect(vm.$refs.t.inst).to.deep.equal(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    };
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" mapping="cube-reflection" wrap-s="repeat" wrap-t="mirrored-repeat" mag-filter="nearest" min-filter="nearest" anisotropy="2" format="depth" type="unsigned-int" offset="2 3" repeat="2 2" rotation="32" center="3 -3" premultiply-alpha unpack-alignment="2" encoding="log-luv" ref="t" /></vgl-namespace>',
      components: { VglNamespace, VglTexture },
    }).$mount();
    onload = () => {
      load.call(new THREE.TextureLoader(), 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', (expected) => {
        try {
          expect(vm.$refs.t.inst.image.src).to.equal(expected.image.src);
          vm.$refs.t.inst.image = THREE.Texture.DEFAULT_IMAGE;
          Object.assign(expected, {
            mapping: THREE.CubeReflectionMapping,
            wrapS: THREE.RepeatWrapping,
            wrapT: THREE.MirroredRepeatWrapping,
            magFilter: THREE.NearestFilter,
            minFilter: THREE.NearestFilter,
            anisotropy: 2,
            format: THREE.DepthFormat,
            type: THREE.UnsignedIntType,
            rotation: 32,
            premultiplyAlpha: true,
            unpackAlignment: 2,
            encoding: THREE.LogLuvEncoding,
            uuid: vm.$refs.t.inst.uuid,
            image: THREE.Texture.DEFAULT_IMAGE,
          });
          expected.offset.set(2, 3);
          expected.repeat.set(2, 2);
          expected.center.set(3, -3);
          expect(vm.$refs.t.inst).to.deep.equal(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    };
  });
  it('after properties are changed', function test(done) {
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
        format: 'depth',
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
    onload = () => {
      load.call(new THREE.TextureLoader(), 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', (expected) => {
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
        vm.$nextTick(() => {
          try {
            expect(vm.$refs.t.inst.image.src).to.equal(expected.image.src);
            vm.$refs.t.inst.image = THREE.Texture.DEFAULT_IMAGE;
            Object.assign(expected, {
              mapping: THREE.CubeRefractionMapping,
              wrapS: THREE.MirroredRepeatWrapping,
              wrapT: THREE.ClampToEdgeWrapping,
              magFilter: THREE.LinearFilter,
              minFilter: THREE.NearestMipMapLinearFilter,
              anisotropy: 4,
              format: THREE.AlphaFormat,
              type: THREE.UnsignedByteType,
              rotation: 52,
              premultiplyAlpha: true,
              unpackAlignment: 8,
              encoding: THREE.LinearEncoding,
              uuid: vm.$refs.t.inst.uuid,
              image: THREE.Texture.DEFAULT_IMAGE,
            });
            expected.offset.set(2, 1);
            expected.repeat.set(1, 1);
            expected.center.set(-2, 2);
            expect(vm.$refs.t.inst).to.deep.equal(expected);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    };
  });
  it('after src is changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-texture :src="src" ref="t" /></vgl-namespace>',
      components: { VglNamespace, VglTexture },
      data: { src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' },
    }).$mount();
    onload = () => {
      vm.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
      onload = () => {
        load.call(new THREE.TextureLoader(), 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=', (expected) => {
          try {
            expect(vm.$refs.t.inst.image.src).to.equal(expected.image.src);
            vm.$refs.t.inst.image = THREE.Texture.DEFAULT_IMAGE;
            Object.assign(expected, {
              uuid: vm.$refs.t.inst.uuid,
              image: THREE.Texture.DEFAULT_IMAGE,
            });
            expect(vm.$refs.t.inst).to.deep.equal(expected);
            done();
          } catch (e) {
            done(e);
          }
        });
      };
    };
  });
});
