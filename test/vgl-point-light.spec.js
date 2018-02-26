describe('VglPointLight:', function suite() {
  const { VglPointLight, VglNamespace } = VueGL;
  const { expect } = chai;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-point-light ref="o" /></vgl-namespace>',
      components: { VglPointLight, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
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
    const vm = new Vue({
      template: '<vgl-namespace><vgl-point-light position="1 1.5 -1.1" color="#4fd58a" intensity="0.88" distance="80" decay="3" ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglPointLight },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
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
    const vm = new Vue({
      template: '<vgl-namespace><vgl-point-light :position="p" :color="c" :intensity="i" :distance="d" :decay="r" ref="o" /></vgl-namespace>',
      components: { VglPointLight, VglNamespace },
      data: {
        p: '1 1.5 -1.1',
        c: '#4fd58a',
        i: 0.88,
        d: '80',
        r: '3',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.p = '2 2 0';
      vm.c = '#aaffb3';
      vm.i = '0.76';
      vm.d = '67';
      vm.r = '2';
      vm.$nextTick(() => {
        try {
          const actual = vm.$refs.o.inst.clone();
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
