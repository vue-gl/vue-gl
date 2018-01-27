describe('VglSphereGeometry:', function suite() {
  const { VglSphereGeometry, VglMesh, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><vgl-sphere-geometry name="abc1#2" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglSphereGeometry, GeometryWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const actual = updatedHistory[0].vertices;
        const expected = new THREE.SphereGeometry().vertices;
        expect(actual).to.have.deep.ordered.members(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-sphere-geometry name="abc1#2" radius="22.24" width-segments="5" height-segments="7" phi-start="0.02" phi-length="1.2" theta-start="0.32" theta-length="2.2" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglSphereGeometry, GeometryWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const actual = updatedHistory[0].vertices;
        const expected = new THREE.SphereGeometry(22.24, 5, 7, 0.02, 1.2, 0.32, 2.2).vertices;
        expect(actual).to.have.deep.ordered.members(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after radius property is changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-sphere-geometry name="abc1#2" :radius="radius" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglSphereGeometry, GeometryWatcher },
      data: { radius: 6.1 },
    }).$mount();
    vm.$nextTick(() => {
      vm.radius = 4.2;
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          const actual1 = updatedHistory[0].vertices;
          const expected1 = new THREE.SphereGeometry(6.1).vertices;
          expect(actual1).to.have.deep.ordered.members(expected1);
          const actual2 = updatedHistory[1].vertices;
          const expected2 = new THREE.SphereGeometry(4.2).vertices;
          expect(actual2).to.have.deep.ordered.members(expected2);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
