describe('VglArrowHelper component', () => {
  const { VglArrowHelper } = VueGL
  const { Vector3 } = THREE
  const assert = chai.assert
  describe('Creating an object', () => {
    describe('The dir property should determin the rotation of the object.', () => {
      it('When the dir is parallel to y-axis', () => {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { dir: '0 2.8 0' }})
        assert.strictEqual(vm.inst.rotation.x, 0)
        assert.strictEqual(vm.inst.rotation.y, 0)
        assert.strictEqual(vm.inst.rotation.z, 0)
        assert.strictEqual(vm.inst.rotation.order, 'XYZ')
      })
      it('When the dir makes 45 degrees with y-axis and z-axis, and is orthogonal to x-axis.', () => {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { dir: new Vector3(0, 29.8, 29.8) }})
        assert.closeTo(vm.inst.rotation.x, Math.PI / 4, 1e-12)
        assert.strictEqual(vm.inst.rotation.y, 0)
        assert.strictEqual(vm.inst.rotation.z, 0)
        assert.strictEqual(vm.inst.rotation.order, 'XYZ')
      })
      it('When the property is undifined', () => {
        const vm = new Vue(VglArrowHelper)
        assert.strictEqual(vm.inst.rotation.x, 0)
        assert.strictEqual(vm.inst.rotation.y, 0)
        assert.strictEqual(vm.inst.rotation.z, 0)
        assert.strictEqual(vm.inst.rotation.order, 'XYZ')
      })
    })
    describe('The length property should determin the scale of arrow direction.', () => {
      it('When the property is a string.', () => {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { length: '3.8' }})
        assert.closeTo(vm.inst.line.scale.y, 3.8 * (1 - 0.2), 1e-12)
        assert.closeTo(vm.inst.cone.scale.y, 3.8 * 0.2, 1e-12)
      })
      it('When the property is a number.', () => {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { length: 2.6 }})
        assert.closeTo(vm.inst.line.scale.y, 2.6 * (1 - 0.2), 1e-12)
        assert.closeTo(vm.inst.cone.scale.y, 2.6 * 0.2, 1e-12)
      })
      it('When the property is undefined.', () => {
        const vm = new Vue(VglArrowHelper)
        assert.closeTo(vm.inst.line.scale.y, 1 * (1 - 0.2), 1e-12)
        assert.closeTo(vm.inst.cone.scale.y, 1 * 0.2, 1e-12)
      })
    })
    describe('The headLength property should determin the y-scale of the cone.', () => {
      it('When the property is a string', () => {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { headLength: '0.3' }})
        assert.strictEqual(vm.inst.cone.scale.y, 0.3)
      })
      it('When the property is a number', () => {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { headLength: 0.15 }})
        assert.strictEqual(vm.inst.cone.scale.y, 0.15)
      })
    })
    describe('The headWidth property should determin the x-scale and z-scale of the cone.', () => {
      it('When the property is a string', () => {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { headWidth: '1.2' }})
        assert.strictEqual(vm.inst.cone.scale.x, 1.2)
        assert.strictEqual(vm.inst.cone.scale.z, 1.2)
      })
      it('When the property is a number', () => {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { headWidth: 0.6 }})
        assert.strictEqual(vm.inst.cone.scale.x, 0.6)
        assert.strictEqual(vm.inst.cone.scale.z, 0.6)
      })
    })
    describe('The color property should determin the color of the materials.', () => {
      it('When the property is a color name', () => {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { color: 'aquamarine' }})
        assert.strictEqual(vm.inst.line.material.color.r, 127 / 255)
        assert.strictEqual(vm.inst.line.material.color.g, 255 / 255)
        assert.strictEqual(vm.inst.line.material.color.b, 212 / 255)
      })
      it('When the property is a hex value', () => {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { color: '#1c746e' }})
        assert.strictEqual(vm.inst.line.material.color.r, 28 / 255)
        assert.strictEqual(vm.inst.line.material.color.g, 116 / 255)
        assert.strictEqual(vm.inst.line.material.color.b, 110 / 255)
      })
    })
  })
  describe('Watching properties', () => {
    describe('The dir of the instance should change when the dir property changes.', () => {
      it('From undefined to a string', (done) => {
        const vm = new Vue(VglArrowHelper)
        vm.dir = '0 2 2'
        vm.$nextTick(() => {
          try {
            assert.closeTo(vm.inst.rotation.x, Math.PI / 4, 1e-12)
            assert.strictEqual(vm.inst.rotation.y, 0)
            assert.strictEqual(vm.inst.rotation.z, 0)
            assert.strictEqual(vm.inst.rotation.order, 'XYZ')
            done()
          } catch (e) {
            done(e)
          }
        })
      })
      it('From a string to a Vector3', (done) => {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { dir: '0 3 9' }})
        vm.dir = new Vector3(0, -1, 1.73205080757)
        vm.$nextTick(() => {
          try {
            assert.closeTo(vm.inst.rotation.x, Math.PI / 1.5, 1e-12)
            assert.strictEqual(vm.inst.rotation.y, 0)
            assert.strictEqual(vm.inst.rotation.z, 0)
            assert.strictEqual(vm.inst.rotation.order, 'XYZ')
            done()
          } catch (e) {
            done(e)
          }
        })
      })
    })
    describe('The scale of arrow direction should change when the length property changes.', () => {
      it('From undefined to a number', (done) => {
        const vm = new Vue(VglArrowHelper)
        vm.length = 5.3
        vm.$nextTick(() => {
          try {
            assert.closeTo(vm.inst.line.scale.y, 5.3 * (1 - 0.2), 1e-12)
            assert.closeTo(vm.inst.cone.scale.y, 5.3 * 0.2, 1e-12)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
      it('From a number to a string', (done) => {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { length: 63.8 }})
        vm.length = '22.754'
        vm.$nextTick(() => {
          try {
            assert.closeTo(vm.inst.line.scale.y, 22.754 * (1 - 0.2), 1e-12)
            assert.closeTo(vm.inst.cone.scale.y, 22.754 * 0.2, 1e-12)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
    })
    describe('The y-scale of the cone should change when the headLength property changes.', () => {
      it('From undefined to a number', (done) => {
        const vm = new Vue(VglArrowHelper)
        vm.headLength = 0.35
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.inst.cone.scale.y, 0.35)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
      it('From a number to a string', (done) => {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { headLength: 0.25 }})
        vm.headLength = '0.45'
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.inst.cone.scale.y, 0.45)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
    })
    describe('The x-scale and z-scale of the cone should change when the headWidth property changes.', () => {
      it('From undefined to a string', (done) => {
        const vm = new Vue(VglArrowHelper)
        vm.headWidth = '0.24'
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.inst.cone.scale.x, 0.24)
            assert.strictEqual(vm.inst.cone.scale.z, 0.24)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
      it('From a string to a number', (done) => {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { headWidth: '0.15' }})
        vm.headWidth = 0.18
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.inst.cone.scale.x, 0.18)
            assert.strictEqual(vm.inst.cone.scale.z, 0.18)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
    })
    describe('The color of materials should change when the color property changes.', () => {
      it('From undefined to a color name', (done) => {
        const vm = new Vue(VglArrowHelper)
        vm.color = 'crimson'
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.inst.line.material.color.r, 220 / 255)
            assert.strictEqual(vm.inst.line.material.color.g, 20 / 255)
            assert.strictEqual(vm.inst.line.material.color.b, 60 / 255)
            assert.strictEqual(vm.inst.cone.material.color.r, 220 / 255)
            assert.strictEqual(vm.inst.cone.material.color.g, 20 / 255)
            assert.strictEqual(vm.inst.cone.material.color.b, 60 / 255)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
      it('From a color name to a hex code', (done) => {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { color: 'blue' }})
        vm.color = '#ab76c5'
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.inst.line.material.color.r, 171 / 255)
            assert.strictEqual(vm.inst.line.material.color.g, 118 / 255)
            assert.strictEqual(vm.inst.line.material.color.b, 197 / 255)
            assert.strictEqual(vm.inst.cone.material.color.r, 171 / 255)
            assert.strictEqual(vm.inst.cone.material.color.g, 118 / 255)
            assert.strictEqual(vm.inst.cone.material.color.b, 197 / 255)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
    })
  })
})
