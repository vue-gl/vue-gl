describe('VglPointsMaterial:', function suite() {
  const { VglPointsMaterial, VglPoints, VglNamespace } = VueGL;
  const { expect } = chai;
  let updatedHistory;
  const MaterialWatcher = {
    mixins: [VglPoints],
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
      template: '<vgl-namespace><material-watcher material="abc1#2" /><vgl-points-material name="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglPointsMaterial, MaterialWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const expected = new THREE.PointsMaterial();
        expect(updatedHistory[0]).to.have.property('type', expected.type);
        expect(updatedHistory[0].color.equals(expected.color)).to.equal(true);
        expect(updatedHistory[0]).to.have.property('map', expected.map);
        expect(updatedHistory[0]).to.have.property('size', expected.size);
        expect(updatedHistory[0]).to.have.property('sizeAttenuation', expected.sizeAttenuation);
        expect(updatedHistory[0]).to.have.property('lights', expected.lights);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with color property', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><material-watcher material="abc1#2" /><vgl-points-material name="abc1#2" color="#3499f0" /></vgl-namespace>',
      components: { VglNamespace, VglPointsMaterial, MaterialWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const expected = new THREE.PointsMaterial({ color: 0x3499f0 });
        expect(updatedHistory[0]).to.have.property('type', expected.type);
        expect(updatedHistory[0].color.equals(expected.color)).to.equal(true);
        expect(updatedHistory[0]).to.have.property('map', expected.map);
        expect(updatedHistory[0]).to.have.property('size', expected.size);
        expect(updatedHistory[0]).to.have.property('sizeAttenuation', expected.sizeAttenuation);
        expect(updatedHistory[0]).to.have.property('lights', expected.lights);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with lights property', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><material-watcher material="abc1#2" /><vgl-points-material name="abc1#2" lights /></vgl-namespace>',
      components: { VglNamespace, VglPointsMaterial, MaterialWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const expected = new THREE.PointsMaterial({ lights: true });
        expect(updatedHistory[0]).to.have.property('type', expected.type);
        expect(updatedHistory[0].color.equals(expected.color)).to.equal(true);
        expect(updatedHistory[0]).to.have.property('map', expected.map);
        expect(updatedHistory[0]).to.have.property('size', expected.size);
        expect(updatedHistory[0]).to.have.property('sizeAttenuation', expected.sizeAttenuation);
        expect(updatedHistory[0]).to.have.property('lights', expected.lights);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with size property', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><material-watcher material="abc1#2" /><vgl-points-material name="abc1#2" size="3.8" /></vgl-namespace>',
      components: { VglNamespace, VglPointsMaterial, MaterialWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const expected = new THREE.PointsMaterial({ size: 3.8 });
        expect(updatedHistory[0]).to.have.property('type', expected.type);
        expect(updatedHistory[0].color.equals(expected.color)).to.equal(true);
        expect(updatedHistory[0]).to.have.property('map', expected.map);
        expect(updatedHistory[0]).to.have.property('size', expected.size);
        expect(updatedHistory[0]).to.have.property('sizeAttenuation', expected.sizeAttenuation);
        expect(updatedHistory[0]).to.have.property('lights', expected.lights);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with disableSizeAttenuation property', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><material-watcher material="abc1#2" /><vgl-points-material name="abc1#2" disable-size-attenuation /></vgl-namespace>',
      components: { VglNamespace, VglPointsMaterial, MaterialWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const expected = new THREE.PointsMaterial({ sizeAttenuation: false });
        expect(updatedHistory[0]).to.have.property('type', expected.type);
        expect(updatedHistory[0].color.equals(expected.color)).to.equal(true);
        expect(updatedHistory[0]).to.have.property('map', expected.map);
        expect(updatedHistory[0]).to.have.property('size', expected.size);
        expect(updatedHistory[0]).to.have.property('sizeAttenuation', expected.sizeAttenuation);
        expect(updatedHistory[0]).to.have.property('lights', expected.lights);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after color property is changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><material-watcher material="abc1#2" /><vgl-points-material name="abc1#2" :color="color" /></vgl-namespace>',
      components: { VglNamespace, VglPointsMaterial, MaterialWatcher },
      data: { color: '#3499f0' },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#18e35b';
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          const expected1 = new THREE.PointsMaterial({ color: 0x3499f0 });
          expect(updatedHistory[0]).to.have.property('type', expected1.type);
          expect(updatedHistory[0].color.equals(expected1.color)).to.equal(true);
          expect(updatedHistory[0]).to.have.property('map', expected1.map);
          expect(updatedHistory[0]).to.have.property('size', expected1.size);
          expect(updatedHistory[0]).to.have.property('sizeAttenuation', expected1.sizeAttenuation);
          expect(updatedHistory[0]).to.have.property('lights', expected1.lights);
          const expected2 = new THREE.PointsMaterial({ color: 0x18e35b });
          expect(updatedHistory[1]).to.have.property('type', expected2.type);
          expect(updatedHistory[1].color.equals(expected2.color)).to.equal(true);
          expect(updatedHistory[1]).to.have.property('map', expected2.map);
          expect(updatedHistory[1]).to.have.property('size', expected2.size);
          expect(updatedHistory[1]).to.have.property('sizeAttenuation', expected2.sizeAttenuation);
          expect(updatedHistory[1]).to.have.property('lights', expected2.lights);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  it('after size property is changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><material-watcher material="abc1#2" /><vgl-points-material name="abc1#2" :size="size" /></vgl-namespace>',
      components: { VglNamespace, VglPointsMaterial, MaterialWatcher },
      data: { size: '2.2' },
    }).$mount();
    vm.$nextTick(() => {
      vm.size = '3.6';
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          const expected1 = new THREE.PointsMaterial({ size: 2.2 });
          expect(updatedHistory[0]).to.have.property('type', expected1.type);
          expect(updatedHistory[0].color.equals(expected1.color)).to.equal(true);
          expect(updatedHistory[0]).to.have.property('map', expected1.map);
          expect(updatedHistory[0]).to.have.property('size', expected1.size);
          expect(updatedHistory[0]).to.have.property('sizeAttenuation', expected1.sizeAttenuation);
          expect(updatedHistory[0]).to.have.property('lights', expected1.lights);
          const expected2 = new THREE.PointsMaterial({ size: 3.6 });
          expect(updatedHistory[1]).to.have.property('type', expected2.type);
          expect(updatedHistory[1].color.equals(expected2.color)).to.equal(true);
          expect(updatedHistory[1]).to.have.property('map', expected2.map);
          expect(updatedHistory[1]).to.have.property('size', expected2.size);
          expect(updatedHistory[1]).to.have.property('sizeAttenuation', expected2.sizeAttenuation);
          expect(updatedHistory[1]).to.have.property('lights', expected2.lights);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  it('after disbleSizeAttenuation property is changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><material-watcher material="abc1#2" /><vgl-points-material name="abc1#2" :disable-size-attenuation="!attenuation" /></vgl-namespace>',
      components: { VglNamespace, VglPointsMaterial, MaterialWatcher },
      data: { attenuation: true },
    }).$mount();
    vm.$nextTick(() => {
      vm.attenuation = false;
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          const expected1 = new THREE.PointsMaterial({ sizeAttenuation: true });
          expect(updatedHistory[0]).to.have.property('type', expected1.type);
          expect(updatedHistory[0].color.equals(expected1.color)).to.equal(true);
          expect(updatedHistory[0]).to.have.property('map', expected1.map);
          expect(updatedHistory[0]).to.have.property('size', expected1.size);
          expect(updatedHistory[0]).to.have.property('sizeAttenuation', expected1.sizeAttenuation);
          expect(updatedHistory[0]).to.have.property('lights', expected1.lights);
          const expected2 = new THREE.PointsMaterial({ sizeAttenuation: false });
          expect(updatedHistory[1]).to.have.property('type', expected2.type);
          expect(updatedHistory[1].color.equals(expected2.color)).to.equal(true);
          expect(updatedHistory[1]).to.have.property('map', expected2.map);
          expect(updatedHistory[1]).to.have.property('size', expected2.size);
          expect(updatedHistory[1]).to.have.property('sizeAttenuation', expected2.sizeAttenuation);
          expect(updatedHistory[1]).to.have.property('lights', expected2.lights);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  it('after lights property is changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><material-watcher material="abc1#2" /><vgl-points-material name="abc1#2" :lights="lights" /></vgl-namespace>',
      components: { VglNamespace, VglPointsMaterial, MaterialWatcher },
      data: { lights: true },
    }).$mount();
    vm.$nextTick(() => {
      vm.lights = false;
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          const expected1 = new THREE.PointsMaterial({ lights: true });
          expect(updatedHistory[0]).to.have.property('type', expected1.type);
          expect(updatedHistory[0].color.equals(expected1.color)).to.equal(true);
          expect(updatedHistory[0]).to.have.property('map', expected1.map);
          expect(updatedHistory[0]).to.have.property('size', expected1.size);
          expect(updatedHistory[0]).to.have.property('sizeAttenuation', expected1.sizeAttenuation);
          expect(updatedHistory[0]).to.have.property('lights', expected1.lights);
          const expected2 = new THREE.PointsMaterial({ lights: false });
          expect(updatedHistory[1]).to.have.property('type', 'PointsMaterial');
          expect(updatedHistory[1].color.equals(expected2.color)).to.equal(true);
          expect(updatedHistory[1]).to.have.property('map', expected2.map);
          expect(updatedHistory[1]).to.have.property('size', expected2.size);
          expect(updatedHistory[1]).to.have.property('sizeAttenuation', expected2.sizeAttenuation);
          expect(updatedHistory[1]).to.have.property('lights', expected2.lights);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
