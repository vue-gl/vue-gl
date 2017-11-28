describe("VglFont component", function() {
    const {VglFont, VglNamespace} = VueGL;
    const assert = chai.assert;
    describe("The instance should be registered to the injected namespace.", function() {
        it("Null should be registered when created.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-font name="dm'&^>" src="base/node_modules/three/examples/fonts/helvetiker_regular.typeface.json" /><other-component ref="other" /></vgl-namespace>`,
                components: {
                    VglFont,
                    VglNamespace,
                    OtherComponent: {
                        inject: ["vglFonts"],
                        render() {}
                    }
                }
            }).$mount();
            assert.isNull(vm.$refs.other.vglFonts.forGet["dm'&^>"]);
        });
        it("Should be replaced when the typeface is loaded.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-font name="'<!--" src="base/node_modules/three/examples/fonts/helvetiker_regular.typeface.json" ref="f" /><other-component ref="other" /></vgl-namespace>`,
                components: {
                    VglNamespace,
                    VglFont,
                    OtherComponent: {
                        inject: ["vglFonts"],
                        render() {}
                    }
                }
            }).$mount();
            vm.$refs.f.$watch("inst", (inst) => {
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.$refs.other.vglFonts.forGet["'<!--"], inst);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
        it("Should be unregistered when destroyed.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-font name="n<!--" src="base/node_modules/three/examples/fonts/helvetiker_regular.typeface.json" v-if="!destroyed" ref="f" /><other-component ref="other" /></vgl-namespace>`,
                components: {
                    VglFont,
                    VglNamespace,
                    OtherComponent: {
                        inject: ["vglFonts"],
                        render() {}
                    }
                },
                data: {destroyed: false}
            }).$mount();
            vm.$refs.f.$watch("inst", () => {
                vm.$nextTick(() => {
                    vm.destroyed = true;
                    vm.$nextTick(() => {
                        try {
                            assert.isEmpty(vm.$refs.other.vglFonts.forGet);
                            done();
                        } catch(e) {
                            done(e);
                        }
                    });
                });
            });
        });
        it("Should be replaced when the instance is replaced.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-font name="'<!--" :src="src" ref="f" /><other-component ref="other" /></vgl-namespace>`,
                components: {
                    VglNamespace,
                    VglFont,
                    OtherComponent: {
                        inject: ["vglFonts"],
                        render() {}
                    }
                },
                data: {src: "base/node_modules/three/examples/fonts/helvetiker_regular.typeface.json"}
            }).$mount();
            const unwatch = vm.$refs.f.$watch("inst", (before) => {
                unwatch();
                vm.src = "base/node_modules/three/examples/fonts/helvetiker_bold.typeface.json";
                vm.$refs.f.$watch("inst", (after) => {
                    try {
                        assert.notEqual(before, after);
                    } catch(e) {
                        done(e);
                    }
                    vm.$nextTick(() => {
                        try {
                            assert.strictEqual(vm.$refs.other.vglFonts.forGet["'<!--"], after);
                            done();
                        } catch(e) {
                            done(e);
                        }
                    });
                });
            });
        });
    });
    describe("Creating the instance", function() {
        it("The initial instance should be null.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-font src="base/node_modules/three/examples/fonts/helvetiker_regular.typeface.json" ref="f" /></vgl-namespace>`,
                components: {VglNamespace, VglFont}
            }).$mount();
            assert.isNull(vm.$refs.f.inst);
        });
        it("The instance should be loaded from the src property.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-font src="base/node_modules/three/examples/fonts/helvetiker_regular.typeface.json" ref="f" /></vgl-namespace>`,
                components: {VglNamespace, VglFont}
            }).$mount();
            vm.$refs.f.$watch("inst", (inst) => {
                const req = new XMLHttpRequest();
                req.addEventListener("load", () => {
                    try {
                        assert.deepEqual(inst.data, JSON.parse(req.response));
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
                req.open("GET", "base/node_modules/three/examples/fonts/helvetiker_regular.typeface.json");
                req.send();
            });
        });
    });
    describe("Watching properties", function() {
        it("The instance should be replaced when the src property changes.", function(done) {
            const vm = new Vue({
                components: {VglFont, VglNamespace},
                template: `<vgl-namespace><vgl-font :src="src" ref="f" /></vgl-namespace>`,
                data: {src: "base/node_modules/three/examples/fonts/helvetiker_regular.typeface.json"}
            }).$mount();
            const unwatch = vm.$refs.f.$watch("inst", (before) => {
                unwatch();
                vm.src = "base/node_modules/three/examples/fonts/helvetiker_bold.typeface.json";
                vm.$refs.f.$watch("inst", (after) => {
                    try {
                        assert.notEqual(before, after);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
    });
});
