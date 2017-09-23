import VglPoints from "../src/vgl-points.js";
import VglGeometry from "../src/vgl-geometry.js";
import VglMaterial from "../src/vgl-material.js";
import VglAssets from "../src/vgl-assets.js";
const assert = chai.assert;

describe("VglPointsのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはPointsオブジェクト", function() {
            const vm = new Vue(VglPoints);
            assert.isTrue(vm.inst.isPoints);
        });
    });
    describe("プロパティのテスト", function() {
        describe("geometryのテスト", function() {
            it("同じ階層のgeometry", function() {
                const vm = new Vue({
                    template: `<vgl-assets><vgl-geometry name="u!$ok" ref="g" /><vgl-geometry name="xo" /><vgl-points geometry="u!$ok" ref="m" /></vgl-assets>`,
                    components: {
                        VglPoints,
                        VglGeometry,
                        VglAssets
                    }
                }).$mount();
                assert.equal(vm.$refs.m.inst.geometry, vm.$refs.g.inst);
            });
            it("上層のgeometry", function() {
                const vm = new Vue({
                    template: `<vgl-assets><vgl-geometry name="u!$ok" ref="g" /><vgl-assets><vgl-points geometry="u!$ok" ref="m" /></vgl-assets></vgl-assets>`,
                    components: {
                        VglPoints,
                        VglGeometry,
                        VglAssets
                    }
                }).$mount();
                assert.equal(vm.$refs.m.inst.geometry, vm.$refs.g.inst);
            });
            it("スコープ外のgeometry", function() {
                const vm = new Vue({
                    template: `<vgl-assets><vgl-assets><vgl-geometry name="u'$ok" ref="g" /></vgl-assets><vgl-points geometry="u'$ok" ref="m" /></vgl-assets>`,
                    components: {
                        VglPoints,
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
                    template: `<vgl-assets><vgl-material name="u!$ok" ref="g" /><vgl-material name="xo" /><vgl-points material="u!$ok" ref="m" /></vgl-assets>`,
                    components: {
                        VglPoints,
                        VglMaterial,
                        VglAssets
                    }
                }).$mount();
                assert.equal(vm.$refs.m.inst.material, vm.$refs.g.inst);
            });
            it("上層のmaterial", function() {
                const vm = new Vue({
                    template: `<vgl-assets><vgl-material name="u!$ok" ref="g" /><vgl-assets><vgl-points material="u!$ok" ref="m" /></vgl-assets></vgl-assets>`,
                    components: {
                        VglPoints,
                        VglMaterial,
                        VglAssets
                    }
                }).$mount();
                assert.equal(vm.$refs.m.inst.material, vm.$refs.g.inst);
            });
            it("スコープ外のmaterial", function() {
                const vm = new Vue({
                    template: `<vgl-assets><vgl-assets><vgl-material name="u'$ok" ref="g" /></vgl-assets><vgl-points material="u'$ok" ref="m" /></vgl-assets>`,
                    components: {
                        VglPoints,
                        VglMaterial,
                        VglAssets
                    }
                }).$mount();
                assert.notEqual(vm.$refs.m.inst.material, vm.$refs.g.inst);
            });
        });
    });
});
