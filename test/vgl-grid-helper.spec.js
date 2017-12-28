/* globals chai Vue VueGL */

describe('VglGridHelper component', () => {
  const { VglGridHelper, VglNamespace } = VueGL
  const assert = chai.assert
  describe('Creating an object', () => {
    describe('The size of grid should be same as the size property.', () => {
      it('When the property is a number', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-grid-helper :size="3.8" ref="helper" /></vgl-namespace>`,
          components: { VglGridHelper, VglNamespace }
        }).$mount()
        vm.$refs.helper.inst.geometry.computeBoundingBox()
        const size = vm.$refs.helper.inst.geometry.boundingBox.getSize()
        assert.closeTo(size.x, 3.8, 1e-6)
        assert.closeTo(size.y, 0, 1e-6)
        assert.closeTo(size.z, 3.8, 1e-6)
      })
      it('When the property is a string', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-grid-helper size="4.3" ref="helper" /></vgl-namespace>`,
          components: { VglGridHelper, VglNamespace }
        }).$mount()
        vm.$refs.helper.inst.geometry.computeBoundingBox()
        const size = vm.$refs.helper.inst.geometry.boundingBox.getSize()
        assert.closeTo(size.x, 4.3, 1e-6)
        assert.closeTo(size.y, 0, 1e-6)
        assert.closeTo(size.z, 4.3, 1e-6)
      })
      it('When the property is undefined', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-grid-helper ref="helper" /></vgl-namespace>`,
          components: { VglGridHelper, VglNamespace }
        }).$mount()
        vm.$refs.helper.inst.geometry.computeBoundingBox()
        const size = vm.$refs.helper.inst.geometry.boundingBox.getSize()
        assert.closeTo(size.x, 10, 1e-6)
        assert.closeTo(size.y, 0, 1e-6)
        assert.closeTo(size.z, 10, 1e-6)
      })
    })
    describe('The divisions of grid should be same as the divisions property.', () => {
      it('When the property is a number', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-grid-helper :divisions="3" ref="helper" /></vgl-namespace>`,
          components: { VglGridHelper, VglNamespace }
        }).$mount()
        const vertices = vm.$refs.helper.inst.geometry.getAttribute('position').array
        assert.lengthOf(vertices, 6 * 2 * (3 + 1))
      })
      it('When the property is a string', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-grid-helper divisions="4" ref="helper" /></vgl-namespace>`,
          components: { VglGridHelper, VglNamespace }
        }).$mount()
        const vertices = vm.$refs.helper.inst.geometry.getAttribute('position').array
        assert.lengthOf(vertices, 6 * 2 * (4 + 1))
      })
      it('When the property is undefined', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-grid-helper ref="helper" /></vgl-namespace>`,
          components: { VglGridHelper, VglNamespace }
        }).$mount()
        const vertices = vm.$refs.helper.inst.geometry.getAttribute('position').array
        assert.lengthOf(vertices, 6 * 2 * (10 + 1))
      })
    })
    describe('The color of center line should be same as the colorCenterLine property.', () => {
      it('When the property is a string', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-grid-helper color-center-line="#2819fe" ref="helper" /></vgl-namespace>`,
          components: { VglGridHelper, VglNamespace }
        }).$mount()
        const colors = vm.$refs.helper.inst.geometry.getAttribute('color').array
        assert.closeTo(colors[4 * 3 * 5], 0.1568627, 1e-6)
        assert.closeTo(colors[4 * 3 * 5 + 1], 0.0980392, 1e-6)
        assert.closeTo(colors[4 * 3 * 5 + 2], 0.9960784, 1e-6)
      })
      it('When the property is undefined', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-grid-helper ref="helper" /></vgl-namespace>`,
          components: { VglGridHelper, VglNamespace }
        }).$mount()
        const colors = vm.$refs.helper.inst.geometry.getAttribute('color').array
        assert.closeTo(colors[4 * 3 * 5], 0.2666667, 1e-6)
        assert.closeTo(colors[4 * 3 * 5 + 1], 0.2666667, 1e-6)
        assert.closeTo(colors[4 * 3 * 5 + 2], 0.2666667, 1e-6)
      })
    })
    describe('The color of grid should be same as the colorGrid property.', () => {
      it('When the property is a string', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-grid-helper color-grid="#dea54f" ref="helper" /></vgl-namespace>`,
          components: { VglGridHelper, VglNamespace }
        }).$mount()
        const colors = vm.$refs.helper.inst.geometry.getAttribute('color').array
        assert.closeTo(colors[0], 0.8705882, 1e-6)
        assert.closeTo(colors[1], 0.6470588, 1e-6)
        assert.closeTo(colors[2], 0.3098039, 1e-6)
      })
      it('When the property is undefined', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-grid-helper ref="helper" /></vgl-namespace>`,
          components: { VglGridHelper, VglNamespace }
        }).$mount()
        const colors = vm.$refs.helper.inst.geometry.getAttribute('color').array
        assert.closeTo(colors[0], 0.5333333, 1e-6)
        assert.closeTo(colors[1], 0.5333333, 1e-6)
        assert.closeTo(colors[2], 0.5333333, 1e-6)
      })
    })
  })
  describe('Watching properties', () => {
    it('The instance should be recreated when a property changes.', (done) => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-grid-helper :size="size" ref="helper" /></vgl-namespace>`,
        components: { VglGridHelper, VglNamespace },
        data: { size: 1.1 }
      }).$mount()
      const before = vm.$refs.helper.inst
      vm.size = 1.5
      vm.$nextTick(() => {
        try {
          assert.notEqual(before, vm.$refs.helper.inst)
          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })
})
