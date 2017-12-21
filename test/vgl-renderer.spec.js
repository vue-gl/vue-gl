/* globals chai THREE Vue VueGL */

describe("VglRenderer component", function() {
    const {VglRenderer, VglNamespace, VglPerspectiveCamera, VglScene} = VueGL;
    const assert = chai.assert;
    before(function() {
        this.WebGLRenderer = THREE.WebGLRenderer;
        THREE.WebGLRenderer = function(options) {
            this.options = options;
            this.shadowMap = {};
        };
        THREE.WebGLRenderer.prototype.setSize = () => {};
    });
    after(function() {
        THREE.WebGLRenderer = this.WebGLRenderer;
    });
    describe("Namespace injection", function() {
        describe("Should be able to access vglCameras", function() {
            it("When the component is the root namespace.", function() {
                const vm = new Vue({
                    template: `<vgl-renderer camera="('&%" ref="rdr"><vgl-perspective-camera name="('&%" ref="cmr" /></vgl-renderer>`,
                    components: {VglRenderer, VglPerspectiveCamera}
                }).$mount();
                assert.strictEqual(vm.$refs.rdr.cmr, vm.$refs.cmr.inst);
            });
            it("When the component is a descendant of the other namespace.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-perspective-camera name="<!--" ref="cmr" /><vgl-renderer camera="<!--" ref="rdr" /></vgl-namespace>`,
                    components: {VglNamespace, VglRenderer, VglPerspectiveCamera}
                }).$mount();
                assert.strictEqual(vm.$refs.rdr.cmr, vm.$refs.cmr.inst);
            });
        });
        describe("Should be able to access vglScenes", function() {
            it("When the component is the root namespace.", function() {
                const vm = new Vue({
                    template: `<vgl-renderer scene="('&%" ref="rdr"><vgl-scene name="('&%" ref="scn" /></vgl-renderer>`,
                    components: {VglRenderer, VglScene}
                }).$mount();
                assert.strictEqual(vm.$refs.rdr.scn, vm.$refs.scn.inst);
            });
            it("When the component is a descendant of the other namespace.", function() {
                const vm = new Vue({
                    template: `<vgl-namespace><vgl-scene name="<!--" ref="scn" /><vgl-renderer scene="<!--" ref="rdr" /></vgl-namespace>`,
                    components: {VglNamespace, VglRenderer, VglScene}
                }).$mount();
                assert.strictEqual(vm.$refs.rdr.scn, vm.$refs.scn.inst);
            });
        });
    });
    describe("Creating a renderer", function() {
        describe("Output canvas", function() {
            it("The domElement property of WebGLRenderer instance should be the Vue created canvas.", function() {
                const vm = new Vue(VglRenderer);
                assert.strictEqual(vm.$refs.rdr, vm.inst.options.canvas);
            });
        });
        describe("Context attributes", function() {
            describe("The alpha property should affect the alpha attribute.", function() {
                it("When the property is undefined (or false).", function() {
                    const vm = new Vue(VglRenderer);
                    assert.isFalse(vm.inst.options.alpha);
                });
                it("When the property is true.", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {alpha: true}}).$mount();
                    assert.isTrue(vm.inst.options.alpha);
                });
            });
            describe("The disableDepth property should affect the depth attribute.", function() {
                it("When the property is undefined (or false).", function() {
                    const vm = new Vue(VglRenderer).$mount();
                    assert.isTrue(vm.inst.options.depth);
                });
                it("When the property is true.", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {disableDepth: true}}).$mount();
                    assert.isFalse(vm.inst.options.depth);
                });
            });
            describe("The disableStencil property should affect the stencil attribute.", function() {
                it("When the property is undefined (or false).", function() {
                    const vm = new Vue(VglRenderer).$mount();
                    assert.isTrue(vm.inst.options.stencil);
                });
                it("When the property is true.", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {disableStencil: true}}).$mount();
                    assert.isFalse(vm.inst.options.stencil);
                });
            });
            describe("The antialias property should affect the antialias attribute.", function() {
                it("When the property is undefined (or false).", function() {
                    const vm = new Vue(VglRenderer).$mount();
                    assert.isFalse(vm.inst.options.antialias);
                });
                it("When the property is true.", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {antialias: true}}).$mount();
                    assert.isTrue(vm.inst.options.antialias);
                });
            });
            describe("The disablePremultipliedAlpha property should affect the premultipliedAlpha attribute.", function() {
                it("When the property is undefined (or false).", function() {
                    const vm = new Vue(VglRenderer).$mount();
                    assert.isTrue(vm.inst.options.premultipliedAlpha);
                });
                it("When the property is true.", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {disablePremultipliedAlpha: true}}).$mount();
                    assert.isFalse(vm.inst.options.premultipliedAlpha);
                });
            });
            describe("The preserveDrawingBuffer property should affect the preserveDrawingBuffer attribute.", function() {
                it("When the property is undefined (or false).", function() {
                    const vm = new Vue(VglRenderer).$mount();
                    assert.isFalse(vm.inst.options.preserveDrawingBuffer);
                });
                it("When the property is true.", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {preserveDrawingBuffer: true}}).$mount();
                    assert.isTrue(vm.inst.options.preserveDrawingBuffer);
                });
            });
        });
        describe("Capabilities", function() {
            describe("The logarithmicDepthBuffer property should affect the logarithmicDepthBuffer capability.", function() {
                it("When the property is undefined (or false).", function() {
                    const vm = new Vue(VglRenderer).$mount();
                    assert.isFalse(vm.inst.options.logarithmicDepthBuffer);
                });
                it("When the property is true.", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {logarithmicDepthBuffer: true}}).$mount();
                    assert.isTrue(vm.inst.options.logarithmicDepthBuffer);
                });
            });
            describe("The precision property should affect the precision capability.", function() {
                it("When the property is undefined (or false).", function() {
                    const vm = new Vue(VglRenderer).$mount();
                    assert.isUndefined(vm.inst.options.precision);
                });
                it("When the property is \"lowp\".", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {precision: "lowp"}}).$mount();
                    assert.strictEqual(vm.inst.options.precision, "lowp");
                });
                it("When the property is \"mediump\".", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {precision: "mediump"}}).$mount();
                    assert.strictEqual(vm.inst.options.precision, "mediump");
                });
                it("When the property is \"highp\".", function() {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {precision: "highp"}}).$mount();
                    assert.strictEqual(vm.inst.options.precision, "highp");
                });
            });
        });
        describe("Properties", function() {
            describe("The shadowMapEnabled property should affect the shadowMap.enabled.", function() {
                it("When the property is false.", function(done) {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {shadowMapEnabled: false}}).$mount();
                    vm.init();
                    vm.$nextTick(() => {
                        try {
                            assert.isFalse(vm.inst.shadowMap.enabled);
                            done();
                        } catch(e) {
                            done(e);
                        }
                    });
                });
                it("When the property is true.", function(done) {
                    const vm = new (Vue.extend(VglRenderer))({propsData: {shadowMapEnabled: true}}).$mount();
                    vm.init();
                    vm.$nextTick(() => {
                        try {
                            assert.isTrue(vm.inst.shadowMap.enabled);
                            done();
                        } catch(e) {
                            done(e);
                        }
                    });
                });
            });
        });
    });
    describe("When an initial property changes", function() {
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
                        assert.strictEqual(vm.inst.options.canvas, vm.$refs.rdr);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
    });
    describe("When another property changes", function() {
        describe("The shadowMapEnabled should affect the shadowMap.enabled.", function() {
            it("From false to true.", function(done) {
                const vm = new Vue(VglRenderer).$mount();
                vm.shadowMapEnabled = true;
                vm.$nextTick(() => {
                    try {
                        assert.isTrue(vm.inst.shadowMap.enabled);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
    });
});
