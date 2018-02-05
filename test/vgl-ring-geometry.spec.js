describe('VglRingGeometry:', function suite() {
  const { VglRingGeometry, VglNamespace } = VueGL;
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
      template: '<vgl-namespace><vgl-ring-geometry name="g" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglRingGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.RingBufferGeometry()).toJSON();
        expect(actual).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-ring-geometry name="g" inner-radius="19.5" outer-radius="63.7" theta-segments="33" phi-segments="11" theta-start="0.5" theta-length="3.6" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglRingGeometry, VglNamespace, GeometryWatcher },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const geometry = history.pop();
        const actual = geometry.toJSON();
        const expected = geometry.copy(new THREE.RingBufferGeometry(
          19.5,
          63.7,
          33,
          11,
          0.5,
          3.6,
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
      template: '<vgl-namespace><vgl-ring-geometry name="g" inner-radius="19.5" :outer-radius="r" :theta-segments="s" phi-segments="11" theta-start="0.5" theta-length="3.6" /><geometry-watcher name="g" /></vgl-namespace>',
      components: { VglRingGeometry, VglNamespace, GeometryWatcher },
      data: { r: 22.5, s: 8 },
    }).$mount();
    vm.$nextTick(() => {
      vm.r = 80;
      vm.s = 17;
      vm.$nextTick(() => {
        try {
          let geometry;
          let actual;
          let expected;
          // after
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.RingBufferGeometry(
            19.5,
            80,
            17,
            11,
            0.5,
            3.6,
          )).toJSON();
          expect(actual).to.deep.equal(expected);
          // before
          geometry = history.pop();
          actual = geometry.toJSON();
          expected = geometry.copy(new THREE.RingBufferGeometry(
            19.5,
            22.5,
            8,
            11,
            0.5,
            3.6,
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
