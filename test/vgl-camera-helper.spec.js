/* globals chai Vue VueGL */

describe('VglCameraHelper component', () => {
  const { VglCameraHelper, VglNamespace, VglPerspectiveCamera } = VueGL
  const assert = chai.assert
  describe('Creating an object', () => {
    it('The visualized camera should be the specifically named camera.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-camera-helper camera="cmr'" ref="helper" /><vgl-perspective-camera name="cmr'" ref="cmr" /></vgl-namespace>`,
        components: { VglCameraHelper, VglPerspectiveCamera, VglNamespace }
      }).$mount()
      assert.strictEqual(vm.$refs.helper.inst.camera, vm.$refs.cmr.inst)
    })
    it('The instance should be an empty Object3D when the camera does not exist.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-camera-helper ref="helper" /></vgl-namespace>`,
        components: { VglCameraHelper, VglNamespace }
      }).$mount()
      assert.isTrue(vm.$refs.helper.inst.isObject3D)
    })
  })
  describe('Watching properties', () => {
    it('The instance should be recreated when a property changes.', (done) => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-camera-helper :camera="cmr" ref="helper" /><vgl-perspective-camera v-for="n of ['a', 'b']" :name="n" :key="n" /></vgl-namespace>`,
        components: { VglCameraHelper, VglPerspectiveCamera, VglNamespace },
        data: { cmr: 'a' }
      }).$mount()
      const before = vm.$refs.helper.inst
      vm.cmr = 'b'
      vm.$nextTick(() => {
        try {
          assert.notEqual(before, vm.$refs.helper.inst)
          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })
})
