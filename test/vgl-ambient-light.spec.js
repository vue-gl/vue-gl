describe('VglAmbientLight:', function suite() {
  const { VglAmbientLight, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-ambient-light ref="o" /></vgl-namespace>',
      components: { VglAmbientLight, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
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
    const vm = new Vue({
      template: '<vgl-namespace><vgl-ambient-light color="#f8054a" intensity="0.88" ref="o" /></vgl-namespace>',
      components: { VglAmbientLight, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
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
    const vm = new Vue({
      template: '<vgl-namespace><vgl-ambient-light ref="o" :color="c" :intensity="i" /></vgl-namespace>',
      components: { VglAmbientLight, VglNamespace },
      data: { c: '#f8054a', i: 0.88 },
    }).$mount();
    vm.$nextTick(() => {
      vm.c = '#8899da';
      vm.i = '0.76';
      vm.$nextTick(() => {
        try {
          const actual = vm.$refs.o.inst.clone();
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
