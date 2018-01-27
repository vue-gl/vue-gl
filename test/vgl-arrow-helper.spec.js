describe('VglArrowHelper:', function suite() {
  const { VglArrowHelper, VglObject3d } = VueGL;
  const { expect } = chai;
  let updatedHistory;
  const ObjectWatcher = {
    mixins: [VglObject3d],
    created() {
      this.vglObject3d.listeners.push(() => {
        updatedHistory.push(this.inst);
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
  it('with dir property', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-arrow-helper dir="5 1 -1" /></object-watcher>',
      components: { VglArrowHelper, ObjectWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual] = updatedHistory[0].children;
        const expected = new THREE.ArrowHelper(
          new THREE.Vector3(5, 1, -1).normalize(),
          new THREE.Vector3(),
        );
        expect(actual).to.have.property('type', expected.type);
        expect(actual.position.equals(expected.position)).to.equal(true);
        expect(actual.quaternion.equals(expected.quaternion)).to.equal(true);
        expect(actual.scale.equals(expected.scale)).to.equal(true);
        expect(actual.children).to.have.lengthOf(expected.children.length);
        expected.children.forEach((expectedChild, index) => {
          const actualChild = actual.children[index];
          expect(actualChild).to.have.property('type', expectedChild.type);
          const actualPositionAttribute = actualChild.geometry.getAttribute('position');
          const actualPositionArray = [].slice.call(actualPositionAttribute.array, 0);
          const expectedPositionAttribute = expectedChild.geometry.getAttribute('position');
          const expectedPositionArray = [].slice.call(expectedPositionAttribute.array, 0);
          expect(actualPositionArray).to.have.deep.ordered.members(expectedPositionArray);
          const actualMaterial = actualChild.material;
          const expectedMaterial = expectedChild.material;
          expect(actualMaterial.color.equals(expectedMaterial.color)).to.equal(true);
          expect(actualChild.position.equals(expectedChild.position)).to.equal(true);
          expect(actualChild.quaternion.equals(expectedChild.quaternion)).to.equal(true);
          expect(actualChild.scale.equals(expectedChild.scale)).to.equal(true);
        });
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with dir, length, headLength, and headWidth properties', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-arrow-helper dir="5 1 -1" length="3.1" head-length="2.01" head-width="1.11" /></object-watcher>',
      components: { VglArrowHelper, ObjectWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual] = updatedHistory[0].children;
        const expected = new THREE.ArrowHelper(
          new THREE.Vector3(5, 1, -1).normalize(),
          new THREE.Vector3(),
          3.1,
          undefined,
          2.01,
          1.11,
        );
        expect(actual).to.have.property('type', expected.type);
        expect(actual.position.equals(expected.position)).to.equal(true);
        expect(actual.quaternion.equals(expected.quaternion)).to.equal(true);
        expect(actual.scale.equals(expected.scale)).to.equal(true);
        expect(actual.children).to.have.lengthOf(expected.children.length);
        expected.children.forEach((expectedChild, index) => {
          const actualChild = actual.children[index];
          expect(actualChild).to.have.property('type', expectedChild.type);
          const actualPositionAttribute = actualChild.geometry.getAttribute('position');
          const actualPositionArray = [].slice.call(actualPositionAttribute.array, 0);
          const expectedPositionAttribute = expectedChild.geometry.getAttribute('position');
          const expectedPositionArray = [].slice.call(expectedPositionAttribute.array, 0);
          expect(actualPositionArray).to.have.deep.ordered.members(expectedPositionArray);
          const actualMaterial = actualChild.material;
          const expectedMaterial = expectedChild.material;
          expect(actualMaterial.color.equals(expectedMaterial.color)).to.equal(true);
          expect(actualChild.position.equals(expectedChild.position)).to.equal(true);
          expect(actualChild.quaternion.equals(expectedChild.quaternion)).to.equal(true);
          expect(actualChild.scale.equals(expectedChild.scale)).to.equal(true);
        });
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with dir and color properties', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-arrow-helper dir="5 1 -1" color="#f23d8a" /></object-watcher>',
      components: { VglArrowHelper, ObjectWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual] = updatedHistory[0].children;
        const expected = new THREE.ArrowHelper(
          new THREE.Vector3(5, 1, -1).normalize(),
          new THREE.Vector3(),
          undefined,
          new THREE.Color('#f23d8a'),
        );
        expect(actual).to.have.property('type', expected.type);
        expect(actual.position.equals(expected.position)).to.equal(true);
        expect(actual.quaternion.equals(expected.quaternion)).to.equal(true);
        expect(actual.scale.equals(expected.scale)).to.equal(true);
        expect(actual.children).to.have.lengthOf(expected.children.length);
        expected.children.forEach((expectedChild, index) => {
          const actualChild = actual.children[index];
          expect(actualChild).to.have.property('type', expectedChild.type);
          const actualPositionAttribute = actualChild.geometry.getAttribute('position');
          const actualPositionArray = [].slice.call(actualPositionAttribute.array, 0);
          const expectedPositionAttribute = expectedChild.geometry.getAttribute('position');
          const expectedPositionArray = [].slice.call(expectedPositionAttribute.array, 0);
          expect(actualPositionArray).to.have.deep.ordered.members(expectedPositionArray);
          const actualMaterial = actualChild.material;
          const expectedMaterial = expectedChild.material;
          expect(actualMaterial.color.equals(expectedMaterial.color)).to.equal(true);
          expect(actualChild.position.equals(expectedChild.position)).to.equal(true);
          expect(actualChild.quaternion.equals(expectedChild.quaternion)).to.equal(true);
          expect(actualChild.scale.equals(expectedChild.scale)).to.equal(true);
        });
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after dir property is changed', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-arrow-helper :dir="dir" /></object-watcher>',
      components: { VglArrowHelper, ObjectWatcher },
      data: { dir: '5 1 -1' },
    }).$mount();
    vm.$nextTick(() => {
      vm.dir = '2 -11 8.8';
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          expect(updatedHistory[1].children).to.have.lengthOf(1);
          const [actual] = updatedHistory[1].children;
          const expected = new THREE.ArrowHelper(
            new THREE.Vector3(2, -11, 8.8).normalize(),
            new THREE.Vector3(),
          );
          expect(actual).to.have.property('type', expected.type);
          expect(actual.position.equals(expected.position)).to.equal(true);
          expect(actual.quaternion.equals(expected.quaternion)).to.equal(true);
          expect(actual.scale.equals(expected.scale)).to.equal(true);
          expect(actual.children).to.have.lengthOf(expected.children.length);
          expected.children.forEach((expectedChild, index) => {
            const actualChild = actual.children[index];
            expect(actualChild).to.have.property('type', expectedChild.type);
            const actualPositionAttribute = actualChild.geometry.getAttribute('position');
            const actualPositionArray = [].slice.call(actualPositionAttribute.array, 0);
            const expectedPositionAttribute = expectedChild.geometry.getAttribute('position');
            const expectedPositionArray = [].slice.call(expectedPositionAttribute.array, 0);
            expect(actualPositionArray).to.have.deep.ordered.members(expectedPositionArray);
            const actualMaterial = actualChild.material;
            const expectedMaterial = expectedChild.material;
            expect(actualMaterial.color.equals(expectedMaterial.color)).to.equal(true);
            expect(actualChild.position.equals(expectedChild.position)).to.equal(true);
            expect(actualChild.quaternion.equals(expectedChild.quaternion)).to.equal(true);
            expect(actualChild.scale.equals(expectedChild.scale)).to.equal(true);
          });
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  it('after length property is changed', function test(done) {
    const vm = new Vue({
      template: '<object-watcher :renderer="renderer" :camera="camera"><vgl-arrow-helper dir="5 1 -1" :length="length" /></object-watcher>',
      components: { VglArrowHelper, ObjectWatcher },
      computed: { renderer: () => this.renderer, camera: () => this.camera },
      data: { length: '2.1' },
    }).$mount();
    vm.$nextTick(() => {
      vm.length = '3.3';
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          expect(updatedHistory[1].children).to.have.lengthOf(1);
          const [actual] = updatedHistory[1].children;
          const expected = new THREE.ArrowHelper(
            new THREE.Vector3(5, 1, -1).normalize(),
            new THREE.Vector3(),
            3.3,
          );
          expect(actual).to.have.property('type', expected.type);
          expect(actual.position.equals(expected.position)).to.equal(true);
          expect(actual.quaternion.equals(expected.quaternion)).to.equal(true);
          expect(actual.scale.equals(expected.scale)).to.equal(true);
          expect(actual.children).to.have.lengthOf(expected.children.length);
          expected.children.forEach((expectedChild, index) => {
            const actualChild = actual.children[index];
            expect(actualChild).to.have.property('type', expectedChild.type);
            const actualPositionAttribute = actualChild.geometry.getAttribute('position');
            const actualPositionArray = [].slice.call(actualPositionAttribute.array, 0);
            const expectedPositionAttribute = expectedChild.geometry.getAttribute('position');
            const expectedPositionArray = [].slice.call(expectedPositionAttribute.array, 0);
            expect(actualPositionArray).to.have.deep.ordered.members(expectedPositionArray);
            const actualMaterial = actualChild.material;
            const expectedMaterial = expectedChild.material;
            expect(actualMaterial.color.equals(expectedMaterial.color)).to.equal(true);
            expect(actualChild.position.equals(expectedChild.position)).to.equal(true);
            expect(actualChild.quaternion.equals(expectedChild.quaternion)).to.equal(true);
            expect(actualChild.scale.equals(expectedChild.scale)).to.equal(true);
          });
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
