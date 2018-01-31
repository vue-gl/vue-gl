describe('VglDodecahedronGeometry:', function suite() {
  const { VglDodecahedronGeometry, VglMesh, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><geometry-watcher geometry="abc1#2" /><vgl-dodecahedron-geometry name="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglDodecahedronGeometry, GeometryWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const actual = updatedHistory[0].vertices;
        const expected = new THREE.DodecahedronGeometry().vertices;
        expect(actual).to.have.deep.ordered.members(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><geometry-watcher geometry="abc1#2" /><vgl-dodecahedron-geometry name="abc1#2" radius="22.24" detail="1" /></vgl-namespace>',
      components: { VglNamespace, VglDodecahedronGeometry, GeometryWatcher },
    }).$mount();
    after10ticks(vm, () => {
      try {
        expect(updatedHistory).to.have.lengthOf(1);
        const actual = updatedHistory[0].vertices;
        const expected = new THREE.DodecahedronGeometry(22.24, 1).vertices;
        expect(actual).to.have.deep.ordered.members(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after radius property is changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><geometry-watcher geometry="abc1#2" /><vgl-dodecahedron-geometry name="abc1#2" :radius="radius" /></vgl-namespace>',
      components: { VglNamespace, VglDodecahedronGeometry, GeometryWatcher },
      data: { radius: 26 },
    }).$mount();
    vm.$nextTick(() => {
      vm.radius = 42;
      after10ticks(vm, () => {
        try {
          expect(updatedHistory).to.have.lengthOf(2);
          const actual1 = updatedHistory[0].vertices;
          const expected1 = new THREE.DodecahedronGeometry(26).vertices;
          expect(actual1).to.have.deep.ordered.members(expected1);
          const actual2 = updatedHistory[1].vertices;
          const expected2 = new THREE.DodecahedronGeometry(42).vertices;
          expect(actual2).to.have.deep.ordered.members(expected2);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
