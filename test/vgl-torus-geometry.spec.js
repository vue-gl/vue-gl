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
  beforeEach(function hook(done) {
    updatedHistory = [];
    done();
  });
  it('without properties', function test() {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-torus-geometry name="abc1#2" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglTorusGeometry, GeometryWatcher },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      const actual = updatedHistory[0].vertices;
      const expected = new THREE.TorusGeometry().vertices;
      expect(actual).to.have.deep.ordered.members(expected);
    });
  });
  it('with properties', function test() {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-torus-geometry name="abc1#2" radius="22.24" tube="3.8" radial-segments="11" tubular-segments="9" arc="2.01" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglTorusGeometry, GeometryWatcher },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      const actual = updatedHistory[0].vertices;
      const expected = new THREE.TorusGeometry(22.24, 3.8, 11, 9, 2.01).vertices;
      expect(actual).to.have.deep.ordered.members(expected);
    });
  });
  it('after radius property is changed', function test() {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-torus-geometry name="abc1#2" :radius="radius" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglTorusGeometry, GeometryWatcher },
      data: { radius: 6.1 },
    }).$mount();
    return vm.$nextTick().then(() => {
      vm.radius = 4.2;
      return vm.$nextTick().then(() => {
        expect(updatedHistory).to.have.lengthOf(2);
        const actual1 = updatedHistory[0].vertices;
        const expected1 = new THREE.TorusGeometry(6.1).vertices;
        expect(actual1).to.have.deep.ordered.members(expected1);
        const actual2 = updatedHistory[1].vertices;
        const expected2 = new THREE.TorusGeometry(4.2).vertices;
        expect(actual2).to.have.deep.ordered.members(expected2);
      });
    });
  });
});
