describe('VglHemisphereLight:', function suite() {
  const { VglHemisphereLight, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-hemisphere-light ref="o" /></vgl-namespace>',
      components: { VglHemisphereLight, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
        const expected = new THREE.HemisphereLight();
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
      template: '<vgl-namespace><vgl-hemisphere-light color="#f8054a" ground-color="#6751f2" intensity="0.88" ref="o" /></vgl-namespace>',
      components: { VglHemisphereLight, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
        const expected = new THREE.HemisphereLight(0xf8054a, 0x6751f2, 0.88);
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
      template: '<vgl-namespace><vgl-hemisphere-light ref="o" :color="c" :ground-color="g" :intensity="i" /></vgl-namespace>',
      components: { VglHemisphereLight, VglNamespace },
      data: { c: '#f8054a', i: 0.88, g: '#6751f2' },
    }).$mount();
    vm.$nextTick(() => {
      vm.c = '#8899da';
      vm.i = '0.76';
      vm.g = '#77645a';
      vm.$nextTick(() => {
        try {
          const actual = vm.$refs.o.inst.clone();
          const expected = new THREE.HemisphereLight(0x8899da, 0x77645a, 0.76);
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
