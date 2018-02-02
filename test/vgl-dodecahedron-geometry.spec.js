describe('VglDodecahedronGeometry component', function component() {
  const { VglDodecahedronGeometry, VglNamespace } = VueGL;
  const { assert } = chai;
  describe('Parameters of a instance should be same as the component properties.', function suite() {
    it('When properties are number.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-dodecahedron-geometry ref="geo" :radius="11.1" :detail="2" /></vgl-namespace>',
        components: { VglDodecahedronGeometry, VglNamespace },
      }).$mount();
      assert.strictEqual(vm.$refs.geo.inst.parameters.radius, 11.1);
      assert.strictEqual(vm.$refs.geo.inst.parameters.detail, 2);
      done();
    });
    it('When properties are string.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-dodecahedron-geometry ref="geo" radius="1.11" detail="2" /></vgl-namespace>',
        components: { VglDodecahedronGeometry, VglNamespace },
      }).$mount();
      assert.strictEqual(vm.$refs.geo.inst.parameters.radius, 1.11);
      assert.strictEqual(vm.$refs.geo.inst.parameters.detail, 2);
      done();
    });
    it('When properties are undefined.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-dodecahedron-geometry ref="geo" /></vgl-namespace>',
        components: { VglDodecahedronGeometry, VglNamespace },
      }).$mount();
      assert.isUndefined(vm.$refs.geo.inst.parameters.radius);
      assert.isUndefined(vm.$refs.geo.inst.parameters.detail);
      done();
    });
  });
  describe('Instance should be recreated when a property changed.', function suite() {
    it('When the radius property changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-dodecahedron-geometry ref="geo" :radius="radius" /></vgl-namespace>',
        components: { VglDodecahedronGeometry, VglNamespace },
        data: { radius: 25 },
      }).$mount();
      const before = vm.$refs.geo.inst;
      vm.radius = 11;
      vm.$nextTick(() => {
        try {
          assert.notEqual(before, vm.$refs.geo.inst);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
