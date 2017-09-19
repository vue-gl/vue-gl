import {VglLineBasicMaterial} from "../src/index.js";
const assert = chai.assert;

describe("VglLineBasicMaterialコンポーネントのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはLineBasicMaterialオブジェクト", function() {
            const vm = new Vue(VglLineBasicMaterial);
            assert.isTrue(vm.inst.isLineBasicMaterial);
        });
    });
    describe("プロパティのテスト", function() {
        describe("colorのテスト", function() {
            it("undefined -> 1, 1, 1", function() {
                const vm = new Vue(VglLineBasicMaterial);
                assert.strictEqual(vm.inst.color.r, 1);
                assert.strictEqual(vm.inst.color.g, 1);
                assert.strictEqual(vm.inst.color.b, 1);
            });
            it("#e2e2e2 -> 0.886, 0.886, 0.886", function() {
                const vm = new (Vue.extend(VglLineBasicMaterial))({
                    propsData: {color: "#e2e2e2"}
                });
                assert.strictEqual(vm.inst.color.r, 0.8862745098039215);
                assert.strictEqual(vm.inst.color.g, 0.8862745098039215);
                assert.strictEqual(vm.inst.color.b, 0.8862745098039215);
            });
        });
        describe("lightsのテスト", function() {
            it("undefined -> false", function() {
                const vm = new Vue(VglLineBasicMaterial);
                assert.isFalse(vm.inst.lights);
            });
            it("true -> true", function() {
                const vm = new (Vue.extend(VglLineBasicMaterial))({
                    propsData: {lights: true}
                });
                assert.isTrue(vm.inst.lights);
            });
        });
    });
    describe("プロパティ変更のテスト", function() {
        describe("colorの変更", function() {
            it("undefined -> #000", function() {
                const vm = new Vue(VglLineBasicMaterial);
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
                const vm = new (Vue.extend(VglLineBasicMaterial))({
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
        describe("lightsの変更", function() {
            it("undefined -> true", function() {
                const vm = new Vue(VglLineBasicMaterial);
                assert.isFalse(vm.inst.lights);
                vm.lights = true;
                vm.$nextTick(() => {
                    assert.isTrue(vm.inst.lights);
                });
            });
            it("true -> false", function() {
                const vm = new (Vue.extend(VglLineBasicMaterial))({
                    propsData: {lights: true}
                });
                assert.isTrue(vm.inst.lights);
                vm.lights = false;
                vm.$nextTick(() => {
                    assert.isFalse(vm.inst.lights);
                });
            });
        });
    });
});
