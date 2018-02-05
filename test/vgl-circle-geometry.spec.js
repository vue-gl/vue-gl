describe('VglCircleGeometry:', function suite() {
  const { VglCircleGeometry, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><vgl-circle-geometry name="g" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglCircleGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.CircleBufferGeometry()).toJSON();
        expect(actual).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-circle-geometry name="g" radius="100" segments="60" theta-start="0.1" theta-length="3.3" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglCircleGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.CircleBufferGeometry(100, 60, 0.1, 3.3)).toJSON();
        expect(actual).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-circle-geometry name="g" radius="100" :segments="segs" theta-start="0.1" :theta-length="tLen" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglCircleGeometry, VglNamespace, GeometryWatcher },
      data: { segs: 12, tLen: 1.1 },
    }).$mount();
    vm.$nextTick(() => {
      vm.segs = 80;
      vm.tLen = 2.1;
      vm.$nextTick(() => {
        try {
          let geometry;
          let actual;
          let expected;
          // after
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.CircleBufferGeometry(100, 80, 0.1, 2.1)).toJSON();
          expect(actual).to.deep.equal(expected);
          // before
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.CircleBufferGeometry(100, 12, 0.1, 1.1)).toJSON();
          expect(actual).to.deep.equal(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
