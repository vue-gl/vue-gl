describe('VglDirectionalLightHelper:', function suite() {
  const { VglDirectionalLightHelper, VglDirectionalLight, VglNamespace } = VueGL;
  const { expect } = chai;
  let updatedHistory;
  const ObjectWatcher = {
    mixins: [VglDirectionalLight, VglNamespace],
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
  it('default', function test(done) {
    const vm = new Vue({
      template: '<object-watcher position="3 5 8" color="#28283f"><vgl-directional-light-helper /></object-watcher>',
      components: { VglDirectionalLightHelper, ObjectWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual] = updatedHistory[0].children;
        const light = new THREE.DirectionalLight(0x28283f);
        light.position.set(3, 5, 8);
        const expected = new THREE.DirectionalLightHelper(light);
        expect(actual).to.have.property('type', expected.type);
        expect(actual.position.equals(expected.position)).to.equal(true);
        expect(actual.quaternion.equals(expected.quaternion)).to.equal(true);
        expect(actual.scale.equals(expected.scale)).to.equal(true);
        expect(actual.children).to.have.lengthOf(expected.children.length);
        expected.children.forEach((expectedChild, index) => {
          const actualChild = actual.children[index];
          expect(actualChild).to.have.property('type', expectedChild.type);
          expect(actualChild.position.equals(expectedChild.position)).to.equal(true);
          expect(actualChild.quaternion.equals(expectedChild.quaternion)).to.equal(true);
          expect(actualChild.scale.equals(expectedChild.scale)).to.equal(true);
          expect(actualChild.material.color.equals(expectedChild.material.color)).to.equal(true);
          const actualPositionAttribute = actualChild.geometry.getAttribute('position');
          const actualPositionArray = [].slice.call(actualPositionAttribute.array, 0);
          const expectedPositionAttribute = expectedChild.geometry.getAttribute('position');
          const expectedPositionArray = [].slice.call(expectedPositionAttribute.array, 0);
          expect(actualPositionArray).to.have.ordered.members(expectedPositionArray);
        });
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<object-watcher position="3 5 8" color="#28283f"><vgl-directional-light-helper size="2.7" color="#e38a5d" /></object-watcher>',
      components: { VglDirectionalLightHelper, ObjectWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual] = updatedHistory[0].children;
        const light = new THREE.DirectionalLight(0x28283f);
        light.position.set(3, 5, 8);
        const expected = new THREE.DirectionalLightHelper(light, 2.7, 0xe38a5d);
        expect(actual).to.have.property('type', expected.type);
        expect(actual.position.equals(expected.position)).to.equal(true);
        expect(actual.quaternion.equals(expected.quaternion)).to.equal(true);
        expect(actual.scale.equals(expected.scale)).to.equal(true);
        expect(actual.children).to.have.lengthOf(expected.children.length);
        expected.children.forEach((expectedChild, index) => {
          const actualChild = actual.children[index];
          expect(actualChild).to.have.property('type', expectedChild.type);
          expect(actualChild.position.equals(expectedChild.position)).to.equal(true);
          expect(actualChild.quaternion.equals(expectedChild.quaternion)).to.equal(true);
          expect(actualChild.scale.equals(expectedChild.scale)).to.equal(true);
          expect(actualChild.material.color.equals(expectedChild.material.color)).to.equal(true);
          const actualPositionAttribute = actualChild.geometry.getAttribute('position');
          const actualPositionArray = [].slice.call(actualPositionAttribute.array, 0);
          const expectedPositionAttribute = expectedChild.geometry.getAttribute('position');
          const expectedPositionArray = [].slice.call(expectedPositionAttribute.array, 0);
          expect(actualPositionArray).to.have.ordered.members(expectedPositionArray);
        });
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after size property is changed', function test(done) {
    const vm = new Vue({
      template: '<object-watcher position="3 5 8" color="#28283f"><vgl-directional-light-helper :size="size" /></object-watcher>',
      components: { VglDirectionalLightHelper, ObjectWatcher },
      data: { size: '1.3' },
    }).$mount();
    vm.$nextTick(() => {
      vm.size = '1.7';
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          expect(updatedHistory[1].children).to.have.lengthOf(1);
          const [actual] = updatedHistory[1].children;
          const light = new THREE.DirectionalLight(0x28283f);
          light.position.set(3, 5, 8);
          const expected = new THREE.DirectionalLightHelper(light, 1.7);
          expect(actual).to.have.property('type', expected.type);
          expect(actual.position.equals(expected.position)).to.equal(true);
          expect(actual.quaternion.equals(expected.quaternion)).to.equal(true);
          expect(actual.scale.equals(expected.scale)).to.equal(true);
          expect(actual.children).to.have.lengthOf(expected.children.length);
          expected.children.forEach((expectedChild, index) => {
            const actualChild = actual.children[index];
            expect(actualChild).to.have.property('type', expectedChild.type);
            expect(actualChild.position.equals(expectedChild.position)).to.equal(true);
            expect(actualChild.quaternion.equals(expectedChild.quaternion)).to.equal(true);
            expect(actualChild.scale.equals(expectedChild.scale)).to.equal(true);
            expect(actualChild.material.color.equals(expectedChild.material.color)).to.equal(true);
            const actualPositionAttribute = actualChild.geometry.getAttribute('position');
            const actualPositionArray = [].slice.call(actualPositionAttribute.array, 0);
            const expectedPositionAttribute = expectedChild.geometry.getAttribute('position');
            const expectedPositionArray = [].slice.call(expectedPositionAttribute.array, 0);
            expect(actualPositionArray).to.have.ordered.members(expectedPositionArray);
          });
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
