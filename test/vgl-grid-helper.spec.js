describe('VglGridHelper:', function suite() {
  const { VglGridHelper, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-grid-helper ref="h" /></vgl-namespace>',
      components: { VglGridHelper, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = new THREE.LineSegments().copy(vm.$refs.h.inst);
        actual.geometry = vm.$refs.h.inst.geometry;
        actual.material = vm.$refs.h.inst.material;
        actual.updateMatrixWorld();
        const expected = new THREE.GridHelper();
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
      template: '<vgl-namespace><vgl-grid-helper size="88.73" divisions="22" color-center-line="#8fedc3" color-grid="#ff24f5" position="3 3.5 0.2" rotation="0.3 0.3 0.2 XYZ" scale="1.1 1.2 0.9" ref="h" /></vgl-namespace>',
      components: { VglGridHelper, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = new THREE.LineSegments().copy(vm.$refs.h.inst);
        actual.geometry = vm.$refs.h.inst.geometry;
        actual.material = vm.$refs.h.inst.material;
        actual.updateMatrixWorld();
        const expected = new THREE.GridHelper(88.73, 22, 0x8fedc3, 0xff24f5);
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
      template: '<vgl-namespace><vgl-grid-helper :size="sz" :divisions="d" :color-center-line="cc" :color-grid="cg" :position="p" :rotation="r" :scale="sc" ref="h" /></vgl-namespace>',
      components: { VglGridHelper, VglNamespace },
      data: {
        sz: '1.1',
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
          const expected = new THREE.GridHelper(12, 19, 0xdd39f9, 0x6aa57c);
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
