describe('VglAmbientLight component', () => {
  const { VglAmbientLight } = VueGL
  const assert = chai.assert
  it('The instance should be an AmbientLight object.', () => {
    const vm = new Vue(VglAmbientLight)
    assert.isTrue(vm.inst.isAmbientLight)
  })
})
