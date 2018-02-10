describe('VglTexture component', function component() {
  const { VglTexture, VglNamespace } = VueGL;
  const { assert } = chai;
  describe('The instance should be registered to the injected namespace.', function suite() {
    it('Should be replaced when the image is loaded.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-texture name="\'<!--" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" ref="tex" /><other-component ref="other" /></vgl-namespace>',
        components: {
          VglNamespace,
          VglTexture,
          OtherComponent: {
            inject: ['vglTextures'],
            render() {},
          },
        },
      }).$mount();
      vm.$refs.tex.$watch('inst', (inst) => {
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.other.vglTextures.forGet["'<!--"], inst.uuid);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('Should be unregistered when destroyed.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-texture name="n<!--" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" v-if="!destroyed" ref="tex" /><other-component ref="other" /></vgl-namespace>',
        components: {
          VglTexture,
          VglNamespace,
          OtherComponent: {
            inject: ['vglTextures'],
            render() {},
          },
        },
        data: { destroyed: false },
      }).$mount();
      vm.$refs.tex.$watch('inst', () => {
        vm.$nextTick(() => {
          vm.destroyed = true;
          vm.$nextTick(() => {
            try {
              assert.isEmpty(vm.$refs.other.vglTextures.forGet);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
    it('Should be replaced when the instance is replaced.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-texture name="\'<!--" :src="src" ref="tex" /><other-component ref="other" /></vgl-namespace>',
        components: {
          VglNamespace,
          VglTexture,
          OtherComponent: {
            inject: ['vglTextures'],
            render() {},
          },
        },
        data: { src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' },
      }).$mount();
      const unwatch = vm.$refs.tex.$watch('inst', (before) => {
        unwatch();
        vm.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        vm.$refs.tex.$watch('inst', (after) => {
          assert.notEqual(before, after);
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.other.vglTextures.forGet["'<!--"], after.uuid);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
  });
  describe('Creating the instance', function suite() {
    it('The initial instance should be null.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-texture ref="tex" /></vgl-namespace>',
        components: { VglNamespace, VglTexture },
      }).$mount();
      assert.isNull(vm.$refs.tex.inst);
      done();
    });
    it('The instance should be loaded from the src property when the src is a data uri.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" ref="tex" /></vgl-namespace>',
        components: { VglNamespace, VglTexture },
      }).$mount();
      vm.$refs.tex.$watch('inst', (inst) => {
        try {
          assert.strictEqual(inst.image.src, 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('The instance should be loaded from the src property when the src is a normal url.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-texture src="base/test/sample_texture.png" ref="tex" /></vgl-namespace>',
        components: { VglNamespace, VglTexture },
      }).$mount();
      vm.$refs.tex.$watch('inst', (inst) => {
        try {
          const a = document.createElement('a');
          a.href = inst.image.src;
          const actual = a.href;
          a.href = 'base/test/sample_texture.png';
          const expected = a.href;
          assert.strictEqual(actual, expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  describe('Watching properties', function suite() {
    it('The instance should be replaced when the src property changes.', function test(done) {
      const vm = new Vue({
        components: { VglTexture, VglNamespace },
        template: '<vgl-namespace><vgl-texture :src="src" ref="tex" /></vgl-namespace>',
        data: { src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' },
      }).$mount();
      const unwatch = vm.$refs.tex.$watch('inst', (before) => {
        unwatch();
        vm.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        vm.$refs.tex.$watch('inst', (after) => {
          try {
            assert.notEqual(before, after);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
});
