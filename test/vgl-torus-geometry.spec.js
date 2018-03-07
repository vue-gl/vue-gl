describe('VglTorusGeometry:', function suite() {
  const { VglTorusGeometry, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-torus-geometry ref="g" /></vgl-namespace>',
      components: { VglTorusGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.TorusBufferGeometry()).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-torus-geometry ref="g" radius="5.8" tube="2" radial-segments="20" tubular-segments="30" arc="1.1" /></vgl-namespace>',
      components: { VglTorusGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.TorusBufferGeometry(5.8, 2, 20, 30, 1.1)).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-torus-geometry ref="g" :radius="r" tube="6" radial-segments="20" :tubular-segments="s" arc="1" /></vgl-namespace>',
      components: { VglTorusGeometry, VglNamespace },
      data: { r: 25, s: 5 },
    }).$mount();
    vm.$nextTick(() => {
      vm.r = 125;
      vm.s = 7;
      vm.$nextTick(() => {
        try {
          const mediator = new THREE.BufferGeometry();
          const expected = mediator.copy(new THREE.TorusBufferGeometry(125, 6, 20, 7, 1)).toJSON();
          expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
