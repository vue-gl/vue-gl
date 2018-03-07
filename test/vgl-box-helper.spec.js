describe('VglBoxHelper:', function suite() {
  const {
    VglBoxHelper,
    VglSphereGeometry,
    VglMesh,
    VglNamespace,
  } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-sphere-geometry radius="5" width-segments="32" height-segments="30" name="g" /><vgl-mesh geometry="g"><vgl-box-helper ref="o" /></vgl-mesh></test-object></vgl-namespace>',
      components: {
        VglNamespace,
        VglBoxHelper,
        VglMesh,
        VglSphereGeometry,
      },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.LineSegments();
        mediator.copy(vm.$refs.o.inst);
        mediator.geometry = vm.$refs.o.inst.geometry;
        mediator.material = vm.$refs.o.inst.material;
        mediator.updateMatrixWorld();
        const uuids = { geometry: mediator.geometry.uuid, material: mediator.material.uuid };
        const actual = mediator.toJSON();
        const mesh = new THREE.Mesh(new THREE.SphereBufferGeometry(5, 32, 30));
        const expectedHelper = new THREE.BoxHelper(mesh);
        mediator.copy(expectedHelper);
        mediator.geometry = expectedHelper.geometry;
        mediator.material = expectedHelper.material;
        mediator.updateMatrixWorld();
        mediator.geometry.uuid = uuids.geometry;
        mediator.material.uuid = uuids.material;
        expect(actual).to.deep.equal(mediator.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-sphere-geometry radius="5" width-segments="32" height-segments="30" name="g" /><vgl-mesh geometry="g"><vgl-box-helper ref="o" color="#842f71" /></vgl-mesh></test-object></vgl-namespace>',
      components: {
        VglNamespace,
        VglBoxHelper,
        VglMesh,
        VglSphereGeometry,
      },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.LineSegments();
        mediator.copy(vm.$refs.o.inst);
        mediator.geometry = vm.$refs.o.inst.geometry;
        mediator.material = vm.$refs.o.inst.material;
        mediator.updateMatrixWorld();
        const uuids = { geometry: mediator.geometry.uuid, material: mediator.material.uuid };
        const actual = mediator.toJSON();
        const mesh = new THREE.Mesh(new THREE.SphereBufferGeometry(5, 32, 30));
        const expectedHelper = new THREE.BoxHelper(mesh, 0x842f71);
        mediator.copy(expectedHelper);
        mediator.geometry = expectedHelper.geometry;
        mediator.material = expectedHelper.material;
        mediator.updateMatrixWorld();
        mediator.geometry.uuid = uuids.geometry;
        mediator.material.uuid = uuids.material;
        expect(actual).to.deep.equal(mediator.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-sphere-geometry radius="5" width-segments="32" height-segments="30" name="g" /><vgl-mesh geometry="g"><vgl-box-helper ref="o" :color="c" /></vgl-mesh></test-object></vgl-namespace>',
      components: {
        VglNamespace,
        VglBoxHelper,
        VglMesh,
        VglSphereGeometry,
      },
      data: { c: '#44da2f' },
    }).$mount();
    vm.$nextTick(() => {
      vm.c = '#2222ed';
      vm.$nextTick(() => {
        try {
          const mediator = new THREE.LineSegments();
          mediator.copy(vm.$refs.o.inst);
          mediator.geometry = vm.$refs.o.inst.geometry;
          mediator.material = vm.$refs.o.inst.material;
          mediator.updateMatrixWorld();
          const uuids = { geometry: mediator.geometry.uuid, material: mediator.material.uuid };
          const actual = mediator.toJSON();
          const mesh = new THREE.Mesh(new THREE.SphereBufferGeometry(5, 32, 30));
          const expectedHelper = new THREE.BoxHelper(mesh, 0x2222ed);
          mediator.copy(expectedHelper);
          mediator.geometry = expectedHelper.geometry;
          mediator.material = expectedHelper.material;
          mediator.updateMatrixWorld();
          mediator.geometry.uuid = uuids.geometry;
          mediator.material.uuid = uuids.material;
          expect(actual).to.deep.equal(mediator.toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
