describe('VglBoxGeometry component', () => {
  const { VglBoxGeometry, VglNamespace } = VueGL
  const assert = chai.assert
  describe('Parameters of a instance should be same as the component properties.', () => {
    it('When properties are number.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-box-geometry ref="geo" :width="10" :height="6" :depth="8" :widthSegments="2" :heightSegments="3" :depthSegments="6" /></vgl-namespace>`,
        components: { VglBoxGeometry, VglNamespace }
      }).$mount()
      assert.strictEqual(vm.$refs.geo.inst.parameters.width, 10)
      assert.strictEqual(vm.$refs.geo.inst.parameters.height, 6)
      assert.strictEqual(vm.$refs.geo.inst.parameters.depth, 8)
      assert.strictEqual(vm.$refs.geo.inst.parameters.widthSegments, 2)
      assert.strictEqual(vm.$refs.geo.inst.parameters.heightSegments, 3)
      assert.strictEqual(vm.$refs.geo.inst.parameters.depthSegments, 6)
    })
    it('When properties are string.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-box-geometry ref="geo" width="100" height="60" depth="80" widthSegments="3" heightSegments="4" depthSegments="7" /></vgl-namespace>`,
        components: { VglBoxGeometry, VglNamespace }
      }).$mount()
      assert.strictEqual(vm.$refs.geo.inst.parameters.width, 100)
      assert.strictEqual(vm.$refs.geo.inst.parameters.height, 60)
      assert.strictEqual(vm.$refs.geo.inst.parameters.depth, 80)
      assert.strictEqual(vm.$refs.geo.inst.parameters.widthSegments, 3)
      assert.strictEqual(vm.$refs.geo.inst.parameters.heightSegments, 4)
      assert.strictEqual(vm.$refs.geo.inst.parameters.depthSegments, 7)
    })
    it('When segment numbers are undefined.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-box-geometry ref="geo" :width="1.5" :height="6.2" :depth="-8" /></vgl-namespace>`,
        components: { VglBoxGeometry, VglNamespace }
      }).$mount()
      assert.strictEqual(vm.$refs.geo.inst.parameters.width, 1.5)
      assert.strictEqual(vm.$refs.geo.inst.parameters.height, 6.2)
      assert.strictEqual(vm.$refs.geo.inst.parameters.depth, -8)
      assert.isUndefined(vm.$refs.geo.inst.parameters.widthSegments)
      assert.isUndefined(vm.$refs.geo.inst.parameters.heightSegments)
      assert.isUndefined(vm.$refs.geo.inst.parameters.depthSegments)
    })
  })
  describe('Instance should be recreated when a property changed.', () => {
    it('When the width property changes.', (done) => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-box-geometry ref="geo" :width="width" height="3" depth="50.3" /></vgl-namespace>`,
        components: { VglBoxGeometry, VglNamespace },
        data: { width: 25 }
      }).$mount()
      const before = vm.$refs.geo.inst
      vm.width = 11
      vm.$nextTick(() => {
        try {
          assert.notEqual(before, vm.$refs.geo.inst)
          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })
})
