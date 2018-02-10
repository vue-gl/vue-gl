describe('VglMeshStandardMaterial:', function suite() {
  const { VglMeshStandardMaterial, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><vgl-mesh-standard-material name="m" /><material-watcher name="m" /></vgl-namespace>',
      components: { VglMeshStandardMaterial, VglNamespace, MaterialWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = history.pop();
        const expected = new THREE.MeshStandardMaterial();
        expect(actual).to.deep.equal(Object.assign(expected, { uuid: actual.uuid }));
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-mesh-standard-material color="#8aeda3" name="m" /><material-watcher name="m" /></vgl-namespace>',
      components: { VglMeshStandardMaterial, VglNamespace, MaterialWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = history.pop();
        const expected = new THREE.MeshStandardMaterial({
          color: 0x8aeda3,
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
      template: '<vgl-namespace><vgl-mesh-standard-material :color="color" name="m" /><material-watcher name="m" /></vgl-namespace>',
      components: { VglMeshStandardMaterial, VglNamespace, MaterialWatcher },
      data: { color: '#dafbc4' },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#abbcaf';
      vm.$nextTick(() => {
        try {
          const actual = history.pop();
          const expected = new THREE.MeshStandardMaterial({
            color: 0xabbcaf,
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
