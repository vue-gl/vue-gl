describe("VglPerspectiveCamera component", function() {
    const {VglPerspectiveCamera, VglNamespace} = VueGL;
    const assert = chai.assert;
    describe("Creating a camera", function() {
        describe("The zoom of the camera should be same as the zoom property.", function() {
            it("When the property is undefined.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-perspective-camera ref="camera" /></vgl-namespace>`,
                    components: {VglPerspectiveCamera, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.camera.inst.zoom, 1);
            });
            it("When the property is a number.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-perspective-camera :zoom="1.2" ref="camera" /></vgl-namespace>`,
                    components: {VglPerspectiveCamera, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.camera.inst.zoom, 1.2);
            });
            it("When the property is a string.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-perspective-camera zoom="1.4" ref="camera" /></vgl-namespace>`,
                    components: {VglPerspectiveCamera, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.camera.inst.zoom, 1.4);
            });
        });
        describe("The near of the camera should be same as the near property.", function() {
            it("When the property is undefined.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-perspective-camera ref="camera" /></vgl-namespace>`,
                    components: {VglPerspectiveCamera, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.camera.inst.near, 0.1);
            });
            it("When the property is a number.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-perspective-camera :near="0.05" ref="camera" /></vgl-namespace>`,
                    components: {VglPerspectiveCamera, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.camera.inst.near, 0.05);
            });
            it("When the property is a string.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-perspective-camera near="0.2" ref="camera" /></vgl-namespace>`,
                    components: {VglPerspectiveCamera, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.camera.inst.near, 0.2);
            });
        });
        describe("The far of the camera should be same as the far property.", function() {
            it("When the property is undefined.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-perspective-camera ref="camera" /></vgl-namespace>`,
                    components: {VglPerspectiveCamera, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.camera.inst.far, 2000);
            });
            it("When the property is a number.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-perspective-camera :far="1000" ref="camera" /></vgl-namespace>`,
                    components: {VglPerspectiveCamera, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.camera.inst.far, 1000);
            });
            it("When the property is a string.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-perspective-camera far="4000" ref="camera" /></vgl-namespace>`,
                    components: {VglPerspectiveCamera, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.camera.inst.far, 4000);
            });
        });
        describe("The fov of the camera should be same as the fov property.", function() {
            it("When the property is undefined.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-perspective-camera ref="camera" /></vgl-namespace>`,
                    components: {VglPerspectiveCamera, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.camera.inst.fov, 50);
            });
            it("When the property is a number.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-perspective-camera :fov="60" ref="camera" /></vgl-namespace>`,
                    components: {VglPerspectiveCamera, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.camera.inst.fov, 60);
            });
            it("When the property is a string.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-perspective-camera fov="60.8" ref="camera" /></vgl-namespace>`,
                    components: {VglPerspectiveCamera, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.camera.inst.fov, 60.8);
            });
        });
    });
    describe("Watching properties", function() {
        it("The zoom of the camera should change when the zoom property changes.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-perspective-camera :zoom="zoom" ref="camera" /></vgl-namespace>`,
                components: {VglPerspectiveCamera, VglNamespace},
                data: {zoom: 1.1}
            }).$mount();
            vm.zoom = 0.8;
            vm.$nextTick(() => {
                try {
                    assert.strictEqual(vm.$refs.camera.inst.zoom, 0.8);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("The near of the camera should change when the near property changes.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-perspective-camera :near="near" ref="camera" /></vgl-namespace>`,
                components: {VglPerspectiveCamera, VglNamespace},
                data: {near: "0.02"}
            }).$mount();
            vm.near = "0.04";
            vm.$nextTick(() => {
                try {
                    assert.strictEqual(vm.$refs.camera.inst.near, 0.04);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("The far of the camera should change when the far property changes.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-perspective-camera :far="far" ref="camera" /></vgl-namespace>`,
                components: {VglPerspectiveCamera, VglNamespace},
                data: {far: "6000"}
            }).$mount();
            vm.far = "8000";
            vm.$nextTick(() => {
                try {
                    assert.strictEqual(vm.$refs.camera.inst.far, 8000);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("The fov of the camera should change when the fov property changes.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-perspective-camera :fov="fov" ref="camera" /></vgl-namespace>`,
                components: {VglPerspectiveCamera, VglNamespace},
                data: {fov: "20.5"}
            }).$mount();
            vm.fov = "35.8";
            vm.$nextTick(() => {
                try {
                    assert.strictEqual(vm.$refs.camera.inst.fov, 35.8);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
    });
});
