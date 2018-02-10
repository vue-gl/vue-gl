describe('VglLineBasicMaterial:', function suite() {
  const { VglLineBasicMaterial, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><vgl-line-basic-material name="m" /><material-watcher name="m" /></vgl-namespace>',
      components: { VglLineBasicMaterial, VglNamespace, MaterialWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = history.pop();
        const expected = new THREE.LineBasicMaterial();
        expect(actual).to.deep.equal(Object.assign(expected, { uuid: actual.uuid }));
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-line-basic-material color="#8aeda3" lights linewidth="3.5" linecap="butt" linejoin="miter" name="m" /><material-watcher name="m" /></vgl-namespace>',
      components: { VglLineBasicMaterial, VglNamespace, MaterialWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = history.pop();
        const expected = new THREE.LineBasicMaterial({
          color: 0x8aeda3,
          lights: true,
          linewidth: 3.5,
          linecap: 'butt',
          linejoin: 'miter',
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
      template: '<vgl-namespace><vgl-line-basic-material :color="color" :lights="lights" :linewidth="linewidth" :linecap="linecap" :linejoin="linejoin" name="m" /><material-watcher name="m" /></vgl-namespace>',
      components: { VglLineBasicMaterial, VglNamespace, MaterialWatcher },
      data: { color: '#dafbc4', lights: false, linewidth: 5, linecap: 'butt', linejoin: 'miter' },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#abbcaf';
      vm.lights = true;
      vm.linewidth = 4.88;
      vm.linecap = 'square';
      vm.linejoin = 'bevel';
      vm.$nextTick(() => {
        try {
          const actual = history.pop();
          const expected = new THREE.LineBasicMaterial({
            color: 0xabbcaf,
            lights: true,
            linewidth: 4.88,
            linecap: 'square',
            linejoin: 'bevel',
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
