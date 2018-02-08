describe('VglPointsMaterial:', function suite() {
  const { VglPointsMaterial, VglNamespace } = VueGL;
  const { expect } = chai;
  let history;
  const MaterialWatcher = {
    inject: ['vglMaterials'],
    props: ['name'],
    created() {
      this.$watch(() => this.vglMaterials.forGet[this.name], (material) => {
        history.push(material);
      }, { immediate: true });
    },
    render() {},
  };
  beforeEach(function hook(done) {
    history = [];
    done();
  });
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-points-material name="m" /><material-watcher name="m" /></vgl-namespace>',
      components: { VglPointsMaterial, VglNamespace, MaterialWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = history.pop();
        const expected = new THREE.PointsMaterial();
        expect(actual).to.deep.equal(Object.assign(expected, { uuid: actual.uuid }));
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-points-material color="#8aeda3" size="3" disable-size-attenuation name="m" /><material-watcher name="m" /></vgl-namespace>',
      components: { VglPointsMaterial, VglNamespace, MaterialWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = history.pop();
        const expected = new THREE.PointsMaterial({
          color: 0x8aeda3,
          size: 3,
          sizeAttenuation: false,
        });
        expect(actual).to.deep.equal(Object.assign(expected, { uuid: actual.uuid }));
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-points-material :color="color" :size="size" :disable-size-attenuation="!attenuation" name="m" /><material-watcher name="m" /></vgl-namespace>',
      components: { VglPointsMaterial, VglNamespace, MaterialWatcher },
      data: { color: '#dafbc4', size: 8, attenuation: false },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#abbcaf';
      vm.size = 4.88;
      vm.attenuation = true;
      vm.$nextTick(() => {
        try {
          const actual = history.pop();
          const expected = new THREE.PointsMaterial({
            color: 0xabbcaf,
            size: 4.88,
            sizeAttenuation: true,
          });
          expect(actual).to.deep.equal(Object.assign(expected, { uuid: actual.uuid }));
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
