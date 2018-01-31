describe('VglPlaneGeometry:', function suite() {
  const { VglPlaneGeometry, VglMesh, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><geometry-watcher geometry="abc1#2" /><vgl-plane-geometry name="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglPlaneGeometry, GeometryWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const actual = updatedHistory[0].vertices;
        const expected = new THREE.PlaneGeometry().vertices;
        expect(actual).to.have.deep.ordered.members(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><geometry-watcher geometry="abc1#2" /><vgl-plane-geometry name="abc1#2" width="22.24" height="15" width-segments="3" height-segments="2" /></vgl-namespace>',
      components: { VglNamespace, VglPlaneGeometry, GeometryWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const actual = updatedHistory[0].vertices;
        const expected = new THREE.PlaneGeometry(22.24, 15, 3, 2).vertices;
        expect(actual).to.have.deep.ordered.members(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after width property is changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><geometry-watcher geometry="abc1#2" /><vgl-plane-geometry name="abc1#2" :width="width" /></vgl-namespace>',
      components: { VglNamespace, VglPlaneGeometry, GeometryWatcher },
      data: { width: 6.1 },
    }).$mount();
    vm.$nextTick(() => {
      vm.width = 4.2;
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          const actual1 = updatedHistory[0].vertices;
          const expected1 = new THREE.PlaneGeometry(6.1).vertices;
          expect(actual1).to.have.deep.ordered.members(expected1);
          const actual2 = updatedHistory[1].vertices;
          const expected2 = new THREE.PlaneGeometry(4.2).vertices;
          expect(actual2).to.have.deep.ordered.members(expected2);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
