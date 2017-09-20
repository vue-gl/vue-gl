import {VglCircleGeometry} from "../src/index.js";
const assert = chai.assert;

describe("VglCircleGeometryコンポーネントのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはCircleGeometryオブジェクト", function() {
            const vm = new Vue(VglCircleGeometry);
            assert.equal(vm.inst.type, "CircleGeometry");
        });
    });
    describe("プロパティのテスト", function() {
        describe("radiusプロパティ", function() {
            it("undefined -> undefined (50)", function() {
                const vm = new Vue(VglCircleGeometry);
                assert.isUndefined(vm.inst.parameters.radius);
            });
            it("\"20\" -> 20", function() {
                const vm = new (Vue.extend(VglCircleGeometry))({
                    propsData: {radius: "20"}
                });
                assert.strictEqual(vm.inst.parameters.radius, 20);
            });
        });
    });
    describe("プロパティ変更のテスト", function() {
        it("radiusが変更されると、新しいinstがnewされる", function(done) {
            const vm = new (Vue.extend(VglCircleGeometry))({
                propsData: {radius: "25"}
            });
            const firstInstance = vm.inst;
            assert.strictEqual(firstInstance.parameters.radius, 25);
            vm.radius = "11.3<";
            vm.$nextTick(() => {
                const secondInstance = vm.inst;
                assert.strictEqual(secondInstance.parameters.radius, 11.3);
                assert.notEqual(firstInstance, secondInstance);
                done();
            });
        });
    });
});