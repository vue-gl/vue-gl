describe('The Utils module', () => {
  const assert = chai.assert
  describe('parseVector3 function', () => {
    const { parseVector3 } = VueGL.Utils
    const { Vector3 } = THREE
    describe('When the argument is a Vector3 object', () => {
      it('Should return the argument directly', () => {
        const arg = new Vector3(3, 2, -1)
        const a = parseVector3(arg)
        assert.strictEqual(a, arg)
      })
      it('Should modify the second argument object when it is passed.', () => {
        const v = new Vector3()
        parseVector3(new Vector3(2, 4, 6.5), v)
        assert.strictEqual(v.x, 2)
        assert.strictEqual(v.y, 4)
        assert.strictEqual(v.z, 6.5)
      })
    })
    describe('When the argument is a string', () => {
      it('Should return a parsed Vector3 object.', () => {
        const a = parseVector3('3 -2 -1')
        assert.isTrue(a.isVector3)
        assert.strictEqual(a.x, 3)
        assert.strictEqual(a.y, -2)
        assert.strictEqual(a.z, -1)
      })
      it('Should modify the second argument object when it is passed.', () => {
        const v = new Vector3()
        parseVector3('2  4 6.5 ', v)
        assert.strictEqual(v.x, 2)
        assert.strictEqual(v.y, 4)
        assert.strictEqual(v.z, 6.5)
      })
    })
  })
  describe('parseEuler function', () => {
    const { parseEuler } = VueGL.Utils
    const { Euler } = THREE
    describe('When the argument is an Euler object', () => {
      it('Should return the argument directly', () => {
        const arg = new Euler(3, 0, 2, 'YZX')
        const a = parseEuler(arg)
        assert.strictEqual(a, arg)
      })
      it('Should modify the second argument object when it is passed.', () => {
        const e = new Euler()
        parseEuler(new Euler(4, -1, 2.1, 'ZXY'), e)
        assert.strictEqual(e.x, 4)
        assert.strictEqual(e.y, -1)
        assert.strictEqual(e.z, 2.1)
        assert.strictEqual(e.order, 'ZXY')
      })
    })
    describe('When the argument is a string', () => {
      it('Should return a parsed Euler object, the argument is a string with order option.', () => {
        const a = parseEuler('3 -2 -1 YZX')
        assert.isTrue(a.isEuler)
        assert.strictEqual(a.x, 3)
        assert.strictEqual(a.y, -2)
        assert.strictEqual(a.z, -1)
        assert.strictEqual(a.order, 'YZX')
      })
      it('Should return a parsed Euler object, the argument is a string without order option.', () => {
        const a = parseEuler('-3  2 -1.5 ')
        assert.isTrue(a.isEuler)
        assert.strictEqual(a.x, -3)
        assert.strictEqual(a.y, 2)
        assert.strictEqual(a.z, -1.5)
        assert.strictEqual(a.order, 'XYZ')
      })
      it('Should modify the second argument object when it is passed.', () => {
        const e = new Euler()
        parseEuler(' -2 4.1 5', e)
        assert.strictEqual(e.x, -2)
        assert.strictEqual(e.y, 4.1)
        assert.strictEqual(e.z, 5)
        assert.strictEqual(e.order, 'XYZ')
      })
    })
  })
  describe('parseSpherical function', () => {
    const { parseSpherical } = VueGL.Utils
    const { Spherical } = THREE
    describe('When the argument is a Spherical object', () => {
      it('Should return the argument directly', () => {
        const arg = new Spherical(3, 2, -1)
        const a = parseSpherical(arg)
        assert.strictEqual(a, arg)
      })
      it('Should modify the second argument object when it is passed.', () => {
        const s = new Spherical()
        parseSpherical(new Spherical(21, 1.1, -2), s)
        assert.strictEqual(s.radius, 21)
        assert.strictEqual(s.phi, 1.1)
        assert.strictEqual(s.theta, -2)
      })
    })
    describe('When the argument is a string', () => {
      it('Should return a parsed Spherical object.', () => {
        const a = parseSpherical('3 2 -1')
        assert.isTrue(a instanceof Spherical)
        assert.strictEqual(a.radius, 3)
        assert.strictEqual(a.phi, 2)
        assert.strictEqual(a.theta, -1)
      })
      it('Returned Spherical object sholud maked safe.', () => {
        const a = parseSpherical('-3  0 -1.5 ')
        assert.isTrue(a instanceof Spherical)
        assert.strictEqual(a.radius, -3)
        assert.notStrictEqual(a.phi, 0)
        assert.closeTo(a.phi, 0, 1e-6)
        assert.strictEqual(a.theta, -1.5)
      })
      it('Should modify the second argument object when it is passed.', () => {
        const s = new Spherical()
        parseSpherical('210  1.12 -2.5', s)
        assert.strictEqual(s.radius, 210)
        assert.strictEqual(s.phi, 1.12)
        assert.strictEqual(s.theta, -2.5)
      })
    })
  })
  describe('parseFloat_ function', () => {
    const { parseFloat_ } = VueGL.Utils
    describe('When the argument is a string', () => {
      it('Should return a parsed float number', () => {
        assert.strictEqual(parseFloat_("62.285e3'a"), 62285)
      })
    })
    describe('When the argument is a number', () => {
      it('Should return a number same as the argument', () => {
        assert.strictEqual(parseFloat_(23.85), 23.85)
      })
    })
    describe('When the argument is an undefined', () => {
      it('Should return an undefined', () => {
        assert.isUndefined(parseFloat_(undefined))
      })
    })
    describe('When the argument is an Object', () => {
      it('Should return the argument directly', () => {
        const arg = {}
        assert.strictEqual(parseFloat_(arg), arg)
      })
    })
  })
  describe('parseInt_ function', () => {
    const { parseInt_ } = VueGL.Utils
    describe('When the argument is a string', () => {
      it('Should return a parsed integer number', () => {
        assert.strictEqual(parseInt_("62.285e3'a"), 62)
      })
    })
    describe('When the argument is a number', () => {
      it('Should return a number same as the argument', () => {
        assert.strictEqual(parseInt_(23.85), 23.85)
      })
    })
    describe('When the argument is an undefined', () => {
      it('Should return an undefined', () => {
        assert.isUndefined(parseInt_(undefined))
      })
    })
    describe('When the argument is an Object', () => {
      it('Should return the argument directly', () => {
        const arg = {}
        assert.strictEqual(parseInt_(arg), arg)
      })
    })
  })
  describe('findParent function', () => {
    const { findParent } = VueGL.Utils
    it('Should return undefined when the vm.$parent is undefined.', () => {
      assert.isUndefined(findParent({}))
    })
    it('Should return vm.$parent when the vm.$parent has [key] option.', () => {
      const vm = { $parent: { $options: { testkey: true }}}
      assert.strictEqual(findParent(vm, 'testkey'), vm.$parent)
    })
    it("Should return vm.$parent.$parent when the vm.$parent doesn't has [key] option and its parent has it.", () => {
      const vm = { $parent: { $options: {}, $parent: { $options: { mockkey: true }}}}
      assert.strictEqual(findParent(vm, 'mockkey'), vm.$parent.$parent)
    })
  })
})
