describe('VglMeshBasicMaterial:', function suite() {
  const { VglMeshBasicMaterial, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-mesh-basic-material ref="m" /></vgl-namespace>',
      components: { VglMeshBasicMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.MeshBasicMaterial();
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
      template: '<vgl-namespace><vgl-mesh-basic-material color="#8aeda3" ref="m" /></vgl-namespace>',
      components: { VglMeshBasicMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.MeshBasicMaterial({
          color: 0x8aeda3,
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
      template: '<vgl-namespace><vgl-mesh-basic-material :color="color" ref="m" /></vgl-namespace>',
      components: { VglMeshBasicMaterial, VglNamespace },
      data: { color: '#dafbc4' },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#abbcaf';
      vm.$nextTick(() => {
        try {
          const expected = new THREE.MeshBasicMaterial({
            color: 0xabbcaf,
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
