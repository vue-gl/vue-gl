describe('VglDodecahedronGeometry:', function suite() {
  const { VglDodecahedronGeometry, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-dodecahedron-geometry ref="g" /></vgl-namespace>',
      components: { VglDodecahedronGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.DodecahedronBufferGeometry()).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-dodecahedron-geometry ref="g" radius="72.3" detail="2" /></vgl-namespace>',
      components: { VglDodecahedronGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.DodecahedronBufferGeometry(72.3, 2)).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-dodecahedron-geometry ref="g" :radius="r" :detail="d" /></vgl-namespace>',
      components: { VglDodecahedronGeometry, VglNamespace },
      data: { r: 10.8, d: 2 },
    }).$mount();
    vm.$nextTick(() => {
      vm.r = 12.5;
      vm.d = 1;
      vm.$nextTick(() => {
        try {
          const mediator = new THREE.BufferGeometry();
          const expected = mediator.copy(new THREE.DodecahedronBufferGeometry(12.5, 1)).toJSON();
          expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
