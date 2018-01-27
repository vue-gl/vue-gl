describe('VglSpriteMaterial:', function suite() {
  const { VglSpriteMaterial, VglSprite, VglNamespace } = VueGL;
  const { expect } = chai;
  let updatedHistory;
  const MaterialWatcher = {
    mixins: [VglSprite],
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
      template: '<vgl-namespace><vgl-sprite-material name="abc1#2" /><material-watcher material="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglSpriteMaterial, MaterialWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0]).to.have.property('type', 'SpriteMaterial');
        expect(updatedHistory[0].color.equals(new THREE.SpriteMaterial().color)).to.equal(true);
        expect(updatedHistory[0]).to.have.property('lights', new THREE.SpriteMaterial().lights);
        expect(updatedHistory[0]).to.have.property('fog', new THREE.SpriteMaterial().fog);
        expect(updatedHistory[0]).to.have.property('rotation', new THREE.SpriteMaterial().rotation);
        expect(updatedHistory[0]).to.have.property('map', new THREE.SpriteMaterial().map);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with color property', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-sprite-material name="abc1#2" color="#3499f0" /><material-watcher material="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglSpriteMaterial, MaterialWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const expected = new THREE.SpriteMaterial({ color: 0x3499f0 });
        expect(updatedHistory[0]).to.have.property('type', expected.type);
        expect(updatedHistory[0].color.equals(expected.color)).to.equal(true);
        expect(updatedHistory[0]).to.have.property('lights', expected.lights);
        expect(updatedHistory[0]).to.have.property('fog', expected.fog);
        expect(updatedHistory[0]).to.have.property('rotation', expected.rotation);
        expect(updatedHistory[0]).to.have.property('map', expected.map);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after color property is changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-sprite-material name="abc1#2" :color="color" /><material-watcher material="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglSpriteMaterial, MaterialWatcher },
      data: { color: '#3499f0' },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#18e35b';
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          const expected1 = new THREE.SpriteMaterial({ color: 0x3499f0 });
          expect(updatedHistory[0]).to.have.property('type', expected1.type);
          expect(updatedHistory[0].color.equals(expected1.color)).to.equal(true);
          expect(updatedHistory[0]).to.have.property('lights', expected1.lights);
          expect(updatedHistory[0]).to.have.property('fog', expected1.fog);
          expect(updatedHistory[0]).to.have.property('rotation', expected1.rotation);
          expect(updatedHistory[0]).to.have.property('map', expected1.map);
          const expected2 = new THREE.SpriteMaterial({ color: 0x18e35b });
          expect(updatedHistory[1]).to.have.property('type', expected2.type);
          expect(updatedHistory[1].color.equals(expected2.color)).to.equal(true);
          expect(updatedHistory[1]).to.have.property('lights', expected2.lights);
          expect(updatedHistory[1]).to.have.property('fog', expected2.fog);
          expect(updatedHistory[1]).to.have.property('rotation', expected2.rotation);
          expect(updatedHistory[1]).to.have.property('map', expected2.map);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
