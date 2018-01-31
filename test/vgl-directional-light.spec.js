describe('VglDirectionalLight:', function component() {
  const { VglDirectionalLight, VglObject3d } = VueGL;
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
      template: '<object-watcher><vgl-directional-light /></object-watcher>',
      components: { ObjectWatcher, VglDirectionalLight },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual] = updatedHistory[0].children;
        expect(actual).to.have.property('type', 'DirectionalLight');
        expect(actual.color.equals(new THREE.DirectionalLight().color)).to.equal(true);
        expect(actual).to.have.property('intensity', new THREE.DirectionalLight().intensity);
        expect(actual.position.equals(new THREE.DirectionalLight().position)).to.equal(true);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with position property', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-directional-light position="2 5 1" /></object-watcher>',
      components: { ObjectWatcher, VglDirectionalLight },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual] = updatedHistory[0].children;
        expect(actual).to.have.property('type', 'DirectionalLight');
        expect(actual.color.equals(new THREE.DirectionalLight().color)).to.equal(true);
        expect(actual).to.have.property('intensity', new THREE.DirectionalLight().intensity);
        expect(actual.position.equals(new THREE.Vector3(2, 5, 1))).to.equal(true);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with color property', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-directional-light color="#2185e4" position="2 5 1" /></object-watcher>',
      components: { ObjectWatcher, VglDirectionalLight },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual] = updatedHistory[0].children;
        expect(actual).to.have.property('type', 'DirectionalLight');
        expect(actual.color.equals(new THREE.DirectionalLight(0x2185e4).color)).to.equal(true);
        expect(actual).to.have.property('intensity', new THREE.DirectionalLight(0x2185e4).intensity);
        expect(actual.position.equals(new THREE.Vector3(2, 5, 1))).to.equal(true);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with intensity property', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-directional-light intensity="0.82" position="2 5 1" /></object-watcher>',
      components: { ObjectWatcher, VglDirectionalLight },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual] = updatedHistory[0].children;
        const expected = new THREE.DirectionalLight(undefined, 0.82);
        expect(actual).to.have.property('type', expected.type);
        expect(actual.color.equals(expected.color)).to.equal(true);
        expect(actual).to.have.property('intensity', expected.intensity);
        expect(actual.position.equals(new THREE.Vector3(2, 5, 1))).to.equal(true);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after position property is changed', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-directional-light :position="position" /></object-watcher>',
      components: { ObjectWatcher, VglDirectionalLight },
      data: { position: '2 1 1' },
    }).$mount();
    vm.$nextTick(() => {
      vm.position = '2 8 2';
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          expect(updatedHistory[0].children).to.have.lengthOf(1);
          const [actual1] = updatedHistory[0].children;
          expect(actual1).to.have.property('type', 'DirectionalLight');
          expect(actual1.color.equals(new THREE.DirectionalLight().color)).to.equal(true);
          expect(actual1).to.have.property('intensity', new THREE.DirectionalLight().intensity);
          expect(actual1.position.equals(new THREE.Vector3(2, 1, 1))).to.equal(true);
          expect(updatedHistory[1].children).to.have.lengthOf(1);
          const [actual2] = updatedHistory[1].children;
          expect(actual2).to.have.property('type', 'DirectionalLight');
          expect(actual2.color.equals(new THREE.DirectionalLight().color)).to.equal(true);
          expect(actual2).to.have.property('intensity', new THREE.DirectionalLight().intensity);
          expect(actual2.position.equals(new THREE.Vector3(2, 8, 2))).to.equal(true);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  it('after color property is changed', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-directional-light :color="color" position="2 5 1" /></object-watcher>',
      components: { ObjectWatcher, VglDirectionalLight },
      data: { color: '#f38ea6' },
    }).$mount();
    vm.$nextTick(() => {
      vm.color = '#ff00f2';
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          expect(updatedHistory[0].children).to.have.lengthOf(1);
          const [actual1] = updatedHistory[0].children;
          expect(actual1).to.have.property('type', 'DirectionalLight');
          expect(actual1.color.equals(new THREE.DirectionalLight(0xf38ea6).color)).to.equal(true);
          expect(actual1).to.have.property('intensity', new THREE.DirectionalLight(0xf38ea6).intensity);
          expect(actual1.position.equals(new THREE.Vector3(2, 5, 1))).to.equal(true);
          expect(updatedHistory[1].children).to.have.lengthOf(1);
          const [actual2] = updatedHistory[1].children;
          expect(actual2).to.have.property('type', 'DirectionalLight');
          expect(actual2.color.equals(new THREE.DirectionalLight(0xff00f2).color)).to.equal(true);
          expect(actual2).to.have.property('intensity', new THREE.DirectionalLight(0xff00f2).intensity);
          expect(actual2.position.equals(new THREE.Vector3(2, 5, 1))).to.equal(true);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  it('after intensity property is changed', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-directional-light :intensity="intensity" position="2 5 1" /></object-watcher>',
      components: { ObjectWatcher, VglDirectionalLight },
      data: { intensity: 0.43 },
    }).$mount();
    vm.$nextTick(() => {
      vm.intensity = '0.55';
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          expect(updatedHistory[0].children).to.have.lengthOf(1);
          const [actual1] = updatedHistory[0].children;
          const expected1 = new THREE.DirectionalLight(undefined, 0.43);
          expect(actual1).to.have.property('type', expected1.type);
          expect(actual1.color.equals(expected1.color)).to.equal(true);
          expect(actual1).to.have.property('intensity', expected1.intensity);
          expect(actual1.position.equals(new THREE.Vector3(2, 5, 1))).to.equal(true);
          expect(updatedHistory[1].children).to.have.lengthOf(1);
          const [actual2] = updatedHistory[1].children;
          const expected2 = new THREE.DirectionalLight(undefined, 0.55);
          expect(actual2).to.have.property('type', expected2.type);
          expect(actual2.color.equals(expected2.color)).to.equal(true);
          expect(actual2).to.have.property('intensity', expected2.intensity);
          expect(actual2.position.equals(new THREE.Vector3(2, 5, 1))).to.equal(true);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
