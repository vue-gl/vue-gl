describe('VglDodecahedronGeometry:', function suite() {
  const { VglDodecahedronGeometry, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><vgl-dodecahedron-geometry name="g" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglDodecahedronGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.DodecahedronBufferGeometry()).toJSON();
        expect(actual).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-dodecahedron-geometry name="g" radius="72.3" detail="2" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglDodecahedronGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.DodecahedronBufferGeometry(72.3, 2)).toJSON();
        expect(actual).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-dodecahedron-geometry name="g" :radius="r" :detail="d" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglDodecahedronGeometry, VglNamespace, GeometryWatcher },
      data: { r: 10.8, d: 2 },
    }).$mount();
    vm.$nextTick(() => {
      vm.r = 12.5;
      vm.d = 1;
      vm.$nextTick(() => {
        try {
          let geometry;
          let actual;
          let expected;
          // after
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.DodecahedronBufferGeometry(12.5, 1)).toJSON();
          expect(actual).to.deep.equal(expected);
          // before
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.DodecahedronBufferGeometry(10.8, 2)).toJSON();
          expect(actual).to.deep.equal(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
