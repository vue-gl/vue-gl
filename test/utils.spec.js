describe('The Utils module', function module() {
  const { assert } = chai;
  describe('parseVector3 function', function target() {
    const { parseVector3 } = VueGL.Utils;
    const { Vector3 } = THREE;
    describe('When the argument is a Vector3 object', function suite() {
      it('Should return the argument directly', function test(done) {
        const arg = new Vector3(3, 2, -1);
        const a = parseVector3(arg);
        assert.strictEqual(a, arg);
        done();
      });
      it('Should modify the second argument object when it is passed.', function test(done) {
        const v = new Vector3();
        parseVector3(new Vector3(2, 4, 6.5), v);
        assert.strictEqual(v.x, 2);
        assert.strictEqual(v.y, 4);
        assert.strictEqual(v.z, 6.5);
        done();
      });
    });
    describe('When the argument is a string', function suite() {
      it('Should return a parsed Vector3 object.', function test(done) {
        const a = parseVector3('3 -2 -1');
        assert.isTrue(a.isVector3);
        assert.strictEqual(a.x, 3);
        assert.strictEqual(a.y, -2);
        assert.strictEqual(a.z, -1);
        done();
      });
      it('Should modify the second argument object when it is passed.', function test(done) {
        const v = new Vector3();
        parseVector3('2  4 6.5 ', v);
        assert.strictEqual(v.x, 2);
        assert.strictEqual(v.y, 4);
        assert.strictEqual(v.z, 6.5);
        done();
      });
    });
  });
  describe('parseEuler function', function target() {
    const { parseEuler } = VueGL.Utils;
    const { Euler } = THREE;
    describe('When the argument is an Euler object', function suite() {
      it('Should return the argument directly', function test(done) {
        const arg = new Euler(3, 0, 2, 'YZX');
        const a = parseEuler(arg);
        assert.strictEqual(a, arg);
        done();
      });
      it('Should modify the second argument object when it is passed.', function test(done) {
        const e = new Euler();
        parseEuler(new Euler(4, -1, 2.1, 'ZXY'), e);
        assert.strictEqual(e.x, 4);
        assert.strictEqual(e.y, -1);
        assert.strictEqual(e.z, 2.1);
        assert.strictEqual(e.order, 'ZXY');
        done();
      });
    });
    describe('When the argument is a string', function suite() {
      it('Should return a parsed Euler object, the argument is a string with order option.', function test(done) {
        const a = parseEuler('3 -2 -1 YZX');
        assert.isTrue(a.isEuler);
        assert.strictEqual(a.x, 3);
        assert.strictEqual(a.y, -2);
        assert.strictEqual(a.z, -1);
        assert.strictEqual(a.order, 'YZX');
        done();
      });
      it('Should return a parsed Euler object, the argument is a string without order option.', function test(done) {
        const a = parseEuler('-3  2 -1.5 ');
        assert.isTrue(a.isEuler);
        assert.strictEqual(a.x, -3);
        assert.strictEqual(a.y, 2);
        assert.strictEqual(a.z, -1.5);
        assert.strictEqual(a.order, 'XYZ');
        done();
      });
      it('Should modify the second argument object when it is passed.', function test(done) {
        const e = new Euler();
        parseEuler(' -2 4.1 5', e);
        assert.strictEqual(e.x, -2);
        assert.strictEqual(e.y, 4.1);
        assert.strictEqual(e.z, 5);
        assert.strictEqual(e.order, 'XYZ');
        done();
      });
    });
  });
  describe('parseSpherical function', function target() {
    const { parseSpherical } = VueGL.Utils;
    const { Spherical } = THREE;
    describe('When the argument is a Spherical object', function suite() {
      it('Should return the argument directly', function test(done) {
        const arg = new Spherical(3, 2, -1);
        const a = parseSpherical(arg);
        assert.strictEqual(a, arg);
        done();
      });
      it('Should modify the second argument object when it is passed.', function test(done) {
        const s = new Spherical();
        parseSpherical(new Spherical(21, 1.1, -2), s);
        assert.strictEqual(s.radius, 21);
        assert.strictEqual(s.phi, 1.1);
        assert.strictEqual(s.theta, -2);
        done();
      });
    });
    describe('When the argument is a string', function suite() {
      it('Should return a parsed Spherical object.', function test(done) {
        const a = parseSpherical('3 2 -1');
        assert.isTrue(a instanceof Spherical);
        assert.strictEqual(a.radius, 3);
        assert.strictEqual(a.phi, 2);
        assert.strictEqual(a.theta, -1);
        done();
      });
      it('Returned Spherical object sholud maked safe.', function test(done) {
        const a = parseSpherical('-3  0 -1.5 ');
        assert.isTrue(a instanceof Spherical);
        assert.strictEqual(a.radius, -3);
        assert.notStrictEqual(a.phi, 0);
        assert.closeTo(a.phi, 0, 1e-6);
        assert.strictEqual(a.theta, -1.5);
        done();
      });
      it('Should modify the second argument object when it is passed.', function test(done) {
        const s = new Spherical();
        parseSpherical('210  1.12 -2.5', s);
        assert.strictEqual(s.radius, 210);
        assert.strictEqual(s.phi, 1.12);
        assert.strictEqual(s.theta, -2.5);
        done();
      });
    });
  });
  describe('parseFloatEx function', function target() {
    const { parseFloatEx } = VueGL.Utils;
    describe('When the argument is a string', function suite() {
      it('Should return a parsed float number', function test(done) {
        assert.strictEqual(parseFloatEx("62.285e3'a"), 62285);
        done();
      });
    });
    describe('When the argument is a number', function suite() {
      it('Should return a number same as the argument', function test(done) {
        assert.strictEqual(parseFloatEx(23.85), 23.85);
        done();
      });
    });
    describe('When the argument is an undefined', function suite() {
      it('Should return an undefined', function test(done) {
        assert.isUndefined(parseFloatEx(undefined));
        done();
      });
    });
    describe('When the argument is an Object', function suite() {
      it('Should return the argument directly', function test(done) {
        const arg = {};
        assert.strictEqual(parseFloatEx(arg), arg);
        done();
      });
    });
  });
  describe('parseIntEx function', function target() {
    const { parseIntEx } = VueGL.Utils;
    describe('When the argument is a string', function suite() {
      it('Should return a parsed integer number', function test(done) {
        assert.strictEqual(parseIntEx("62.285e3'a"), 62);
        done();
      });
    });
    describe('When the argument is a number', function suite() {
      it('Should return a number same as the argument', function test(done) {
        assert.strictEqual(parseIntEx(23.85), 23.85);
        done();
      });
    });
    describe('When the argument is an undefined', function suite() {
      it('Should return an undefined', function test(done) {
        assert.isUndefined(parseIntEx(undefined));
        done();
      });
    });
    describe('When the argument is an Object', function suite() {
      it('Should return the argument directly', function test(done) {
        const arg = {};
        assert.strictEqual(parseIntEx(arg), arg);
        done();
      });
    });
  });
  describe('findParent function', function target() {
    const { findParent } = VueGL.Utils;
    it('Should return undefined when the vm.$parent is undefined.', function test(done) {
      assert.isUndefined(findParent({}));
      done();
    });
    it('Should return vm.$parent when the vm.$parent has [key] option.', function test(done) {
      const vm = { $parent: { $options: { testkey: true } } };
      assert.strictEqual(findParent(vm, 'testkey'), vm.$parent);
      done();
    });
    it("Should return vm.$parent.$parent when the vm.$parent doesn't has [key] option and its parent has it.", function test(done) {
      const vm = { $parent: { $options: {}, $parent: { $options: { mockkey: true } } } };
      assert.strictEqual(findParent(vm, 'mockkey'), vm.$parent.$parent);
      done();
    });
  });
});
