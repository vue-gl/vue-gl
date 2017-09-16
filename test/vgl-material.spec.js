import {VglMaterial, VglAssets} from "../src/index.js";
import {LineBasicMaterial, MeshBasicMaterial} from "../src/three.js";
const assert = chai.assert;

describe("VglMaterialコンポーネントのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはMaterialオブジェクト", function() {
            const vm = new Vue(VglMaterial);
            assert.isTrue(vm.inst.isMaterial);
        });
    });
    describe("assetsへの登録", function() {
        it("マウントすると、親assetsのmaterialsに登録される", function() {
            const vm = new Vue({
                template: `<vgl-assets ref="p"><vgl-material name="dm'&^>" ref="c" /></vgl-assets>`,
                components: {
                    VglMaterial,
                    VglAssets
                }
            }).$mount();
            assert.equal(vm.$refs.p.assets.materials["dm'&^>"], vm.$refs.c.inst);
        });
        it("コンポーネントが破棄されると、親assetsのmaterialsから削除される", function(done) {
            const vm = new Vue({
                template: `<vgl-assets ref="p"><vgl-material name="n<!--" ref="c" v-if="a" /><vgl-assets /></vgl-assets>`,
                components: {
                    VglMaterial,
                    VglAssets
                },
                data: {a: true}
            }).$mount();
            assert.equal(vm.$refs.p.assets.materials["n<!--"], vm.$refs.c.inst);
            vm.a = false;
            vm.$nextTick(() => {
                assert.isUndefined(vm.$refs.p.assets.materials["n<!--"]);
                assert.isEmpty(Object.keys(vm.$refs.p.assets.materials));
                done();
            });
        });
        it("インスタンスを置換すると、親assetsのmaterialsも置換される", function(done) {
            const vm = new Vue({
                template: `<vgl-assets ref="p"><ex name="'<!--" ref="c" :b="a" /></vgl-assets>`,
                components: {
                    ex: {
                        mixins: [VglMaterial],
                        computed: {
                            inst() {
                                return this.b ? new LineBasicMaterial(): new MeshBasicMaterial();
                            }
                        },
                        props: ["b"]
                    },
                    VglAssets
                },
                data: {a: true}
            }).$mount();
            const firstInstance = vm.$refs.c.inst;
            assert.equal(vm.$refs.p.assets.materials["'<!--"], firstInstance);
            vm.a = false;
            vm.$nextTick(() => {
                const secondInstance = vm.$refs.c.inst;
                assert.notEqual(firstInstance, secondInstance);
                assert.equal(vm.$refs.p.assets.materials["'<!--"], secondInstance);
                done();
            });
        });
    });
});
