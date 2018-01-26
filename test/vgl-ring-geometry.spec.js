describe('VglRingGeometry:', function suite() {
  const { VglRingGeometry, VglMesh, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><vgl-ring-geometry name="abc1#2" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglRingGeometry, GeometryWatcher },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      const actual = updatedHistory[0].vertices;
      const expected = new THREE.RingGeometry().vertices;
      expect(actual).to.have.deep.ordered.members(expected);
    });
  });
  it('with properties', function test() {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-ring-geometry name="abc1#2" inner-radius="22.24" outer-radius="35.01" theta-segments="5" phi-segments="7" theta-start="0.32" theta-length="2.2" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglRingGeometry, GeometryWatcher },
    }).$mount();
    return vm.$nextTick().then(() => {
      expect(updatedHistory).to.have.lengthOf(1);
      const actual = updatedHistory[0].vertices;
      const expected = new THREE.RingGeometry(22.24, 35.01, 5, 7, 0.32, 2.2).vertices;
      expect(actual).to.have.deep.ordered.members(expected);
    });
  });
  it('after innerRadius property is changed', function test() {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-ring-geometry name="abc1#2" :inner-radius="radius" /><geometry-watcher geometry="abc1#2" /></vgl-namespace>',
      components: { VglNamespace, VglRingGeometry, GeometryWatcher },
      data: { radius: 6.1 },
    }).$mount();
    return vm.$nextTick().then(() => {
      vm.radius = 4.2;
      return vm.$nextTick().then(() => {
        expect(updatedHistory).to.have.lengthOf(2);
        const actual1 = updatedHistory[0].vertices;
        const expected1 = new THREE.RingGeometry(6.1).vertices;
        expect(actual1).to.have.deep.ordered.members(expected1);
        const actual2 = updatedHistory[1].vertices;
        const expected2 = new THREE.RingGeometry(4.2).vertices;
        expect(actual2).to.have.deep.ordered.members(expected2);
      });
    });
  });
});
