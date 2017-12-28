/* globals chai THREE Vue VueGL */

describe('VglDirectionalLightHelper component', () => {
  const { VglDirectionalLightHelper, VglDirectionalLight, VglNamespace } = VueGL
  const assert = chai.assert
  describe('Creating a helper', () => {
    describe('The color of the helper', () => {
      it('should be same as the color property.', (done) => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-directional-light posision="1 0 0"><vgl-directional-light-helper color="red" ref="helper" /></vgl-directional-light></vgl-namespace>`,
          components: { VglDirectionalLightHelper, VglDirectionalLight, VglNamespace }
        }).$mount()
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.helper.inst.lightPlane.material.color.r, 255 / 255)
            assert.strictEqual(vm.$refs.helper.inst.lightPlane.material.color.g, 0 / 255)
            assert.strictEqual(vm.$refs.helper.inst.lightPlane.material.color.b, 0 / 255)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
      it("should be same as the light's color.", (done) => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-directional-light color="yellow"><vgl-directional-light-helper ref="helper" /></vgl-directional-light></vgl-namespace>`,
          components: { VglDirectionalLightHelper, VglDirectionalLight, VglNamespace }
        }).$mount()
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.helper.inst.lightPlane.material.color.r, 255 / 255)
            assert.strictEqual(vm.$refs.helper.inst.lightPlane.material.color.g, 255 / 255)
            assert.strictEqual(vm.$refs.helper.inst.lightPlane.material.color.b, 0 / 255)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
    })
    describe('The visualized light should be the parent object.', () => {
      it('When the parent component is a VglDirectionalLight.', (done) => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-directional-light ref="light"><vgl-directional-light-helper ref="helper" /></vgl-directional-light></vgl-namespace>`,
          components: { VglDirectionalLight, VglDirectionalLightHelper, VglNamespace }
        }).$mount()
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.light.inst, vm.$refs.helper.inst.light)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
      it('When a parent component does not exit.', (done) => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-directional-light-helper ref="helper" /></vgl-namespace>`,
          components: { VglDirectionalLightHelper, VglNamespace }
        }).$mount()
        vm.$nextTick(() => {
          try {
            assert.notInstanceOf(vm.$refs.helper.inst, THREE.DirectionalLightHelper)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
    })
  })
  describe('Watching properties', () => {
    it('The color of the helper should change when the color property changes.', (done) => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-directional-light><vgl-directional-light-helper :color="color" ref="helper" /></vgl-directional-light></vgl-namespace>`,
        components: { VglDirectionalLightHelper, VglDirectionalLight, VglNamespace },
        data: { color: 'red' }
      }).$mount()
      vm.$nextTick(() => {
        vm.color = '#aa87C5'
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.helper.inst.lightPlane.material.color.r, 170 / 255)
            assert.strictEqual(vm.$refs.helper.inst.lightPlane.material.color.g, 135 / 255)
            assert.strictEqual(vm.$refs.helper.inst.lightPlane.material.color.b, 197 / 255)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
    })
    it('The color of the helper should change when the parent light color changes.', (done) => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-directional-light :color="color"><vgl-directional-light-helper ref="helper" /></vgl-directional-light></vgl-namespace>`,
        components: { VglDirectionalLightHelper, VglDirectionalLight, VglNamespace },
        data: { color: 'red' }
      }).$mount()
      vm.$nextTick(() => {
        vm.color = '#aa87C5'
        vm.$nextTick(() => {
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.helper.inst.lightPlane.material.color.r, 170 / 255)
              assert.strictEqual(vm.$refs.helper.inst.lightPlane.material.color.g, 135 / 255)
              assert.strictEqual(vm.$refs.helper.inst.lightPlane.material.color.b, 197 / 255)
              done()
            } catch (e) {
              done(e)
            }
          })
        })
      })
    })
  })
})
