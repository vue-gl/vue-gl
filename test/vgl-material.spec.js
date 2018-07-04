describe('VglMaterial:', function suite() {
  const { VglMaterial, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-material ref="m" /></vgl-namespace>',
      components: { VglMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.Material();
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
      template: '<vgl-namespace><vgl-material vertex-colors="vertex" side="back" alpha-test="0.2" blend-dst="srcColor" ref="m" /></vgl-namespace>',
      components: { VglMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.Material();
        expected.setValues({
          vertexColors: THREE.VertexColors,
          side: THREE.BackSide,
          alphaTest: 0.2,
          blendDst: THREE.SrcColorFactor,
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
      template: '<vgl-namespace><vgl-material :vertex-colors="vertexColors" :side="side" :alpha-test="alphaTest" :blend-dst="blendDst" ref="m" /></vgl-namespace>',
      components: { VglMaterial, VglNamespace },
      data: {
        vertexColors: 'vertex',
        side: 'back',
        alphaTest: 0.1,
        blendDst: 'zero',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.vertexColors = 'face';
      vm.side = 'double';
      vm.alphaTest = 0.3;
      vm.blendDst = 'one';
      vm.$nextTick(() => {
        try {
          const expected = new THREE.Material();
          expected.setValues({
            vertexColors: THREE.FaceColors,
            side: THREE.DoubleSide,
            alphaTest: 0.3,
            blendDst: THREE.OneFactor,
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
