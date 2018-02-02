describe('VglAmbientLight component', function component() {
  const { VglAmbientLight } = VueGL;
  const { assert } = chai;
  it('The instance should be an AmbientLight object.', function test(done) {
    const vm = new Vue(VglAmbientLight);
    assert.isTrue(vm.inst.isAmbientLight);
    done();
  });
});
