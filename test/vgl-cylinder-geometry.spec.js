describe('VglCylinderGeometry:', function suite() {
  const { VglCylinderGeometry, VglNamespace } = VueGL;
  const { expect } = chai;
  let history;
  const GeometryWatcher = {
    inject: ['vglGeometries'],
    props: ['name'],
    created() {
      this.$watch(() => this.vglGeometries.forGet[this.name], (geometry) => {
        history.push(new THREE.BufferGeometry().copy(geometry));
      }, { immediate: true });
    },
    render() {},
  };
  beforeEach(function hook(done) {
    history = [];
    done();
  });
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-cylinder-geometry name="g" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglCylinderGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.CylinderBufferGeometry()).toJSON();
        expect(actual).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-cylinder-geometry name="g" radius-top="1.01" radius-bottom="1.02" height="1.586" radial-segments="11" height-segments="5" open-ended theta-start="0.63" theta-length="2.21" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglCylinderGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.CylinderBufferGeometry(
          1.01,
          1.02,
          1.586,
          11,
          5,
          true,
          0.63,
          2.21,
        )).toJSON();
        expect(actual).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-cylinder-geometry name="g" radius-top="1.01" :radius-bottom="r" height="1.586" radial-segments="11" height-segments="5" :open-ended="o" theta-start="0.63" :theta-length="tLen" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglCylinderGeometry, VglNamespace, GeometryWatcher },
      data: { r: 1.2, o: false, tLen: 2.8 },
    }).$mount();
    vm.$nextTick(() => {
      vm.r = 0.842;
      vm.o = true;
      vm.tLen = 1.21;
      vm.$nextTick(() => {
        try {
          let geometry;
          let actual;
          let expected;
          // after
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.CylinderBufferGeometry(
            1.01,
            0.842,
            1.586,
            11,
            5,
            true,
            0.63,
            1.21,
          )).toJSON();
          expect(actual).to.deep.equal(expected);
          // before
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.CylinderBufferGeometry(
            1.01,
            1.2,
            1.586,
            11,
            5,
            false,
            0.63,
            2.8,
          )).toJSON();
          expect(actual).to.deep.equal(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
