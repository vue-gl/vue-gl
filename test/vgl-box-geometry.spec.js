describe('VglBoxGeometry:', function suite() {
  const { VglBoxGeometry, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><vgl-box-geometry name="g" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglBoxGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.BoxBufferGeometry()).toJSON();
        expect(actual).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-box-geometry name="g" width="100" height="60" depth="80" width-segments="3" height-segments="4" depth-segments="7" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglBoxGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.BoxBufferGeometry(100, 60, 80, 3, 4, 7)).toJSON();
        expect(actual).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-box-geometry name="g" :width="w" :height="h" :depth="d" width-segments="3" height-segments="4" depth-segments="7" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglBoxGeometry, VglNamespace, GeometryWatcher },
      data: { w: 10, h: 6, d: 3.8 },
    }).$mount();
    vm.$nextTick(() => {
      vm.w = 12.5;
      vm.h = 7.8;
      vm.d = 22;
      vm.$nextTick(() => {
        try {
          let geometry;
          let actual;
          let expected;
          // after
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.BoxBufferGeometry(12.5, 7.8, 22, 3, 4, 7)).toJSON();
          expect(actual).to.deep.equal(expected);
          // before
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.BoxBufferGeometry(10, 6, 3.8, 3, 4, 7)).toJSON();
          expect(actual).to.deep.equal(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
