describe('VglDirectionalLight:', function suite() {
  const { VglDirectionalLight } = VueGL;
  const { expect } = chai;
  it('without properties', function test(done) {
    const vm = new Vue(VglDirectionalLight);
    vm.$nextTick(() => {
      try {
        const actual = vm.inst.clone();
        actual.updateMatrixWorld();
        const expected = new THREE.DirectionalLight();
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expected.shadow.camera.uuid = actual.shadow.camera.uuid;
        expect(actual.toJSON()).to.deep.equal(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new (Vue.extend(VglDirectionalLight))({
      propsData: { position: '1 2 -1', intensity: '0.792', color: '#081f0e', castShadow: true },
    });
    vm.$nextTick(() => {
      try {
        const actual = vm.inst.clone();
        actual.updateMatrixWorld();
        const expected = new THREE.DirectionalLight(0x081f0e, 0.792);
        expected.position.set(1, 2, -1);
        expected.castShadow = true;
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expected.shadow.camera.uuid = actual.shadow.camera.uuid;
        expect(actual.toJSON()).to.deep.equal(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new (Vue.extend(VglDirectionalLight))({
      propsData: { position: '1 2 -1', intensity: '0.792', color: '#081f0e', castShadow: true },
    });
    vm.$nextTick(() => {
      vm.position = '0 3 1';
      vm.intensity = 0.898;
      vm.color = '#8899fd';
      vm.castShadow = false;
      vm.$nextTick(() => {
        try {
          const actual = vm.inst.clone();
          actual.updateMatrixWorld();
          const expected = new THREE.DirectionalLight(0x8899fd, 0.898);
          expected.position.set(0, 3, 1);
          expected.castShadow = false;
          expected.updateMatrixWorld();
          expected.uuid = actual.uuid;
          expected.shadow.camera.uuid = actual.shadow.camera.uuid;
          expect(actual.toJSON()).to.deep.equal(expected.toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
