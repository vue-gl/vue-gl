describe("VglBoxHelperのテスト", function() {
    const {VglBoxHelper} = VueGL;
    const assert = chai.assert;
    describe("プロパティの確認", function() {
        it("instプロパティはBoxHelperオブジェクト", function() {
            const vm = new Vue(VglBoxHelper);
            assert.isTrue(vm.inst.isLineSegments);
            assert.isFunction(vm.inst.setFromObject);
        });
    });
    describe("プロパティのテスト", function() {
        describe("colorのテスト", function() {
            it("#423CDA", function() {
                const vm = new (Vue.extend(VglBoxHelper))({
                    propsData: {color: "#423CDA"}
                });
                assert.strictEqual(vm.inst.material.color.getHex(), 0x423cda);
            });
        });
    });
    describe("プロパティ変更のテスト", function() {
        describe("colorの変更", function() {
            it("#223CDe -> #aa87C5", function(done) {
                const vm = new (Vue.extend(VglBoxHelper))({
                    propsData: {color: "#223CDe"}
                });
                assert.strictEqual(vm.inst.material.color.getHex(), 0x223cde);
                vm.color = "#aa87C5";
                vm.$nextTick(() => {
                    assert.strictEqual(vm.inst.material.color.getHex(), 0xaa87c5);
                    done();
                });
            });
        });
    });
});
