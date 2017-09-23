import VglConeGeometry from "../src/vgl-cone-geometry.js";
const assert = chai.assert;

describe("VglConeGeometryコンポーネントのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはConeGeometryオブジェクト", function() {
            const vm = new Vue(VglConeGeometry);
            assert.equal(vm.inst.type, "ConeGeometry");
        });
    });
    describe("プロパティのテスト", function() {
        describe("radiusプロパティ", function() {
            it("undefined -> undefined (50)", function() {
                const vm = new Vue(VglConeGeometry);
                assert.isUndefined(vm.inst.parameters.radius);
            });
            it("\"20\" -> 20", function() {
                const vm = new (Vue.extend(VglConeGeometry))({
                    propsData: {radius: "20"}
                });
                assert.strictEqual(vm.inst.parameters.radius, 20);
            });
        });
    });
    describe("プロパティ変更のテスト", function() {
        it("radiusが変更されると、新しいinstがnewされる", function(done) {
            const vm = new (Vue.extend(VglConeGeometry))({
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