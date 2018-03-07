describe('VglCircleGeometry:', function suite() {
  const { VglCircleGeometry, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-circle-geometry ref="g" /></vgl-namespace>',
      components: { VglCircleGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.CircleBufferGeometry()).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-circle-geometry ref="g" radius="100" segments="60" theta-start="0.1" theta-length="3.3" /></vgl-namespace>',
      components: { VglCircleGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.CircleBufferGeometry(100, 60, 0.1, 3.3)).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-circle-geometry ref="g" radius="90" :segments="segs" theta-start="0.1" :theta-length="tLen" /></vgl-namespace>',
      components: { VglCircleGeometry, VglNamespace },
      data: { segs: 12, tLen: 1.1 },
    }).$mount();
    vm.$nextTick(() => {
      vm.segs = 80;
      vm.tLen = 2.1;
      vm.$nextTick(() => {
        try {
          const mediator = new THREE.BufferGeometry();
          const expected = mediator.copy(new THREE.CircleBufferGeometry(90, 80, 0.1, 2.1)).toJSON();
          expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
