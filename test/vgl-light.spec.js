import {VglLight} from "../src/index.js";
const assert = chai.assert;

describe("VglLightコンポーネントのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはLightオブジェクト", function() {
            const vm = new Vue(VglLight);
            assert.isTrue(vm.inst.isLight);
        });
    });
    describe("プロパティのテスト", function() {
        describe("colorのテスト", function() {
            it("undefined -> 1, 1, 1", function() {
                const vm = new Vue(VglLight);
                assert.strictEqual(vm.inst.color.r, 1);
                assert.strictEqual(vm.inst.color.g, 1);
                assert.strictEqual(vm.inst.color.b, 1);
            });
            it("#e2e2e2 -> 0.886, 0.886, 0.886", function() {
                const vm = new (Vue.extend(VglLight))({
                    propsData: {color: "#e2e2e2"}
                });
                assert.strictEqual(vm.inst.color.r, 0.8862745098039215);
                assert.strictEqual(vm.inst.color.g, 0.8862745098039215);
                assert.strictEqual(vm.inst.color.b, 0.8862745098039215);
            });
        });
        describe("intensityのテスト", function() {
            it("undefined -> 1", function() {
                const vm = new Vue(VglLight);
                assert.strictEqual(vm.inst.intensity, 1);
            });
            it("0.8 -> 0.8", function() {
                const vm = new (Vue.extend(VglLight))({
                    propsData: {intensity: "0.8"}
                });
                assert.strictEqual(vm.inst.intensity, 0.8);
            });
        });
    });
    describe("プロパティ変更のテスト", function() {
        describe("colorを変更", function() {
            it("undefined -> #e2e2e2", function(done) {
                const vm = new Vue(VglLight);
                assert.strictEqual(vm.inst.color.r, 1);
                assert.strictEqual(vm.inst.color.g, 1);
                assert.strictEqual(vm.inst.color.b, 1);
                vm.color = "#e2e2e2";
                vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.color.r, 0.8862745098039215);
                    assert.strictEqual(vm.inst.color.g, 0.8862745098039215);
                    assert.strictEqual(vm.inst.color.b, 0.8862745098039215);
                    done();
                });
            });
            it("#e2e2e2 -> #000", function(done) {
                const vm = new (Vue.extend(VglLight))({
                    propsData: {color: "#e2e2e2"}
                });
                assert.strictEqual(vm.inst.color.r, 0.8862745098039215);
                assert.strictEqual(vm.inst.color.g, 0.8862745098039215);
                assert.strictEqual(vm.inst.color.b, 0.8862745098039215);
                vm.color = "#000";
                vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.color.r, 0);
                    assert.strictEqual(vm.inst.color.g, 0);
                    assert.strictEqual(vm.inst.color.b, 0);
                    done();
                });
            });
        });
        describe("intensityを変更", function() {
            it("undefined -> 0.8", function(done) {
                const vm = new Vue(VglLight);
                assert.strictEqual(vm.inst.intensity, 1);
                vm.intensity = "0.8'";
                vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.intensity, 0.8);
                    done();
                });
            });
            it("0.6 -> 0.7", function(done) {
                const vm = new (Vue.extend(VglLight))({
                    propsData: {intensity: 0.6}
                });
                assert.strictEqual(vm.inst.intensity, 0.6);
                vm.intensity = "0.7";
                vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.intensity, 0.7);
                    done();
                });
            });
        });
    });
});
