describe("VglTorusKnotGeometryコンポーネントのテスト", function() {
    const {VglTorusKnotGeometry} = VueGL;
    const assert = chai.assert;
    describe("プロパティの確認", function() {
        it("instプロパティはTorusKnotGeometryオブジェクト", function() {
            const vm = new Vue(VglTorusKnotGeometry);
            assert.equal(vm.inst.type, "TorusKnotGeometry");
        });
    });
    describe("プロパティのテスト", function() {
        describe("radiusプロパティ", function() {
            it("undefined -> undefined (20)", function() {
                const vm = new Vue(VglTorusKnotGeometry);
                assert.isUndefined(vm.inst.parameters.radius);
            });
            it("\"30\" -> 30", function() {
                const vm = new (Vue.extend(VglTorusKnotGeometry))({
                    propsData: {radius: "30"}
                });
                assert.strictEqual(vm.inst.parameters.radius, 30);
            });
        });
    });
    describe("プロパティ変更のテスト", function() {
        it("innerRadiusが変更されると、新しいinstがnewされる", function(done) {
            const vm = new (Vue.extend(VglTorusKnotGeometry))({
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