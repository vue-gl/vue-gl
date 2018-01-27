describe('VglShadowMaterial:', function suite() {
  const { VglShadowMaterial, VglMesh, VglNamespace } = VueGL;
  const { expect } = chai;
  let updatedHistory;
  const MaterialWatcher = {
    mixins: [VglMesh],
    created() {
      this.vglObject3d.listeners.push(() => {
        updatedHistory.push(this.inst.material.clone());
      });
    },
  };
  function after10ticks(vm, callback, count = 10) {
    vm.$nextTick(count > 0 ? () => { after10ticks(vm, callback, count - 1); } : callback);
  }
  beforeEach(function hook(done) {
    updatedHistory = [];
    done();
  });
  it('default', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-shadow-material name="abc1#2" /><material-watcher material="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglShadowMaterial, MaterialWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0]).to.have.property('type', new THREE.ShadowMaterial().type);
        expect(updatedHistory[0]).to.have.property('lights', new THREE.ShadowMaterial().lights);
        expect(updatedHistory[0]).to.have.property('transparent', new THREE.ShadowMaterial().transparent);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
