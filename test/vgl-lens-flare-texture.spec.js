describe('VglLensFlareTexture component', function component() {
  const {
    VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
  } = VueGL;
  const { assert } = chai;
  describe('Creating a component', function when() {
    describe('Lens flare parameters', function target() {
      describe("Lens flare's texture should be determined by the texture property.", function suite() {
        it("When the texture is existing VglTexture component's name.", function test(done) {
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
      describe("Lens flare's size should be determined by the size property.", function suite() {
        it('When the size property is a string.', function test(done) {
          const vm = new Vue({
            template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" name="tx" ref="tx" /><vgl-lens-flare ref="lf"><vgl-lens-flare-texture texture="tx" size="521" /></vgl-lens-flare></vgl-namespace>',
            components: {
              VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
            },
          }).$mount();
          vm.$refs.tx.$watch('inst', () => {
            vm.$nextTick(() => {
              try {
                assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].size, 521);
                done();
              } catch (e) {
                done(e);
              }
            });
          });
        });
        it('When the size property is a number.', function test(done) {
          const vm = new Vue({
            template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" name="tx" ref="tx" /><vgl-lens-flare ref="lf"><vgl-lens-flare-texture texture="tx" :size="228" /></vgl-lens-flare></vgl-namespace>',
            components: {
              VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
            },
          }).$mount();
          vm.$refs.tx.$watch('inst', () => {
            vm.$nextTick(() => {
              try {
                assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].size, 228);
                done();
              } catch (e) {
                done(e);
              }
            });
          });
        });
      });
      describe("Lens flare's distance should be determined by the distance property.", function suite() {
        it('When the distance property is a string.', function test(done) {
          const vm = new Vue({
            template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" name="tx" ref="tx" /><vgl-lens-flare ref="lf"><vgl-lens-flare-texture texture="tx" distance="0.8" /></vgl-lens-flare></vgl-namespace>',
            components: {
              VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
            },
          }).$mount();
          vm.$refs.tx.$watch('inst', () => {
            vm.$nextTick(() => {
              try {
                assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].distance, 0.8);
                done();
              } catch (e) {
                done(e);
              }
            });
          });
        });
        it('When the distance property is a number.', function test(done) {
          const vm = new Vue({
            template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" name="tx" ref="tx" /><vgl-lens-flare ref="lf"><vgl-lens-flare-texture texture="tx" :distance="0.75" /></vgl-lens-flare></vgl-namespace>',
            components: {
              VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
            },
          }).$mount();
          vm.$refs.tx.$watch('inst', () => {
            vm.$nextTick(() => {
              try {
                assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].distance, 0.75);
                done();
              } catch (e) {
                done(e);
              }
            });
          });
        });
      });
      describe("Lens flare's color should be determined by the color property.", function suite() {
        it('When the color property is a string.', function test(done) {
          const vm = new Vue({
            template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" name="tx" ref="tx" /><vgl-lens-flare ref="lf"><vgl-lens-flare-texture texture="tx" color="#99ff66" /></vgl-lens-flare></vgl-namespace>',
            components: {
              VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
            },
          }).$mount();
          vm.$refs.tx.$watch('inst', () => {
            vm.$nextTick(() => {
              try {
                assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].color.r, 0.6);
                assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].color.g, 1);
                assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].color.b, 0.4);
                done();
              } catch (e) {
                done(e);
              }
            });
          });
        });
      });
      describe("Lens flare's blending mode should be determined by the blending property.", function suite() {
        it('When the blending property is a string.', function test(done) {
          const vm = new Vue({
            template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" name="tx" ref="tx" /><vgl-lens-flare ref="lf"><vgl-lens-flare-texture texture="tx" blending="3" /></vgl-lens-flare></vgl-namespace>',
            components: {
              VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
            },
          }).$mount();
          vm.$refs.tx.$watch('inst', () => {
            vm.$nextTick(() => {
              try {
                assert.strictEqual(
                  vm.$refs.lf.inst.lensFlares[0].blending,
                  THREE.SubtractiveBlending,
                );
                done();
              } catch (e) {
                done(e);
              }
            });
          });
        });
        it('When the blending property is a number.', function test(done) {
          const vm = new Vue({
            template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" name="tx" ref="tx" /><vgl-lens-flare ref="lf"><vgl-lens-flare-texture texture="tx" :blending="1" /></vgl-lens-flare></vgl-namespace>',
            components: {
              VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
            },
          }).$mount();
          vm.$refs.tx.$watch('inst', () => {
            vm.$nextTick(() => {
              try {
                assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].blending, THREE.NormalBlending);
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
  describe('Watching properties', function suite() {
    it('When the texture changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" name="tx1" ref="tx1" /><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" name="tx2" ref="tx2" /><vgl-lens-flare ref="lf"><vgl-lens-flare-texture :texture="tx" /></vgl-lens-flare></vgl-namespace>',
        components: {
          VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
        },
        data: { tx: 'tx1' },
      }).$mount();
      let txLoaded = 0;
      function watcher() {
        txLoaded += 1;
        if (txLoaded === 2) {
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].texture, vm.$refs.tx1.inst);
              vm.tx = 'tx2';
              vm.$nextTick(() => {
                try {
                  assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].texture, vm.$refs.tx2.inst);
                  done();
                } catch (e) {
                  done(e);
                }
              });
            } catch (e) {
              done(e);
            }
          });
        }
      }
      vm.$refs.tx2.$watch('inst', watcher);
      vm.$refs.tx1.$watch('inst', watcher);
    });
    it('When the texture changes to undefined.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-texture v-if="defined" src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" name="tx" ref="tx" /><vgl-lens-flare ref="lf"><vgl-lens-flare-texture texture="tx" /></vgl-lens-flare></vgl-namespace>',
        components: {
          VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
        },
        data: { defined: true },
      }).$mount();
      vm.$refs.tx.$watch('inst', () => {
        vm.$nextTick(() => {
          try {
            assert.lengthOf(vm.$refs.lf.inst.lensFlares, 1);
            vm.defined = false;
            vm.$nextTick(() => {
              try {
                assert.isEmpty(vm.$refs.lf.inst.lensFlares);
                done();
              } catch (e) {
                done(e);
              }
            });
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('When the size changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" name="tx" ref="tx" /><vgl-lens-flare ref="lf"><vgl-lens-flare-texture texture="tx" :size="size" /></vgl-lens-flare></vgl-namespace>',
        components: {
          VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
        },
        data: { size: 122 },
      }).$mount();
      vm.$refs.tx.$watch('inst', () => {
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].size, 122);
            vm.size = '224';
            vm.$nextTick(() => {
              try {
                assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].size, 224);
                done();
              } catch (e) {
                done(e);
              }
            });
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('When the distance changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" name="tx" ref="tx" /><vgl-lens-flare ref="lf"><vgl-lens-flare-texture texture="tx" :distance="distance" /></vgl-lens-flare></vgl-namespace>',
        components: {
          VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
        },
        data: { distance: '0.2' },
      }).$mount();
      vm.$refs.tx.$watch('inst', () => {
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].distance, 0.2);
            vm.distance = 0.5;
            vm.$nextTick(() => {
              try {
                assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].distance, 0.5);
                done();
              } catch (e) {
                done(e);
              }
            });
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('When the color changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" name="tx" ref="tx" /><vgl-lens-flare ref="lf"><vgl-lens-flare-texture texture="tx" :color="color" /></vgl-lens-flare></vgl-namespace>',
        components: {
          VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
        },
        data: { color: '#99ff66' },
      }).$mount();
      vm.$refs.tx.$watch('inst', () => {
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].color.r, 0.6);
            assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].color.g, 1);
            assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].color.b, 0.4);
            vm.color = '#ff66ff';
            vm.$nextTick(() => {
              try {
                assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].color.r, 1);
                assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].color.g, 0.4);
                assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].color.b, 1);
                done();
              } catch (e) {
                done(e);
              }
            });
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('When the blending mode changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" name="tx" ref="tx" /><vgl-lens-flare ref="lf"><vgl-lens-flare-texture texture="tx" :blending="blending" /></vgl-lens-flare></vgl-namespace>',
        components: {
          VglLensFlare, VglLensFlareTexture, VglTexture, VglNamespace,
        },
        data: { blending: 3 },
      }).$mount();
      vm.$refs.tx.$watch('inst', () => {
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].blending, THREE.SubtractiveBlending);
            vm.blending = THREE.AdditiveBlending;
            vm.$nextTick(() => {
              try {
                assert.strictEqual(vm.$refs.lf.inst.lensFlares[0].blending, THREE.AdditiveBlending);
                done();
              } catch (e) {
                done(e);
              }
            });
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
});
