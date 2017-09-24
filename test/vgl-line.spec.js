const {VglLine, VglGeometry, VglMaterial, VglAssets} = VueGL;
const assert = chai.assert;

describe("VglLineのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはLineオブジェクト", function() {
            const vm = new Vue(VglLine);
            assert.isTrue(vm.inst.isLine);
        });
    });
    describe("プロパティのテスト", function() {
        describe("geometryのテスト", function() {
            it("同じ階層のgeometry", function() {
                const vm = new Vue({
                    template: `<vgl-assets><vgl-geometry name="u!$ok" ref="g" /><vgl-geometry name="xo" /><vgl-line geometry="u!$ok" ref="m" /></vgl-assets>`,
                    components: {
                        VglLine,
                        VglGeometry,
                        VglAssets
                    }
                }).$mount();
                assert.equal(vm.$refs.m.inst.geometry, vm.$refs.g.inst);
            });
            it("上層のgeometry", function() {
                const vm = new Vue({
                    template: `<vgl-assets><vgl-geometry name="u!$ok" ref="g" /><vgl-assets><vgl-line geometry="u!$ok" ref="m" /></vgl-assets></vgl-assets>`,
                    components: {
                        VglLine,
                        VglGeometry,
                        VglAssets
                    }
                }).$mount();
                assert.equal(vm.$refs.m.inst.geometry, vm.$refs.g.inst);
            });
            it("スコープ外のgeometry", function() {
                const vm = new Vue({
                    template: `<vgl-assets><vgl-assets><vgl-geometry name="u'$ok" ref="g" /></vgl-assets><vgl-line geometry="u'$ok" ref="m" /></vgl-assets>`,
                    components: {
                        VglLine,
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
                    template: `<vgl-assets><vgl-material name="u!$ok" ref="g" /><vgl-material name="xo" /><vgl-line material="u!$ok" ref="m" /></vgl-assets>`,
                    components: {
                        VglLine,
                        VglMaterial,
                        VglAssets
                    }
                }).$mount();
                assert.equal(vm.$refs.m.inst.material, vm.$refs.g.inst);
            });
            it("上層のmaterial", function() {
                const vm = new Vue({
                    template: `<vgl-assets><vgl-material name="u!$ok" ref="g" /><vgl-assets><vgl-line material="u!$ok" ref="m" /></vgl-assets></vgl-assets>`,
                    components: {
                        VglLine,
                        VglMaterial,
                        VglAssets
                    }
                }).$mount();
                assert.equal(vm.$refs.m.inst.material, vm.$refs.g.inst);
            });
            it("スコープ外のmaterial", function() {
                const vm = new Vue({
                    template: `<vgl-assets><vgl-assets><vgl-material name="u'$ok" ref="g" /></vgl-assets><vgl-line material="u'$ok" ref="m" /></vgl-assets>`,
                    components: {
                        VglLine,
                        VglMaterial,
                        VglAssets
                    }
                }).$mount();
                assert.notEqual(vm.$refs.m.inst.material, vm.$refs.g.inst);
            });
        });
    });
});
