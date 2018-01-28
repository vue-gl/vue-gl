describe('VglMeshStandardMaterial:', function suite() {
  const { VglMeshStandardMaterial, VglMesh, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><material-watcher material="abc1#2" /><vgl-mesh-standard-material name="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglMeshStandardMaterial, MaterialWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const expected = new THREE.MeshStandardMaterial();
        expect(updatedHistory[0]).to.have.property('type', expected.type);
        expect(updatedHistory[0].color.equals(expected.color)).to.equal(true);
        expect(updatedHistory[0]).to.have.property('lights', expected.lights);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with color property', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><material-watcher material="abc1#2" /><vgl-mesh-standard-material name="abc1#2" color="#3499f0" /></vgl-namespace>',
      components: { VglNamespace, VglMeshStandardMaterial, MaterialWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const expected = new THREE.MeshStandardMaterial({ color: 0x3499f0 });
        expect(updatedHistory[0]).to.have.property('type', expected.type);
        expect(updatedHistory[0].color.equals(expected.color)).to.equal(true);
        expect(updatedHistory[0]).to.have.property('lights', expected.lights);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after color property is changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><material-watcher material="abc1#2" /><vgl-mesh-standard-material name="abc1#2" :color="color" /></vgl-namespace>',
      components: { VglNamespace, VglMeshStandardMaterial, MaterialWatcher },
      data: { color: '#3499f0' },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#18e35b';
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          const expected1 = new THREE.MeshStandardMaterial({ color: 0x3499f0 });
          expect(updatedHistory[0]).to.have.property('type', expected1.type);
          expect(updatedHistory[0].color.equals(expected1.color)).to.equal(true);
          expect(updatedHistory[0]).to.have.property('lights', expected1.lights);
          const expected2 = new THREE.MeshStandardMaterial({ color: 0x18e35b });
          expect(updatedHistory[1]).to.have.property('type', expected2.type);
          expect(updatedHistory[1].color.equals(expected2.color)).to.equal(true);
          expect(updatedHistory[1]).to.have.property('lights', expected2.lights);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
