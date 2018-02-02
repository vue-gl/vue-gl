describe('VglSpriteMaterial component', function component() {
  const { VglSpriteMaterial, VglNamespace } = VueGL;
  const { assert } = chai;
  describe('Creating a material', function when() {
    describe('The color of the material should be same as the color property.', function suite() {
      it('When the property is undefined.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-sprite-material ref="mat" /></vgl-namespace>',
          components: { VglSpriteMaterial, VglNamespace },
        }).$mount();
        assert.strictEqual(vm.$refs.mat.inst.color.r, 255 / 255);
        assert.strictEqual(vm.$refs.mat.inst.color.g, 255 / 255);
        assert.strictEqual(vm.$refs.mat.inst.color.b, 255 / 255);
        done();
      });
      it('When the property is a color name.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-sprite-material color="orangered" ref="mat" /></vgl-namespace>',
          components: { VglSpriteMaterial, VglNamespace },
        }).$mount();
        assert.strictEqual(vm.$refs.mat.inst.color.r, 255 / 255);
        assert.strictEqual(vm.$refs.mat.inst.color.g, 69 / 255);
        assert.strictEqual(vm.$refs.mat.inst.color.b, 0 / 255);
        done();
      });
    });
  });
  describe('Watching property', function suite() {
    it('The color of the material should change when the color property changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-sprite-material :color="color" ref="mat" /></vgl-namespace>',
        components: { VglSpriteMaterial, VglNamespace },
        data: { color: 'orangered' },
      }).$mount();
      vm.color = '#fff5ee';
      vm.$nextTick(() => {
        try {
          assert.strictEqual(vm.$refs.mat.inst.color.r, 255 / 255);
          assert.strictEqual(vm.$refs.mat.inst.color.g, 245 / 255);
          assert.strictEqual(vm.$refs.mat.inst.color.b, 238 / 255);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
