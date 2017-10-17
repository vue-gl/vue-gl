describe("VglLineBasicMaterial component", function() {
    const {VglLineBasicMaterial, VglNamespace} = VueGL;
    const assert = chai.assert;
    describe("Creating a material", function() {
        describe("The color of the material should be same as the color property.", function() {
            it("When the property is undefined.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-line-basic-material ref="mat" /></vgl-namespace>`,
                    components: {VglLineBasicMaterial, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.mat.inst.color.r, 255/255);
                assert.strictEqual(vm.$refs.mat.inst.color.g, 255/255);
                assert.strictEqual(vm.$refs.mat.inst.color.b, 255/255);
            });
            it("When the property is a hex code.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-line-basic-material color="#24d85a" ref="mat" /></vgl-namespace>`,
                    components: {VglLineBasicMaterial, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.mat.inst.color.r, 36/255);
                assert.strictEqual(vm.$refs.mat.inst.color.g, 216/255);
                assert.strictEqual(vm.$refs.mat.inst.color.b, 90/255);
            });
            it("When the property is a color name.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-line-basic-material color="salmon" ref="mat" /></vgl-namespace>`,
                    components: {VglLineBasicMaterial, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.mat.inst.color.r, 250/255);
                assert.strictEqual(vm.$refs.mat.inst.color.g, 128/255);
                assert.strictEqual(vm.$refs.mat.inst.color.b, 114/255);
            });
        });
        describe("The lights of the material should be same as the lights property.", function() {
            it("When the property is false.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-line-basic-material ref="mat" /></vgl-namespace>`,
                    components: {VglLineBasicMaterial, VglNamespace}
                }).$mount();
                assert.isFalse(vm.$refs.mat.inst.lights);
            });
            it("When the property is true.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-line-basic-material lights ref="mat" /></vgl-namespace>`,
                    components: {VglLineBasicMaterial, VglNamespace}
                }).$mount();
                assert.isTrue(vm.$refs.mat.inst.lights);
            });
        });
        describe("The linewidth of the material should be same as the linewidth property.", function() {
            it("When the property is undefined.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-line-basic-material ref="mat" /></vgl-namespace>`,
                    components: {VglLineBasicMaterial, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.mat.inst.linewidth, 1);
            });
            it("When the property is a number.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-line-basic-material :linewidth="2.1" ref="mat" /></vgl-namespace>`,
                    components: {VglLineBasicMaterial, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.mat.inst.linewidth, 2.1);
            });
            it("When the property is a string.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-line-basic-material linewidth="1.1" ref="mat" /></vgl-namespace>`,
                    components: {VglLineBasicMaterial, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.mat.inst.linewidth, 1.1);
            });
        });
        describe("The linecap of the material should be same as the linecap property.", function() {
            it("When the property is undefined.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-line-basic-material ref="mat" /></vgl-namespace>`,
                    components: {VglLineBasicMaterial, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.mat.inst.linecap, "round");
            });
            it("When the property is a string.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-line-basic-material linecap="square" ref="mat" /></vgl-namespace>`,
                    components: {VglLineBasicMaterial, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.mat.inst.linecap, "square");
            });
        });
        describe("The linejoin of the material should be same as the linejoin property.", function() {
            it("When the property is undefined.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-line-basic-material ref="mat" /></vgl-namespace>`,
                    components: {VglLineBasicMaterial, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.mat.inst.linejoin, "round");
            });
            it("When the property is a string.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-line-basic-material linejoin="bevel" ref="mat" /></vgl-namespace>`,
                    components: {VglLineBasicMaterial, VglNamespace}
                }).$mount();
                assert.strictEqual(vm.$refs.mat.inst.linejoin, "bevel");
            });
        });
    });
    describe("Watching properties", function() {
        it("The color of the material should change when the color property changes.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-line-basic-material :color="color" ref="mat" /></vgl-namespace>`,
                components: {VglLineBasicMaterial, VglNamespace},
                data: {color: "lemonchiffon"}
            }).$mount();
            vm.color = "mediumseagreen";
            vm.$nextTick(() => {
                try {
                    assert.strictEqual(vm.$refs.mat.inst.color.r, 0x3c/0xff);
                    assert.strictEqual(vm.$refs.mat.inst.color.g, 0xb3/0xff);
                    assert.strictEqual(vm.$refs.mat.inst.color.b, 0x71/0xff);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("The lights of the material should change when the lights property changes.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-line-basic-material :lights="lights" ref="mat" /></vgl-namespace>`,
                components: {VglLineBasicMaterial, VglNamespace},
                data: {lights: true}
            }).$mount();
            vm.lights = false;
            vm.$nextTick(() => {
                try {
                    assert.isFalse(vm.$refs.mat.inst.lights);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("The linewidth of the material should change when the linewidth property changes.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-line-basic-material :linewidth="linewidth" ref="mat" /></vgl-namespace>`,
                components: {VglLineBasicMaterial, VglNamespace},
                data: {linewidth: 0.8}
            }).$mount();
            vm.linewidth = "1.2";
            vm.$nextTick(() => {
                try {
                    assert.strictEqual(vm.$refs.mat.inst.linewidth, 1.2);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("The linecap of the material should change when the linecap property changes.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-line-basic-material :linecap="linecap" ref="mat" /></vgl-namespace>`,
                components: {VglLineBasicMaterial, VglNamespace},
                data: {linecap: "round"}
            }).$mount();
            vm.linecap = "square";
            vm.$nextTick(() => {
                try {
                    assert.equal(vm.$refs.mat.inst.linecap, "square");
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("The linejoin of the material should change when the linejoin property changes.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-line-basic-material :linejoin="linejoin" ref="mat" /></vgl-namespace>`,
                components: {VglLineBasicMaterial, VglNamespace},
                data: {linejoin: "bevel"}
            }).$mount();
            vm.linejoin = "miter";
            vm.$nextTick(() => {
                try {
                    assert.equal(vm.$refs.mat.inst.linejoin, "miter");
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
    });
});
