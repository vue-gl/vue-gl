describe('VglPointsMaterial:', function suite() {
  const { VglPointsMaterial, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-points-material ref="m" /></vgl-namespace>',
      components: { VglPointsMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.PointsMaterial();
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
      template: '<vgl-namespace><vgl-points-material color="#8aeda3" size="3" disable-size-attenuation ref="m" /></vgl-namespace>',
      components: { VglPointsMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.PointsMaterial({
          color: 0x8aeda3,
          size: 3,
          sizeAttenuation: false,
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
      template: '<vgl-namespace><vgl-points-material :color="color" :size="size" :disable-size-attenuation="!attenuation" ref="m" /></vgl-namespace>',
      components: { VglPointsMaterial, VglNamespace },
      data: { color: '#dafbc4', size: 8, attenuation: false },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#abbcaf';
      vm.size = 4.88;
      vm.attenuation = true;
      vm.$nextTick(() => {
        try {
          const expected = new THREE.PointsMaterial({
            color: 0xabbcaf,
            size: 4.88,
            sizeAttenuation: true,
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
