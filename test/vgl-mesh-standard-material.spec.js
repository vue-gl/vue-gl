import {VglMeshStandardMaterial} from "../src/index.js";
const assert = chai.assert;

describe("VglMeshStandardMaterialコンポーネントのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはMeshStandardMaterialオブジェクト", function() {
            const vm = new Vue(VglMeshStandardMaterial);
            assert.isTrue(vm.inst.isMeshStandardMaterial);
        });
    });
    describe("プロパティのテスト", function() {
        describe("colorのテスト", function() {
            it("undefined -> 1, 1, 1", function() {
                const vm = new Vue(VglMeshStandardMaterial);
                assert.strictEqual(vm.inst.color.r, 1);
                assert.strictEqual(vm.inst.color.g, 1);
                assert.strictEqual(vm.inst.color.b, 1);
            });
            it("#e2e2e2 -> 0.886, 0.886, 0.886", function() {
                const vm = new (Vue.extend(VglMeshStandardMaterial))({
                    propsData: {color: "#e2e2e2"}
                });
                assert.strictEqual(vm.inst.color.r, 0.8862745098039215);
                assert.strictEqual(vm.inst.color.g, 0.8862745098039215);
                assert.strictEqual(vm.inst.color.b, 0.8862745098039215);
            });
        });
    });
    describe("プロパティ変更のテスト", function() {
        describe("colorの変更", function() {
            it("undefined -> #000", function() {
                const vm = new Vue(VglMeshStandardMaterial);
                assert.strictEqual(vm.inst.color.r, 1);
                assert.strictEqual(vm.inst.color.g, 1);
                assert.strictEqual(vm.inst.color.b, 1);
                vm.color = "#000";
                vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.color.r, 0);
                    assert.strictEqual(vm.inst.color.g, 0);
                    assert.strictEqual(vm.inst.color.b, 0);
                });
            });
            it("#000000 -> #e2e2e2", function() {
                const vm = new (Vue.extend(VglMeshStandardMaterial))({
                    propsData: {color: "#000000"}
                });
                assert.strictEqual(vm.inst.color.r, 0);
                assert.strictEqual(vm.inst.color.g, 0);
                assert.strictEqual(vm.inst.color.b, 0);
                vm.color = "#e2e2e2";
                vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.color.r, 0.8862745098039215);
                    assert.strictEqual(vm.inst.color.g, 0.8862745098039215);
                    assert.strictEqual(vm.inst.color.b, 0.8862745098039215);
                });
            });
        });
    });
});
