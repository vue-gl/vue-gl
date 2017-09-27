const {VglDodecahedronGeometry} = VueGL;
const assert = chai.assert;

describe("VglDodecahedronGeometryコンポーネントのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはDodecahedronGeometryオブジェクト", function() {
            const vm = new Vue(VglDodecahedronGeometry);
            assert.equal(vm.inst.type, "DodecahedronGeometry");
        });
    });
    describe("プロパティのテスト", function() {
        describe("radiusプロパティ", function() {
            it("undefined -> undefined (1)", function() {
                const vm = new Vue(VglDodecahedronGeometry);
                assert.isUndefined(vm.inst.parameters.radius);
            });
            it("\"20\" -> 20", function() {
                const vm = new (Vue.extend(VglDodecahedronGeometry))({
                    propsData: {radius: "20"}
                });
                assert.strictEqual(vm.inst.parameters.radius, 20);
            });
        });
    });
    describe("プロパティ変更のテスト", function() {
        it("radiusが変更されると、新しいinstがnewされる", function(done) {
            const vm = new (Vue.extend(VglDodecahedronGeometry))({
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