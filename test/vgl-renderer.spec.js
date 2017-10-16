describe("VglRenderer component", function() {
    const {VglRenderer, VglNamespace} = VueGL;
    const assert = chai.assert;
    const webgl = (() => {
        const canvas = document.createElement("canvas");
        let gl = null;
        try {
            gl = canvas.getContext("webgl");
        } catch(e) {
            gl = null;
            try {
                gl = canvas.getContext("experimental-webgl");
            } catch(e) {
                gl = null;
            }
        }
        return gl;
    })();
    beforeEach(function() {
        if (!webgl) {
            this.skip();
        }
    });
    describe("Namespace injection", function() {
        describe("Should be able to access vglCameras", function() {
            it("When the component is the root namespace.", function() {
                const vm = new Vue(VglRenderer);
                assert.isObject(vm.vglCameras);
            });
            it("When the component is a descendant of the other namespace.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-renderer ref="renderer" /></vgl-namespace>`,
                    components: {
                        VglNamespace,
                        VglRenderer
                    }
                }).$mount();
                assert.isObject(vm.$refs.renderer.vglCameras);
            });
        });
        describe("Should be able to access vglScenes", function() {
            it("When the component is the root namespace.", function() {
                const vm = new Vue(VglRenderer);
                assert.isObject(vm.vglScenes);
            });
            it("When the component is a descendant of the other namespace.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-renderer ref="renderer" /></vgl-namespace>`,
                    components: {
                        VglNamespace,
                        VglRenderer
                    }
                }).$mount();
                assert.isObject(vm.$refs.renderer.vglScenes);
            });
        });
    });
    describe("Creating a renderer", function() {
        describe("Output canvas", function() {
            it("The domElement property of WebGLRenderer instance should be the Vue created canvas.", function() {
                const vm = new Vue(VglRenderer).$mount();
                assert.strictEqual(vm.$refs.rdr, vm.inst.domElement);
            });
        });
        describe("Context attributes", function() {
            describe("The alpha property should affect the alpha attribute.", function() {
                it("When the property is undefined (or false).", function() {
                    const vm = new Vue(VglRenderer).$mount();
                    assert.isFalse(vm.inst.getContextAttributes().alpha);
                });
                it("When the property is true.", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {alpha: true}}).$mount();
                    assert.isTrue(vm.inst.getContextAttributes().alpha);
                });
            });
            describe("The disableDepth property should affect the depth attribute.", function() {
                it("When the property is undefined (or false).", function() {
                    const vm = new Vue(VglRenderer).$mount();
                    assert.isTrue(vm.inst.getContextAttributes().depth);
                });
                it("When the property is true.", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {disableDepth: true}}).$mount();
                    assert.isFalse(vm.inst.getContextAttributes().depth);
                });
            });
            describe("The disableStencil property should affect the stencil attribute.", function() {
                it("When the property is undefined (or false).", function() {
                    const vm = new Vue(VglRenderer).$mount();
                    assert.isTrue(vm.inst.getContextAttributes().stencil);
                });
                it("When the property is true.", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {disableStencil: true}}).$mount();
                    assert.isFalse(vm.inst.getContextAttributes().stencil);
                });
            });
            describe("The antialias property should affect the antialias attribute.", function() {
                it("When the property is undefined (or false).", function() {
                    const vm = new Vue(VglRenderer).$mount();
                    assert.isFalse(vm.inst.getContextAttributes().antialias);
                });
                it("When the property is true.", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {antialias: true}}).$mount();
                    assert.isTrue(vm.inst.getContextAttributes().antialias);
                });
            });
            describe("The disablePremultipliedAlpha property should affect the premultipliedAlpha attribute.", function() {
                it("When the property is undefined (or false).", function() {
                    const vm = new Vue(VglRenderer).$mount();
                    assert.isTrue(vm.inst.getContextAttributes().premultipliedAlpha);
                });
                it("When the property is true.", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {disablePremultipliedAlpha: true}}).$mount();
                    assert.isFalse(vm.inst.getContextAttributes().premultipliedAlpha);
                });
            });
            describe("The preserveDrawingBuffer property should affect the preserveDrawingBuffer attribute.", function() {
                it("When the property is undefined (or false).", function() {
                    const vm = new Vue(VglRenderer).$mount();
                    assert.isFalse(vm.inst.getContextAttributes().preserveDrawingBuffer);
                });
                it("When the property is true.", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {preserveDrawingBuffer: true}}).$mount();
                    assert.isTrue(vm.inst.getContextAttributes().preserveDrawingBuffer);
                });
            });
        });
        describe("Capabilities", function() {
            describe("The logarithmicDepthBuffer property should affect the logarithmicDepthBuffer capability.", function() {
                it("When the property is undefined (or false).", function() {
                    const vm = new Vue(VglRenderer).$mount();
                    assert.isFalse(vm.inst.capabilities.logarithmicDepthBuffer);
                });
                it("When the property is true.", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {logarithmicDepthBuffer: true}}).$mount();
                    assert.isTrue(vm.inst.capabilities.logarithmicDepthBuffer);
                });
            });
            describe("The precision property should affect the precision capability.", function() {
                it("When the property is undefined (or false).", function() {
                    const vm = new Vue(VglRenderer).$mount();
                    assert.strictEqual(vm.inst.capabilities.precision, "highp");
                });
                it("When the property is \"lowp\".", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {precision: "lowp"}}).$mount();
                    assert.strictEqual(vm.inst.capabilities.precision, "lowp");
                });
                it("When the property is \"mediump\".", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {precision: "mediump"}}).$mount();
                    assert.strictEqual(vm.inst.capabilities.precision, "mediump");
                });
                it("When the property is \"highp\".", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {precision: "highp"}}).$mount();
                    assert.strictEqual(vm.inst.capabilities.precision, "highp");
                });
            });
        });
    });
    describe("When any properties are changed", function() {
        describe("Output canvas", function() {
            it("The canvas element should be replaced.", function(done) {
                const vm = new Vue(VglRenderer).$mount();
                const oldCanvas = vm.$refs.rdr;
                vm.alpha = true;
                vm.$nextTick(() => {
                    try {
                        assert.notEqual(oldCanvas, vm.$refs.rdr);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
            it("The WebGLRenderer instance should be newly created.", function(done) {
                const vm = new Vue(VglRenderer).$mount();
                const oldInst = vm.inst;
                vm.alpha = true;
                vm.$nextTick(() => {
                    try {
                        assert.notEqual(oldInst, vm.inst);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
            it("The domElement property of WebGLRenderer instance should be the replaced canvas.", function(done) {
                const vm = new Vue(VglRenderer).$mount();
                vm.alpha = true;
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.inst.domElement, vm.$refs.rdr);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
    });
});
