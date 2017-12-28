describe('VglAxesHelper component', () => {
  const { VglAxesHelper, VglNamespace } = VueGL
  const assert = chai.assert
  describe('Creating an object', () => {
    describe('The size of axes should be same as the size property.', () => {
      it('When the property is a number', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-axes-helper :size="3.8" ref="helper" /></vgl-namespace>`,
          components: { VglAxesHelper, VglNamespace }
        }).$mount()
        vm.$refs.helper.inst.geometry.computeBoundingBox()
        const size = vm.$refs.helper.inst.geometry.boundingBox.getSize()
        assert.closeTo(size.x, 3.8, 1e-6)
        assert.closeTo(size.y, 3.8, 1e-6)
        assert.closeTo(size.z, 3.8, 1e-6)
      })
      it('When the property is a string', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-axes-helper size="4.3" ref="helper" /></vgl-namespace>`,
          components: { VglAxesHelper, VglNamespace }
        }).$mount()
        vm.$refs.helper.inst.geometry.computeBoundingBox()
        const size = vm.$refs.helper.inst.geometry.boundingBox.getSize()
        assert.closeTo(size.x, 4.3, 1e-6)
        assert.closeTo(size.y, 4.3, 1e-6)
        assert.closeTo(size.z, 4.3, 1e-6)
      })
      it('When the property is undefined', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-axes-helper ref="helper" /></vgl-namespace>`,
          components: { VglAxesHelper, VglNamespace }
        }).$mount()
        vm.$refs.helper.inst.geometry.computeBoundingBox()
        const size = vm.$refs.helper.inst.geometry.boundingBox.getSize()
        assert.closeTo(size.x, 1, 1e-6)
        assert.closeTo(size.y, 1, 1e-6)
        assert.closeTo(size.z, 1, 1e-6)
      })
    })
  })
  describe('Watching properties', () => {
    it('The instance should be recreated when a property changes.', (done) => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-axes-helper :size="size" ref="helper" /></vgl-namespace>`,
        components: { VglAxesHelper, VglNamespace },
        data: { size: 1.1 }
      }).$mount()
      const before = vm.$refs.helper.inst
      vm.size = 1.5
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
