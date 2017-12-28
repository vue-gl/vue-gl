/* globals chai Vue VueGL */

describe('VglDirectionalLight component', () => {
  const { VglDirectionalLight } = VueGL
  const assert = chai.assert
  it('The instance should be an DirectionalLight object.', () => {
    const vm = new Vue(VglDirectionalLight)
    assert.isTrue(vm.inst.isDirectionalLight)
  })
  describe('Properties of the light', () => {
    describe('The castShadow property', () => {
      it('When the property is false.', () => {
        const vm = new (Vue.extend(VglDirectionalLight))({
          propsData: { castShadow: false }
        })
        assert.isFalse(vm.inst.castShadow)
      })
      it('When the property is true.', () => {
        const vm = new (Vue.extend(VglDirectionalLight))({
          propsData: { castShadow: true }
        })
        assert.isTrue(vm.inst.castShadow)
      })
    })
  })
  describe('Watching properties', () => {
    describe('The castShadow property', () => {
      it('The instance property should be reflected when the property changes.', (done) => {
        const vm = new Vue(VglDirectionalLight)
        vm.castShadow = true
        vm.$nextTick(() => {
          try {
            assert.isTrue(vm.inst.castShadow)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
    })
  })
})
