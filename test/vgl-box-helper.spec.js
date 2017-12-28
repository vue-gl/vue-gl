describe('VglBoxHelper component', () => {
  const { VglBoxHelper, VglNamespace } = VueGL
  const assert = chai.assert
  describe('Creating a helper', () => {
    describe('The color of the box should be same as the color property.', () => {
      it('When the property is a color name.', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-box-helper color="red" ref="helper" /></vgl-namespace>`,
          components: { VglBoxHelper, VglNamespace }
        }).$mount()
        assert.strictEqual(vm.$refs.helper.inst.material.color.r, 255 / 255)
        assert.strictEqual(vm.$refs.helper.inst.material.color.g, 0 / 255)
        assert.strictEqual(vm.$refs.helper.inst.material.color.b, 0 / 255)
      })
      it('When the property is undefined.', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-box-helper ref="helper" /></vgl-namespace>`,
          components: { VglBoxHelper, VglNamespace }
        }).$mount()
        assert.strictEqual(vm.$refs.helper.inst.material.color.r, 255 / 255)
        assert.strictEqual(vm.$refs.helper.inst.material.color.g, 255 / 255)
        assert.strictEqual(vm.$refs.helper.inst.material.color.b, 0 / 255)
      })
    })
    describe('The object to show the bounding box should be the parent object.', () => {
      const { VglObject3d } = VueGL
      it('When the parent component is a VglObject3d.', (done) => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-object3d ref="target"><vgl-box-helper ref="helper" /></vgl-object3d></vgl-namespace>`,
          components: { VglObject3d, VglBoxHelper, VglNamespace }
        }).$mount()
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.target.inst, vm.$refs.helper.inst.object)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
      it('When the parent of the parent component is a VglObject3d.', (done) => {
        const vm = new Vue({
          template: `<vgl-object3d ref="target"><vgl-namespace><vgl-box-helper ref="helper" /></vgl-namespace></vgl-object3d>`,
          components: { VglObject3d, VglBoxHelper, VglNamespace }
        }).$mount()
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.target.inst, vm.$refs.helper.inst.object)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
      it('When a parent component does not exit.', (done) => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-box-helper ref="helper" /></vgl-namespace>`,
          components: { VglBoxHelper, VglNamespace }
        }).$mount()
        vm.$nextTick(() => {
          try {
            assert.isUndefined(vm.$refs.helper.inst.object)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
    })
  })
  describe('Watching properties', () => {
    describe('The color of the box should change when the color property changes.', () => {
      it('From a color name to a hex code', (done) => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-box-helper :color="color" ref="helper" /></vgl-namespace>`,
          components: { VglBoxHelper, VglNamespace },
          data: { color: 'red' }
        }).$mount()
        vm.color = '#aa87C5'
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.helper.inst.material.color.r, 170 / 255)
            assert.strictEqual(vm.$refs.helper.inst.material.color.g, 135 / 255)
            assert.strictEqual(vm.$refs.helper.inst.material.color.b, 197 / 255)
            done()
          } catch (e) {
            done(e)
          }
        })
      })
    })
  })
  describe('Watching the parent instance', () => {
    const { VglObject3d } = VueGL
    it('The object to show the bounding box should change when the parent instance changes.', (done) => {
      const vm = new Vue({
        template: `<parent-component ref="target"><vgl-box-helper ref="helper" /></parent-component>`,
        components: {
          VglBoxHelper,
          ParentComponent: {
            mixins: [VglObject3d, VglNamespace],
            computed: {
              inst () { return this.i }
            },
            data () {
              return { i: new THREE.Object3D() }
            }
          }
        }
      }).$mount()
      const before = vm.$refs.target.i
      vm.$refs.target.i = new THREE.Object3D()
      vm.$nextTick(() => {
        try {
          assert.notEqual(before, vm.$refs.helper.inst.object)
          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })
})
