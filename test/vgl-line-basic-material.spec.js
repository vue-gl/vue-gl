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
        describe("linewidthのテスト", function() {
            it("undefined -> 1", function() {
                const vm = new Vue(VglLineBasicMaterial);
                assert.strictEqual(vm.inst.linewidth, 1);
            });
            it("\"2.1\" -> 2.1", function() {
                const vm = new (Vue.extend(VglLineBasicMaterial))({
                    propsData: {linewidth: "2.1"}
                });
                assert.strictEqual(vm.inst.linewidth, 2.1);
            });
        });
        describe("linecapのテスト", function() {
            it("undefined -> \"round\"", function() {
                const vm = new Vue(VglLineBasicMaterial);
                assert.equal(vm.inst.linecap, "round");
            });
            it("\"square\" -> \"square\"", function() {
                const vm = new (Vue.extend(VglLineBasicMaterial))({
                    propsData: {linecap: "square"}
                });
                assert.equal(vm.inst.linecap, "square");
            });
        });
        describe("linejoinのテスト", function() {
            it("undefined -> \"round\"", function() {
                const vm = new Vue(VglLineBasicMaterial);
                assert.equal(vm.inst.linejoin, "round");
            });
            it("\"bevel\" -> \"bevel\"", function() {
                const vm = new (Vue.extend(VglLineBasicMaterial))({
                    propsData: {linejoin: "bevel"}
                });
                assert.equal(vm.inst.linejoin, "bevel");
            });
        });
    });
    describe("プロパティ変更のテスト", function() {
        describe("colorの変更", function() {
            it("undefined -> #000", function(done) {
                const vm = new Vue(VglLineBasicMaterial);
                assert.strictEqual(vm.inst.color.r, 1);
                assert.strictEqual(vm.inst.color.g, 1);
                assert.strictEqual(vm.inst.color.b, 1);
                vm.color = "#000";
                vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.color.r, 0);
                    assert.strictEqual(vm.inst.color.g, 0);
                    assert.strictEqual(vm.inst.color.b, 0);
                    done();
                });
            });
            it("#000000 -> #e2e2e2", function(done) {
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
                    done();
                });
            });
        });
        describe("lightsの変更", function() {
            it("undefined -> true", function(done) {
                const vm = new Vue(VglLineBasicMaterial);
                assert.isFalse(vm.inst.lights);
                vm.lights = true;
                vm.$nextTick(() => {
                    assert.isTrue(vm.inst.lights);
                    done();
                });
            });
            it("true -> false", function(done) {
                const vm = new (Vue.extend(VglLineBasicMaterial))({
                    propsData: {lights: true}
                });
                assert.isTrue(vm.inst.lights);
                vm.lights = false;
                vm.$nextTick(() => {
                    assert.isFalse(vm.inst.lights);
                    done();
                });
            });
        });
        describe("linewidthの変更", function() {
            it("undefined -> \"0.5\"", function(done) {
                const vm = new Vue(VglLineBasicMaterial);
                assert.strictEqual(vm.inst.linewidth, 1);
                vm.linewidth = "0.5";
                vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.linewidth, 0.5);
                    done();
                });
            });
            it("0.8 -> 1.2", function(done) {
                const vm = new (Vue.extend(VglLineBasicMaterial))({
                    propsData: {linewidth: 0.8}
                });
                assert.strictEqual(vm.inst.linewidth, 0.8);
                vm.linewidth = 1.2;
                vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.linewidth, 1.2);
                    done();
                });
            });
        });
        describe("linecapの変更", function() {
            it("undefined -> \"butt\"", function(done) {
                const vm = new Vue(VglLineBasicMaterial);
                assert.equal(vm.inst.linecap, "round");
                vm.linecap = "butt";
                vm.$nextTick(() => {
                    assert.equal(vm.inst.linecap, "butt");
                    done();
                });
            });
            it("\"round\" -> \"square\"", function(done) {
                const vm = new (Vue.extend(VglLineBasicMaterial))({
                    propsData: {linecap: "round"}
                });
                assert.equal(vm.inst.linecap, "round");
                vm.linecap = "square";
                vm.$nextTick(() => {
                    assert.equal(vm.inst.linecap, "square");
                    done();
                });
            });
        });
        describe("linejoinの変更", function() {
            it("undefined -> \"square\"", function(done) {
                const vm = new Vue(VglLineBasicMaterial);
                assert.equal(vm.inst.linejoin, "round");
                vm.linejoin = "square";
                vm.$nextTick(() => {
                    assert.equal(vm.inst.linejoin, "square");
                    done();
                });
            });
            it("\"bevel\" -> \"miter\"", function(done) {
                const vm = new (Vue.extend(VglLineBasicMaterial))({
                    propsData: {linejoin: "bevel"}
                });
                assert.equal(vm.inst.linejoin, "bevel");
                vm.linejoin = "miter";
                vm.$nextTick(() => {
                    assert.equal(vm.inst.linejoin, "miter");
                    done();
                });
            });
        });
    });
});
