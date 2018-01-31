describe('VglAmbientLight:', function component() {
  const { VglAmbientLight, VglObject3d } = VueGL;
  const { expect } = chai;
  let updatedHistory;
  const ObjectWatcher = {
    mixins: [VglObject3d],
    created() {
      this.vglObject3d.listeners.push(() => {
        updatedHistory.push(this.inst.clone());
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
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-ambient-light /></object-watcher>',
      components: { ObjectWatcher, VglAmbientLight },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual] = updatedHistory[0].children;
        expect(actual).to.have.property('type', 'AmbientLight');
        expect(actual.color.equals(new THREE.AmbientLight().color)).to.equal(true);
        expect(actual).to.have.property('intensity', new THREE.AmbientLight().intensity);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with color property', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-ambient-light color="#2185e4" /></object-watcher>',
      components: { ObjectWatcher, VglAmbientLight },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual] = updatedHistory[0].children;
        expect(actual).to.have.property('type', 'AmbientLight');
        expect(actual.color.equals(new THREE.AmbientLight(0x2185e4).color)).to.equal(true);
        expect(actual).to.have.property('intensity', new THREE.AmbientLight(0x2185e4).intensity);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with intensity property', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-ambient-light intensity="0.82" /></object-watcher>',
      components: { ObjectWatcher, VglAmbientLight },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual] = updatedHistory[0].children;
        expect(actual).to.have.property('type', 'AmbientLight');
        expect(actual.color.equals(new THREE.AmbientLight(undefined, 0.82).color)).to.equal(true);
        expect(actual).to.have.property('intensity', new THREE.AmbientLight(undefined, 0.82).intensity);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after color property is changed', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-ambient-light :color="color" /></object-watcher>',
      components: { ObjectWatcher, VglAmbientLight },
      data: { color: '#f38ea6' },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#ff00f2';
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          expect(updatedHistory[0].children).to.have.lengthOf(1);
          const [actual1] = updatedHistory[0].children;
          expect(actual1).to.have.property('type', 'AmbientLight');
          expect(actual1.color.equals(new THREE.AmbientLight(0xf38ea6).color)).to.equal(true);
          expect(actual1).to.have.property('intensity', new THREE.AmbientLight(0xf38ea6).intensity);
          expect(updatedHistory[1].children).to.have.lengthOf(1);
          const [actual2] = updatedHistory[1].children;
          expect(actual2).to.have.property('type', 'AmbientLight');
          expect(actual2.color.equals(new THREE.AmbientLight(0xff00f2).color)).to.equal(true);
          expect(actual2).to.have.property('intensity', new THREE.AmbientLight(0xff00f2).intensity);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  it('after intensity property is changed', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-ambient-light :intensity="intensity" /></object-watcher>',
      components: { ObjectWatcher, VglAmbientLight },
      data: { intensity: 0.43 },
    }).$mount();
    vm.$nextTick(() => {
      vm.intensity = '0.55';
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          expect(updatedHistory[0].children).to.have.lengthOf(1);
          const [actual1] = updatedHistory[0].children;
          const expected1 = new THREE.AmbientLight(undefined, 0.43);
          expect(actual1).to.have.property('type', expected1.type);
          expect(actual1.color.equals(expected1.color)).to.equal(true);
          expect(actual1).to.have.property('intensity', expected1.intensity);
          expect(updatedHistory[1].children).to.have.lengthOf(1);
          const [actual2] = updatedHistory[1].children;
          const expected2 = new THREE.AmbientLight(undefined, 0.55);
          expect(actual2).to.have.property('type', expected2.type);
          expect(actual2.color.equals(expected2.color)).to.equal(true);
          expect(actual2).to.have.property('intensity', expected2.intensity);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
