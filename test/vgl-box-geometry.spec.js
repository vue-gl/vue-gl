describe('VglBoxGeometry:', function suite() {
  const { VglBoxGeometry, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-box-geometry ref="g" /></vgl-namespace>',
      components: { VglBoxGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.BoxBufferGeometry()).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-box-geometry ref="g" width="100" height="60" depth="80" width-segments="3" height-segments="4" depth-segments="7" /></vgl-namespace>',
      components: { VglBoxGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.BoxBufferGeometry(100, 60, 80, 3, 4, 7)).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-box-geometry ref="g" :width="w" :height="h" :depth="d" width-segments="3" height-segments="4" depth-segments="7" /></vgl-namespace>',
      components: { VglBoxGeometry, VglNamespace },
      data: { w: 10, h: 6, d: 3.8 },
    }).$mount();
    vm.$nextTick(() => {
      vm.w = 1.5;
      vm.h = 7;
      vm.d = 22;
      vm.$nextTick(() => {
        try {
          const mediator = new THREE.BufferGeometry();
          const expected = mediator.copy(new THREE.BoxBufferGeometry(1.5, 7, 22, 3, 4, 7)).toJSON();
          expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
