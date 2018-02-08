describe('VglTorusGeometry:', function suite() {
  const { VglTorusGeometry, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><vgl-torus-geometry name="g" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglTorusGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.TorusBufferGeometry()).toJSON();
        expect(actual).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-torus-geometry name="g" radius="5.8" tube="2" radial-segments="20" tubular-segments="30" arc="1.1" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglTorusGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.TorusBufferGeometry(5.8, 2, 20, 30, 1.1)).toJSON();
        expect(actual).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-torus-geometry name="g" :radius="r" tube="6.2" radial-segments="20" :tubular-segments="s" arc="1.1" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglTorusGeometry, VglNamespace, GeometryWatcher },
      data: { r: 25, s: 5 },
    }).$mount();
    vm.$nextTick(() => {
      vm.r = 125.8;
      vm.s = 7;
      vm.$nextTick(() => {
        try {
          let geometry;
          let actual;
          let expected;
          // after
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.TorusBufferGeometry(125.8, 6.2, 20, 7, 1.1)).toJSON();
          expect(actual).to.deep.equal(expected);
          // before
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.TorusBufferGeometry(25, 6.2, 20, 5, 1.1)).toJSON();
          expect(actual).to.deep.equal(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
