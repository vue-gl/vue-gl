describe('VglExtrudeGeometry component', () => {
  const { VglExtrudeGeometry, VglNamespace } = VueGL
  const assert = chai.assert
  it('The instance should be an ExtrudeGeometry object.', () => {
    const vm = new Vue({
      template: `<vgl-namespace><vgl-extrude-geometry ref="ext" /></vgl-namespace>`,
      components: {
        VglExtrudeGeometry,
        VglNamespace
      }
    }).$mount()
    assert.strictEqual(vm.$refs.ext.inst.type, 'ExtrudeGeometry')
  })
})
