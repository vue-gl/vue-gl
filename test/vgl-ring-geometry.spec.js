describe("VglRingGeometryコンポーネントのテスト", function() {
    const {VglRingGeometry} = VueGL;
    const assert = chai.assert;
    describe("プロパティの確認", function() {
        it("instプロパティはRingGeometryオブジェクト", function() {
            const vm = new Vue(VglRingGeometry);
            assert.equal(vm.inst.type, "RingGeometry");
        });
    });
    describe("プロパティのテスト", function() {
        describe("innerRadiusプロパティ", function() {
            it("undefined -> undefined (20)", function() {
                const vm = new Vue(VglRingGeometry);
                assert.isUndefined(vm.inst.parameters.innerRadius);
            });
            it("\"30\" -> 30", function() {
                const vm = new (Vue.extend(VglRingGeometry))({
                    propsData: {innerRadius: "30"}
                });
                assert.strictEqual(vm.inst.parameters.innerRadius, 30);
            });
        });
    });
    describe("プロパティ変更のテスト", function() {
        it("innerRadiusが変更されると、新しいinstがnewされる", function(done) {
            const vm = new (Vue.extend(VglRingGeometry))({
                propsData: {innerRadius: "25"}
            });
            const firstInstance = vm.inst;
            assert.strictEqual(firstInstance.parameters.innerRadius, 25);
            vm.innerRadius = "11.3<";
            vm.$nextTick(() => {
                const secondInstance = vm.inst;
                assert.strictEqual(secondInstance.parameters.innerRadius, 11.3);
                assert.notEqual(firstInstance, secondInstance);
                done();
            });
        });
    });
});