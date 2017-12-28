describe('VglCamera component', () => {
  const { VglCamera, VglNamespace } = VueGL
  const assert = chai.assert
  describe('The instance should be registered to the injected namespace.', () => {
    it('Should be registered when created.', () => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-camera name="dm'&^>" ref="me" /><other-component ref="other" /></vgl-namespace>`,
        components: {
          VglCamera,
          VglNamespace,
          OtherComponent: {
            inject: ['vglCameras'],
            render () {}
          }
        }
      }).$mount()
      assert.strictEqual(vm.$refs.other.vglCameras.forGet["dm'&^>"], vm.$refs.me.inst)
    })
    it('Should be unregistered when destroyed.', (done) => {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-camera name="n<!--" v-if="!destroyed" /><other-component ref="other" /></vgl-namespace>`,
        components: {
          VglCamera,
          VglNamespace,
          OtherComponent: {
            inject: ['vglCameras'],
            render () {}
          }
        },
        data: { destroyed: false }
      }).$mount()
      assert.hasAllKeys(vm.$refs.other.vglCameras.forGet, ['n<!--'])
      vm.destroyed = true
      vm.$nextTick(() => {
        try {
          assert.isEmpty(vm.$refs.other.vglCameras.forGet)
          done()
        } catch (e) {
          done(e)
        }
      })
    })
    it('Should be replaced when the instance is replaced.', (done) => {
      const vm = new Vue({
        template: `<vgl-namespace><mixed-in name="'<!--" ref="geo" /><other-component ref="other" /></vgl-namespace>`,
        components: {
          VglNamespace,
          MixedIn: {
            mixins: [VglCamera],
            computed: {
              inst () { return this.i }
            },
            data: () => ({ i: new THREE.Camera() })
          },
          OtherComponent: {
            inject: ['vglCameras'],
            render () {}
          }
        }
      }).$mount()
      vm.$refs.geo.i = new THREE.Camera()
      vm.$nextTick(() => {
        try {
          assert.strictEqual(vm.$refs.other.vglCameras.forGet["'<!--"], vm.$refs.geo.inst)
          done()
        } catch (e) {
          done(e)
        }
      })
    })
  })
  describe('Orbit properties should overwrite the position and the rotation properties.', () => {
    const { Vector3, Euler, Spherical } = THREE
    describe('When only the orbitPosition property is defined.', () => {
      it('The position should be defined by spherical system around origin.', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-camera orbitPosition="12 1 3" ref="camera" /></vgl-namespace>`,
          components: { VglCamera, VglNamespace }
        }).$mount()
        assert.closeTo(vm.$refs.camera.inst.position.x, 1.424980705899, 1e-12)
        assert.closeTo(vm.$refs.camera.inst.position.y, 6.483627670418, 1e-12)
        assert.closeTo(vm.$refs.camera.inst.position.z, -9.996599532802, 1e-12)
      })
      it('The instance should be looking at origin.', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-camera orbitPosition="10 1 3" ref="camera" /></vgl-namespace>`,
          components: { VglCamera, VglNamespace }
        }).$mount()
        assert.closeTo(vm.$refs.camera.inst.rotation.x, -2.566213989437, 1e-12)
        assert.closeTo(vm.$refs.camera.inst.rotation.y, 0.119029260179, 1e-12)
        assert.closeTo(vm.$refs.camera.inst.rotation.z, 3.064726173715, 1e-12)
        assert.strictEqual(vm.$refs.camera.inst.rotation.order, 'XYZ')
      })
    })
    describe('When only the orbitTarget is defined.', () => {
      it('The position should be the origin.', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-camera orbitTarget="1.8 2.2 -3" ref="camera" /></vgl-namespace>`,
          components: { VglCamera, VglNamespace }
        }).$mount()
        assert.strictEqual(vm.$refs.camera.inst.position.x, 0)
        assert.strictEqual(vm.$refs.camera.inst.position.y, 0)
        assert.strictEqual(vm.$refs.camera.inst.position.z, 0)
      })
      it('The instance should be looking at target from origin.', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-camera orbitTarget="1 2 3" ref="camera" /></vgl-namespace>`,
          components: { VglCamera, VglNamespace }
        }).$mount()
        assert.closeTo(vm.$refs.camera.inst.rotation.x, 2.5535900500422, 1e-12)
        assert.closeTo(vm.$refs.camera.inst.rotation.y, -0.2705497629786, 1e-12)
        assert.closeTo(vm.$refs.camera.inst.rotation.z, 2.965268814774, 1e-12)
        assert.strictEqual(vm.$refs.camera.inst.rotation.order, 'XYZ')
      })
      it('The position property should affect the position if the property is defined.', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-camera orbitTarget="1.8 2.2 -3" position="0.6 -8  9" ref="camera" /></vgl-namespace>`,
          components: { VglCamera, VglNamespace }
        }).$mount()
        assert.strictEqual(vm.$refs.camera.inst.position.x, 0.6)
        assert.strictEqual(vm.$refs.camera.inst.position.y, -8)
        assert.strictEqual(vm.$refs.camera.inst.position.z, 9)
      })
      it('The instance should be looking at target from the position if the position property is defined.', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-camera orbitTarget="1.8 2.2 -3" position="0.6 -8  9" ref="camera" /></vgl-namespace>`,
          components: { VglCamera, VglNamespace }
        }).$mount()
        assert.closeTo(vm.$refs.camera.inst.rotation.x, 0.704494064242, 1e-12)
        assert.closeTo(vm.$refs.camera.inst.rotation.y, -0.0760469949198, 1e-13)
        assert.closeTo(vm.$refs.camera.inst.rotation.z, 0.0644881150942, 1e-13)
        assert.strictEqual(vm.$refs.camera.inst.rotation.order, 'XYZ')
      })
    })
    describe('When both the orbitPosition and the orbitTarget are defined.', () => {
      it('The position should be an vector added the target vector and the vector defined by spherical system.', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-camera orbitTarget="1 2 3" orbitPosition="2 1 2.9" ref="camera" /></vgl-namespace>`,
          components: { VglCamera, VglNamespace }
        }).$mount()
        assert.closeTo(vm.$refs.camera.inst.position.x, 1.402642737337, 1e-12)
        assert.closeTo(vm.$refs.camera.inst.position.y, 3.080604611736, 1e-12)
        assert.closeTo(vm.$refs.camera.inst.position.z, 1.365933753129, 1e-12)
      })
      it('The instance should be looking at the target position.', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-camera orbitTarget="1 2 3" orbitPosition="2 1 2.9" ref="camera" /></vgl-namespace>`,
          components: { VglCamera, VglNamespace }
        }).$mount()

        assert.closeTo(vm.$refs.camera.inst.rotation.x, -2.557316089494, 1e-12)
        assert.closeTo(vm.$refs.camera.inst.rotation.y, 0.2027067231273, 1e-13)
        assert.closeTo(vm.$refs.camera.inst.rotation.z, 3.009237564987, 1e-12)
        assert.strictEqual(vm.$refs.camera.inst.rotation.order, 'XYZ')
      })
    })
    describe('When either the orbitPosition nor the orbitTarget are not defined.', () => {
      it('The position and the rotation properties should affect.', () => {
        const vm = new Vue({
          template: `<vgl-namespace><vgl-camera position="1 2 3" rotation="2 3 4 YZX" ref="camera" /></vgl-namespace>`,
          components: { VglCamera, VglNamespace }
        }).$mount()
        assert.strictEqual(vm.$refs.camera.inst.position.x, 1)
        assert.strictEqual(vm.$refs.camera.inst.position.y, 2)
        assert.strictEqual(vm.$refs.camera.inst.position.z, 3)
        assert.strictEqual(vm.$refs.camera.inst.rotation.x, 2)
        assert.strictEqual(vm.$refs.camera.inst.rotation.y, 3)
        assert.strictEqual(vm.$refs.camera.inst.rotation.z, 4)
        assert.strictEqual(vm.$refs.camera.inst.rotation.order, 'YZX')
      })
    })
  })
})
