describe('VglLine component', () => {
  const {
    VglLine, VglGeometry, VglMaterial, VglNamespace
  } = VueGL
  const assert = chai.assert
  describe('Creating an object', () => {
    it('The geometry of an instance should be set to the geometry that has the corresponding name property.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-line geometry="u!$ok" ref="line" /><vgl-geometry name="u!$ok" ref="geo" /></vgl-namespace>`,
        components: { VglLine, VglGeometry, VglNamespace }
      }).$mount()
      assert.strictEqual(vm.$refs.line.inst.geometry, vm.$refs.geo.inst)
    })
    it('The material of an instance should be set to the material that has the corresponding name property.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-material name="u!$ok" ref="mat" /><vgl-line material="u!$ok" ref="line" /></vgl-namespace>`,
        components: { VglLine, VglMaterial, VglNamespace }
      }).$mount()
      assert.strictEqual(vm.$refs.line.inst.material, vm.$refs.mat.inst)
    })
  })
})
