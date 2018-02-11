describe('VglPointLight:', function suite() {
  const { VglPointLight } = VueGL;
  const { expect } = chai;
  it('without properties', function test(done) {
    const vm = new Vue(VglPointLight);
    vm.$nextTick(() => {
      try {
        const actual = vm.inst.clone();
        actual.updateMatrixWorld();
        const expected = new THREE.PointLight();
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
    const vm = new (Vue.extend(VglPointLight))({
      propsData: {
        position: '1 1.5 -1.1',
        color: '#4fd58a',
        intensity: 0.88,
        distance: '80',
        decay: '3',
      },
    });
    vm.$nextTick(() => {
      try {
        const actual = vm.inst.clone();
        actual.updateMatrixWorld();
        const expected = new THREE.PointLight(0x4fd58a, 0.88);
        expected.position.set(1, 1.5, -1.1);
        expected.distance = 80;
        expected.decay = 3;
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
    const vm = new (Vue.extend(VglPointLight))({
      propsData: {
        position: '1 1.5 -1.1',
        color: '#4fd58a',
        intensity: 0.88,
        distance: '80',
        decay: '3',
      },
    });
    vm.$nextTick(() => {
      vm.position = '2 2 0';
      vm.color = '#aaffb3';
      vm.intensity = '0.76';
      vm.distance = '67';
      vm.decay = '2';
      vm.$nextTick(() => {
        try {
          const actual = vm.inst.clone();
          actual.updateMatrixWorld();
          const expected = new THREE.PointLight(0xaaffb3, 0.76);
          expected.position.set(2, 2, 0);
          expected.distance = 67;
          expected.decay = 2;
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
