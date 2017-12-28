describe('VglOctahedronGeometry component', () => {
  const { VglOctahedronGeometry, VglNamespace } = VueGL
  const assert = chai.assert
  describe('Parameters of a instance should be same as the component properties.', () => {
    it('When properties are number.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-octahedron-geometry ref="geo" :radius="11.1" :detail="2" /></vgl-namespace>`,
        components: { VglOctahedronGeometry, VglNamespace }
      }).$mount()
      assert.strictEqual(vm.$refs.geo.inst.parameters.radius, 11.1)
      assert.strictEqual(vm.$refs.geo.inst.parameters.detail, 2)
    })
    it('When properties are string.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-octahedron-geometry ref="geo" radius="1.11" detail="3" /></vgl-namespace>`,
        components: { VglOctahedronGeometry, VglNamespace }
      }).$mount()
      assert.strictEqual(vm.$refs.geo.inst.parameters.radius, 1.11)
      assert.strictEqual(vm.$refs.geo.inst.parameters.detail, 3)
    })
    it('When properties are undefined.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-octahedron-geometry ref="geo" /></vgl-namespace>`,
        components: { VglOctahedronGeometry, VglNamespace }
      }).$mount()
      assert.isUndefined(vm.$refs.geo.inst.parameters.radius)
      assert.isUndefined(vm.$refs.geo.inst.parameters.detail)
    })
  })
  describe('Instance should be recreated when a property changed.', () => {
    it('When the radius property changes.', (done) => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-octahedron-geometry ref="geo" :radius="radius" /></vgl-namespace>`,
        components: { VglOctahedronGeometry, VglNamespace },
        data: { radius: 25 }
      }).$mount()
      const before = vm.$refs.geo.inst
      vm.radius = 11
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
