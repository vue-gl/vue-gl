const {VglCylinderGeometry} = VueGL;
const assert = chai.assert;

describe("VglCylinderGeometryコンポーネントのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはCylinderGeometryオブジェクト", function() {
            const vm = new Vue(VglCylinderGeometry);
            assert.equal(vm.inst.type, "CylinderGeometry");
        });
    });
    describe("プロパティのテスト", function() {
        describe("radiusTopプロパティ", function() {
            it("undefined -> undefined (20)", function() {
                const vm = new Vue(VglCylinderGeometry);
                assert.isUndefined(vm.inst.parameters.radiusTop);
            });
            it("\"30\" -> 30", function() {
                const vm = new (Vue.extend(VglCylinderGeometry))({
                    propsData: {radiusTop: "30"}
                });
                assert.strictEqual(vm.inst.parameters.radiusTop, 30);
            });
        });
    });
    describe("プロパティ変更のテスト", function() {
        it("radiusTopが変更されると、新しいinstがnewされる", function(done) {
            const vm = new (Vue.extend(VglCylinderGeometry))({
                propsData: {radiusTop: "25"}
            });
            const firstInstance = vm.inst;
            assert.strictEqual(firstInstance.parameters.radiusTop, 25);
            vm.radiusTop = "11.3<";
            vm.$nextTick(() => {
                const secondInstance = vm.inst;
                assert.strictEqual(secondInstance.parameters.radiusTop, 11.3);
                assert.notEqual(firstInstance, secondInstance);
                done();
            });
        });
    });
});