describe('VglCameraHelper:', function suite() {
  const {
    VglCameraHelper,
    VglObject3d,
    VglPerspectiveCamera,
    VglNamespace,
  } = VueGL;
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
  it('default', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-perspective-camera name="c" /><object-watcher><vgl-camera-helper camera="c" /></object-watcher></vgl-namespace>',
      components: {
        VglCameraHelper,
        VglNamespace,
        VglPerspectiveCamera,
        ObjectWatcher,
      },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        expect(updatedHistory[0].children).to.have.lengthOf(1);
        const [actual] = updatedHistory[0].children;
        const expected = new THREE.CameraHelper(new THREE.PerspectiveCamera());
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
        expect(actual.material.color.equals(expected.material.color)).to.equal(true);
        expect(actual.material).to.have.property('vertexColors', expected.material.vertexColors);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
