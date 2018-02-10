describe('VglTextGeometry component', function component() {
  const { VglTextGeometry, VglNamespace } = VueGL;
  const { expect, assert } = chai;
  this.timeout(5000);
  before(function hook(done) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      this.typeface = `data:,${encodeURIComponent(xhr.responseText)}`;
      done();
    }, false);
    xhr.open('GET', 'base/test/helvetiker_regular.typeface.json');
    xhr.send();
  });
  describe('Parameters of a instance should be same as the component properties.', function suite() {
    it('When properties are number.', function test(done) {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-text-geometry ref="geo" font="${this.typeface}" :size="120" :height="6" :curve-segments="8" :bevel-enabled="true" :bevel-thickness="3" :bevel-size="6" :bevel-segments="2" text="a" /></vgl-namespace>`,
        components: { VglTextGeometry, VglNamespace },
      }).$mount();
      vm.$refs.geo.$watch('inst', (inst) => {
          vm.$nextTick(() => {
            new THREE.FontLoader().load(this.typeface, (font) => {
              try {
                const mediator = new THREE.BufferGeometry();
                const expected = new THREE.TextBufferGeometry('a', {
                  font,
                  size: 120,
                  height: 6,
                  curveSegments: 8,
                  bevelEnabled: true,
                  bevelThickness: 3,
                  bevelSize: 6,
                  bevelSegments: 2,
                });
                expect(mediator.copy(inst).toJSON()).to.deep.equal(mediator.copy(expected).toJSON());
                done();
              } catch (e) {
                done(e);
              }
            });
          });
      });
    });
    it('When properties are string.', function test(done) {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-text-geometry ref="geo" font="${this.typeface}" size="110" height="6" curve-segments="8" bevel-enabled bevel-thickness="3" bevel-size="6" bevel-segments="2" text="a" /></vgl-namespace>`,
        components: { VglTextGeometry, VglNamespace },
      }).$mount();
      vm.$refs.geo.$watch('inst', (inst) => {
        vm.$nextTick(() => {
            new THREE.FontLoader().load(this.typeface, (font) => {
              try {
                const mediator = new THREE.BufferGeometry();
                const expected = new THREE.TextBufferGeometry('a', {
                  font,
                  size: 110,
                  height: 6,
                  curveSegments: 8,
                  bevelEnabled: true,
                  bevelThickness: 3,
                  bevelSize: 6,
                  bevelSegments: 2,
                });
                expect(mediator.copy(inst).toJSON()).to.deep.equal(mediator.copy(expected).toJSON());
                done();
              } catch (e) {
                done(e);
              }
            });
        });
      }, { immediate: true });
    });
    it('When properties are undefined.', function test(done) {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-text-geometry ref="geo" font="${this.typeface}" text="a" /></vgl-namespace>`,
        components: { VglTextGeometry, VglNamespace },
      }).$mount();
      vm.$refs.geo.$watch('inst', (inst) => {
        vm.$nextTick(() => {
            new THREE.FontLoader().load(this.typeface, (font) => {
              try {
                const mediator = new THREE.BufferGeometry();
                const expected = new THREE.TextBufferGeometry('a', { font });
                expect(mediator.copy(inst).toJSON()).to.deep.equal(mediator.copy(expected).toJSON());
                done();
              } catch (e) {
                done(e);
              }
            });
        });
      }, { immediate: true });
    });
  });
  describe('Instance should be recreated when a property changed.', function suite() {
    it('When the width property changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-text-geometry ref="geo" font="base/test/helvetiker_regular.typeface.json" :size="size" text="a" /></vgl-namespace>',
        components: { VglTextGeometry, VglNamespace },
        data: { size: 120 },
      }).$mount();
      vm.$refs.geo.$watch('f', () => {
        vm.$nextTick(() => {
          const before = vm.$refs.geo.inst;
          vm.size = 110;
          vm.$nextTick(() => {
            try {
              assert.notEqual(before, vm.$refs.geo.inst);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
  });
});
