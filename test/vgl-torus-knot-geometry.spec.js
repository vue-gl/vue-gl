describe('VglTorusKnotGeometry component', () => {
  const { VglTorusKnotGeometry, VglNamespace } = VueGL
  const assert = chai.assert
  describe('Parameters of a instance should be same as the component properties.', () => {
    it('When properties are number.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-torus-knot-geometry ref="geo" :radius="15.8" :tube="6.2" :radial-segments="20" :tubular-segments="30" :p="1.1" :q="2.1" /></vgl-namespace>`,
        components: { VglTorusKnotGeometry, VglNamespace }
      }).$mount()
      assert.strictEqual(vm.$refs.geo.inst.parameters.radius, 15.8)
      assert.strictEqual(vm.$refs.geo.inst.parameters.tube, 6.2)
      assert.strictEqual(vm.$refs.geo.inst.parameters.radialSegments, 20)
      assert.strictEqual(vm.$refs.geo.inst.parameters.tubularSegments, 30)
      assert.strictEqual(vm.$refs.geo.inst.parameters.p, 1.1)
      assert.strictEqual(vm.$refs.geo.inst.parameters.q, 2.1)
    })
    it('When properties are string.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-torus-knot-geometry ref="geo" radius="15.8" tube="6.2" radial-segments="20" tubular-segments="30" p="1.1" q="2.1" /></vgl-namespace>`,
        components: { VglTorusKnotGeometry, VglNamespace }
      }).$mount()
      assert.strictEqual(vm.$refs.geo.inst.parameters.radius, 15.8)
      assert.strictEqual(vm.$refs.geo.inst.parameters.tube, 6.2)
      assert.strictEqual(vm.$refs.geo.inst.parameters.radialSegments, 20)
      assert.strictEqual(vm.$refs.geo.inst.parameters.tubularSegments, 30)
      assert.strictEqual(vm.$refs.geo.inst.parameters.p, 1.1)
      assert.strictEqual(vm.$refs.geo.inst.parameters.q, 2.1)
    })
    it('When segment numbers are undefined.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-torus-knot-geometry ref="geo" /></vgl-namespace>`,
        components: { VglTorusKnotGeometry, VglNamespace }
      }).$mount()
      assert.isUndefined(vm.$refs.geo.inst.parameters.radius)
      assert.isUndefined(vm.$refs.geo.inst.parameters.tube)
      assert.isUndefined(vm.$refs.geo.inst.parameters.radialSegments)
      assert.isUndefined(vm.$refs.geo.inst.parameters.tubularSegments)
      assert.isUndefined(vm.$refs.geo.inst.parameters.p)
      assert.isUndefined(vm.$refs.geo.inst.parameters.q)
    })
  })
  describe('Instance should be recreated when a property changed.', () => {
    it('When the width property changes.', (done) => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-torus-knot-geometry ref="geo" :radius="radius" /></vgl-namespace>`,
        components: { VglTorusKnotGeometry, VglNamespace },
        data: { radius: 250 }
      }).$mount()
      const before = vm.$refs.geo.inst
      vm.radius = 120
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
