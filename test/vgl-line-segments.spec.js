describe('VglLineSegments component', function component() {
  const { VglLineSegments, VglNamespace } = VueGL;
  const { assert } = chai;
  it('The instance should be a LineSegments object.', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-line-segments ref="seg" /></vgl-namespace>',
      components: { VglLineSegments, VglNamespace },
    }).$mount();
    assert.isTrue(vm.$refs.seg.inst.isLineSegments);
    done();
  });
});
