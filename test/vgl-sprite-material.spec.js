describe('VglSpriteMaterial:', function suite() {
  const { VglSpriteMaterial, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-sprite-material ref="m" /></vgl-namespace>',
      components: { VglSpriteMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.SpriteMaterial();
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
      template: '<vgl-namespace><vgl-sprite-material color="#8aeda3" ref="m" /></vgl-namespace>',
      components: { VglSpriteMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.SpriteMaterial({ color: 0x8aeda3 });
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
      template: '<vgl-namespace><vgl-sprite-material :color="color" ref="m" /></vgl-namespace>',
      components: { VglSpriteMaterial, VglNamespace },
      data: { color: '#dafbc4' },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#abbcaf';
      vm.$nextTick(() => {
        try {
          const expected = new THREE.SpriteMaterial({ color: 0xabbcaf });
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
