describe('VglLineBasicMaterial:', function suite() {
  const { VglLineBasicMaterial, VglLine, VglNamespace } = VueGL;
  const { expect } = chai;
  let updatedHistory;
  const MaterialWatcher = {
    mixins: [VglLine],
    created() {
      this.vglObject3d.listeners.push(() => {
        updatedHistory.push(this.inst.material.clone());
      });
    },
  };
  beforeEach(function hook(done) {
    updatedHistory = [];
    done();
  });
  it('default', function test() {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-line-basic-material name="abc1#2" /><material-watcher material="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglLineBasicMaterial, MaterialWatcher },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      const expected = new THREE.LineBasicMaterial();
      expect(updatedHistory[0]).to.have.property('type', expected.type);
      expect(updatedHistory[0].color.equals(expected.color)).to.equal(true);
      expect(updatedHistory[0]).to.have.property('linewidth', expected.linewidth);
      expect(updatedHistory[0]).to.have.property('linecap', expected.linecap);
      expect(updatedHistory[0]).to.have.property('linejoin', expected.linejoin);
      expect(updatedHistory[0]).to.have.property('lights', expected.lights);
    });
  });
  it('with color property', function test() {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-line-basic-material name="abc1#2" color="#3499f0" /><material-watcher material="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglLineBasicMaterial, MaterialWatcher },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      const expected = new THREE.LineBasicMaterial({ color: 0x3499f0 });
      expect(updatedHistory[0]).to.have.property('type', expected.type);
      expect(updatedHistory[0].color.equals(expected.color)).to.equal(true);
      expect(updatedHistory[0]).to.have.property('linewidth', expected.linewidth);
      expect(updatedHistory[0]).to.have.property('linecap', expected.linecap);
      expect(updatedHistory[0]).to.have.property('linejoin', expected.linejoin);
      expect(updatedHistory[0]).to.have.property('lights', expected.lights);
    });
  });
  it('with lights property', function test() {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-line-basic-material name="abc1#2" lights /><material-watcher material="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglLineBasicMaterial, MaterialWatcher },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      const expected = new THREE.LineBasicMaterial({ lights: true });
      expect(updatedHistory[0]).to.have.property('type', expected.type);
      expect(updatedHistory[0].color.equals(expected.color)).to.equal(true);
      expect(updatedHistory[0]).to.have.property('linewidth', expected.linewidth);
      expect(updatedHistory[0]).to.have.property('linecap', expected.linecap);
      expect(updatedHistory[0]).to.have.property('linejoin', expected.linejoin);
      expect(updatedHistory[0]).to.have.property('lights', expected.lights);
    });
  });
  it('with linewidth property', function test() {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-line-basic-material name="abc1#2" linewidth="3" /><material-watcher material="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglLineBasicMaterial, MaterialWatcher },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      const expected = new THREE.LineBasicMaterial({ linewidth: 3 });
      expect(updatedHistory[0]).to.have.property('type', expected.type);
      expect(updatedHistory[0].color.equals(expected.color)).to.equal(true);
      expect(updatedHistory[0]).to.have.property('linewidth', expected.linewidth);
      expect(updatedHistory[0]).to.have.property('linecap', expected.linecap);
      expect(updatedHistory[0]).to.have.property('linejoin', expected.linejoin);
      expect(updatedHistory[0]).to.have.property('lights', expected.lights);
    });
  });
  it('after color property is changed', function test() {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-line-basic-material name="abc1#2" :color="color" /><material-watcher material="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglLineBasicMaterial, MaterialWatcher },
      data: { color: '#3499f0' },
    }).$mount();
    return vm.$nextTick().then(() => {
      vm.color = '#18e35b';
      return vm.$nextTick().then(() => {
        expect(updatedHistory).to.have.lengthOf(2);
        const expected1 = new THREE.LineBasicMaterial({ color: 0x3499f0 });
        expect(updatedHistory[0]).to.have.property('type', expected1.type);
        expect(updatedHistory[0].color.equals(expected1.color)).to.equal(true);
        expect(updatedHistory[0]).to.have.property('linewidth', expected1.linewidth);
        expect(updatedHistory[0]).to.have.property('linecap', expected1.linecap);
        expect(updatedHistory[0]).to.have.property('linejoin', expected1.linejoin);
        expect(updatedHistory[0]).to.have.property('lights', expected1.lights);
        const expected2 = new THREE.LineBasicMaterial({ color: 0x18e35b });
        expect(updatedHistory[1]).to.have.property('type', expected2.type);
        expect(updatedHistory[1].color.equals(expected2.color)).to.equal(true);
        expect(updatedHistory[1]).to.have.property('linewidth', expected2.linewidth);
        expect(updatedHistory[1]).to.have.property('linecap', expected2.linecap);
        expect(updatedHistory[1]).to.have.property('linejoin', expected2.linejoin);
        expect(updatedHistory[1]).to.have.property('lights', expected2.lights);
      });
    });
  });
  it('after linewidth property is changed', function test() {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-line-basic-material name="abc1#2" :linewidth="width" /><material-watcher material="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglLineBasicMaterial, MaterialWatcher },
      data: { width: 3 },
    }).$mount();
    return vm.$nextTick().then(() => {
      vm.width = '5';
      return vm.$nextTick().then(() => {
        expect(updatedHistory).to.have.lengthOf(2);
        const expected1 = new THREE.LineBasicMaterial({ linewidth: 3 });
        expect(updatedHistory[0]).to.have.property('type', expected1.type);
        expect(updatedHistory[0].color.equals(expected1.color)).to.equal(true);
        expect(updatedHistory[0]).to.have.property('linewidth', expected1.linewidth);
        expect(updatedHistory[0]).to.have.property('linecap', expected1.linecap);
        expect(updatedHistory[0]).to.have.property('linejoin', expected1.linejoin);
        expect(updatedHistory[0]).to.have.property('lights', expected1.lights);
        const expected2 = new THREE.LineBasicMaterial({ linewidth: 5 });
        expect(updatedHistory[1]).to.have.property('type', 'LineBasicMaterial');
        expect(updatedHistory[1].color.equals(expected2.color)).to.equal(true);
        expect(updatedHistory[1]).to.have.property('linewidth', expected2.linewidth);
        expect(updatedHistory[1]).to.have.property('linecap', expected2.linecap);
        expect(updatedHistory[1]).to.have.property('linejoin', expected2.linejoin);
        expect(updatedHistory[1]).to.have.property('lights', expected2.lights);
      });
    });
  });
});
