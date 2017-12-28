/* globals chai THREE Vue VueGL */

describe('VglRenderer component', () => {
  const {
    VglRenderer, VglNamespace, VglPerspectiveCamera, VglScene
  } = VueGL
  const assert = chai.assert
  before(function () {
    this.WebGLRenderer = THREE.WebGLRenderer
    THREE.WebGLRenderer = function (options) {
      this.options = options
      this.shadowMap = {}
      this.calledRenderWith = []
    }
    THREE.WebGLRenderer.prototype.setSize = () => {}
    THREE.WebGLRenderer.prototype.render = function (scene, camera) {
      this.calledRenderWith.push([scene, camera])
    }
  })
  after(function () {
    THREE.WebGLRenderer = this.WebGLRenderer
  })
  describe('Namespace injection', () => {
    describe('Should be able to access vglCameras', () => {
      it('When the component is the root namespace.', () => {
        const vm = new Vue({
          template: `<vgl-renderer camera="('&%" ref="rdr"><vgl-perspective-camera name="('&%" ref="cmr" /></vgl-renderer>`,
          components: { VglRenderer, VglPerspectiveCamera }
        }).$mount()
        assert.strictEqual(vm.$refs.rdr.cmr, vm.$refs.cmr.inst)
      })
      it('When the component is a descendant of the other namespace.', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-perspective-camera name="<!--" ref="cmr" /><vgl-renderer camera="<!--" ref="rdr" /></vgl-namespace>`,
          components: { VglNamespace, VglRenderer, VglPerspectiveCamera }
        }).$mount()
        assert.strictEqual(vm.$refs.rdr.cmr, vm.$refs.cmr.inst)
      })
    })
    describe('Should be able to access vglScenes', () => {
      it('When the component is the root namespace.', () => {
        const vm = new Vue({
          template: `<vgl-renderer scene="('&%" ref="rdr"><vgl-scene name="('&%" ref="scn" /></vgl-renderer>`,
          components: { VglRenderer, VglScene }
        }).$mount()
        assert.strictEqual(vm.$refs.rdr.scn, vm.$refs.scn.inst)
      })
      it('When the component is a descendant of the other namespace.', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-scene name="<!--" ref="scn" /><vgl-renderer scene="<!--" ref="rdr" /></vgl-namespace>`,
          components: { VglNamespace, VglRenderer, VglScene }
        }).$mount()
        assert.strictEqual(vm.$refs.rdr.scn, vm.$refs.scn.inst)
      })
    })
  })
  describe('Creating a renderer', () => {
    describe('Output canvas', () => {
      it('The domElement property of WebGLRenderer instance should be the Vue created canvas.', () => {
        const vm = new Vue(VglRenderer)
        assert.strictEqual(vm.$refs.rdr, vm.inst.options.canvas)
      })
    })
    describe('Context attributes', () => {
      describe('The alpha property should affect the alpha attribute.', () => {
        it('When the property is undefined (or false).', () => {
          const vm = new Vue(VglRenderer)
          assert.isFalse(vm.inst.options.alpha)
        })
        it('When the property is true.', () => {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { alpha: true }}).$mount()
          assert.isTrue(vm.inst.options.alpha)
        })
      })
      describe('The disableDepth property should affect the depth attribute.', () => {
        it('When the property is undefined (or false).', () => {
          const vm = new Vue(VglRenderer).$mount()
          assert.isTrue(vm.inst.options.depth)
        })
        it('When the property is true.', () => {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { disableDepth: true }}).$mount()
          assert.isFalse(vm.inst.options.depth)
        })
      })
      describe('The disableStencil property should affect the stencil attribute.', () => {
        it('When the property is undefined (or false).', () => {
          const vm = new Vue(VglRenderer).$mount()
          assert.isTrue(vm.inst.options.stencil)
        })
        it('When the property is true.', () => {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { disableStencil: true }}).$mount()
          assert.isFalse(vm.inst.options.stencil)
        })
      })
      describe('The antialias property should affect the antialias attribute.', () => {
        it('When the property is undefined (or false).', () => {
          const vm = new Vue(VglRenderer).$mount()
          assert.isFalse(vm.inst.options.antialias)
        })
        it('When the property is true.', () => {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { antialias: true }}).$mount()
          assert.isTrue(vm.inst.options.antialias)
        })
      })
      describe('The disablePremultipliedAlpha property should affect the premultipliedAlpha attribute.', () => {
        it('When the property is undefined (or false).', () => {
          const vm = new Vue(VglRenderer).$mount()
          assert.isTrue(vm.inst.options.premultipliedAlpha)
        })
        it('When the property is true.', () => {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { disablePremultipliedAlpha: true }}).$mount()
          assert.isFalse(vm.inst.options.premultipliedAlpha)
        })
      })
      describe('The preserveDrawingBuffer property should affect the preserveDrawingBuffer attribute.', () => {
        it('When the property is undefined (or false).', () => {
          const vm = new Vue(VglRenderer).$mount()
          assert.isFalse(vm.inst.options.preserveDrawingBuffer)
        })
        it('When the property is true.', () => {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { preserveDrawingBuffer: true }}).$mount()
          assert.isTrue(vm.inst.options.preserveDrawingBuffer)
        })
      })
    })
    describe('Capabilities', () => {
      describe('The logarithmicDepthBuffer property should affect the logarithmicDepthBuffer capability.', () => {
        it('When the property is undefined (or false).', () => {
          const vm = new Vue(VglRenderer).$mount()
          assert.isFalse(vm.inst.options.logarithmicDepthBuffer)
        })
        it('When the property is true.', () => {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { logarithmicDepthBuffer: true }}).$mount()
          assert.isTrue(vm.inst.options.logarithmicDepthBuffer)
        })
      })
      describe('The precision property should affect the precision capability.', () => {
        it('When the property is undefined (or false).', () => {
          const vm = new Vue(VglRenderer).$mount()
          assert.isUndefined(vm.inst.options.precision)
        })
        it('When the property is "lowp".', () => {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { precision: 'lowp' }}).$mount()
          assert.strictEqual(vm.inst.options.precision, 'lowp')
        })
        it('When the property is "mediump".', () => {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { precision: 'mediump' }}).$mount()
          assert.strictEqual(vm.inst.options.precision, 'mediump')
        })
        it('When the property is "highp".', () => {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { precision: 'highp' }}).$mount()
          assert.strictEqual(vm.inst.options.precision, 'highp')
        })
      })
    })
    describe('Properties', () => {
      describe('The shadowMapEnabled property should affect the shadowMap.enabled.', () => {
        beforeEach(function () {
          this.outerDiv = document.createElement('div')
          this.outerDiv.innerHTML = '<div id="app"></div>'
          document.body.appendChild(this.outerDiv)
        })
        afterEach(function () {
          document.body.removeChild(this.outerDiv)
        })
        it('When the property is false.', (done) => {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { shadowMapEnabled: false }, el: '#app' })
          function waitonload (callback) {
            if (!vm.$refs.frm.contentDocument || vm.$refs.frm.contentDocument.readyState !== 'complete') {
              setTimeout(() => {
                waitonload(callback)
              }, 10)
            } else {
              callback()
            }
          }
          waitonload(() => {
            vm.$nextTick(() => {
              setTimeout(() => {
                try {
                  assert.isFalse(vm.inst.shadowMap.enabled)
                  done()
                } catch (e) {
                  done(e)
                }
              }, 0)
            })
          })
        })
        it('When the property is true.', (done) => {
          const vm = new (Vue.extend(VglRenderer))({ propsData: { shadowMapEnabled: true }, el: '#app' })
          function waitonload (callback) {
            if (!vm.$refs.frm.contentDocument || vm.$refs.frm.contentDocument.readyState !== 'complete') {
              setTimeout(() => {
                waitonload(callback)
              }, 10)
            } else {
              callback()
            }
          }
          waitonload(() => {
            vm.$nextTick(() => {
              setTimeout(() => {
                try {
                  assert.isTrue(vm.inst.shadowMap.enabled)
                  done()
                } catch (e) {
                  done(e)
                }
              }, 0)
            })
          })
        })
      })
    })
  })
  describe('When an initial property changes', () => {
    it('The canvas element should be replaced.', (done) => {
      const vm = new Vue(VglRenderer).$mount()
      const oldCanvas = vm.$refs.rdr
      vm.alpha = true
      vm.$nextTick(() => {
        try {
          assert.notEqual(oldCanvas, vm.$refs.rdr)
          done()
        } catch (e) {
          done(e)
        }
      })
    })
    it('The WebGLRenderer instance should be newly created.', (done) => {
      const vm = new Vue(VglRenderer).$mount()
      const oldInst = vm.inst
      vm.alpha = true
      vm.$nextTick(() => {
        try {
          assert.notEqual(oldInst, vm.inst)
          done()
        } catch (e) {
          done(e)
        }
      })
    })
    it('The domElement property of WebGLRenderer instance should be the replaced canvas.', (done) => {
      const vm = new Vue(VglRenderer).$mount()
      vm.alpha = true
      vm.$nextTick(() => {
        try {
          assert.strictEqual(vm.inst.options.canvas, vm.$refs.rdr)
          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })
  describe('When another property changes', () => {
    beforeEach(function () {
      this.outerDiv = document.createElement('div')
      this.outerDiv.innerHTML = '<div id="app"></div>'
      document.body.appendChild(this.outerDiv)
    })
    afterEach(function () {
      document.body.removeChild(this.outerDiv)
    })
    describe('The shadowMapEnabled should affect the shadowMap.enabled.', () => {
      it('From false to true.', (done) => {
        const vm = new Vue(VglRenderer).$mount('#app')
        vm.$nextTick(() => {
          vm.shadowMapEnabled = true
          vm.$nextTick(() => {
            try {
              assert.isTrue(vm.inst.shadowMap.enabled)
              done()
            } catch (e) {
              done(e)
            }
          })
        })
      })
    })
  })
  describe('Testing the rendering function', () => {
    beforeEach(function () {
      this.outerDiv = document.createElement('div')
      this.outerDiv.innerHTML = '<div id="app" style="height:150px;"></div>'
      document.body.appendChild(this.outerDiv)
    })
    afterEach(function () {
      document.body.removeChild(this.outerDiv)
    })
    it('The render function of the instance should be called once with the scene and camera after the initialization.', (done) => {
      const vm = new Vue({
        template: `<vgl-renderer scene="s" camera="c" ref="r"><vgl-scene name="s" ref="s"></vgl-scene><vgl-perspective-camera name="c" ref="c" /></vgl-renderer>`,
        components: {
          VglRenderer,
          VglScene,
          VglPerspectiveCamera
        }
      }).$mount('#app')
      function waitonload (callback) {
        if (!vm.$refs.r.$refs.frm.contentDocument || vm.$refs.r.$refs.frm.contentDocument.readyState !== 'complete') {
          setTimeout(() => {
            waitonload(callback)
          }, 10)
        } else {
          callback()
        }
      }
      waitonload(() => {
        vm.$nextTick(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              try {
                assert.lengthOf(vm.$refs.r.inst.calledRenderWith, 1)
                assert.strictEqual(vm.$refs.r.inst.calledRenderWith[0][0], vm.$refs.s.inst)
                assert.strictEqual(vm.$refs.r.inst.calledRenderWith[0][1], vm.$refs.c.inst)
                done()
              } catch (e) {
                done(e)
              }
            }, 0)
          })
        })
      })
    })
    it('The render function of the instance should be called once with the scene and camera after vglUpdate() called.', (done) => {
      const vm = new Vue({
        template: `<vgl-renderer scene="s" camera="c" ref="r"><vgl-scene name="s" ref="s"><trigger-component ref="t" /></vgl-scene><vgl-perspective-camera name="c" ref="c" /></vgl-renderer>`,
        components: {
          VglRenderer,
          VglScene,
          VglPerspectiveCamera,
          TriggerComponent: {
            inject: ['vglUpdate'],
            render: () => {}
          }
        }
      }).$mount('#app')
      function waitonload (callback) {
        if (!vm.$refs.r.$refs.frm.contentDocument || vm.$refs.r.$refs.frm.contentDocument.readyState !== 'complete') {
          setTimeout(() => {
            waitonload(callback)
          }, 10)
        } else {
          callback()
        }
      }
      waitonload(() => {
        vm.$nextTick(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              vm.$refs.r.inst.calledRenderWith = []
              vm.$refs.t.vglUpdate()
              vm.$nextTick(() => {
                requestAnimationFrame(() => {
                  setTimeout(() => {
                    try {
                      assert.lengthOf(vm.$refs.r.inst.calledRenderWith, 1)
                      assert.strictEqual(vm.$refs.r.inst.calledRenderWith[0][0], vm.$refs.s.inst)
                      assert.strictEqual(vm.$refs.r.inst.calledRenderWith[0][1], vm.$refs.c.inst)
                      done()
                    } catch (e) {
                      done(e)
                    }
                  })
                })
              })
            }, 0)
          })
        })
      })
    })
    it('The render function should be called only once when vglUpdate() called multiple times.', (done) => {
      const vm = new Vue({
        template: `<vgl-renderer scene="s" camera="c" ref="r"><vgl-scene name="s" ref="s"><trigger-component ref="t" /></vgl-scene><vgl-perspective-camera name="c" ref="c" /></vgl-renderer>`,
        components: {
          VglRenderer,
          VglScene,
          VglPerspectiveCamera,
          TriggerComponent: {
            inject: ['vglUpdate'],
            render: () => {}
          }
        }
      }).$mount('#app')
      function waitonload (callback) {
        if (!vm.$refs.r.$refs.frm.contentDocument || vm.$refs.r.$refs.frm.contentDocument.readyState !== 'complete') {
          setTimeout(() => {
            waitonload(callback)
          }, 10)
        } else {
          callback()
        }
      }
      waitonload(() => {
        vm.$nextTick(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              vm.$refs.r.inst.calledRenderWith = []
              vm.$refs.t.vglUpdate()
              vm.$refs.t.vglUpdate()
              vm.$refs.t.vglUpdate()
              requestAnimationFrame(() => {
                setTimeout(() => {
                  try {
                    assert.lengthOf(vm.$refs.r.inst.calledRenderWith, 1)
                    assert.strictEqual(vm.$refs.r.inst.calledRenderWith[0][0], vm.$refs.s.inst)
                    assert.strictEqual(vm.$refs.r.inst.calledRenderWith[0][1], vm.$refs.c.inst)
                    done()
                  } catch (e) {
                    done(e)
                  }
                })
              })
            }, 0)
          })
        })
      })
    })
  })
})
