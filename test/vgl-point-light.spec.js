describe('VglPointLight:', function component() {
  const { VglPointLight, VglObject3d } = VueGL;
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
  beforeEach(function hook(done) {
    updatedHistory = [];
    done();
  });
  it('without properties', function test() {
    const vm = new Vue({
      template: '<object-watcher><vgl-point-light /></object-watcher>',
      components: { ObjectWatcher, VglPointLight },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      expect(updatedHistory[0].children).to.have.lengthOf(1);
      const [actual] = updatedHistory[0].children;
      expect(actual).to.have.property('type', 'PointLight');
      expect(actual.color.equals(new THREE.PointLight().color)).to.equal(true);
      expect(actual).to.have.property('intensity', new THREE.PointLight().intensity);
      expect(actual).to.have.property('decay', new THREE.PointLight().decay);
      expect(actual).to.have.property('distance', new THREE.PointLight().distance);
      expect(actual.position.equals(new THREE.PointLight().position)).to.equal(true);
    });
  });
  it('with distance property', function test() {
    const vm = new Vue({
      template: '<object-watcher><vgl-point-light distance="5" /></object-watcher>',
      components: { ObjectWatcher, VglPointLight },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      expect(updatedHistory[0].children).to.have.lengthOf(1);
      const [actual] = updatedHistory[0].children;
      const expected = new THREE.PointLight(undefined, undefined, 5);
      expect(actual).to.have.property('type', expected.type);
      expect(actual.color.equals(expected.color)).to.equal(true);
      expect(actual).to.have.property('intensity', expected.intensity);
      expect(actual).to.have.property('decay', expected.decay);
      expect(actual).to.have.property('distance', expected.distance);
      expect(actual.position.equals(expected.position)).to.equal(true);
    });
  });
  it('with decay property', function test() {
    const vm = new Vue({
      template: '<object-watcher><vgl-point-light decay="2" distance="5" /></object-watcher>',
      components: { ObjectWatcher, VglPointLight },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      expect(updatedHistory[0].children).to.have.lengthOf(1);
      const [actual] = updatedHistory[0].children;
      const expected = new THREE.PointLight(undefined, undefined, 5, 2);
      expect(actual).to.have.property('type', expected.type);
      expect(actual.color.equals(expected.color)).to.equal(true);
      expect(actual).to.have.property('intensity', expected.intensity);
      expect(actual).to.have.property('decay', expected.decay);
      expect(actual).to.have.property('distance', expected.distance);
      expect(actual.position.equals(expected.position)).to.equal(true);
    });
  });
  it('with color property', function test() {
    const vm = new Vue({
      template: '<object-watcher><vgl-point-light color="#2185e4" /></object-watcher>',
      components: { ObjectWatcher, VglPointLight },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      expect(updatedHistory[0].children).to.have.lengthOf(1);
      const [actual] = updatedHistory[0].children;
      const expected = new THREE.PointLight(0x2185e4);
      expect(actual).to.have.property('type', expected.type);
      expect(actual.color.equals(expected.color)).to.equal(true);
      expect(actual).to.have.property('intensity', expected.intensity);
      expect(actual).to.have.property('decay', expected.decay);
      expect(actual).to.have.property('distance', expected.distance);
      expect(actual.position.equals(expected.position)).to.equal(true);
    });
  });
  it('with intensity property', function test() {
    const vm = new Vue({
      template: '<object-watcher><vgl-point-light intensity="0.82" /></object-watcher>',
      components: { ObjectWatcher, VglPointLight },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      expect(updatedHistory[0].children).to.have.lengthOf(1);
      const [actual] = updatedHistory[0].children;
      const expected = new THREE.PointLight(undefined, 0.82);
      expect(actual).to.have.property('type', expected.type);
      expect(actual.color.equals(expected.color)).to.equal(true);
      expect(actual).to.have.property('intensity', expected.intensity);
      expect(actual).to.have.property('decay', expected.decay);
      expect(actual).to.have.property('distance', expected.distance);
      expect(actual.position.equals(expected.position)).to.equal(true);
    });
  });
  it('after distance property is changed', function test() {
    const vm = new Vue({
      template: '<object-watcher><vgl-point-light :distance="distance" /></object-watcher>',
      components: { ObjectWatcher, VglPointLight },
      data: { distance: 6 },
    }).$mount();
    return vm.$nextTick().then(() => {
      vm.distance = '4';
      return vm.$nextTick().then(() => {
        expect(updatedHistory).to.have.lengthOf(2);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual1] = updatedHistory[0].children;
        const expected1 = new THREE.PointLight(undefined, undefined, 6);
        expect(actual1).to.have.property('type', expected1.type);
        expect(actual1.color.equals(expected1.color)).to.equal(true);
        expect(actual1).to.have.property('intensity', expected1.intensity);
        expect(actual1).to.have.property('decay', expected1.decay);
        expect(actual1).to.have.property('distance', expected1.distance);
        expect(actual1.position.equals(expected1.position)).to.equal(true);
        expect(updatedHistory[1].children).to.have.lengthOf(1);
        const [actual2] = updatedHistory[1].children;
        const expected2 = new THREE.PointLight(undefined, undefined, 4);
        expect(actual2).to.have.property('type', expected2.type);
        expect(actual2.color.equals(expected2.color)).to.equal(true);
        expect(actual2).to.have.property('intensity', expected2.intensity);
        expect(actual2).to.have.property('decay', expected2.decay);
        expect(actual2).to.have.property('distance', expected2.distance);
        expect(actual2.position.equals(expected2.position)).to.equal(true);
      });
    });
  });
  it('after decay property is changed', function test() {
    const vm = new Vue({
      template: '<object-watcher><vgl-point-light :decay="decay" distance="5" /></object-watcher>',
      components: { ObjectWatcher, VglPointLight },
      data: { decay: 1 },
    }).$mount();
    return vm.$nextTick().then(() => {
      vm.decay = '2';
      return vm.$nextTick().then(() => {
        expect(updatedHistory).to.have.lengthOf(2);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual1] = updatedHistory[0].children;
        const expected1 = new THREE.PointLight(undefined, undefined, 5, 1);
        expect(actual1).to.have.property('type', expected1.type);
        expect(actual1.color.equals(expected1.color)).to.equal(true);
        expect(actual1).to.have.property('intensity', expected1.intensity);
        expect(actual1).to.have.property('decay', expected1.decay);
        expect(actual1).to.have.property('distance', expected1.distance);
        expect(actual1.position.equals(expected1.position)).to.equal(true);
        expect(updatedHistory[1].children).to.have.lengthOf(1);
        const [actual2] = updatedHistory[1].children;
        const expected2 = new THREE.PointLight(undefined, undefined, 5, 2);
        expect(actual2).to.have.property('type', expected2.type);
        expect(actual2.color.equals(expected2.color)).to.equal(true);
        expect(actual2).to.have.property('intensity', expected2.intensity);
        expect(actual2).to.have.property('decay', expected2.decay);
        expect(actual2).to.have.property('distance', expected2.distance);
        expect(actual2.position.equals(expected2.position)).to.equal(true);
      });
    });
  });
});
