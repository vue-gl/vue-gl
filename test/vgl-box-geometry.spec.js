describe("VglBoxGeometryコンポーネントのテスト", function() {
    const {VglBoxGeometry} = VueGL;
    const assert = chai.assert;
    describe("プロパティの確認", function() {
        it("instプロパティはBoxGeometryオブジェクト", function() {
            const vm = new Vue(VglBoxGeometry);
            assert.equal(vm.inst.type, "BoxGeometry");
        });
    });
    describe("プロパティのテスト", function() {
        describe("width, height, depthプロパティ", function() {
            it("10, 6, \"8\" -> 10, 6, 8", function() {
                const vm = new (Vue.extend(VglBoxGeometry))({
                    propsData: {width: 10, height: 6, depth: "8"}
                });
                assert.strictEqual(vm.inst.parameters.width, 10);
                assert.strictEqual(vm.inst.parameters.height, 6);
                assert.strictEqual(vm.inst.parameters.depth, 8);
            });
        });
    });
    describe("プロパティ変更のテスト", function() {
        it("widthが変更されると、新しいinstがnewされる", function(done) {
            const vm = new (Vue.extend(VglBoxGeometry))({
                propsData: {width: "25", height: 3, depth: "50.3"}
            });
            const firstInstance = vm.inst;
            assert.strictEqual(firstInstance.parameters.width, 25);
            assert.strictEqual(firstInstance.parameters.height, 3);
            assert.strictEqual(firstInstance.parameters.depth, 50.3);
            vm.width = "11.3<";
            vm.$nextTick(() => {
                const secondInstance = vm.inst;
                assert.strictEqual(secondInstance.parameters.width, 11.3);
                assert.strictEqual(secondInstance.parameters.height, 3);
                assert.strictEqual(secondInstance.parameters.depth, 50.3);
                assert.notEqual(firstInstance, secondInstance);
                done();
            });
        });
    });
});