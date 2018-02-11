describe('VglOrthographicCamera:', function suite() {
  const { VglOrthographicCamera, VglNamespace } = VueGL;
  const { expect } = chai;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-orthographic-camera ref="c" /></vgl-namespace>',
      components: { VglOrthographicCamera, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.c.inst.clone();
        actual.updateMatrixWorld();
        const expected = new THREE.OrthographicCamera();
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
      template: '<vgl-namespace><vgl-orthographic-camera far="3456" near="0.123" zoom="1.3" orbit-position="50.8 1 1.1" orbit-target="0.3 0.4 0.2" ref="c" /></vgl-namespace>',
      components: { VglOrthographicCamera, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.c.inst.clone();
        actual.updateMatrixWorld();
        const expected = new THREE.OrthographicCamera(
          undefined,
          undefined,
          undefined,
          undefined,
          0.123,
          3456,
        );
        expected.zoom = 1.3;
        expected.position.setFromSpherical(new THREE.Spherical(50.8, 1, 1.1));
        expected.position.add(new THREE.Vector3(0.3, 0.4, 0.2));
        expected.lookAt(new THREE.Vector3(0.3, 0.4, 0.2));
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
      template: '<vgl-namespace><vgl-orthographic-camera :far="far" :near="near" :zoom="zoom" :orbit-position="p" :orbit-target="t" ref="c" /></vgl-namespace>',
      components: { VglOrthographicCamera, VglNamespace },
      data: {
        far: '3345',
        near: '0.223',
        zoom: '1.1',
        p: '80 1 1.3',
        t: '0.2 0.3 0.4',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.far = '4456';
      vm.near = '0.334';
      vm.zoom = '1.8';
      vm.p = '10 2 2.1';
      vm.t = '0.3 0.4 0.1';
      vm.$nextTick(() => {
        try {
          const actual = vm.$refs.c.inst.clone();
          actual.updateMatrixWorld();
          const expected = new THREE.OrthographicCamera(
            undefined,
            undefined,
            undefined,
            undefined,
            0.334,
            4456,
          );
          expected.zoom = 1.8;
          expected.position.setFromSpherical(new THREE.Spherical(10, 2, 2.1));
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
