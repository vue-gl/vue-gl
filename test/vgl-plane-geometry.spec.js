describe('VglPlaneGeometry component', function component() {
  const { VglPlaneGeometry, VglNamespace } = VueGL;
  const { assert } = chai;
  describe('Parameters of a instance should be same as the component properties.', function suite() {
    it('When properties are number.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-plane-geometry ref="geo" :width="10" :height="6" :widthSegments="2" :heightSegments="3" /></vgl-namespace>',
        components: { VglPlaneGeometry, VglNamespace },
      }).$mount();
      assert.strictEqual(vm.$refs.geo.inst.parameters.width, 10);
      assert.strictEqual(vm.$refs.geo.inst.parameters.height, 6);
      assert.strictEqual(vm.$refs.geo.inst.parameters.widthSegments, 2);
      assert.strictEqual(vm.$refs.geo.inst.parameters.heightSegments, 3);
      done();
    });
    it('When properties are string.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-plane-geometry ref="geo" width="100" height="60" widthSegments="20" heightSegments="30" /></vgl-namespace>',
        components: { VglPlaneGeometry, VglNamespace },
      }).$mount();
      assert.strictEqual(vm.$refs.geo.inst.parameters.width, 100);
      assert.strictEqual(vm.$refs.geo.inst.parameters.height, 60);
      assert.strictEqual(vm.$refs.geo.inst.parameters.widthSegments, 20);
      assert.strictEqual(vm.$refs.geo.inst.parameters.heightSegments, 30);
      done();
    });
    it('When segment numbers are undefined.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-plane-geometry ref="geo" :width="1.5" :height="6.2" /></vgl-namespace>',
        components: { VglPlaneGeometry, VglNamespace },
      }).$mount();
      assert.strictEqual(vm.$refs.geo.inst.parameters.width, 1.5);
      assert.strictEqual(vm.$refs.geo.inst.parameters.height, 6.2);
      assert.isUndefined(vm.$refs.geo.inst.parameters.widthSegments);
      assert.isUndefined(vm.$refs.geo.inst.parameters.heightSegments);
      done();
    });
  });
  describe('Instance should be recreated when a property changed.', function suite() {
    it('When the width property changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-plane-geometry ref="geo" :width="width" height="3" /></vgl-namespace>',
        components: { VglPlaneGeometry, VglNamespace },
        data: { width: 25 },
      }).$mount();
      const before = vm.$refs.geo.inst;
      vm.width = 11;
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
