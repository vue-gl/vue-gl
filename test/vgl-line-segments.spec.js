describe('VglLineSegments:', function suite() {
  const { VglLineSegments, VglObject3d, VglNamespace } = VueGL;
  const { expect } = chai;
  let updatedHistory;
  const ObjectWatcher = {
    mixins: [VglObject3d, VglNamespace],
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
  it('default', function test() {
    const vm = new Vue({
      template: '<object-watcher><vgl-line-segments /></object-watcher>',
      components: { VglLineSegments, ObjectWatcher },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      expect(updatedHistory[0].children).to.have.lengthOf(1);
      const [actual] = updatedHistory[0].children;
      expect(actual).to.have.property('type', 'LineSegments');
      expect(actual.position.equals(new THREE.LineSegments().position)).to.equal(true);
      expect(actual.quaternion.equals(new THREE.LineSegments().quaternion)).to.equal(true);
      expect(actual.scale.equals(new THREE.LineSegments().scale)).to.equal(true);
    });
  });
  it('with position, rotation, and scale property', function test() {
    const vm = new Vue({
      template: '<object-watcher><vgl-line-segments position="-0.5 0.5 2" rotation="3 1 1 YZX" scale="1.2 1.5 0.8" /></object-watcher>',
      components: { VglLineSegments, ObjectWatcher },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      expect(updatedHistory[0].children).to.have.lengthOf(1);
      const [actual] = updatedHistory[0].children;
      expect(actual).to.have.property('type', 'LineSegments');
      expect(actual.position.equals(new THREE.Vector3(-0.5, 0.5, 2))).to.equal(true);
      expect(actual.quaternion.equals(new THREE.Quaternion().setFromEuler(new THREE.Euler(3, 1, 1, 'YZX')))).to.equal(true);
      expect(actual.scale.equals(new THREE.Vector3(1.2, 1.5, 0.8))).to.equal(true);
    });
  });
  it('after position property is changed', function test() {
    const vm = new Vue({
      template: '<object-watcher><vgl-line-segments :position="position" /></object-watcher>',
      components: { VglLineSegments, ObjectWatcher },
      data: { position: '0.5 1 -0.5' },
    }).$mount();
    return vm.$nextTick().then(() => {
      vm.position = '0 0 0.5';
      return vm.$nextTick().then(() => {
        expect(updatedHistory).to.have.lengthOf(2);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual1] = updatedHistory[0].children;
        expect(actual1).to.have.property('type', 'LineSegments');
        expect(actual1.position.equals(new THREE.Vector3(0.5, 1, -0.5))).to.equal(true);
        expect(actual1.quaternion.equals(new THREE.LineSegments().quaternion)).to.equal(true);
        expect(actual1.scale.equals(new THREE.LineSegments().scale)).to.equal(true);
        expect(updatedHistory[1].children).to.have.lengthOf(1);
        const [actual2] = updatedHistory[1].children;
        expect(actual2).to.have.property('type', 'LineSegments');
        expect(actual2.position.equals(new THREE.Vector3(0, 0, 0.5))).to.equal(true);
        expect(actual2.quaternion.equals(new THREE.LineSegments().quaternion)).to.equal(true);
        expect(actual2.scale.equals(new THREE.LineSegments().scale)).to.equal(true);
      });
    });
  });
  it('after rotation property is changed', function test() {
    const vm = new Vue({
      template: '<object-watcher><vgl-line-segments :rotation="rotation" /></object-watcher>',
      components: { VglLineSegments, ObjectWatcher },
      data: { rotation: '0.5 1 -0.5 XYZ' },
    }).$mount();
    return vm.$nextTick().then(() => {
      vm.rotation = '0 0 0.5 YZX';
      return vm.$nextTick().then(() => {
        expect(updatedHistory).to.have.lengthOf(2);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual1] = updatedHistory[0].children;
        expect(actual1).to.have.property('type', 'LineSegments');
        expect(actual1.position.equals(new THREE.LineSegments().position)).to.equal(true);
        expect(actual1.quaternion.equals(new THREE.Quaternion().setFromEuler(new THREE.Euler(0.5, 1, -0.5, 'XYZ')))).to.equal(true);
        expect(actual1.scale.equals(new THREE.LineSegments().scale)).to.equal(true);
        expect(updatedHistory[1].children).to.have.lengthOf(1);
        const [actual2] = updatedHistory[1].children;
        expect(actual2).to.have.property('type', 'LineSegments');
        expect(actual2.position.equals(new THREE.LineSegments().position)).to.equal(true);
        expect(actual2.quaternion.equals(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0.5, 'YZX')))).to.equal(true);
        expect(actual2.scale.equals(new THREE.LineSegments().scale)).to.equal(true);
      });
    });
  });
  it('after scale property is changed', function test() {
    const vm = new Vue({
      template: '<object-watcher><vgl-line-segments :scale="scale" /></object-watcher>',
      components: { VglLineSegments, ObjectWatcher },
      data: { scale: '0.5 1 -0.5' },
    }).$mount();
    return vm.$nextTick().then(() => {
      vm.scale = '1.2 1.2 0.5';
      return vm.$nextTick().then(() => {
        expect(updatedHistory).to.have.lengthOf(2);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual1] = updatedHistory[0].children;
        expect(actual1).to.have.property('type', 'LineSegments');
        expect(actual1.position.equals(new THREE.LineSegments().position)).to.equal(true);
        expect(actual1.quaternion.equals(new THREE.LineSegments().quaternion)).to.equal(true);
        expect(actual1.scale.equals(new THREE.Vector3(0.5, 1, -0.5))).to.equal(true);
        expect(updatedHistory[1].children).to.have.lengthOf(1);
        const [actual2] = updatedHistory[1].children;
        expect(actual2).to.have.property('type', 'LineSegments');
        expect(actual2.position.equals(new THREE.LineSegments().position)).to.equal(true);
        expect(actual2.quaternion.equals(new THREE.LineSegments().quaternion)).to.equal(true);
        expect(actual2.scale.equals(new THREE.Vector3(1.2, 1.2, 0.5))).to.equal(true);
      });
    });
  });
});
