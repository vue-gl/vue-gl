describe("VglCircleGeometryコンポーネントのテスト", function() {
    const {VglPlaneGeometry} = VueGL;
    const assert = chai.assert;
    describe("プロパティの確認", function() {
        it("instプロパティはPlaneGeometryオブジェクト", function() {
            const vm = new Vue(VglPlaneGeometry);
            assert.equal(vm.inst.type, "PlaneGeometry");
        });
    });
    describe("プロパティのテスト", function() {
        describe("width, heightプロパティ", function() {
            it("\"20\", \"32\" -> 20, 32", function() {
                const vm = new (Vue.extend(VglPlaneGeometry))({
                    propsData: {width: "20", height: "32"}
                });
                assert.strictEqual(vm.inst.parameters.width, 20);
                assert.strictEqual(vm.inst.parameters.height, 32);
            });
        });
    });
    describe("プロパティ変更のテスト", function() {
        it("widthが変更されると、新しいinstがnewされる", function(done) {
            const vm = new (Vue.extend(VglPlaneGeometry))({
                propsData: {width: "25", height: 38}
            });
            const firstInstance = vm.inst;
            assert.strictEqual(firstInstance.parameters.width, 25);
            assert.strictEqual(firstInstance.parameters.height, 38);
            vm.width = "11.3<";
            vm.$nextTick(() => {
                const secondInstance = vm.inst;
                assert.strictEqual(secondInstance.parameters.width, 11.3);
                assert.strictEqual(secondInstance.parameters.height, 38);
                assert.notEqual(firstInstance, secondInstance);
                done();
            });
        });
    });
});
