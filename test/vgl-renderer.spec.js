describe('VglRenderer component', function component() {
  const {
    VglRenderer, VglNamespace, VglPerspectiveCamera, VglScene,
  } = VueGL;
  const { assert } = chai;
  before(function hook(done) {
    this.WebGLRenderer = THREE.WebGLRenderer;
    THREE.WebGLRenderer = function WebGLRenderer(options) {
      this.options = options;
      this.shadowMap = {};
      this.calledRenderWith = [];
    };
    THREE.WebGLRenderer.prototype.setSize = () => {};
    THREE.WebGLRenderer.prototype.render = function render(scene, camera) {
      this.calledRenderWith.push([scene, camera]);
    };
    done();
  });
  after(function hook(done) {
    THREE.WebGLRenderer = this.WebGLRenderer;
    done();
  });
  describe('Namespace injection', function target() {
    describe('Should be able to access vglCameras', function suite() {
      it('When the component is the root namespace.', function test(done) {
        const vm = new Vue({
          template: '<vgl-renderer camera="(\'&%" ref="rdr"><vgl-perspective-camera name="(\'&%" ref="cmr" /></vgl-renderer>',
          components: { VglRenderer, VglPerspectiveCamera },
        }).$mount();
        assert.strictEqual(vm.$refs.rdr.cmr, vm.$refs.cmr.inst);
        done();
      });
      it('When the component is a descendant of the other namespace.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-perspective-camera name="<!--" ref="cmr" /><vgl-renderer camera="<!--" ref="rdr" /></vgl-namespace>',
          components: { VglNamespace, VglRenderer, VglPerspectiveCamera },
        }).$mount();
        assert.strictEqual(vm.$refs.rdr.cmr, vm.$refs.cmr.inst);
        done();
      });
    });
    describe('Should be able to access vglScenes', function suite() {
      it('When the component is the root namespace.', function test(done) {
        const vm = new Vue({
          template: '<vgl-renderer scene="(\'&%" ref="rdr"><vgl-scene name="(\'&%" ref="scn" /></vgl-renderer>',
          components: { VglRenderer, VglScene },
        }).$mount();
        assert.strictEqual(vm.$refs.rdr.scn, vm.$refs.scn.inst);
        done();
      });
      it('When the component is a descendant of the other namespace.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-scene name="<!--" ref="scn" /><vgl-renderer scene="<!--" ref="rdr" /></vgl-namespace>',
          components: { VglNamespace, VglRenderer, VglScene },
        }).$mount();
        assert.strictEqual(vm.$refs.rdr.scn, vm.$refs.scn.inst);
        done();
      });
    });
  });
  describe('Creating a renderer', function when() {
    describe('Output canvas', function suite() {
      it('The domElement property of WebGLRenderer instance should be the Vue created canvas.', function test(done) {
        const vm = new Vue(VglRenderer);
        assert.strictEqual(vm.$refs.rdr, vm.inst.options.canvas);
        done();
      });
    });
    describe('Context attributes', function target() {
      describe('The alpha property should affect the alpha attribute.', function suite() {
        it('When the property is undefined (or false).', function test(done) {
          const vm = new Vue(VglRenderer);
          assert.isFalse(vm.inst.options.alpha);
          done();
        });
        it('When the property is true.', function test(done) {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { alpha: true } }).$mount();
          assert.isTrue(vm.inst.options.alpha);
          done();
        });
      });
      describe('The disableDepth property should affect the depth attribute.', function suite() {
        it('When the property is undefined (or false).', function test(done) {
          const vm = new Vue(VglRenderer).$mount();
          assert.isTrue(vm.inst.options.depth);
          done();
        });
        it('When the property is true.', function test(done) {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { disableDepth: true } }).$mount();
          assert.isFalse(vm.inst.options.depth);
          done();
        });
      });
      describe('The disableStencil property should affect the stencil attribute.', function suite() {
        it('When the property is undefined (or false).', function test(done) {
          const vm = new Vue(VglRenderer).$mount();
          assert.isTrue(vm.inst.options.stencil);
          done();
        });
        it('When the property is true.', function test(done) {
          const vm = new (Vue.extend(VglRenderer))({
            propsData: { disableStencil: true },
          }).$mount();
          assert.isFalse(vm.inst.options.stencil);
          done();
        });
      });
      describe('The antialias property should affect the antialias attribute.', function suite() {
        it('When the property is undefined (or false).', function test(done) {
          const vm = new Vue(VglRenderer).$mount();
          assert.isFalse(vm.inst.options.antialias);
          done();
        });
        it('When the property is true.', function test(done) {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { antialias: true } }).$mount();
          assert.isTrue(vm.inst.options.antialias);
          done();
        });
      });
      describe('The disablePremultipliedAlpha property should affect the premultipliedAlpha attribute.', function suite() {
        it('When the property is undefined (or false).', function test(done) {
          const vm = new Vue(VglRenderer).$mount();
          assert.isTrue(vm.inst.options.premultipliedAlpha);
          done();
        });
        it('When the property is true.', function test(done) {
          const vm = new (Vue.extend(VglRenderer))({
            propsData: { disablePremultipliedAlpha: true },
          }).$mount();
          assert.isFalse(vm.inst.options.premultipliedAlpha);
          done();
        });
      });
      describe('The preserveDrawingBuffer property should affect the preserveDrawingBuffer attribute.', function suite() {
        it('When the property is undefined (or false).', function test(done) {
          const vm = new Vue(VglRenderer).$mount();
          assert.isFalse(vm.inst.options.preserveDrawingBuffer);
          done();
        });
        it('When the property is true.', function test(done) {
          const vm = new (Vue.extend(VglRenderer))({
            propsData: { preserveDrawingBuffer: true },
          }).$mount();
          assert.isTrue(vm.inst.options.preserveDrawingBuffer);
          done();
        });
      });
    });
    describe('Capabilities', function target() {
      describe('The logarithmicDepthBuffer property should affect the logarithmicDepthBuffer capability.', function suite() {
        it('When the property is undefined (or false).', function test(done) {
          const vm = new Vue(VglRenderer).$mount();
          assert.isFalse(vm.inst.options.logarithmicDepthBuffer);
          done();
        });
        it('When the property is true.', function test(done) {
          const vm = new (Vue.extend(VglRenderer))({
            propsData: { logarithmicDepthBuffer: true },
          }).$mount();
          assert.isTrue(vm.inst.options.logarithmicDepthBuffer);
          done();
        });
      });
      describe('The precision property should affect the precision capability.', function suite() {
        it('When the property is undefined (or false).', function test(done) {
          const vm = new Vue(VglRenderer).$mount();
          assert.isUndefined(vm.inst.options.precision);
          done();
        });
        it('When the property is "lowp".', function test(done) {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { precision: 'lowp' } }).$mount();
          assert.strictEqual(vm.inst.options.precision, 'lowp');
          done();
        });
        it('When the property is "mediump".', function test(done) {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { precision: 'mediump' } }).$mount();
          assert.strictEqual(vm.inst.options.precision, 'mediump');
          done();
        });
        it('When the property is "highp".', function test(done) {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { precision: 'highp' } }).$mount();
          assert.strictEqual(vm.inst.options.precision, 'highp');
          done();
        });
      });
    });
    describe('Properties', function target() {
      describe('The shadowMapEnabled property should affect the shadowMap.enabled.', function suite() {
        beforeEach(function hook(done) {
          this.outerDiv = document.createElement('div');
          this.outerDiv.innerHTML = '<div id="app"></div>';
          document.body.appendChild(this.outerDiv);
          done();
        });
        afterEach(function hook(done) {
          document.body.removeChild(this.outerDiv);
          done();
        });
        it('When the property is false.', function test(done) {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { shadowMapEnabled: false }, el: '#app' });
          function waitonload(callback) {
            if (!vm.$refs.frm.contentDocument || vm.$refs.frm.contentDocument.readyState !== 'complete') {
              setTimeout(() => {
                waitonload(callback);
              }, 10);
            } else {
              callback();
            }
          }
          waitonload(() => {
            vm.$nextTick(() => {
              setTimeout(() => {
                try {
                  assert.isFalse(vm.inst.shadowMap.enabled);
                  done();
                } catch (e) {
                  done(e);
                }
              }, 200);
            });
          });
        });
        it('When the property is true.', function test(done) {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { shadowMapEnabled: true }, el: '#app' });
          function waitonload(callback) {
            if (!vm.$refs.frm.contentDocument || vm.$refs.frm.contentDocument.readyState !== 'complete') {
              setTimeout(() => {
                waitonload(callback);
              }, 10);
            } else {
              callback();
            }
          }
          waitonload(() => {
            vm.$nextTick(() => {
              setTimeout(() => {
                try {
                  assert.isTrue(vm.inst.shadowMap.enabled);
                  done();
                } catch (e) {
                  done(e);
                }
              }, 0);
            });
          });
        });
      });
    });
  });
  describe('When an initial property changes', function suite() {
    it('The canvas element should be replaced.', function test(done) {
      const vm = new Vue(VglRenderer).$mount();
      const oldCanvas = vm.$refs.rdr;
      vm.alpha = true;
      vm.$nextTick(() => {
        try {
          assert.notEqual(oldCanvas, vm.$refs.rdr);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('The WebGLRenderer instance should be newly created.', function test(done) {
      const vm = new Vue(VglRenderer).$mount();
      const oldInst = vm.inst;
      vm.alpha = true;
      vm.$nextTick(() => {
        try {
          assert.notEqual(oldInst, vm.inst);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('The domElement property of WebGLRenderer instance should be the replaced canvas.', function test(done) {
      const vm = new Vue(VglRenderer).$mount();
      vm.alpha = true;
      vm.$nextTick(() => {
        try {
          assert.strictEqual(vm.inst.options.canvas, vm.$refs.rdr);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  describe('When another property changes', function when() {
    beforeEach(function hook(done) {
      this.outerDiv = document.createElement('div');
      this.outerDiv.innerHTML = '<div id="app"></div>';
      document.body.appendChild(this.outerDiv);
      done();
    });
    afterEach(function hook(done) {
      document.body.removeChild(this.outerDiv);
      done();
    });
    describe('The shadowMapEnabled should affect the shadowMap.enabled.', function suite() {
      it('From false to true.', function test(done) {
        const vm = new Vue(VglRenderer).$mount('#app');
        vm.$nextTick(() => {
          vm.shadowMapEnabled = true;
          vm.$nextTick(() => {
            try {
              assert.isTrue(vm.inst.shadowMap.enabled);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
  });
  describe('Testing the rendering function', function suite() {
    beforeEach(function hook(done) {
      this.outerDiv = document.createElement('div');
      this.outerDiv.innerHTML = '<div id="app" style="height:150px;"></div>';
      document.body.appendChild(this.outerDiv);
      done();
    });
    afterEach(function hook(done) {
      document.body.removeChild(this.outerDiv);
      done();
    });
    it.skip('The render function of the instance should be called once with the scene and camera after the initialization.', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="s" camera="c" ref="r"><vgl-scene name="s" ref="s"></vgl-scene><vgl-perspective-camera name="c" ref="c" /></vgl-renderer>',
        components: {
          VglRenderer,
          VglScene,
          VglPerspectiveCamera,
        },
      }).$mount('#app');
      function waitonload(callback) {
        if (!vm.$refs.r.$refs.frm.contentDocument || vm.$refs.r.$refs.frm.contentDocument.readyState !== 'complete') {
          setTimeout(() => {
            waitonload(callback);
          }, 10);
        } else {
          callback();
        }
      }
      waitonload(() => {
        vm.$nextTick(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              try {
                assert.lengthOf(vm.$refs.r.inst.calledRenderWith, 1);
                assert.strictEqual(vm.$refs.r.inst.calledRenderWith[0][0], vm.$refs.s.inst);
                assert.strictEqual(vm.$refs.r.inst.calledRenderWith[0][1], vm.$refs.c.inst);
                done();
              } catch (e) {
                done(e);
              }
            }, 200);
          });
        });
      });
    });
    it('The render function of the instance should be called once with the scene and camera after vglUpdate() called.', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="s" camera="c" ref="r"><vgl-scene name="s" ref="s"><trigger-component ref="t" /></vgl-scene><vgl-perspective-camera name="c" ref="c" /></vgl-renderer>',
        components: {
          VglRenderer,
          VglScene,
          VglPerspectiveCamera,
          TriggerComponent: {
            inject: ['vglUpdate'],
            render: () => {},
          },
        },
      }).$mount('#app');
      function waitonload(callback) {
        if (!vm.$refs.r.$refs.frm.contentDocument || vm.$refs.r.$refs.frm.contentDocument.readyState !== 'complete') {
          setTimeout(() => {
            waitonload(callback);
          }, 10);
        } else {
          callback();
        }
      }
      waitonload(() => {
        vm.$nextTick(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              vm.$refs.r.inst.calledRenderWith = [];
              vm.$refs.t.vglUpdate();
              vm.$nextTick(() => {
                requestAnimationFrame(() => {
                  setTimeout(() => {
                    try {
                      assert.lengthOf(vm.$refs.r.inst.calledRenderWith, 1);
                      assert.strictEqual(vm.$refs.r.inst.calledRenderWith[0][0], vm.$refs.s.inst);
                      assert.strictEqual(vm.$refs.r.inst.calledRenderWith[0][1], vm.$refs.c.inst);
                      done();
                    } catch (e) {
                      done(e);
                    }
                  }, 200);
                });
              });
            }, 200);
          });
        });
      });
    });
    it('The render function should be called only once when vglUpdate() called multiple times.', function test(done) {
      const vm = new Vue({
        template: '<vgl-renderer scene="s" camera="c" ref="r"><vgl-scene name="s" ref="s"><trigger-component ref="t" /></vgl-scene><vgl-perspective-camera name="c" ref="c" /></vgl-renderer>',
        components: {
          VglRenderer,
          VglScene,
          VglPerspectiveCamera,
          TriggerComponent: {
            inject: ['vglUpdate'],
            render: () => {},
          },
        },
      }).$mount('#app');
      function waitonload(callback) {
        if (!vm.$refs.r.$refs.frm.contentDocument || vm.$refs.r.$refs.frm.contentDocument.readyState !== 'complete') {
          setTimeout(() => {
            waitonload(callback);
          }, 10);
        } else {
          callback();
        }
      }
      waitonload(() => {
        vm.$nextTick(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              vm.$refs.r.inst.calledRenderWith = [];
              vm.$refs.t.vglUpdate();
              vm.$refs.t.vglUpdate();
              vm.$refs.t.vglUpdate();
              requestAnimationFrame(() => {
                setTimeout(() => {
                  try {
                    assert.lengthOf(vm.$refs.r.inst.calledRenderWith, 1);
                    assert.strictEqual(vm.$refs.r.inst.calledRenderWith[0][0], vm.$refs.s.inst);
                    assert.strictEqual(vm.$refs.r.inst.calledRenderWith[0][1], vm.$refs.c.inst);
                    done();
                  } catch (e) {
                    done(e);
                  }
                }, 200);
              });
            }, 200);
          });
        });
      });
    });
  });
});
