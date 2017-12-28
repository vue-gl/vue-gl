describe('VglNamespace component', () => {
  const { VglNamespace } = VueGL
  const assert = chai.assert
  describe('Global datas (cameras and scenes)', () => {
    it('Descendants should be able to inject vglCameras and vglScenes.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><child-component ref="child" /></vgl-namespace>`,
        components: {
          VglNamespace,
          ChildComponent: {
            inject: ['vglCameras', 'vglScenes'],
            render () {}
          }
        }
      }).$mount()
      assert.isObject(vm.$refs.child.vglCameras)
      assert.isObject(vm.$refs.child.vglScenes)
    })
    it('Provided datas should be global under the root VglNamespace component.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><child-component ref="child" /><vgl-namespace><grandchild-component ref="grandchild" /></vgl-namespace></vgl-namespace>`,
        components: {
          VglNamespace,
          ChildComponent: {
            inject: ['vglCameras', 'vglScenes'],
            created () {
              this.$set(this.vglCameras, 'a', '1')
              this.$set(this.vglScenes, 'c', '3')
              this.$set(this.vglCameras, 'e', '5')
            },
            render () {}
          },
          GrandchildComponent: {
            inject: ['vglCameras', 'vglScenes'],
            created () {
              this.$set(this.vglCameras, 'b', '2')
              this.$set(this.vglScenes, 'd', '4')
              this.$set(this.vglCameras, 'e', '6')
            },
            render () {}
          }
        }
      }).$mount()
      assert.strictEqual(vm.$refs.grandchild.vglCameras.a, '1')
      assert.strictEqual(vm.$refs.grandchild.vglCameras.b, '2')
      assert.strictEqual(vm.$refs.grandchild.vglScenes.c, '3')
      assert.strictEqual(vm.$refs.grandchild.vglScenes.d, '4')
      assert.strictEqual(vm.$refs.grandchild.vglCameras.e, '6')
      assert.strictEqual(vm.$refs.child.vglCameras.a, '1')
      assert.strictEqual(vm.$refs.child.vglCameras.b, '2')
      assert.strictEqual(vm.$refs.child.vglScenes.c, '3')
      assert.strictEqual(vm.$refs.child.vglScenes.d, '4')
      assert.strictEqual(vm.$refs.child.vglCameras.e, '6')
    })
  })
  describe('Local datas (geometries and materials)', () => {
    it('Descendants should be able to inject vglGeometries and vglMaterials.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><child-component ref="child" /></vgl-namespace>`,
        components: {
          VglNamespace,
          ChildComponent: {
            inject: ['vglGeometries', 'vglMaterials'],
            render () {}
          }
        }
      }).$mount()
      assert.isObject(vm.$refs.child.vglGeometries)
      assert.isObject(vm.$refs.child.vglMaterials)
    })
    it('Each VglNamespace component should provide datas locally.', (done) => {
      const vm = new Vue({
        template: `<vgl-namespace><parent-component ref="parent" /><vgl-namespace><child-component ref="child" /></vgl-namespace></vgl-namespace>`,
        components: {
          VglNamespace,
          ParentComponent: {
            inject: ['vglGeometries', 'vglMaterials'],
            created () {
              this.$set(this.vglGeometries.forSet, 'a', '1')
              this.$set(this.vglMaterials.forSet, 'b', '2')
              this.$set(this.vglGeometries.forSet, 'c', '3')
            },
            render () {}
          },
          ChildComponent: {
            inject: ['vglGeometries', 'vglMaterials'],
            created () {
              this.$set(this.vglGeometries.forSet, 'd', '4')
              this.$set(this.vglMaterials.forSet, 'e', '5')
              this.$set(this.vglGeometries.forSet, 'c', '6')
            },
            render () {}
          }
        }
      }).$mount()
      vm.$nextTick(() => {
        try {
          assert.strictEqual(vm.$refs.parent.vglGeometries.forGet.a, '1')
          assert.strictEqual(vm.$refs.parent.vglMaterials.forGet.b, '2')
          assert.strictEqual(vm.$refs.parent.vglGeometries.forGet.c, '3')
          assert.isUndefined(vm.$refs.parent.vglGeometries.forGet.d)
          assert.isUndefined(vm.$refs.parent.vglMaterials.forGet.e)
          assert.strictEqual(vm.$refs.child.vglGeometries.forGet.a, '1')
          assert.strictEqual(vm.$refs.child.vglMaterials.forGet.b, '2')
          assert.strictEqual(vm.$refs.child.vglGeometries.forGet.d, '4')
          assert.strictEqual(vm.$refs.child.vglMaterials.forGet.e, '5')
          assert.strictEqual(vm.$refs.child.vglGeometries.forGet.c, '6')
          done()
        } catch (e) {
          done(e)
        }
      })
    })
    it('The datas should be reactive.', (done) => {
      let geometryChanges = 0,
        materialChanges = 0
      const vm = new Vue({
        template: `<vgl-namespace><child-component /><sibling-component ref="sibling" /></vgl-namespace>`,
        components: {
          VglNamespace,
          ChildComponent: {
            render () {},
            inject: ['vglGeometries', 'vglMaterials'],
            watch: {
              'vglGeometries.forGet': function () {
                ++geometryChanges
              },
              'vglMaterials.forGet': function () {
                ++materialChanges
              }
            }
          },
          SiblingComponent: {
            render () {},
            inject: ['vglGeometries', 'vglMaterials']
          }
        }
      }).$mount()
      vm.$set(vm.$refs.sibling.vglGeometries.forSet, 'x', '-1')
      vm.$set(vm.$refs.sibling.vglMaterials.forSet, 'y', '-2')
      vm.$nextTick(() => {
        try {
          assert.strictEqual(geometryChanges, 1)
          assert.strictEqual(materialChanges, 1)
          done()
        } catch (e) {
          done(e)
        }
      })
    })
    it("The ancestor's datas should also be reactive.", (done) => {
      let geometryChanges = 0,
        materialChanges = 0
      const vm = new Vue({
        template: `<vgl-namespace><parent-component ref="parent" /><vgl-namespace><child-component ref="child" /></vgl-namespace></vgl-namespace>`,
        components: {
          VglNamespace,
          ParentComponent: {
            inject: ['vglGeometries', 'vglMaterials'],
            render () {}
          },
          ChildComponent: {
            inject: ['vglGeometries', 'vglMaterials'],
            render () {},
            watch: {
              'vglGeometries.forGet': function () {
                ++geometryChanges
              },
              'vglMaterials.forGet': function () {
                ++materialChanges
              }
            }
          }
        }
      }).$mount()
      vm.$set(vm.$refs.parent.vglGeometries.forSet, 'a', '1')
      vm.$set(vm.$refs.parent.vglMaterials.forSet, 'b', '2')
      vm.$nextTick(() => {
        try {
          assert.strictEqual(geometryChanges, 1)
          assert.strictEqual(materialChanges, 1)
          assert.strictEqual(vm.$refs.child.vglGeometries.forGet.a, '1')
          assert.strictEqual(vm.$refs.child.vglMaterials.forGet.b, '2')
          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })
})
