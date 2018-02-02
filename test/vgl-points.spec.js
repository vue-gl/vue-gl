describe('VglPoints component', function component() {
  const {
    VglPoints, VglGeometry, VglMaterial, VglNamespace,
  } = VueGL;
  const { assert } = chai;
  describe('Creating an object', function suite() {
    it('The geometry of an instance should be set to the geometry that has the corresponding name property.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-points geometry="u!$ok" ref="points" /><vgl-geometry name="u!$ok" ref="geo" /></vgl-namespace>',
        components: { VglPoints, VglGeometry, VglNamespace },
      }).$mount();
      assert.strictEqual(vm.$refs.points.inst.geometry, vm.$refs.geo.inst);
      done();
    });
    it('The material of an instance should be set to the material that has the corresponding name property.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-material name="u!$ok" ref="mat" /><vgl-points material="u!$ok" ref="points" /></vgl-namespace>',
        components: { VglPoints, VglMaterial, VglNamespace },
      }).$mount();
      assert.strictEqual(vm.$refs.points.inst.material, vm.$refs.mat.inst);
      done();
    });
  });
});
