describe('VglLensFlare component', function component() {
  const {
    VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
  } = VueGL;
  const { assert } = chai;
  describe('Creating an object', function suite() {
    it('The instance should have lens flare texture children.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" name="tx" ref="tx" /><vgl-lens-flare ref="lf"><vgl-lens-flare-texture texture="tx" /></vgl-lens-flare></vgl-namespace>',
        components: {
          VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
        },
      }).$mount();
      vm.$refs.tx.$watch('inst', (inst) => {
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].texture, inst);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
  describe('Removing a lens flare texture', function suite() {
    it('The lens flare texture should be removed when its component is destroyed.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" name="tx" ref="tx" /><vgl-lens-flare ref="lf"><vgl-lens-flare-texture v-if="!destroyed" texture="tx" /></vgl-lens-flare></vgl-namespace>',
        components: {
          VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
        },
        data: { destroyed: false },
      }).$mount();
      vm.$refs.tx.$watch('inst', () => {
        vm.$nextTick(() => {
          try {
            assert.lengthOf(vm.$refs.lf.inst.lensFlares, 1);
          } catch (e) {
            done(e);
          }
          vm.destroyed = true;
          vm.$nextTick(() => {
            try {
              assert.isEmpty(vm.$refs.lf.inst.lensFlares);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
  });
  describe('Replacing a lens flare texture', function suite() {
    it('The lens flare texture should be replaced when its property is changed.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-texture :src="src" name="tx" ref="tx" /><vgl-lens-flare ref="lf"><vgl-lens-flare-texture texture="tx" /></vgl-lens-flare></vgl-namespace>',
        components: {
          VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
        },
        data: { src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=' },
      }).$mount();
      vm.$refs.tx.$watch('inst', () => {
        vm.$nextTick(() => {
          vm.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
          vm.$refs.tx.$watch('inst', (inst) => {
            vm.$nextTick(() => {
              try {
                assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].texture, inst);
                done();
              } catch (e) {
                done(e);
              }
            });
          });
        });
      });
    });
  });
});
