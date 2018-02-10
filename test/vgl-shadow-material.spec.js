describe('VglShadowMaterial:', function suite() {
  const { VglShadowMaterial, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><vgl-shadow-material name="m" /><material-watcher name="m" /></vgl-namespace>',
      components: { VglShadowMaterial, VglNamespace, MaterialWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = history.pop();
        const expected = new THREE.ShadowMaterial();
        expect(actual).to.deep.equal(Object.assign(expected, { uuid: actual.uuid }));
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
