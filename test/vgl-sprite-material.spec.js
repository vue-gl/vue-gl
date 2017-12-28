/* global chai Vue VueGL */

describe('VglSpriteMaterial component', () => {
  const { VglSpriteMaterial, VglNamespace } = VueGL
  const assert = chai.assert
  describe('Creating a material', () => {
    describe('The color of the material should be same as the color property.', () => {
      it('When the property is undefined.', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-sprite-material ref="mat" /></vgl-namespace>`,
          components: { VglSpriteMaterial, VglNamespace }
        }).$mount()
        assert.strictEqual(vm.$refs.mat.inst.color.r, 255 / 255)
        assert.strictEqual(vm.$refs.mat.inst.color.g, 255 / 255)
        assert.strictEqual(vm.$refs.mat.inst.color.b, 255 / 255)
      })
      it('When the property is a color name.', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-sprite-material color="orangered" ref="mat" /></vgl-namespace>`,
          components: { VglSpriteMaterial, VglNamespace }
        }).$mount()
        assert.strictEqual(vm.$refs.mat.inst.color.r, 255 / 255)
        assert.strictEqual(vm.$refs.mat.inst.color.g, 69 / 255)
        assert.strictEqual(vm.$refs.mat.inst.color.b, 0 / 255)
      })
    })
  })
  describe('Watching property', () => {
    it('The color of the material should change when the color property changes.', (done) => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-sprite-material :color="color" ref="mat" /></vgl-namespace>`,
        components: { VglSpriteMaterial, VglNamespace },
        data: { color: 'orangered' }
      }).$mount()
      vm.color = '#fff5ee'
      vm.$nextTick(() => {
        try {
          assert.strictEqual(vm.$refs.mat.inst.color.r, 255 / 255)
          assert.strictEqual(vm.$refs.mat.inst.color.g, 245 / 255)
          assert.strictEqual(vm.$refs.mat.inst.color.b, 238 / 255)
          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })
})
