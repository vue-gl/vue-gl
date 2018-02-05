describe('VglSphereGeometry:', function suite() {
  const { VglSphereGeometry, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><vgl-sphere-geometry name="g" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglSphereGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.SphereBufferGeometry()).toJSON();
        expect(actual).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-sphere-geometry name="g" radius="82.8" width-segments="31" height-segments="13" phi-start="0.2" phi-length="1.2" theta-start="0.3" theta-length="3.8" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglSphereGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.SphereBufferGeometry(
          82.8,
          31,
          13,
          0.2,
          1.2,
          0.3,
          3.8,
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
      template: '<vgl-namespace><vgl-sphere-geometry name="g" radius="82.8" :width-segments="ws" :height-segments="hs" phi-start="0.2" phi-length="1.2" theta-start="0.3" theta-length="3.8" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglSphereGeometry, VglNamespace, GeometryWatcher },
      data: { ws: 8, hs: 5 },
    }).$mount();
    vm.$nextTick(() => {
      vm.ws = 12;
      vm.hs = 7;
      vm.$nextTick(() => {
        try {
          let geometry;
          let actual;
          let expected;
          // after
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.SphereBufferGeometry(
            82.8,
            12,
            7,
            0.2,
            1.2,
            0.3,
            3.8,
          )).toJSON();
          expect(actual).to.deep.equal(expected);
          // before
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.SphereBufferGeometry(
            82.8,
            8,
            5,
            0.2,
            1.2,
            0.3,
            3.8,
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
