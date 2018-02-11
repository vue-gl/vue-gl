describe('VglGroup:', function suite() {
  const { VglGroup } = VueGL;
  const { expect } = chai;
  it('without properties', function test(done) {
    const vm = new Vue(VglGroup);
    vm.$nextTick(() => {
      try {
        const actual = vm.inst.clone();
        actual.updateMatrixWorld();
        const expected = new THREE.Group();
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expect(actual.toJSON()).to.deep.equal(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new (Vue.extend(VglGroup))({
      propsData: { position: '8 3 -3.5', rotation: '0.8 0.8 0.5 XZY', scale: '1.3 1.4 1.1' },
    });
    vm.$nextTick(() => {
      try {
        const actual = vm.inst.clone();
        actual.updateMatrixWorld();
        const expected = new THREE.Group();
        expected.position.set(8, 3, -3.5);
        expected.rotation.set(0.8, 0.8, 0.5, 'XZY');
        expected.scale.set(1.3, 1.4, 1.1);
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expect(actual.toJSON()).to.deep.equal(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new (Vue.extend(VglGroup))({
      propsData: { position: '0 1 0', rotation: '0 0 0.2 XYZ', scale: '1.1 0.9 0.8' },
    });
    vm.$nextTick(() => {
      vm.position = '1.1 2 0.8';
      vm.rotation = '0.23 0.4 1.1 YZX';
      vm.scale = '0.8 0.7 0.9';
      vm.$nextTick(() => {
        try {
          const actual = vm.inst.clone();
          actual.updateMatrixWorld();
          const expected = new THREE.Group();
          expected.position.set(1.1, 2, 0.8);
          expected.rotation.set(0.23, 0.4, 1.1, 'YZX');
          expected.scale.set(0.8, 0.7, 0.9);
          expected.updateMatrixWorld();
          expected.uuid = actual.uuid;
          expect(actual.toJSON()).to.deep.equal(expected.toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
