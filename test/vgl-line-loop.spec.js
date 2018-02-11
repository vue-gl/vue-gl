describe('VglLineLoop:', function suite() {
  const {
    VglLineLoop,
    VglGeometry,
    VglMaterial,
    VglNamespace,
  } = VueGL;
  const { expect } = chai;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-material name="m" ref="m" /><vgl-geometry name="g" ref="g" /><vgl-line-loop material="m" geometry="g" ref="o" /></vgl-namespace>',
      components: {
        VglNamespace,
        VglMaterial,
        VglGeometry,
        VglLineLoop,
      },
    }).$mount();
    vm.$nextTick(() => {
      try {
        expect(vm.$refs.o.inst).to.have.property('geometry', vm.$refs.g.inst);
        expect(vm.$refs.o.inst).to.have.property('material', vm.$refs.m.inst);
        const actual = vm.$refs.o.inst.clone();
        actual.updateMatrixWorld();
        const expected = new THREE.LineLoop(new THREE.BufferGeometry(), new THREE.Material());
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
      template: '<vgl-namespace><vgl-material name="m" ref="m" /><vgl-geometry name="g" ref="g" /><vgl-line-loop material="m" geometry="g" position="8 3 -3.5" rotation="0.8 0.8 0.5 XZY" scale="1.3 1.4 1.1" ref="o" /></vgl-namespace>',
      components: {
        VglNamespace,
        VglMaterial,
        VglGeometry,
        VglLineLoop,
      },
    }).$mount();
    vm.$nextTick(() => {
      try {
        expect(vm.$refs.o.inst).to.have.property('geometry', vm.$refs.g.inst);
        expect(vm.$refs.o.inst).to.have.property('material', vm.$refs.m.inst);
        const actual = vm.$refs.o.inst.clone();
        actual.updateMatrixWorld();
        const expected = new THREE.LineLoop(new THREE.BufferGeometry(), new THREE.Material());
        expected.position.set(8, 3, -3.5);
        expected.rotation.set(0.8, 0.8, 0.5, 'XZY');
        expected.scale.set(1.3, 1.4, 1.1);
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
      template: '<vgl-namespace><vgl-material name="m" ref="m" /><vgl-material name="ma" ref="ma" /><vgl-geometry name="g" ref="g" /><vgl-geometry name="ga" ref="ga" /><vgl-line-loop :material="m" :geometry="g" :position="p" :rotation="r" :scale="s" ref="o" /></vgl-namespace>',
      components: {
        VglNamespace,
        VglMaterial,
        VglGeometry,
        VglLineLoop,
      },
      data: {
        m: 'm',
        g: 'g',
        p: '0 1 0',
        r: '0 0 0.2 XYZ',
        s: '1.1 0.9 0.8',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.m = 'ma';
      vm.g = 'ga';
      vm.p = '1.1 2 0.8';
      vm.r = '0.23 0.4 1.1 YZX';
      vm.s = '0.8 0.7 0.9';
      vm.$nextTick(() => {
        try {
          expect(vm.$refs.o.inst).to.have.property('geometry', vm.$refs.ga.inst);
          expect(vm.$refs.o.inst).to.have.property('material', vm.$refs.ma.inst);
          const actual = vm.$refs.o.inst.clone();
          actual.updateMatrixWorld();
          const expected = new THREE.LineLoop(new THREE.BufferGeometry(), new THREE.Material());
          expected.position.set(1.1, 2, 0.8);
          expected.rotation.set(0.23, 0.4, 1.1, 'YZX');
          expected.scale.set(0.8, 0.7, 0.9);
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
