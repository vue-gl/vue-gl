import {VglMesh, VglGeometry, VglMaterial, VglAssets} from "../src/index.js";
const assert = chai.assert;

describe("VglMeshのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはMeshオブジェクト", function() {
            const vm = new Vue(VglMesh);
            assert.isTrue(vm.inst.isMesh);
        });
    });
    describe("プロパティのテスト", function() {
        describe("geometryのテスト", function() {
            it("同じ階層のgeometry", function() {
                const vm = new Vue({
                    template: `<vgl-assets><vgl-geometry name="u!$ok" ref="g" /><vgl-geometry name="xo" /><vgl-mesh geometry="u!$ok" ref="m" /></vgl-assets>`,
                    components: {
                        VglMesh,
                        VglGeometry,
                        VglAssets
                    }
                }).$mount();
                assert.equal(vm.$refs.m.inst.geometry, vm.$refs.g.inst);
            });
            it("上層のgeometry", function() {
                const vm = new Vue({
                    template: `<vgl-assets><vgl-geometry name="u!$ok" ref="g" /><vgl-assets><vgl-mesh geometry="u!$ok" ref="m" /></vgl-assets></vgl-assets>`,
                    components: {
                        VglMesh,
                        VglGeometry,
                        VglAssets
                    }
                }).$mount();
                assert.equal(vm.$refs.m.inst.geometry, vm.$refs.g.inst);
            });
            it("スコープ外のgeometry", function() {
                const vm = new Vue({
                    template: `<vgl-assets><vgl-assets><vgl-geometry name="u'$ok" ref="g" /></vgl-assets><vgl-mesh geometry="u'$ok" ref="m" /></vgl-assets>`,
                    components: {
                        VglMesh,
                        VglGeometry,
                        VglAssets
                    }
                }).$mount();
                assert.notEqual(vm.$refs.m.inst.geometry, vm.$refs.g.inst);
            });
        });
        describe("materialのテスト", function() {
            it("同じ階層のmaterial", function() {
                const vm = new Vue({
                    template: `<vgl-assets><vgl-material name="u!$ok" ref="g" /><vgl-material name="xo" /><vgl-mesh material="u!$ok" ref="m" /></vgl-assets>`,
                    components: {
                        VglMesh,
                        VglMaterial,
                        VglAssets
                    }
                }).$mount();
                assert.equal(vm.$refs.m.inst.material, vm.$refs.g.inst);
            });
            it("上層のmaterial", function() {
                const vm = new Vue({
                    template: `<vgl-assets><vgl-material name="u!$ok" ref="g" /><vgl-assets><vgl-mesh material="u!$ok" ref="m" /></vgl-assets></vgl-assets>`,
                    components: {
                        VglMesh,
                        VglMaterial,
                        VglAssets
                    }
                }).$mount();
                assert.equal(vm.$refs.m.inst.material, vm.$refs.g.inst);
            });
            it("スコープ外のmaterial", function() {
                const vm = new Vue({
                    template: `<vgl-assets><vgl-assets><vgl-material name="u'$ok" ref="g" /></vgl-assets><vgl-mesh material="u'$ok" ref="m" /></vgl-assets>`,
                    components: {
                        VglMesh,
                        VglMaterial,
                        VglAssets
                    }
                }).$mount();
                assert.notEqual(vm.$refs.m.inst.material, vm.$refs.g.inst);
            });
        });
    });
});
