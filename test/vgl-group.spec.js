describe('VglGroup component', () => {
  const { VglGroup } = VueGL
  const assert = chai.assert
  it('The instance should be a Group object.', () => {
    const vm = new Vue(VglGroup)
    assert.equal(vm.inst.type, 'Group')
  })
})
