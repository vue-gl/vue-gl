describe('VglPerspectiveCamera:', function suite() {
  const { VglPerspectiveCamera, VglNamespace } = VueGL;
  const { expect } = chai;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-perspective-camera ref="c" /></vgl-namespace>',
      components: { VglPerspectiveCamera, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.c.inst.clone();
        actual.updateMatrixWorld();
        const expected = new THREE.PerspectiveCamera();
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
      template: '<vgl-namespace><vgl-perspective-camera far="3456" near="0.123" fov="44.3" zoom="1.3" orbit-position="30 1.1 0.6" orbit-target="3 5 3" ref="c" /></vgl-namespace>',
      components: { VglPerspectiveCamera, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.c.inst.clone();
        actual.updateMatrixWorld();
        const expected = new THREE.PerspectiveCamera(44.3, undefined, 0.123, 3456);
        expected.zoom = 1.3;
        expected.position.setFromSpherical(new THREE.Spherical(30, 1.1, 0.6));
        expected.position.add(new THREE.Vector3(3, 5, 3));
        expected.lookAt(new THREE.Vector3(3, 5, 3));
        expected.updateMatrixWorld();
        expected.uuid = actual.uuid;
        expect(actual.toJSON()).to.deep.equal(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-perspective-camera :far="far" :near="near" :fov="fov" :zoom="zoom" :orbit-position="p" :orbit-target="t" ref="c" /></vgl-namespace>',
      components: { VglPerspectiveCamera, VglNamespace },
      data: {
        far: '3345',
        near: '0.223',
        fov: '44.1',
        zoom: '1.1',
        p: '103 1 1.3',
        t: '10.2 20.3 30.4',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.far = '4456';
      vm.near = '0.334';
      vm.fov = '52';
      vm.zoom = '1.8';
      vm.p = '1 1.1 0.1';
      vm.t = '0.3 0.4 0.1';
      vm.$nextTick(() => {
        try {
          const actual = vm.$refs.c.inst.clone();
          actual.updateMatrixWorld();
          const expected = new THREE.PerspectiveCamera(52, undefined, 0.334, 4456);
          expected.zoom = 1.8;
          expected.position.setFromSpherical(new THREE.Spherical(1, 1.1, 0.1));
          expected.position.add(new THREE.Vector3(0.3, 0.4, 0.1));
          expected.lookAt(new THREE.Vector3(0.3, 0.4, 0.1));
          expected.updateMatrixWorld();
          expected.uuid = actual.uuid;
          expect(actual.toJSON()).to.deep.equal(expected.toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
