describe('VglLineLoop component', function component() {
  const { VglLineLoop, VglNamespace } = VueGL;
  const { assert } = chai;
  it('The instance should be a LineLoop object.', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-line-loop ref="loop" /></vgl-namespace>',
      components: { VglLineLoop, VglNamespace },
    }).$mount();
    assert.isTrue(vm.$refs.loop.inst.isLineLoop);
    done();
  });
});
