describe('VglConeGeometry:', function suite() {
  const { VglConeGeometry, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-cone-geometry ref="g" /></vgl-namespace>',
      components: { VglConeGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.ConeBufferGeometry()).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-cone-geometry ref="g" radius="1.01" height="1.586" radial-segments="11" height-segments="5" open-ended theta-start="0.63" theta-length="2.21" /></vgl-namespace>',
      components: { VglConeGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.ConeBufferGeometry(
          1.01,
          1.586,
          11,
          5,
          true,
          0.63,
          2.21,
        )).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-cone-geometry ref="g" :radius="r" height="1.586" radial-segments="11" height-segments="5" :open-ended="o" theta-start="0.63" :theta-length="tLen" /></vgl-namespace>',
      components: { VglConeGeometry, VglNamespace },
      data: { r: 1.2, o: false, tLen: 2.8 },
    }).$mount();
    vm.$nextTick(() => {
      vm.r = 0.842;
      vm.o = true;
      vm.tLen = 1.21;
      vm.$nextTick(() => {
        try {
          const mediator = new THREE.BufferGeometry();
          const expected = mediator.copy(new THREE.ConeBufferGeometry(
            0.842,
            1.586,
            11,
            5,
            true,
            0.63,
            1.21,
          )).toJSON();
          expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
