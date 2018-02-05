describe('VglPlaneGeometry:', function suite() {
  const { VglPlaneGeometry, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><vgl-plane-geometry name="g" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglPlaneGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.PlaneBufferGeometry()).toJSON();
        expect(actual).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-plane-geometry name="g" width="100" height="60" width-segments="3" height-segments="4" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglPlaneGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.PlaneBufferGeometry(100, 60, 3, 4)).toJSON();
        expect(actual).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-plane-geometry name="g" :width="w" height="6" :width-segments="s" height-segments="4" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglPlaneGeometry, VglNamespace, GeometryWatcher },
      data: { w: 10, s: 3 },
    }).$mount();
    vm.$nextTick(() => {
      vm.w = 12.5;
      vm.s = 5;
      vm.$nextTick(() => {
        try {
          let geometry;
          let actual;
          let expected;
          // after
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.PlaneBufferGeometry(12.5, 6, 5, 4)).toJSON();
          expect(actual).to.deep.equal(expected);
          // before
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.PlaneBufferGeometry(10, 6, 3, 4)).toJSON();
          expect(actual).to.deep.equal(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
