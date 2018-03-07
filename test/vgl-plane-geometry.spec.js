describe('VglPlaneGeometry:', function suite() {
  const { VglPlaneGeometry, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-plane-geometry ref="g" /></vgl-namespace>',
      components: { VglPlaneGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.PlaneBufferGeometry()).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-plane-geometry ref="g" width="100" height="60" width-segments="3" height-segments="4" /></vgl-namespace>',
      components: { VglPlaneGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.PlaneBufferGeometry(100, 60, 3, 4)).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-plane-geometry ref="g" :width="w" height="6" :width-segments="s" height-segments="4" /></vgl-namespace>',
      components: { VglPlaneGeometry, VglNamespace },
      data: { w: 10, s: 3 },
    }).$mount();
    vm.$nextTick(() => {
      vm.w = 12.5;
      vm.s = 5;
      vm.$nextTick(() => {
        try {
          const mediator = new THREE.BufferGeometry();
          const expected = mediator.copy(new THREE.PlaneBufferGeometry(12.5, 6, 5, 4)).toJSON();
          expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
