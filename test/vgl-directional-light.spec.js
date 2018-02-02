describe('VglDirectionalLight component', function component() {
  const { VglDirectionalLight } = VueGL;
  const { assert } = chai;
  it('The instance should be an DirectionalLight object.', function test(done) {
    const vm = new Vue(VglDirectionalLight);
    assert.isTrue(vm.inst.isDirectionalLight);
    done();
  });
  describe('Properties of the light', function suite() {
    describe('The castShadow property', function property() {
      it('When the property is false.', function test(done) {
        const vm = new (Vue.extend(VglDirectionalLight))({
          propsData: { castShadow: false },
        });
        assert.isFalse(vm.inst.castShadow);
        done();
      });
      it('When the property is true.', function test(done) {
        const vm = new (Vue.extend(VglDirectionalLight))({
          propsData: { castShadow: true },
        });
        assert.isTrue(vm.inst.castShadow);
        done();
      });
    });
  });
  describe('Watching properties', function suite() {
    describe('The castShadow property', function property() {
      it('The instance property should be reflected when the property changes.', function test(done) {
        const vm = new Vue(VglDirectionalLight);
        vm.castShadow = true;
        vm.$nextTick(() => {
          try {
            assert.isTrue(vm.inst.castShadow);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
});
