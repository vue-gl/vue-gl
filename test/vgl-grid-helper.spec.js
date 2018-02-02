describe('VglGridHelper component', function component() {
  const { VglGridHelper, VglNamespace } = VueGL;
  const { assert } = chai;
  describe('Creating an object', function when() {
    describe('The size of grid should be same as the size property.', function suite() {
      it('When the property is a number', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-grid-helper :size="3.8" ref="helper" /></vgl-namespace>',
          components: { VglGridHelper, VglNamespace },
        }).$mount();
        vm.$refs.helper.inst.geometry.computeBoundingBox();
        const size = vm.$refs.helper.inst.geometry.boundingBox.getSize();
        assert.closeTo(size.x, 3.8, 1e-6);
        assert.closeTo(size.y, 0, 1e-6);
        assert.closeTo(size.z, 3.8, 1e-6);
        done();
      });
      it('When the property is a string', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-grid-helper size="4.3" ref="helper" /></vgl-namespace>',
          components: { VglGridHelper, VglNamespace },
        }).$mount();
        vm.$refs.helper.inst.geometry.computeBoundingBox();
        const size = vm.$refs.helper.inst.geometry.boundingBox.getSize();
        assert.closeTo(size.x, 4.3, 1e-6);
        assert.closeTo(size.y, 0, 1e-6);
        assert.closeTo(size.z, 4.3, 1e-6);
        done();
      });
      it('When the property is undefined', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-grid-helper ref="helper" /></vgl-namespace>',
          components: { VglGridHelper, VglNamespace },
        }).$mount();
        vm.$refs.helper.inst.geometry.computeBoundingBox();
        const size = vm.$refs.helper.inst.geometry.boundingBox.getSize();
        assert.closeTo(size.x, 10, 1e-6);
        assert.closeTo(size.y, 0, 1e-6);
        assert.closeTo(size.z, 10, 1e-6);
        done();
      });
    });
    describe('The divisions of grid should be same as the divisions property.', function suite() {
      it('When the property is a number', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-grid-helper :divisions="3" ref="helper" /></vgl-namespace>',
          components: { VglGridHelper, VglNamespace },
        }).$mount();
        const vertices = vm.$refs.helper.inst.geometry.getAttribute('position').array;
        assert.lengthOf(vertices, 6 * 2 * (3 + 1));
        done();
      });
      it('When the property is a string', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-grid-helper divisions="4" ref="helper" /></vgl-namespace>',
          components: { VglGridHelper, VglNamespace },
        }).$mount();
        const vertices = vm.$refs.helper.inst.geometry.getAttribute('position').array;
        assert.lengthOf(vertices, 6 * 2 * (4 + 1));
        done();
      });
      it('When the property is undefined', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-grid-helper ref="helper" /></vgl-namespace>',
          components: { VglGridHelper, VglNamespace },
        }).$mount();
        const vertices = vm.$refs.helper.inst.geometry.getAttribute('position').array;
        assert.lengthOf(vertices, 6 * 2 * (10 + 1));
        done();
      });
    });
    describe('The color of center line should be same as the colorCenterLine property.', function suite() {
      it('When the property is a string', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-grid-helper color-center-line="#2819fe" ref="helper" /></vgl-namespace>',
          components: { VglGridHelper, VglNamespace },
        }).$mount();
        const colors = vm.$refs.helper.inst.geometry.getAttribute('color').array;
        assert.closeTo(colors[4 * 3 * 5], 0.1568627, 1e-6);
        assert.closeTo(colors[(4 * 3 * 5) + 1], 0.0980392, 1e-6);
        assert.closeTo(colors[(4 * 3 * 5) + 2], 0.9960784, 1e-6);
        done();
      });
      it('When the property is undefined', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-grid-helper ref="helper" /></vgl-namespace>',
          components: { VglGridHelper, VglNamespace },
        }).$mount();
        const colors = vm.$refs.helper.inst.geometry.getAttribute('color').array;
        assert.closeTo(colors[4 * 3 * 5], 0.2666667, 1e-6);
        assert.closeTo(colors[(4 * 3 * 5) + 1], 0.2666667, 1e-6);
        assert.closeTo(colors[(4 * 3 * 5) + 2], 0.2666667, 1e-6);
        done();
      });
    });
    describe('The color of grid should be same as the colorGrid property.', function suite() {
      it('When the property is a string', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-grid-helper color-grid="#dea54f" ref="helper" /></vgl-namespace>',
          components: { VglGridHelper, VglNamespace },
        }).$mount();
        const colors = vm.$refs.helper.inst.geometry.getAttribute('color').array;
        assert.closeTo(colors[0], 0.8705882, 1e-6);
        assert.closeTo(colors[1], 0.6470588, 1e-6);
        assert.closeTo(colors[2], 0.3098039, 1e-6);
        done();
      });
      it('When the property is undefined', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-grid-helper ref="helper" /></vgl-namespace>',
          components: { VglGridHelper, VglNamespace },
        }).$mount();
        const colors = vm.$refs.helper.inst.geometry.getAttribute('color').array;
        assert.closeTo(colors[0], 0.5333333, 1e-6);
        assert.closeTo(colors[1], 0.5333333, 1e-6);
        assert.closeTo(colors[2], 0.5333333, 1e-6);
        done();
      });
    });
  });
  describe('Watching properties', function suite() {
    it('The instance should be recreated when a property changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-grid-helper :size="size" ref="helper" /></vgl-namespace>',
        components: { VglGridHelper, VglNamespace },
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
