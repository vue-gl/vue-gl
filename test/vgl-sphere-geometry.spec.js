describe('VglSphereGeometry:', function suite() {
  const { VglSphereGeometry, VglNamespace } = VueGL;
  const { expect } = chai;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-sphere-geometry ref="g" /></vgl-namespace>',
      components: { VglSphereGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.SphereBufferGeometry()).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-sphere-geometry ref="g" radius="82.8" width-segments="31" height-segments="13" phi-start="0.2" phi-length="1.2" theta-start="0.3" theta-length="3.8" /></vgl-namespace>',
      components: { VglSphereGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.SphereBufferGeometry(
          82.8,
          31,
          13,
          0.2,
          1.2,
          0.3,
          3.8,
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
      template: '<vgl-namespace><vgl-sphere-geometry ref="g" radius="82.8" :width-segments="ws" :height-segments="hs" phi-start="0.2" phi-length="1.2" theta-start="0.3" theta-length="3.8" /></vgl-namespace>',
      components: { VglSphereGeometry, VglNamespace },
      data: { ws: 8, hs: 5 },
    }).$mount();
    vm.$nextTick(() => {
      vm.ws = 12;
      vm.hs = 7;
      vm.$nextTick(() => {
        try {
          const mediator = new THREE.BufferGeometry();
          const expected = mediator.copy(new THREE.SphereBufferGeometry(
            82.8,
            12,
            7,
            0.2,
            1.2,
            0.3,
            3.8,
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
