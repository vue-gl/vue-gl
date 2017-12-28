describe('VglCylinderGeometry component', () => {
  const { VglCylinderGeometry, VglNamespace } = VueGL
  const assert = chai.assert
  describe('Parameters of a instance should be same as the component properties.', () => {
    it('When properties are number.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-cylinder-geometry ref="geo" :radiusTop="10.1" :radiusBottom="10.2" :height="15.86" :radialSegments="12" :heightSegments="6" :openEnded="true" :thetaStart="0.67" :thetaLength="2.24" /></vgl-namespace>`,
        components: { VglCylinderGeometry, VglNamespace }
      }).$mount()
      assert.strictEqual(vm.$refs.geo.inst.parameters.radiusTop, 10.1)
      assert.strictEqual(vm.$refs.geo.inst.parameters.radiusBottom, 10.2)
      assert.strictEqual(vm.$refs.geo.inst.parameters.height, 15.86)
      assert.strictEqual(vm.$refs.geo.inst.parameters.radialSegments, 12)
      assert.strictEqual(vm.$refs.geo.inst.parameters.heightSegments, 6)
      assert.isTrue(vm.$refs.geo.inst.parameters.openEnded)
      assert.strictEqual(vm.$refs.geo.inst.parameters.thetaStart, 0.67)
      assert.strictEqual(vm.$refs.geo.inst.parameters.thetaLength, 2.24)
    })
    it('When properties are string.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-cylinder-geometry ref="geo" radiusTop="1.01" radiusBottom="1.02" height="1.586" radialSegments="11" heightSegments="5" openEnded thetaStart="0.63" thetaLength="2.21" /></vgl-namespace>`,
        components: { VglCylinderGeometry, VglNamespace }
      }).$mount()
      assert.strictEqual(vm.$refs.geo.inst.parameters.radiusTop, 1.01)
      assert.strictEqual(vm.$refs.geo.inst.parameters.radiusBottom, 1.02)
      assert.strictEqual(vm.$refs.geo.inst.parameters.height, 1.586)
      assert.strictEqual(vm.$refs.geo.inst.parameters.radialSegments, 11)
      assert.strictEqual(vm.$refs.geo.inst.parameters.heightSegments, 5)
      assert.isTrue(vm.$refs.geo.inst.parameters.openEnded)
      assert.strictEqual(vm.$refs.geo.inst.parameters.thetaStart, 0.63)
      assert.strictEqual(vm.$refs.geo.inst.parameters.thetaLength, 2.21)
    })
    it('When properties are undefined.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-cylinder-geometry ref="geo" /></vgl-namespace>`,
        components: { VglCylinderGeometry, VglNamespace }
      }).$mount()
      assert.isUndefined(vm.$refs.geo.inst.parameters.radiusTop)
      assert.isUndefined(vm.$refs.geo.inst.parameters.radiusBottom)
      assert.isUndefined(vm.$refs.geo.inst.parameters.height)
      assert.isUndefined(vm.$refs.geo.inst.parameters.radialSegments)
      assert.isUndefined(vm.$refs.geo.inst.parameters.heightSegments)
      assert.isFalse(vm.$refs.geo.inst.parameters.openEnded)
      assert.isUndefined(vm.$refs.geo.inst.parameters.thetaStart)
      assert.isUndefined(vm.$refs.geo.inst.parameters.thetaLength)
    })
  })
  describe('Instance should be recreated when a property changed.', () => {
    it('When the radius property changes.', (done) => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-cylinder-geometry ref="geo" :radiusTop="radiusTop" /></vgl-namespace>`,
        components: { VglCylinderGeometry, VglNamespace },
        data: { radiusTop: 25 }
      }).$mount()
      const before = vm.$refs.geo.inst
      vm.radiusTop = 11
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
