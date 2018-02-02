describe('VglArrowHelper component', function component() {
  const { VglArrowHelper } = VueGL;
  const { Vector3 } = THREE;
  const { assert } = chai;
  describe('Creating an object', function when() {
    describe('The dir property should determin the rotation of the object.', function suite() {
      it('When the dir is parallel to y-axis', function test(done) {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { dir: '0 2.8 0' } });
        assert.strictEqual(vm.inst.rotation.x, 0);
        assert.strictEqual(vm.inst.rotation.y, 0);
        assert.strictEqual(vm.inst.rotation.z, 0);
        assert.strictEqual(vm.inst.rotation.order, 'XYZ');
        done();
      });
      it('When the dir makes 45 degrees with y-axis and z-axis, and is orthogonal to x-axis.', function test(done) {
        const vm = new (Vue.extend(VglArrowHelper))({
          propsData: { dir: new Vector3(0, 29.8, 29.8) },
        });
        assert.closeTo(vm.inst.rotation.x, Math.PI / 4, 1e-12);
        assert.strictEqual(vm.inst.rotation.y, 0);
        assert.strictEqual(vm.inst.rotation.z, 0);
        assert.strictEqual(vm.inst.rotation.order, 'XYZ');
        done();
      });
      it('When the property is undifined', function test(done) {
        const vm = new Vue(VglArrowHelper);
        assert.strictEqual(vm.inst.rotation.x, 0);
        assert.strictEqual(vm.inst.rotation.y, 0);
        assert.strictEqual(vm.inst.rotation.z, 0);
        assert.strictEqual(vm.inst.rotation.order, 'XYZ');
        done();
      });
    });
    describe('The length property should determin the scale of arrow direction.', function suite() {
      it('When the property is a string.', function test(done) {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { length: '3.8' } });
        assert.closeTo(vm.inst.line.scale.y, 3.8 * (1 - 0.2), 1e-12);
        assert.closeTo(vm.inst.cone.scale.y, 3.8 * 0.2, 1e-12);
        done();
      });
      it('When the property is a number.', function test(done) {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { length: 2.6 } });
        assert.closeTo(vm.inst.line.scale.y, 2.6 * (1 - 0.2), 1e-12);
        assert.closeTo(vm.inst.cone.scale.y, 2.6 * 0.2, 1e-12);
        done();
      });
      it('When the property is undefined.', function test(done) {
        const vm = new Vue(VglArrowHelper);
        assert.closeTo(vm.inst.line.scale.y, 1 * (1 - 0.2), 1e-12);
        assert.closeTo(vm.inst.cone.scale.y, 1 * 0.2, 1e-12);
        done();
      });
    });
    describe('The headLength property should determin the y-scale of the cone.', function suite() {
      it('When the property is a string', function test(done) {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { headLength: '0.3' } });
        assert.strictEqual(vm.inst.cone.scale.y, 0.3);
        done();
      });
      it('When the property is a number', function test(done) {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { headLength: 0.15 } });
        assert.strictEqual(vm.inst.cone.scale.y, 0.15);
        done();
      });
    });
    describe('The headWidth property should determin the x-scale and z-scale of the cone.', function suite() {
      it('When the property is a string', function test(done) {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { headWidth: '1.2' } });
        assert.strictEqual(vm.inst.cone.scale.x, 1.2);
        assert.strictEqual(vm.inst.cone.scale.z, 1.2);
        done();
      });
      it('When the property is a number', function test(done) {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { headWidth: 0.6 } });
        assert.strictEqual(vm.inst.cone.scale.x, 0.6);
        assert.strictEqual(vm.inst.cone.scale.z, 0.6);
        done();
      });
    });
    describe('The color property should determin the color of the materials.', function suite() {
      it('When the property is a color name', function test(done) {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { color: 'aquamarine' } });
        assert.strictEqual(vm.inst.line.material.color.r, 127 / 255);
        assert.strictEqual(vm.inst.line.material.color.g, 255 / 255);
        assert.strictEqual(vm.inst.line.material.color.b, 212 / 255);
        done();
      });
      it('When the property is a hex value', function test(done) {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { color: '#1c746e' } });
        assert.strictEqual(vm.inst.line.material.color.r, 28 / 255);
        assert.strictEqual(vm.inst.line.material.color.g, 116 / 255);
        assert.strictEqual(vm.inst.line.material.color.b, 110 / 255);
        done();
      });
    });
  });
  describe('Watching properties', function when() {
    describe('The dir of the instance should change when the dir property changes.', function suite() {
      it('From undefined to a string', function test(done) {
        const vm = new Vue(VglArrowHelper);
        vm.dir = '0 2 2';
        vm.$nextTick(() => {
          try {
            assert.closeTo(vm.inst.rotation.x, Math.PI / 4, 1e-12);
            assert.strictEqual(vm.inst.rotation.y, 0);
            assert.strictEqual(vm.inst.rotation.z, 0);
            assert.strictEqual(vm.inst.rotation.order, 'XYZ');
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('From a string to a Vector3', function test(done) {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { dir: '0 3 9' } });
        vm.dir = new Vector3(0, -1, 1.73205080757);
        vm.$nextTick(() => {
          try {
            assert.closeTo(vm.inst.rotation.x, Math.PI / 1.5, 1e-12);
            assert.strictEqual(vm.inst.rotation.y, 0);
            assert.strictEqual(vm.inst.rotation.z, 0);
            assert.strictEqual(vm.inst.rotation.order, 'XYZ');
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    describe('The scale of arrow direction should change when the length property changes.', function suite() {
      it('From undefined to a number', function test(done) {
        const vm = new Vue(VglArrowHelper);
        vm.length = 5.3;
        vm.$nextTick(() => {
          try {
            assert.closeTo(vm.inst.line.scale.y, 5.3 * (1 - 0.2), 1e-12);
            assert.closeTo(vm.inst.cone.scale.y, 5.3 * 0.2, 1e-12);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('From a number to a string', function test(done) {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { length: 63.8 } });
        vm.length = '22.754';
        vm.$nextTick(() => {
          try {
            assert.closeTo(vm.inst.line.scale.y, 22.754 * (1 - 0.2), 1e-12);
            assert.closeTo(vm.inst.cone.scale.y, 22.754 * 0.2, 1e-12);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    describe('The y-scale of the cone should change when the headLength property changes.', function suite() {
      it('From undefined to a number', function test(done) {
        const vm = new Vue(VglArrowHelper);
        vm.headLength = 0.35;
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.inst.cone.scale.y, 0.35);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('From a number to a string', function test(done) {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { headLength: 0.25 } });
        vm.headLength = '0.45';
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.inst.cone.scale.y, 0.45);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    describe('The x-scale and z-scale of the cone should change when the headWidth property changes.', function suite() {
      it('From undefined to a string', function test(done) {
        const vm = new Vue(VglArrowHelper);
        vm.headWidth = '0.24';
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.inst.cone.scale.x, 0.24);
            assert.strictEqual(vm.inst.cone.scale.z, 0.24);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('From a string to a number', function test(done) {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { headWidth: '0.15' } });
        vm.headWidth = 0.18;
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.inst.cone.scale.x, 0.18);
            assert.strictEqual(vm.inst.cone.scale.z, 0.18);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    describe('The color of materials should change when the color property changes.', function suite() {
      it('From undefined to a color name', function test(done) {
        const vm = new Vue(VglArrowHelper);
        vm.color = 'crimson';
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.inst.line.material.color.r, 220 / 255);
            assert.strictEqual(vm.inst.line.material.color.g, 20 / 255);
            assert.strictEqual(vm.inst.line.material.color.b, 60 / 255);
            assert.strictEqual(vm.inst.cone.material.color.r, 220 / 255);
            assert.strictEqual(vm.inst.cone.material.color.g, 20 / 255);
            assert.strictEqual(vm.inst.cone.material.color.b, 60 / 255);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
      it('From a color name to a hex code', function test(done) {
        const vm = new (Vue.extend(VglArrowHelper))({ propsData: { color: 'blue' } });
        vm.color = '#ab76c5';
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.inst.line.material.color.r, 171 / 255);
            assert.strictEqual(vm.inst.line.material.color.g, 118 / 255);
            assert.strictEqual(vm.inst.line.material.color.b, 197 / 255);
            assert.strictEqual(vm.inst.cone.material.color.r, 171 / 255);
            assert.strictEqual(vm.inst.cone.material.color.g, 118 / 255);
            assert.strictEqual(vm.inst.cone.material.color.b, 197 / 255);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
});
