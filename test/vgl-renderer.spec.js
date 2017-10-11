describe("VglRenderer component", function() {
    const {VglRenderer, VglNamespace} = VueGL;
    const assert = chai.assert;
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


/*
import {renderer, scene, camera, geometry, bufferGeometry, bufferAttribute, material} from "../src";
import assert from "assert";
import Vue from "vue";
import {WebGLRenderer} from "three";

function detectWebGLContext() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return context && context instanceof WebGLRenderingContext;
}

describe("rendererコンポーネントのテスト", function() {
    describe("rendererの描画対象(domElement)はVueが生成したcanvas。", function() {
        it("単体の場合。", function() {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue(renderer);
            vm.$mount();
            assert.equal(vm.instance.domElement, vm.$refs.renderer);
        });
        it("sceneを子に持つ場合。", function() {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr"><scene /></renderer>`,
                components: {
                    renderer,
                    scene
                }
            });
            vm.$mount();
            assert.equal(vm.$refs.rdr.instance.domElement, vm.$refs.rdr.$refs.renderer);
        });
        it("cameraを子に持つ場合。", function() {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr"><camera /></renderer>`,
                components: {
                    renderer,
                    camera
                }
            });
            vm.$mount();
            assert.equal(vm.$refs.rdr.instance.domElement, vm.$refs.rdr.$refs.renderer);
        });
        it("geometryを子に持つ場合。", function() {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr"><geometry /></renderer>`,
                components: {
                    renderer,
                    geometry
                }
            });
            vm.$mount();
            assert.equal(vm.$refs.rdr.instance.domElement, vm.$refs.rdr.$refs.renderer);
        });
        it("bufferGeometryを子に持つ場合。", function() {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr"><bufferGeometry /></renderer>`,
                components: {
                    renderer,
                    bufferGeometry
                }
            });
            vm.$mount();
            assert.equal(vm.$refs.rdr.instance.domElement, vm.$refs.rdr.$refs.renderer);
        });
        it("bufferAttributeを子に持つ場合。", function() {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr"><bufferAttribute /></renderer>`,
                components: {
                    renderer,
                    bufferAttribute
                }
            });
            vm.$mount();
            assert.equal(vm.$refs.rdr.instance.domElement, vm.$refs.rdr.$refs.renderer);
        });
        it("materialを子に持つ場合。", function() {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr"><material /></renderer>`,
                components: {
                    renderer,
                    material
                }
            });
            vm.$mount();
            assert.equal(vm.$refs.rdr.instance.domElement, vm.$refs.rdr.$refs.renderer);
        });
    });
    describe("rendererオプションを変更すると、canvasエレメントが置換される。", function() {
        it("単体の場合。", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue(renderer);
            vm.$mount();
            const initCanvas = vm.$refs.renderer;
            vm.antialias = true;
            Vue.nextTick(() => {
                assert.equal(vm.$refs.renderer.tagName, "CANVAS");
                assert.notEqual(vm.$refs.renderer, initCanvas);
                done();
            });
        });
        it("sceneを子に持つ場合。", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer :antialias="a" ref="rdr"><scene /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    scene
                }
            });
            vm.$mount();
            const initCanvas = vm.$refs.rdr.$refs.renderer;
            vm.a = true;
            Vue.nextTick(() => {
                assert.equal(vm.$refs.rdr.$refs.renderer.tagName, "CANVAS");
                assert.notEqual(vm.$refs.rdr.$refs.renderer, initCanvas);
                done();
            });
        });
        it("cameraを子に持つ場合。", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer :antialias="a" ref="rdr"><camera /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    camera
                }
            });
            vm.$mount();
            const initCanvas = vm.$refs.rdr.$refs.renderer;
            vm.a = true;
            Vue.nextTick(() => {
                assert.equal(vm.$refs.rdr.$refs.renderer.tagName, "CANVAS");
                assert.notEqual(vm.$refs.rdr.$refs.renderer, initCanvas);
                done();
            });
        });
        it("geometryを子に持つ場合。", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer :antialias="a" ref="rdr"><geometry /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    geometry
                }
            });
            vm.$mount();
            const initCanvas = vm.$refs.rdr.$refs.renderer;
            vm.a = true;
            Vue.nextTick(() => {
                assert.equal(vm.$refs.rdr.$refs.renderer.tagName, "CANVAS");
                assert.notEqual(vm.$refs.rdr.$refs.renderer, initCanvas);
                done();
            });
        });
        it("bufferGeometryを子に持つ場合。", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer :antialias="a" ref="rdr"><bufferGeometry /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    bufferGeometry
                }
            });
            vm.$mount();
            const initCanvas = vm.$refs.rdr.$refs.renderer;
            vm.a = true;
            Vue.nextTick(() => {
                assert.equal(vm.$refs.rdr.$refs.renderer.tagName, "CANVAS");
                assert.notEqual(vm.$refs.rdr.$refs.renderer, initCanvas);
                done();
            });
        });
        it("bufferAttributeを子に持つ場合。", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer :antialias="a" ref="rdr"><bufferAttribute /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    bufferAttribute
                }
            });
            vm.$mount();
            const initCanvas = vm.$refs.rdr.$refs.renderer;
            vm.a = true;
            Vue.nextTick(() => {
                assert.equal(vm.$refs.rdr.$refs.renderer.tagName, "CANVAS");
                assert.notEqual(vm.$refs.rdr.$refs.renderer, initCanvas);
                done();
            });
        });
        it("materialを子に持つ場合。", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer :antialias="a" ref="rdr"><material /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    material
                }
            });
            vm.$mount();
            const initCanvas = vm.$refs.rdr.$refs.renderer;
            vm.a = true;
            Vue.nextTick(() => {
                assert.equal(vm.$refs.rdr.$refs.renderer.tagName, "CANVAS");
                assert.notEqual(vm.$refs.rdr.$refs.renderer, initCanvas);
                done();
            });
        });
    });
    it("rendererオプションを変更すると、rendererが再生成される。", function() {
        it("単体の場合。", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue(renderer);
            vm.$mount();
            const initRenderer = vm.instance;
            vm.antialias = true;
            Vue.nextTick(() => {
                assert(vm.instance instanceof WebGLRenderer);
                assert.notEqual(vm.instance, initRenderer);
                done();
            });
        });
        it("sceneを子に持つ場合。", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr" :antialias="a"><scene /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    scene
                }
            });
            vm.$mount();
            const initRenderer = vm.$refs.rdr.instance;
            vm.a = true;
            Vue.nextTick(() => {
                assert(vm.$refs.rdr.instance instanceof WebGLRenderer);
                assert.notEqual(vm.$refs.rdr.instance, initRenderer);
                done();
            });
        });
        it("cameraを子に持つ場合。", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr" :antialias="a"><camera /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    camera
                }
            });
            vm.$mount();
            const initRenderer = vm.$refs.rdr.instance;
            vm.a = true;
            Vue.nextTick(() => {
                assert(vm.$refs.rdr.instance instanceof WebGLRenderer);
                assert.notEqual(vm.$refs.rdr.instance, initRenderer);
                done();
            });
        });
        it("geometryを子に持つ場合。", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr" :antialias="a"><geometry /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    geometry
                }
            });
            vm.$mount();
            const initRenderer = vm.$refs.rdr.instance;
            vm.a = true;
            Vue.nextTick(() => {
                assert(vm.$refs.rdr.instance instanceof WebGLRenderer);
                assert.notEqual(vm.$refs.rdr.instance, initRenderer);
                done();
            });
        });
        it("bufferGeometryを子に持つ場合。", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr" :antialias="a"><bufferGeometry /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    bufferGeometry
                }
            });
            vm.$mount();
            const initRenderer = vm.$refs.rdr.instance;
            vm.a = true;
            Vue.nextTick(() => {
                assert(vm.$refs.rdr.instance instanceof WebGLRenderer);
                assert.notEqual(vm.$refs.rdr.instance, initRenderer);
                done();
            });
        });
        it("bufferAttributeを子に持つ場合。", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr" :antialias="a"><bufferAttribute /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    bufferAttribute
                }
            });
            vm.$mount();
            const initRenderer = vm.$refs.rdr.instance;
            vm.a = true;
            Vue.nextTick(() => {
                assert(vm.$refs.rdr.instance instanceof WebGLRenderer);
                assert.notEqual(vm.$refs.rdr.instance, initRenderer);
                done();
            });
        });
        it("materialを子に持つ場合。", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr" :antialias="a"><material /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    material
                }
            });
            vm.$mount();
            const initRenderer = vm.$refs.rdr.instance;
            vm.a = true;
            Vue.nextTick(() => {
                assert(vm.$refs.rdr.instance instanceof WebGLRenderer);
                assert.notEqual(vm.$refs.rdr.instance, initRenderer);
                done();
            });
        });
    });
    describe("再生成されたrendererの描画対象(domElement)は、新しいcanvas要素。", function() {
        it("単体の場合", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue(renderer);
            vm.$mount();
            vm.antialias = true;
            Vue.nextTick(() => {
                assert.equal(vm.instance.domElement, vm.$refs.renderer);
                done();
            });
        });
        it("sceneの場合", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr" :antialias="a"><scene /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    scene
                }
            });
            vm.$mount();
            vm.a = true;
            Vue.nextTick(() => {
                assert.equal(vm.$refs.rdr.instance.domElement, vm.$refs.rdr.$refs.renderer);
                done();
            });
        });
        it("cameraの場合", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr" :antialias="a"><camera /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    camera
                }
            });
            vm.$mount();
            vm.a = true;
            Vue.nextTick(() => {
                assert.equal(vm.$refs.rdr.instance.domElement, vm.$refs.rdr.$refs.renderer);
                done();
            });
        });
        it("geometryの場合", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr" :antialias="a"><geometry /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    geometry
                }
            });
            vm.$mount();
            vm.a = true;
            Vue.nextTick(() => {
                assert.equal(vm.$refs.rdr.instance.domElement, vm.$refs.rdr.$refs.renderer);
                done();
            });
        });
        it("bufferGeometryの場合", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr" :antialias="a"><bufferGeometry /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    bufferGeometry
                }
            });
            vm.$mount();
            vm.a = true;
            Vue.nextTick(() => {
                assert.equal(vm.$refs.rdr.instance.domElement, vm.$refs.rdr.$refs.renderer);
                done();
            });
        });
        it("bufferAttributeの場合", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr" :antialias="a"><bufferAttribute /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    bufferAttribute
                }
            });
            vm.$mount();
            vm.a = true;
            Vue.nextTick(() => {
                assert.equal(vm.$refs.rdr.instance.domElement, vm.$refs.rdr.$refs.renderer);
                done();
            });
        });
        it("materialの場合", function(done) {
            if (!detectWebGLContext()) {
                console.log("WebGL is not supported. Skip testing.");
                this.skip();
            }
            const vm = new Vue({
                template: `<renderer ref="rdr" :antialias="a"><material /></renderer>`,
                data: {
                    a: false
                },
                components: {
                    renderer,
                    material
                }
            });
            vm.$mount();
            vm.a = true;
            Vue.nextTick(() => {
                assert.equal(vm.$refs.rdr.instance.domElement, vm.$refs.rdr.$refs.renderer);
                done();
            });
        });
    });
});
*/