describe('VglOrthographicCamera component', function component() {
  const { VglOrthographicCamera, VglNamespace } = VueGL;
  const { assert } = chai;
  describe('Creating a camera', function when() {
    describe('The zoom of the camera should be same as the zoom property.', function suite() {
      it('When the property is undefined.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-orthographic-camera ref="camera" /></vgl-namespace>',
          components: { VglOrthographicCamera, VglNamespace },
        }).$mount();
        assert.strictEqual(vm.$refs.camera.inst.zoom, 1);
        done();
      });
      it('When the property is a number.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-orthographic-camera :zoom="1.2" ref="camera" /></vgl-namespace>',
          components: { VglOrthographicCamera, VglNamespace },
        }).$mount();
        assert.strictEqual(vm.$refs.camera.inst.zoom, 1.2);
        done();
      });
      it('When the property is a string.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-orthographic-camera zoom="1.4" ref="camera" /></vgl-namespace>',
          components: { VglOrthographicCamera, VglNamespace },
        }).$mount();
        assert.strictEqual(vm.$refs.camera.inst.zoom, 1.4);
        done();
      });
    });
    describe('The near of the camera should be same as the near property.', function suite() {
      it('When the property is undefined.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-orthographic-camera ref="camera" /></vgl-namespace>',
          components: { VglOrthographicCamera, VglNamespace },
        }).$mount();
        assert.strictEqual(vm.$refs.camera.inst.near, 0.1);
        done();
      });
      it('When the property is a number.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-orthographic-camera :near="0.05" ref="camera" /></vgl-namespace>',
          components: { VglOrthographicCamera, VglNamespace },
        }).$mount();
        assert.strictEqual(vm.$refs.camera.inst.near, 0.05);
        done();
      });
      it('When the property is a string.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-orthographic-camera near="0.2" ref="camera" /></vgl-namespace>',
          components: { VglOrthographicCamera, VglNamespace },
        }).$mount();
        assert.strictEqual(vm.$refs.camera.inst.near, 0.2);
        done();
      });
    });
    describe('The far of the camera should be same as the far property.', function suite() {
      it('When the property is undefined.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-orthographic-camera ref="camera" /></vgl-namespace>',
          components: { VglOrthographicCamera, VglNamespace },
        }).$mount();
        assert.strictEqual(vm.$refs.camera.inst.far, 2000);
        done();
      });
      it('When the property is a number.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-orthographic-camera :far="1000" ref="camera" /></vgl-namespace>',
          components: { VglOrthographicCamera, VglNamespace },
        }).$mount();
        assert.strictEqual(vm.$refs.camera.inst.far, 1000);
        done();
      });
      it('When the property is a string.', function test(done) {
        const vm = new Vue({
          template: '<vgl-namespace><vgl-orthographic-camera far="4000" ref="camera" /></vgl-namespace>',
          components: { VglOrthographicCamera, VglNamespace },
        }).$mount();
        assert.strictEqual(vm.$refs.camera.inst.far, 4000);
        done();
      });
    });
  });
  describe('Watching properties', function suite() {
    it('The zoom of the camera should change when the zoom property changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-orthographic-camera :zoom="zoom" ref="camera" /></vgl-namespace>',
        components: { VglOrthographicCamera, VglNamespace },
        data: { zoom: 1.1 },
      }).$mount();
      vm.zoom = 0.8;
      vm.$nextTick(() => {
        try {
          assert.strictEqual(vm.$refs.camera.inst.zoom, 0.8);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('The near of the camera should change when the near property changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-orthographic-camera :near="near" ref="camera" /></vgl-namespace>',
        components: { VglOrthographicCamera, VglNamespace },
        data: { near: '0.02' },
      }).$mount();
      vm.near = '0.04';
      vm.$nextTick(() => {
        try {
          assert.strictEqual(vm.$refs.camera.inst.near, 0.04);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
    it('The far of the camera should change when the far property changes.', function test(done) {
      const vm = new Vue({
        template: '<vgl-namespace><vgl-orthographic-camera :far="far" ref="camera" /></vgl-namespace>',
        components: { VglOrthographicCamera, VglNamespace },
        data: { far: '6000' },
      }).$mount();
      vm.far = '8000';
      vm.$nextTick(() => {
        try {
          assert.strictEqual(vm.$refs.camera.inst.far, 8000);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
