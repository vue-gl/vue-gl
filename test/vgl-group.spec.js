describe('VglGroup component', function component() {
  const { VglGroup } = VueGL;
  const { assert } = chai;
  it('The instance should be a Group object.', function test(done) {
    const vm = new Vue(VglGroup);
    assert.equal(vm.inst.type, 'Group');
    done();
  });
});
