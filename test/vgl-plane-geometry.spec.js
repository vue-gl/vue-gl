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
  beforeEach(function hook(done) {
    updatedHistory = [];
    done();
  });
  it('without properties', function test() {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-plane-geometry name="abc1#2" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglPlaneGeometry, GeometryWatcher },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      const actual = updatedHistory[0].vertices;
      const expected = new THREE.PlaneGeometry().vertices;
      expect(actual).to.have.deep.ordered.members(expected);
    });
  });
  it('with properties', function test() {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-plane-geometry name="abc1#2" width="22.24" height="15" width-segments="3" height-segments="2" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglPlaneGeometry, GeometryWatcher },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      const actual = updatedHistory[0].vertices;
      const expected = new THREE.PlaneGeometry(22.24, 15, 3, 2).vertices;
      expect(actual).to.have.deep.ordered.members(expected);
    });
  });
  it('after width property is changed', function test() {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-plane-geometry name="abc1#2" :width="width" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglPlaneGeometry, GeometryWatcher },
      data: { width: 6.1 },
    }).$mount();
    return vm.$nextTick().then(() => {
      vm.width = 4.2;
      return vm.$nextTick().then(() => {
        expect(updatedHistory).to.have.lengthOf(2);
        const actual1 = updatedHistory[0].vertices;
        const expected1 = new THREE.PlaneGeometry(6.1).vertices;
        expect(actual1).to.have.deep.ordered.members(expected1);
        const actual2 = updatedHistory[1].vertices;
        const expected2 = new THREE.PlaneGeometry(4.2).vertices;
        expect(actual2).to.have.deep.ordered.members(expected2);
      });
    });
  });
});
