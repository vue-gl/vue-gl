describe('VglAmbientLight:', function suite() {
  const { VglAmbientLight } = VueGL;
  const { expect } = chai;
  it('without properties', function test(done) {
    const vm = new Vue(VglAmbientLight);
    vm.$nextTick(() => {
      try {
        const actual = vm.inst.clone();
        const expected = new THREE.AmbientLight();
        expected.uuid = actual.uuid;
        expect(actual.toJSON()).to.deep.equal(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new (Vue.extend(VglAmbientLight))({
      propsData: { color: '#f8054a', intensity: 0.88 },
    });
    vm.$nextTick(() => {
      try {
        const actual = vm.inst.clone();
        const expected = new THREE.AmbientLight(0xf8054a, 0.88);
        expected.uuid = actual.uuid;
        expect(actual.toJSON()).to.deep.equal(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new (Vue.extend(VglAmbientLight))({
      propsData: { color: '#f8054a', intensity: 0.88 },
    });
    vm.$nextTick(() => {
      vm.color = '#8899da';
      vm.intensity = '0.76';
      vm.$nextTick(() => {
        try {
          const actual = vm.inst.clone();
          const expected = new THREE.AmbientLight(0x8899da, 0.76);
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
