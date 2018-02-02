describe('VglTextGeometry component', function component() {
  const { VglTextGeometry, VglNamespace, VglFont } = VueGL;
  const { assert } = chai;
  this.timeout(5000);
  before(function hook(done) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      this.typeface = `data:,${encodeURIComponent(xhr.responseText)}`;
      done();
    }, false);
    xhr.open('GET', 'base/test/helvetiker_regular.typeface.json');
    xhr.send();
  });
  describe('Parameters of a instance should be same as the component properties.', function suite() {
    it('When properties are number.', function test(done) {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-font ref="font" name="font" src="${this.typeface}" /><vgl-text-geometry ref="geo" font="font" :size="120" :height="6" :curve-segments="8" :bevel-enabled="true" :bevel-thickness="3" :bevel-size="6" :bevel-segments="2">a</vgl-text-geometry></vgl-namespace>`,
        components: { VglTextGeometry, VglNamespace, VglFont },
      }).$mount();
      vm.$refs.font.$watch('inst', () => {
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.size, 120);
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.height, 6);
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.curveSegments, 8);
            assert.isTrue(vm.$refs.geo.inst.parameters.parameters.bevelEnabled);
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelThickness, 3);
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSize, 6);
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSegments, 2);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('When properties are string.', function test(done) {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-font ref="font" name="font" src="${this.typeface}" /><vgl-text-geometry ref="geo" font="font" size="110" height="6" curve-segments="8" bevel-enabled bevel-thickness="3" bevel-size="6" bevel-segments="2">a</vgl-text-geometry></vgl-namespace>`,
        components: { VglTextGeometry, VglNamespace, VglFont },
      }).$mount();
      vm.$refs.font.$watch('inst', () => {
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.size, 110);
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.height, 6);
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.curveSegments, 8);
            assert.isTrue(vm.$refs.geo.inst.parameters.parameters.bevelEnabled);
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelThickness, 3);
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSize, 6);
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSegments, 2);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('When properties are undefined.', function test(done) {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-font ref="font" name="font" src="${this.typeface}" /><vgl-text-geometry ref="geo" font="font">a</vgl-text-geometry></vgl-namespace>`,
        components: { VglTextGeometry, VglNamespace, VglFont },
      }).$mount();
      vm.$refs.font.$watch('inst', () => {
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.size, 100);
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.height, 50);
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.curveSegments, 12);
            assert.isFalse(vm.$refs.geo.inst.parameters.parameters.bevelEnabled);
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelThickness, 10);
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSize, 8);
            assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSegments, 3);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
  describe('Instance should be recreated when a property changed.', function suite() {
    it('When the width property changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-font ref="font" name="font" src="base/test/helvetiker_regular.typeface.json" /><vgl-text-geometry ref="geo" font="font" :size="size">a</vgl-text-geometry></vgl-namespace>',
        components: { VglTextGeometry, VglNamespace, VglFont },
        data: { size: 120 },
      }).$mount();
      vm.$refs.font.$watch('inst', () => {
        vm.$nextTick(() => {
          const before = vm.$refs.geo.inst;
          vm.size = 110;
          vm.$nextTick(() => {
            try {
              assert.notEqual(before, vm.$refs.geo.inst);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
  });
});
