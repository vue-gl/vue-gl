describe('VglMeshDepthMaterial:', function suite() {
  const { VglMeshDepthMaterial, VglNamespace } = VueGL;
  const { expect } = chai;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-mesh-depth-material ref="m" /></vgl-namespace>',
      components: { VglMeshDepthMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.MeshDepthMaterial();
        const { inst } = vm.$refs.m;
        expect(inst).to.deep.equal(Object.assign(expected, { uuid: inst.uuid }));
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-mesh-depth-material fog ref="m" /></vgl-namespace>',
      components: { VglMeshDepthMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.MeshDepthMaterial({
          fog: true,
        });
        const { inst } = vm.$refs.m;
        expect(inst).to.deep.equal(Object.assign(expected, { uuid: inst.uuid }));
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-mesh-depth-material :fog="fog" ref="m" /></vgl-namespace>',
      components: { VglMeshDepthMaterial, VglNamespace },
      data: { fog: true },
    }).$mount();
    vm.$nextTick(() => {
      vm.fog = false;
      vm.$nextTick(() => {
        try {
          const expected = new THREE.MeshDepthMaterial({
            fog: false,
          });
          const { inst } = vm.$refs.m;
          expect(inst).to.deep.equal(Object.assign(expected, { uuid: inst.uuid }));
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
