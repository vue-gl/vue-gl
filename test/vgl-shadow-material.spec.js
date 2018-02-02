describe('VglShadowMaterial component', function component() {
  const { VglShadowMaterial, VglNamespace } = VueGL;
  const { assert } = chai;
  it('The instance should be a ShadowMaterial object.', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-shadow-material ref="mat" /></vgl-namespace>',
      components: { VglShadowMaterial, VglNamespace },
    }).$mount();
    assert.isTrue(vm.$refs.mat.inst.isShadowMaterial);
    done();
  });
});
