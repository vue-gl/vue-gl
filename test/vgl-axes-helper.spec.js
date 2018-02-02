describe('VglAxesHelper component', function component() {
  const { VglAxesHelper, VglNamespace } = VueGL;
  const { assert } = chai;
  describe('Creating an object', function when() {
    describe('The size of axes should be same as the size property.', function suite() {
      it('When the property is a number', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-axes-helper :size="3.8" ref="helper" /></vgl-namespace>',
          components: { VglAxesHelper, VglNamespace },
        }).$mount();
        vm.$refs.helper.inst.geometry.computeBoundingBox();
        const size = vm.$refs.helper.inst.geometry.boundingBox.getSize();
        assert.closeTo(size.x, 3.8, 1e-6);
        assert.closeTo(size.y, 3.8, 1e-6);
        assert.closeTo(size.z, 3.8, 1e-6);
        done();
      });
      it('When the property is a string', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-axes-helper size="4.3" ref="helper" /></vgl-namespace>',
          components: { VglAxesHelper, VglNamespace },
        }).$mount();
        vm.$refs.helper.inst.geometry.computeBoundingBox();
        const size = vm.$refs.helper.inst.geometry.boundingBox.getSize();
        assert.closeTo(size.x, 4.3, 1e-6);
        assert.closeTo(size.y, 4.3, 1e-6);
        assert.closeTo(size.z, 4.3, 1e-6);
        done();
      });
      it('When the property is undefined', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-axes-helper ref="helper" /></vgl-namespace>',
          components: { VglAxesHelper, VglNamespace },
        }).$mount();
        vm.$refs.helper.inst.geometry.computeBoundingBox();
        const size = vm.$refs.helper.inst.geometry.boundingBox.getSize();
        assert.closeTo(size.x, 1, 1e-6);
        assert.closeTo(size.y, 1, 1e-6);
        assert.closeTo(size.z, 1, 1e-6);
        done();
      });
    });
  });
  describe('Watching properties', function suite() {
    it('The instance should be recreated when a property changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-axes-helper :size="size" ref="helper" /></vgl-namespace>',
        components: { VglAxesHelper, VglNamespace },
        data: { size: 1.1 },
      }).$mount();
      const before = vm.$refs.helper.inst;
      vm.size = 1.5;
      vm.$nextTick(() => {
        try {
          assert.notEqual(before, vm.$refs.helper.inst);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
