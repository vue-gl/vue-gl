describe('VglMeshNormalMaterial:', function suite() {
  const { VglMeshNormalMaterial, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-mesh-normal-material ref="m" /></vgl-namespace>',
      components: { VglMeshNormalMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.MeshNormalMaterial();
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
      template: '<vgl-namespace><vgl-mesh-normal-material fog ref="m" /></vgl-namespace>',
      components: { VglMeshNormalMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.MeshNormalMaterial({
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
      template: '<vgl-namespace><vgl-mesh-normal-material :fog="fog" ref="m" /></vgl-namespace>',
      components: { VglMeshNormalMaterial, VglNamespace },
      data: { fog: true },
    }).$mount();
    vm.$nextTick(() => {
      vm.fog = false;
      vm.$nextTick(() => {
        try {
          const expected = new THREE.MeshNormalMaterial({
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
