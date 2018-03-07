describe('VglOctahedronGeometry:', function suite() {
  const { VglOctahedronGeometry, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-octahedron-geometry ref="g" /></vgl-namespace>',
      components: { VglOctahedronGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.OctahedronBufferGeometry()).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-octahedron-geometry ref="g" radius="72.3" detail="2" /></vgl-namespace>',
      components: { VglOctahedronGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.OctahedronBufferGeometry(72.3, 2)).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-octahedron-geometry ref="g" :radius="r" :detail="d" /></vgl-namespace>',
      components: { VglOctahedronGeometry, VglNamespace },
      data: { r: 10.8, d: 2 },
    }).$mount();
    vm.$nextTick(() => {
      vm.r = 12.5;
      vm.d = 1;
      vm.$nextTick(() => {
        try {
          const mediator = new THREE.BufferGeometry();
          const expected = mediator.copy(new THREE.OctahedronBufferGeometry(12.5, 1)).toJSON();
          expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
