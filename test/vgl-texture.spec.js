describe("VglTexture component", function() {
    const {VglTexture, VglNamespace} = VueGL;
    const assert = chai.assert;
    describe("The instance should be registered to the injected namespace.", function() {
        it("Null should be registered when created.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-texture name="dm'&^>" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" ref="me" /><other-component ref="other" /></vgl-namespace>`,
                components: {
                    VglTexture,
                    VglNamespace,
                    OtherComponent: {
                        inject: ["vglTextures"],
                        render() {}
                    }
                }
            }).$mount();
            assert.isNull(vm.$refs.other.vglTextures.forGet["dm'&^>"]);
        });
        it("Should be replaced when the image is loaded.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-texture name="'<!--" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" ref="tex" /><other-component ref="other" /></vgl-namespace>`,
                components: {
                    VglNamespace,
                    VglTexture,
                    OtherComponent: {
                        inject: ["vglTextures"],
                        render() {}
                    }
                }
            }).$mount();
            vm.$refs.tex.$watch("inst", (inst) => {
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.$refs.other.vglTextures.forGet["'<!--"], inst);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
        it("Should be unregistered when destroyed.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-texture name="n<!--" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" v-if="!destroyed" ref="tex" /><other-component ref="other" /></vgl-namespace>`,
                components: {
                    VglTexture,
                    VglNamespace,
                    OtherComponent: {
                        inject: ["vglTextures"],
                        render() {}
                    }
                },
                data: {destroyed: false}
            }).$mount();
            vm.$refs.tex.$watch("inst", () => {
                vm.$nextTick(() => {
                    vm.destroyed = true;
                    vm.$nextTick(() => {
                        try {
                            assert.isEmpty(vm.$refs.other.vglTextures.forGet);
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
                template: `<vgl-namespace><vgl-texture name="'<!--" :src="src" ref="tex" /><other-component ref="other" /></vgl-namespace>`,
                components: {
                    VglNamespace,
                    VglTexture,
                    OtherComponent: {
                        inject: ["vglTextures"],
                        render() {}
                    }
                },
                data: {src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
            }).$mount();
            const unwatch = vm.$refs.tex.$watch("inst", (before) => {
                unwatch();
                vm.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
                vm.$refs.tex.$watch("inst", (after) => {
                    assert.notEqual(before, after);
                    vm.$nextTick(() => {
                        try {
                            assert.strictEqual(vm.$refs.other.vglTextures.forGet["'<!--"], after);
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
                template: `<vgl-namespace><vgl-texture ref="tex" /></vgl-namespace>`,
                components: {VglNamespace, VglTexture}
            }).$mount();
            assert.isNull(vm.$refs.tex.inst);
        });
        it("The instance should be loaded from the src property.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-texture src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" ref="tex" /></vgl-namespace>`,
                components: {VglNamespace, VglTexture}
            }).$mount();
            vm.$refs.tex.$watch("inst", (inst) => {
                try {
                    assert.strictEqual(inst.image.src, "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
    });
    describe("Watching properties", function() {
        it("The instance should be replaced when the src property changes.", function(done) {
            const vm = new Vue({
                components: {VglTexture, VglNamespace},
                template: `<vgl-namespace><vgl-texture :src="src" ref="tex" /></vgl-namespace>`,
                data: {src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
            }).$mount();
            const unwatch = vm.$refs.tex.$watch("inst", (before) => {
                unwatch();
                vm.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
                vm.$refs.tex.$watch("inst", (after) => {
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
