describe('VglFont component', function component() {
  const { VglFont, VglNamespace } = VueGL;
  const { assert } = chai;
  before(function hook(done) {
    const xhr1 = new XMLHttpRequest();
    xhr1.addEventListener('load', () => {
      this.typeface_regular_json = JSON.parse(xhr1.responseText);
      this.typeface_regular = `data:,${encodeURIComponent(xhr1.responseText)}`;
      const xhr2 = new XMLHttpRequest();
      xhr2.addEventListener('load', () => {
        this.typeface_bold = `data:,${encodeURIComponent(xhr2.responseText)}`;
        done();
      }, false);
      xhr2.open('GET', 'base/test/helvetiker_bold.typeface.json');
      xhr2.send();
    }, false);
    xhr1.open('GET', 'base/test/helvetiker_regular.typeface.json');
    xhr1.send();
  });
  describe('The instance should be registered to the injected namespace.', function suite() {
    it('Null should be registered when created.', function test(done) {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-font name="dm'&^>" src="${this.typeface_regular}" /><other-component ref="other" /></vgl-namespace>`,
        components: {
          VglFont,
          VglNamespace,
          OtherComponent: {
            inject: ['vglFonts'],
            render() {},
          },
        },
      }).$mount();
      assert.isNull(vm.$refs.other.vglFonts.forGet["dm'&^>"]);
      done();
    });
    it('Should be replaced when the typeface is loaded.', function test(done) {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-font name="'<!--" src="${this.typeface_regular}" ref="f" /><other-component ref="other" /></vgl-namespace>`,
        components: {
          VglNamespace,
          VglFont,
          OtherComponent: {
            inject: ['vglFonts'],
            render() {},
          },
        },
      }).$mount();
      vm.$refs.f.$watch('inst', (inst) => {
        vm.$nextTick(() => {
          try {
            assert.strictEqual(vm.$refs.other.vglFonts.forGet["'<!--"], inst);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
    it('Should be unregistered when destroyed.', function test(done) {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-font name="n<!--" src="${this.typeface_regular}" v-if="!destroyed" ref="f" /><other-component ref="other" /></vgl-namespace>`,
        components: {
          VglFont,
          VglNamespace,
          OtherComponent: {
            inject: ['vglFonts'],
            render() {},
          },
        },
        data: { destroyed: false },
      }).$mount();
      vm.$refs.f.$watch('inst', () => {
        vm.$nextTick(() => {
          vm.destroyed = true;
          vm.$nextTick(() => {
            try {
              assert.isEmpty(vm.$refs.other.vglFonts.forGet);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
    it('Should be replaced when the instance is replaced.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-font name="\'<!--" :src="src" ref="f" /><other-component ref="other" /></vgl-namespace>',
        components: {
          VglNamespace,
          VglFont,
          OtherComponent: {
            inject: ['vglFonts'],
            render() {},
          },
        },
        data: { src: this.typeface_regular },
      }).$mount();
      const unwatch = vm.$refs.f.$watch('inst', (before) => {
        unwatch();
        vm.src = this.typeface_bold;
        vm.$refs.f.$watch('inst', (after) => {
          try {
            assert.notEqual(before, after);
          } catch (e) {
            done(e);
          }
          vm.$nextTick(() => {
            try {
              assert.strictEqual(vm.$refs.other.vglFonts.forGet["'<!--"], after);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
  });
  describe('Creating the instance', function suite() {
    it('The initial instance should be null.', function test(done) {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-font src="${this.typeface_regular}" ref="f" /></vgl-namespace>`,
        components: { VglNamespace, VglFont },
      }).$mount();
      assert.isNull(vm.$refs.f.inst);
      done();
    });
    it('The instance should be loaded from the src property when the src is a normal url.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-font src="base/test/helvetiker_regular.typeface.json" ref="f" /></vgl-namespace>',
        components: { VglNamespace, VglFont },
      }).$mount();
      vm.$refs.f.$watch('inst', (inst) => {
        const req = new XMLHttpRequest();
        req.addEventListener('load', () => {
          try {
            assert.deepEqual(inst.data, JSON.parse(req.responseText));
            done();
          } catch (e) {
            done(e);
          }
        }, false);
        req.open('GET', 'base/test/helvetiker_regular.typeface.json');
        req.send();
      });
    });
    it('The instance should be loaded from the src property when the src is a data uri.', function test(done) {
      const vm = new Vue({
        template: `<vgl-namespace><vgl-font src="${this.typeface_regular}" ref="f" /></vgl-namespace>`,
        components: { VglNamespace, VglFont },
      }).$mount();
      vm.$refs.f.$watch('inst', (inst) => {
        try {
          assert.deepEqual(inst.data, this.typeface_regular_json);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  describe('Watching properties', function suite() {
    it('The instance should be replaced when the src property changes.', function test(done) {
      const vm = new Vue({
        components: { VglFont, VglNamespace },
        template: '<vgl-namespace><vgl-font :src="src" ref="f" /></vgl-namespace>',
        data: { src: this.typeface_regular },
      }).$mount();
      const unwatch = vm.$refs.f.$watch('inst', (before) => {
        unwatch();
        vm.src = this.typeface_bold;
        vm.$refs.f.$watch('inst', (after) => {
          try {
            assert.notEqual(before, after);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
});
