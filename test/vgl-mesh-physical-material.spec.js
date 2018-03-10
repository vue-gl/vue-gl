describe('VglMeshPhysicalMaterial:', function suite() {
  const { VglMeshPhysicalMaterial, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-mesh-physical-material ref="m" /></vgl-namespace>',
      components: { VglMeshPhysicalMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.MeshPhysicalMaterial();
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
      template: '<vgl-namespace><vgl-mesh-physical-material color="#8aeda3" clear-coat="0.8" clear-coat-roughness="0.7" reflectivity="0.4" ref="m" /></vgl-namespace>',
      components: { VglMeshPhysicalMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.MeshPhysicalMaterial({
          color: 0x8aeda3,
          clearCoat: 0.8,
          clearCoatRoughness: 0.7,
          reflectivity: 0.4,
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
      template: '<vgl-namespace><vgl-mesh-physical-material :color="color" :clear-coat="clearCoat" :clear-coat-roughness="clearCoatRoughness" :reflectivity="reflectivity" ref="m" /></vgl-namespace>',
      components: { VglMeshPhysicalMaterial, VglNamespace },
      data: {
        color: '#dafbc4',
        clearCoat: '0.7',
        clearCoatRoughness: '0.9',
        reflectivity: '0.34',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#abbcaf';
      vm.clearCoat = '0.4';
      vm.clearCoatRoughness = '0.8';
      vm.reflectivity = '0.22';
      vm.$nextTick(() => {
        try {
          const expected = new THREE.MeshPhysicalMaterial({
            color: 0xabbcaf,
            clearCoat: 0.4,
            clearCoatRoughness: 0.8,
            reflectivity: 0.22,
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
