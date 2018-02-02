describe('VglPointsMaterial component', function component() {
  const { VglPointsMaterial, VglNamespace } = VueGL;
  const { assert } = chai;
  describe('Creating a material', function when() {
    describe('The color of the material should be same as the color property.', function suite() {
      it('When the property is undefined.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-points-material ref="mat" /></vgl-namespace>',
          components: { VglPointsMaterial, VglNamespace },
        }).$mount();
        assert.strictEqual(vm.$refs.mat.inst.color.r, 255 / 255);
        assert.strictEqual(vm.$refs.mat.inst.color.g, 255 / 255);
        assert.strictEqual(vm.$refs.mat.inst.color.b, 255 / 255);
        done();
      });
      it('When the property is a hex code.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-points-material color="#24d85a" ref="mat" /></vgl-namespace>',
          components: { VglPointsMaterial, VglNamespace },
        }).$mount();
        assert.strictEqual(vm.$refs.mat.inst.color.r, 36 / 255);
        assert.strictEqual(vm.$refs.mat.inst.color.g, 216 / 255);
        assert.strictEqual(vm.$refs.mat.inst.color.b, 90 / 255);
        done();
      });
      it('When the property is a color name.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-points-material color="salmon" ref="mat" /></vgl-namespace>',
          components: { VglPointsMaterial, VglNamespace },
        }).$mount();
        assert.strictEqual(vm.$refs.mat.inst.color.r, 250 / 255);
        assert.strictEqual(vm.$refs.mat.inst.color.g, 128 / 255);
        assert.strictEqual(vm.$refs.mat.inst.color.b, 114 / 255);
        done();
      });
    });
    describe('The size of the material should be same as the size property.', function suite() {
      it('When the property is undefined.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-points-material ref="mat" /></vgl-namespace>',
          components: { VglPointsMaterial, VglNamespace },
        }).$mount();
        assert.strictEqual(vm.$refs.mat.inst.size, 1);
        done();
      });
      it('When the property is a number.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-points-material :size="2.1" ref="mat" /></vgl-namespace>',
          components: { VglPointsMaterial, VglNamespace },
        }).$mount();
        assert.strictEqual(vm.$refs.mat.inst.size, 2.1);
        done();
      });
      it('When the property is a string.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-points-material size="1.1" ref="mat" /></vgl-namespace>',
          components: { VglPointsMaterial, VglNamespace },
        }).$mount();
        assert.strictEqual(vm.$refs.mat.inst.size, 1.1);
        done();
      });
    });
    describe('The sizeAttenuation of the material should be disabled by the desableSizeAttenuation property.', function suite() {
      it('When the property is false.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-points-material ref="mat" /></vgl-namespace>',
          components: { VglPointsMaterial, VglNamespace },
        }).$mount();
        assert.isTrue(vm.$refs.mat.inst.sizeAttenuation);
        done();
      });
      it('When the property is a string.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-points-material disable-size-attenuation ref="mat" /></vgl-namespace>',
          components: { VglPointsMaterial, VglNamespace },
        }).$mount();
        assert.isFalse(vm.$refs.mat.inst.sizeAttenuation);
        done();
      });
    });
  });
  describe('Watching properties', function suite() {
    it('The color of the material should change when the color property changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-points-material :color="color" ref="mat" /></vgl-namespace>',
        components: { VglPointsMaterial, VglNamespace },
        data: { color: 'lemonchiffon' },
      }).$mount();
      vm.color = 'mediumseagreen';
      vm.$nextTick(() => {
        try {
          assert.strictEqual(vm.$refs.mat.inst.color.r, 0x3c / 0xff);
          assert.strictEqual(vm.$refs.mat.inst.color.g, 0xb3 / 0xff);
          assert.strictEqual(vm.$refs.mat.inst.color.b, 0x71 / 0xff);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('The size of the material should change when the size property changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-points-material :size="size" ref="mat" /></vgl-namespace>',
        components: { VglPointsMaterial, VglNamespace },
        data: { size: 0.8 },
      }).$mount();
      vm.size = '1.2';
      vm.$nextTick(() => {
        try {
          assert.strictEqual(vm.$refs.mat.inst.size, 1.2);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('The sizeAttenuation of the material should change when the disableSizeAttenuation property changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-points-material :disable-size-attenuation="disabled" ref="mat" /></vgl-namespace>',
        components: { VglPointsMaterial, VglNamespace },
        data: { disabled: false },
      }).$mount();
      vm.disabled = true;
      vm.$nextTick(() => {
        try {
          assert.isFalse(vm.$refs.mat.inst.sizeAttenuation);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
