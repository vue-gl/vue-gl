describe('VglCylinderGeometry:', function suite() {
  const { VglCylinderGeometry, VglMesh, VglNamespace } = VueGL;
  const { expect } = chai;
  let updatedHistory;
  const GeometryWatcher = {
    mixins: [VglMesh],
    created() {
      this.vglObject3d.listeners.push(() => {
        updatedHistory.push(this.inst.geometry.clone());
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
      template: '<vgl-namespace><vgl-cylinder-geometry name="abc1#2" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglCylinderGeometry, GeometryWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const actual = updatedHistory[0].vertices;
        const expected = new THREE.CylinderGeometry().vertices;
        expect(actual).to.have.deep.ordered.members(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-cylinder-geometry name="abc1#2" radius-top="22.24" radius-bottom="10.82" height="15" radial-segments="11" height-segments="7" open-ended theta-start="0.32" theta-length="2.2" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglCylinderGeometry, GeometryWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const [actual] = updatedHistory;
        const expected = new THREE.CylinderGeometry(22.24, 10.82, 15, 11, 7, true, 0.32, 2.2);
        expect(actual.vertices).to.have.deep.ordered.members(expected.vertices);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after radiusTop property is changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-cylinder-geometry name="abc1#2" :radius-top="radius" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglCylinderGeometry, GeometryWatcher },
      data: { radius: 26 },
    }).$mount();
    vm.$nextTick(() => {
      vm.radius = 42;
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          const actual1 = updatedHistory[0].vertices;
          const expected1 = new THREE.CylinderGeometry(26).vertices;
          expect(actual1).to.have.deep.ordered.members(expected1);
          const actual2 = updatedHistory[1].vertices;
          const expected2 = new THREE.CylinderGeometry(42).vertices;
          expect(actual2).to.have.deep.ordered.members(expected2);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
