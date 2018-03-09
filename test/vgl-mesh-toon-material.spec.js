describe('VglMeshToonMaterial:', function suite() {
  const { VglMeshToonMaterial, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-mesh-toon-material ref="m" /></vgl-namespace>',
      components: { VglMeshToonMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.MeshToonMaterial();
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
      template: '<vgl-namespace><vgl-mesh-toon-material color="#8aeda3" specular="#18283e" shininess="44" ref="m" /></vgl-namespace>',
      components: { VglMeshToonMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.MeshToonMaterial({
          color: 0x8aeda3,
          specular: 0x18283e,
          shininess: 44,
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
      template: '<vgl-namespace><vgl-mesh-toon-material :color="color" :specular="specular" :shininess="shininess" ref="m" /></vgl-namespace>',
      components: { VglMeshToonMaterial, VglNamespace },
      data: {
        color: '#dafbc4',
        specular: '#2dafe3',
        shininess: '31',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#abbcaf';
      vm.specular = '#ffeedd';
      vm.shininess = '17.8';
      vm.$nextTick(() => {
        try {
          const expected = new THREE.MeshToonMaterial({
            color: 0xabbcaf,
            specular: 0xffeedd,
            shininess: 17.8,
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
