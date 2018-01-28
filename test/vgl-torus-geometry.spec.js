describe('VglTorusGeometry:', function suite() {
  const { VglTorusGeometry, VglMesh, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><geometry-watcher geometry="abc1#2" /><vgl-torus-geometry name="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglTorusGeometry, GeometryWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const actual = updatedHistory[0].vertices;
        const expected = new THREE.TorusGeometry().vertices;
        expect(actual).to.have.deep.ordered.members(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><geometry-watcher geometry="abc1#2" /><vgl-torus-geometry name="abc1#2" radius="22.24" tube="3.8" radial-segments="11" tubular-segments="9" arc="2.01" /></vgl-namespace>',
      components: { VglNamespace, VglTorusGeometry, GeometryWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const actual = updatedHistory[0].vertices;
        const expected = new THREE.TorusGeometry(22.24, 3.8, 11, 9, 2.01).vertices;
        expect(actual).to.have.deep.ordered.members(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after radius property is changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><geometry-watcher geometry="abc1#2" /><vgl-torus-geometry name="abc1#2" :radius="radius" /></vgl-namespace>',
      components: { VglNamespace, VglTorusGeometry, GeometryWatcher },
      data: { radius: 6.1 },
    }).$mount();
    vm.$nextTick(() => {
      vm.radius = 4.2;
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          const actual1 = updatedHistory[0].vertices;
          const expected1 = new THREE.TorusGeometry(6.1).vertices;
          expect(actual1).to.have.deep.ordered.members(expected1);
          const actual2 = updatedHistory[1].vertices;
          const expected2 = new THREE.TorusGeometry(4.2).vertices;
          expect(actual2).to.have.deep.ordered.members(expected2);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
