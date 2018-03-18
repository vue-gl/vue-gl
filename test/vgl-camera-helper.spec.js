describe('VglCameraHelper component', function component() {
  const { VglCameraHelper, VglNamespace, VglPerspectiveCamera } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-perspective-camera near="0.11" far="2100" fov="52" name="c" /><vgl-camera-helper camera="c" ref="o" /></vgl-namespace>',
      components: { VglNamespace, VglCameraHelper, VglPerspectiveCamera },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.LineSegments();
        mediator.copy(vm.$refs.o.inst.children[0]);
        mediator.geometry = vm.$refs.o.inst.children[0].geometry;
        mediator.material = vm.$refs.o.inst.children[0].material;
        mediator.updateMatrixWorld();
        const uuids = { geometry: mediator.geometry.uuid, material: mediator.material.uuid };
        const actual = mediator.toJSON();
        const camera = new THREE.PerspectiveCamera(52, undefined, 0.11, 2100);
        const helper = new THREE.CameraHelper(camera);
        mediator.copy(helper);
        mediator.geometry = helper.geometry;
        mediator.material = helper.material;
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
