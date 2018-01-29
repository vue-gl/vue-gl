describe('VglAxesHelper:', function suite() {
  const { VglAxesHelper, VglObject3d, VglNamespace } = VueGL;
  const { expect } = chai;
  let updatedHistory;
  const ObjectWatcher = {
    mixins: [VglObject3d, VglNamespace],
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
      template: '<object-watcher><vgl-axes-helper /></object-watcher>',
      components: { VglAxesHelper, ObjectWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual] = updatedHistory[0].children;
        const expected = new THREE.AxesHelper();
        expect(actual).to.have.property('type', expected.type);
        expect(actual.position.equals(expected.position)).to.equal(true);
        expect(actual.quaternion.equals(expected.quaternion)).to.equal(true);
        expect(actual.scale.equals(expected.scale)).to.equal(true);
        const actualPositionAttributes = actual.geometry.getAttribute('position');
        const actualPositionArray = [].slice.call(actualPositionAttributes.array, 0);
        const expectedPositionAttributes = expected.geometry.getAttribute('position');
        const expectedPositionArray = [].slice.call(expectedPositionAttributes.array, 0);
        expect(actualPositionArray).to.have.ordered.members(expectedPositionArray);
        const actualColorAttributes = actual.geometry.getAttribute('color');
        const actualColorArray = [].slice.call(actualColorAttributes.array, 0);
        const expectedColorAttributes = expected.geometry.getAttribute('color');
        const expectedColorArray = [].slice.call(expectedColorAttributes.array, 0);
        expect(actualColorArray).to.have.ordered.members(expectedColorArray);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with size property', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-axes-helper size="2.7" /></object-watcher>',
      components: { VglAxesHelper, ObjectWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual] = updatedHistory[0].children;
        const expected = new THREE.AxesHelper(2.7);
        expect(actual).to.have.property('type', expected.type);
        expect(actual.position.equals(expected.position)).to.equal(true);
        expect(actual.quaternion.equals(expected.quaternion)).to.equal(true);
        expect(actual.scale.equals(expected.scale)).to.equal(true);
        const actualPositionAttributes = actual.geometry.getAttribute('position');
        const actualPositionArray = [].slice.call(actualPositionAttributes.array, 0);
        const expectedPositionAttributes = expected.geometry.getAttribute('position');
        const expectedPositionArray = [].slice.call(expectedPositionAttributes.array, 0);
        expect(actualPositionArray).to.have.ordered.members(expectedPositionArray);
        const actualColorAttributes = actual.geometry.getAttribute('color');
        const actualColorArray = [].slice.call(actualColorAttributes.array, 0);
        const expectedColorAttributes = expected.geometry.getAttribute('color');
        const expectedColorArray = [].slice.call(expectedColorAttributes.array, 0);
        expect(actualColorArray).to.have.ordered.members(expectedColorArray);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after size property is changed', function test(done) {
    const vm = new Vue({
      template: '<object-watcher><vgl-axes-helper :size="size" /></object-watcher>',
      components: { VglAxesHelper, ObjectWatcher },
      data: { size: '1.3' },
    }).$mount();
    vm.$nextTick(() => {
      vm.size = '1.7';
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          expect(updatedHistory[1].children).to.have.lengthOf(1);
          const [actual] = updatedHistory[1].children;
          const expected = new THREE.AxesHelper(1.7);
          expect(actual).to.have.property('type', expected.type);
          expect(actual.position.equals(expected.position)).to.equal(true);
          expect(actual.quaternion.equals(expected.quaternion)).to.equal(true);
          expect(actual.scale.equals(expected.scale)).to.equal(true);
          const actualPositionAttributes = actual.geometry.getAttribute('position');
          const actualPositionArray = [].slice.call(actualPositionAttributes.array, 0);
          const expectedPositionAttributes = expected.geometry.getAttribute('position');
          const expectedPositionArray = [].slice.call(expectedPositionAttributes.array, 0);
          expect(actualPositionArray).to.have.ordered.members(expectedPositionArray);
          const actualColorAttributes = actual.geometry.getAttribute('color');
          const actualColorArray = [].slice.call(actualColorAttributes.array, 0);
          const expectedColorAttributes = expected.geometry.getAttribute('color');
          const expectedColorArray = [].slice.call(expectedColorAttributes.array, 0);
          expect(actualColorArray).to.have.ordered.members(expectedColorArray);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
