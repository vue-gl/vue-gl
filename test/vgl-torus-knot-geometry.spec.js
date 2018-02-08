describe('VglTorusKnotGeometry:', function suite() {
  const { VglTorusKnotGeometry, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><vgl-torus-knot-geometry name="g" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglTorusKnotGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.TorusKnotBufferGeometry()).toJSON();
        expect(actual).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-torus-knot-geometry name="g" radius="15.8" tube="6.2" radial-segments="20" tubular-segments="30" p="3" q="4" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglTorusKnotGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.TorusKnotBufferGeometry(
          15.8,
          6.2,
          30,
          20,
          3,
          4,
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
      template: '<vgl-namespace><vgl-torus-knot-geometry name="g" radius="15.8" tube="6.2" radial-segments="20" tubular-segments="10" :p="p" :q="q" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglTorusKnotGeometry, VglNamespace, GeometryWatcher },
      data: { p: 3, q: 4 },
    }).$mount();
    vm.$nextTick(() => {
      vm.p = 4;
      vm.q = 5;
      vm.$nextTick(() => {
        try {
          let geometry;
          let actual;
          let expected;
          // after
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.TorusKnotBufferGeometry(
            15.8,
            6.2,
            10,
            20,
            4,
            5,
          )).toJSON();
          expect(actual).to.deep.equal(expected);
          // before
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.TorusKnotBufferGeometry(
            15.8,
            6.2,
            10,
            20,
            3,
            4,
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
