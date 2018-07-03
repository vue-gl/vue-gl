describe('VglObject3d:', function suite() {
  const { VglObject3d, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-object3d ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglObject3d },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
        actual.updateMatrixWorld();
        const expected = new THREE.Object3D();
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expect(actual.toJSON()).to.deep.equal(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-object3d position="8 3 -3.5" rotation="0.8 0.8 0.5 XZY" scale="1.3 1.4 1.1" cast-shadow receive-shadow disable-frustum-culled name="a\'&><o<" ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglObject3d },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
        actual.updateMatrixWorld();
        const expected = Object.assign(new THREE.Object3D(), {
          castShadow: true,
          receiveShadow: true,
          frustumCulled: false,
        });
        expected.position.set(8, 3, -3.5);
        expected.rotation.set(0.8, 0.8, 0.5, 'XZY');
        expected.scale.set(1.3, 1.4, 1.1);
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expect(actual.toJSON()).to.deep.equal(expected.toJSON());
        expect(vm.$refs.o.vglNamespace.object3ds).to.have.property('a\'&><o<', vm.$refs.o.inst);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-object3d :position="p" :rotation="r" :scale="s" :cast-shadow="cs" :receive-shadow="rs" :disable-frustum-culled="df" :name="n" ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglObject3d },
      data: {
        p: '0 1 0',
        r: '0 0 0.2 XYZ',
        s: '1.1 0.9 0.8',
        cs: false,
        rs: true,
        n: '&%93\'0',
        df: false,
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.p = '1.1 2 0.8';
      vm.r = '0.23 0.4 1.1 YZX';
      vm.s = '0.8 0.7 0.9';
      vm.cs = true;
      vm.rs = false;
      vm.n = '<&~|-';
      vm.df = true;
      vm.$nextTick(() => {
        try {
          const actual = vm.$refs.o.inst.clone();
          actual.updateMatrixWorld();
          const expected = Object.assign(new THREE.Object3D(), {
            castShadow: true,
            receiveShadow: false,
            frustumCulled: false,
          });
          expected.position.set(1.1, 2, 0.8);
          expected.rotation.set(0.23, 0.4, 1.1, 'YZX');
          expected.scale.set(0.8, 0.7, 0.9);
          expected.updateMatrixWorld();
          expected.uuid = actual.uuid;
          expect(actual.toJSON()).to.deep.equal(expected.toJSON());
          expect(vm.$refs.o.vglNamespace.object3ds).to.have.property('<&~|-', vm.$refs.o.inst);
          expect(vm.$refs.o.vglNamespace.object3ds).not.to.have.property('&%93\'0');
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  it('after creation and destruction', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-object3d ref="v" /><vgl-object3d ref="p"><vgl-object3d v-if="exists" name="&%93\'0" ref="o" /></vgl-object3d></vgl-namespace>',
      components: { VglNamespace, VglObject3d },
      data: { exists: false },
    }).$mount();
    vm.$nextTick(() => {
      try {
        expect(vm.$refs.v.vglNamespace.object3ds).not.to.have.property('&%93\'0');
        expect(vm.$refs.p.inst.children).to.have.lengthOf(0);
        vm.exists = true;
      } catch (e) {
        done(e);
      }
      vm.$nextTick(() => {
        try {
          expect(vm.$refs.v.vglNamespace.object3ds).to.have.property('&%93\'0', vm.$refs.o.inst);
          expect(vm.$refs.p.inst.children).to.include(vm.$refs.o.inst);
          vm.exists = false;
        } catch (e) {
          done(e);
        }
        vm.$nextTick(() => {
          try {
            expect(vm.$refs.v.vglNamespace.object3ds).not.to.have.property('&%93\'0');
            expect(vm.$refs.p.inst.children).to.have.lengthOf(0);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
});
