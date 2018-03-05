describe('VglMeshLambertMaterial:', function suite() {
  const { VglMeshLambertMaterial, VglNamespace } = VueGL;
  const { expect } = chai;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-mesh-lambert-material ref="m" /></vgl-namespace>',
      components: { VglMeshLambertMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.MeshLambertMaterial();
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
      template: '<vgl-namespace><vgl-mesh-lambert-material color="#8aeda3" ref="m" /></vgl-namespace>',
      components: { VglMeshLambertMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.MeshLambertMaterial({
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
      template: '<vgl-namespace><vgl-mesh-lambert-material :color="color" ref="m" /></vgl-namespace>',
      components: { VglMeshLambertMaterial, VglNamespace },
      data: { color: '#dafbc4' },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#abbcaf';
      vm.$nextTick(() => {
        try {
          const expected = new THREE.MeshLambertMaterial({
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
