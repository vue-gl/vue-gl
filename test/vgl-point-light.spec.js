describe('VglPointLight component', () => {
  const { VglPointLight } = VueGL
  const assert = chai.assert
  describe('Creating a light', () => {
    describe('The distance of the light should be same as the distance property.', () => {
      it('When the property is undefined.', () => {
        const vm = new Vue(VglPointLight)
        assert.strictEqual(vm.inst.distance, 0)
      })
      it('When the property is a number.', () => {
        const vm = new (Vue.extend(VglPointLight))({ propsData: { distance: 2.1 }})
        assert.strictEqual(vm.inst.distance, 2.1)
      })
      it('When the property is a string.', () => {
        const vm = new (Vue.extend(VglPointLight))({ propsData: { distance: '2.5' }})
        assert.strictEqual(vm.inst.distance, 2.5)
      })
    })
    describe('The decay of the light should be same as the decay property.', () => {
      it('When the property is undefined.', () => {
        const vm = new Vue(VglPointLight)
        assert.strictEqual(vm.inst.decay, 1)
      })
      it('When the property is a number.', () => {
        const vm = new (Vue.extend(VglPointLight))({ propsData: { decay: 2 }})
        assert.strictEqual(vm.inst.decay, 2)
      })
      it('When the property is a string.', () => {
        const vm = new (Vue.extend(VglPointLight))({ propsData: { decay: '3' }})
        assert.strictEqual(vm.inst.decay, 3)
      })
    })
  })
  describe('Watching properties', () => {
    it('The distance of the light should change when the distance property changes.', (done) => {
      const vm = new (Vue.extend(VglPointLight))({ propsData: { distance: 3.5 }})
      vm.distance = '1.8'
      vm.$nextTick(() => {
        try {
          assert.strictEqual(vm.inst.distance, 1.8)
          done()
        } catch (e) {
          done(e)
        }
      })
    })
    it('The decay of the light should change when the decay property changes.', (done) => {
      const vm = new (Vue.extend(VglPointLight))({ propsData: { decay: '1.5' }})
      vm.decay = 2.5
      vm.$nextTick(() => {
        try {
          assert.strictEqual(vm.inst.decay, 2.5)
          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })
})
