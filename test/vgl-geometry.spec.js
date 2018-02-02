describe('VglGeometry component', function component() {
  const { VglGeometry, VglNamespace } = VueGL;
  const { assert } = chai;
  describe('The instance should be registered to the injected namespace.', function suite() {
    it('Should be registered when created.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-geometry name="dm\'&^>" ref="me" /><other-component ref="other" /></vgl-namespace>',
        components: {
          VglGeometry,
          VglNamespace,
          OtherComponent: {
            inject: ['vglGeometries'],
            render() {},
          },
        },
      }).$mount();
      assert.strictEqual(vm.$refs.other.vglGeometries.forGet["dm'&^>"], vm.$refs.me.inst);
      done();
    });
    it('Should be unregistered when destroyed.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-geometry name="n<!--" v-if="!destroyed" /><other-component ref="other" /></vgl-namespace>',
        components: {
          VglGeometry,
          VglNamespace,
          OtherComponent: {
            inject: ['vglGeometries'],
            render() {},
          },
        },
        data: { destroyed: false },
      }).$mount();
      assert.hasAllKeys(vm.$refs.other.vglGeometries.forGet, ['n<!--']);
      vm.destroyed = true;
      vm.$nextTick(() => {
        try {
          assert.isEmpty(vm.$refs.other.vglGeometries.forGet);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('Should be replaced when the instance is replaced.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><mixed-in name="\'<!--" ref="geo" /><other-component ref="other" /></vgl-namespace>',
        components: {
          VglNamespace,
          MixedIn: {
            mixins: [VglGeometry],
            computed: {
              inst() { return this.i; },
            },
            data: () => ({ i: new THREE.Geometry() }),
          },
          OtherComponent: {
            inject: ['vglGeometries'],
            render() {},
          },
        },
      }).$mount();
      vm.$refs.geo.i = new THREE.Geometry();
      vm.$nextTick(() => {
        try {
          assert.strictEqual(vm.$refs.other.vglGeometries.forGet["'<!--"], vm.$refs.geo.inst);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
