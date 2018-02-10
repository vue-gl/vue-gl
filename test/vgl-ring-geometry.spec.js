describe('VglRingGeometry:', function suite() {
  const { VglRingGeometry, VglNamespace } = VueGL;
  const { expect } = chai;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-ring-geometry ref="g" /></vgl-namespace>',
      components: { VglRingGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.RingBufferGeometry()).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-ring-geometry ref="g" inner-radius="19.5" outer-radius="63.7" theta-segments="33" phi-segments="11" theta-start="0.5" theta-length="3.6" /></vgl-namespace>',
      components: { VglRingGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.RingBufferGeometry(
          19.5,
          63.7,
          33,
          11,
          0.5,
          3.6,
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
      template: '<vgl-namespace><vgl-ring-geometry ref="g" inner-radius="19.5" :outer-radius="r" :theta-segments="s" phi-segments="11" theta-start="0.5" theta-length="3.6" /></vgl-namespace>',
      components: { VglRingGeometry, VglNamespace },
      data: { r: 22.5, s: 8 },
    }).$mount();
    vm.$nextTick(() => {
      vm.r = 80;
      vm.s = 17;
      vm.$nextTick(() => {
        try {
          const mediator = new THREE.BufferGeometry();
          const expected = mediator.copy(new THREE.RingBufferGeometry(
            19.5,
            80,
            17,
            11,
            0.5,
            3.6,
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
