/* globals chai THREE Vue VueGL */

describe('VglScene component', () => {
  const { VglScene, VglRenderer } = VueGL
  const assert = chai.assert
  before(function () {
    this.WebGLRenderer = THREE.WebGLRenderer
    THREE.WebGLRenderer = function () {
      this.shadowMap = {}
    }
    THREE.WebGLRenderer.prototype.setSize = () => {}
  })
  after(function () {
    THREE.WebGLRenderer = this.WebGLRenderer
  })
  describe('The instance should be registered to the injected namespace.', () => {
    it('Should be registered when created.', () => {
      const vm = new Vue({
        template: `<vgl-renderer ref="mr"><vgl-scene name="dm'&^>" ref="me" /><other-component ref="other" /></vgl-renderer>`,
        components: {
          VglScene,
          VglRenderer,
          OtherComponent: {
            inject: ['vglScenes'],
            render () {}
          }
        }
      }).$mount()
      assert.strictEqual(vm.$refs.other.vglScenes.forGet["dm'&^>"], vm.$refs.me.inst)
    })
    it('Should be unregistered when destroyed.', (done) => {
      const vm = new Vue({
        template: `<vgl-renderer ref="mr"><vgl-scene name="n<!--" v-if="!destroyed" /><other-component ref="other" /></vgl-renderer>`,
        components: {
          VglScene,
          VglRenderer,
          OtherComponent: {
            inject: ['vglScenes'],
            render () {}
          }
        },
        data: { destroyed: false }
      }).$mount()
      assert.hasAllKeys(vm.$refs.other.vglScenes.forGet, ['n<!--'])
      vm.destroyed = true
      vm.$nextTick(() => {
        try {
          assert.isEmpty(vm.$refs.other.vglScenes.forGet)
          done()
        } catch (e) {
          done(e)
        }
      })
    })
    it('Should be replaced when the instance is replaced.', (done) => {
      const vm = new Vue({
        template: `<vgl-renderer><mixed-in name="'<!--" ref="geo" /><other-component ref="other" /></vgl-renderer>`,
        components: {
          VglRenderer,
          MixedIn: {
            mixins: [VglScene],
            computed: {
              inst () { return this.i }
            },
            data: () => ({ i: new THREE.Scene() })
          },
          OtherComponent: {
            inject: ['vglScenes'],
            render () {}
          }
        }
      }).$mount()
      vm.$refs.geo.i = new THREE.Scene()
      vm.$nextTick(() => {
        try {
          assert.strictEqual(vm.$refs.other.vglScenes.forGet["'<!--"], vm.$refs.geo.inst)
          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })
})
