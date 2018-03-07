describe('VglPolarGridHelper:', function suite() {
  const { VglPolarGridHelper, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-polar-grid-helper ref="h" /></vgl-namespace>',
      components: { VglPolarGridHelper, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = new THREE.LineSegments().copy(vm.$refs.h.inst);
        actual.geometry = vm.$refs.h.inst.geometry;
        actual.material = vm.$refs.h.inst.material;
        actual.updateMatrixWorld();
        const expected = new THREE.PolarGridHelper();
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expected.geometry.uuid = actual.geometry.uuid;
        expected.material.uuid = actual.material.uuid;
        expect(actual.toJSON()).to.deep.equal(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-polar-grid-helper radius="88.73" radials="54" circles="33" divisions="22" color1="#8fedc3" color2="#ff24f5" position="3 3.5 0.2" rotation="0.3 0.3 0.2 XYZ" scale="1.1 1.2 0.9" ref="h" /></vgl-namespace>',
      components: { VglPolarGridHelper, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = new THREE.LineSegments().copy(vm.$refs.h.inst);
        actual.geometry = vm.$refs.h.inst.geometry;
        actual.material = vm.$refs.h.inst.material;
        actual.updateMatrixWorld();
        const expected = new THREE.PolarGridHelper(88.73, 54, 33, 22, 0x8fedc3, 0xff24f5);
        expected.position.set(3, 3.5, 0.2);
        expected.rotation.set(0.3, 0.3, 0.2, 'XYZ');
        expected.scale.set(1.1, 1.2, 0.9);
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expected.geometry.uuid = actual.geometry.uuid;
        expected.material.uuid = actual.material.uuid;
        expect(actual.toJSON()).to.deep.equal(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-polar-grid-helper :radius="sz" :radials="rs" :circles="cs" :divisions="d" :color1="cc" :color2="cg" :position="p" :rotation="r" :scale="sc" ref="h" /></vgl-namespace>',
      components: { VglPolarGridHelper, VglNamespace },
      data: {
        sz: '1.1',
        rs: '5',
        cs: '7',
        d: '18',
        cc: '#ff2234',
        cg: '#f323d2',
        p: '3 3.5 0.2',
        r: '0.3 0.3 0.2 XYZ',
        sc: '1.1 1.2 0.9',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.sz = '12';
      vm.rs = '7';
      vm.cs = '9';
      vm.d = '19';
      vm.cc = '#dd39f9';
      vm.cg = '#6aa57c';
      vm.p = '3.5 4 0.5';
      vm.r = '0.4 0.4 0.3 XYZ';
      vm.sc = '1 1 1.1';
      vm.$nextTick(() => {
        try {
          const actual = new THREE.LineSegments().copy(vm.$refs.h.inst);
          actual.geometry = vm.$refs.h.inst.geometry;
          actual.material = vm.$refs.h.inst.material;
          actual.updateMatrixWorld();
          const expected = new THREE.PolarGridHelper(12, 7, 9, 19, 0xdd39f9, 0x6aa57c);
          expected.position.set(3.5, 4, 0.5);
          expected.rotation.set(0.4, 0.4, 0.3, 'XYZ');
          expected.scale.set(1, 1, 1.1);
          expected.updateMatrixWorld();
          expected.uuid = actual.uuid;
          expected.geometry.uuid = actual.geometry.uuid;
          expected.material.uuid = actual.material.uuid;
          expect(actual.toJSON()).to.deep.equal(expected.toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
