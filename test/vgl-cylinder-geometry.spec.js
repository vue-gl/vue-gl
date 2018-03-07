describe('VglCylinderGeometry:', function suite() {
  const { VglCylinderGeometry, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-cylinder-geometry ref="g" /></vgl-namespace>',
      components: { VglCylinderGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.CylinderBufferGeometry()).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-cylinder-geometry ref="g" radius-top="1.01" radius-bottom="1.02" height="1.586" radial-segments="11" height-segments="5" open-ended theta-start="0.63" theta-length="2.21" /></vgl-namespace>',
      components: { VglCylinderGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.CylinderBufferGeometry(
          1.01,
          1.02,
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
      template: '<vgl-namespace><vgl-cylinder-geometry ref="g" radius-top="1.01" :radius-bottom="r" height="1.586" radial-segments="11" height-segments="5" :open-ended="o" theta-start="0.63" :theta-length="tLen" /></vgl-namespace>',
      components: { VglCylinderGeometry, VglNamespace },
      data: { r: 1.2, o: false, tLen: 2.8 },
    }).$mount();
    vm.$nextTick(() => {
      vm.r = 0.842;
      vm.o = true;
      vm.tLen = 1.21;
      vm.$nextTick(() => {
        try {
          const mediator = new THREE.BufferGeometry();
          const expected = mediator.copy(new THREE.CylinderBufferGeometry(
            1.01,
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
