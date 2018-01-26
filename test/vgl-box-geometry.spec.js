describe('VglBoxGeometry:', function suite() {
  const { VglBoxGeometry, VglMesh, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><vgl-box-geometry name="abc1#2" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglBoxGeometry, GeometryWatcher },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      const actual = updatedHistory[0].vertices;
      const expected = new THREE.BoxGeometry().vertices;
      expect(actual).to.have.deep.ordered.members(expected);
    });
  });
  it('with properties', function test() {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-box-geometry name="abc1#2" width="2" height="3" depth="3.8" width-segments="2" height-segments="2" depth-segments="4" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglBoxGeometry, GeometryWatcher },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      const actual = updatedHistory[0].vertices;
      const expected = new THREE.BoxGeometry(2, 3, 3.8, 2, 2, 4).vertices;
      expect(actual).to.have.deep.ordered.members(expected);
    });
  });
  it('after width property is changed', function test() {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-box-geometry name="abc1#2" :width="width" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglBoxGeometry, GeometryWatcher },
      data: { width: 2 },
    }).$mount();
    return vm.$nextTick().then(() => {
      vm.width = 1.8;
      return vm.$nextTick().then(() => {
        expect(updatedHistory).to.have.lengthOf(2);
        const actual1 = updatedHistory[0].vertices;
        const expected1 = new THREE.BoxGeometry(2).vertices;
        expect(actual1).to.have.deep.ordered.members(expected1);
        const actual2 = updatedHistory[1].vertices;
        const expected2 = new THREE.BoxGeometry(1.8).vertices;
        expect(actual2).to.have.deep.ordered.members(expected2);
      });
    });
  });
});
