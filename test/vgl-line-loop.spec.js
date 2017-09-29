describe("VglLineLoopのテスト", function() {
    const {VglLineLoop} = VueGL;
    const assert = chai.assert;
    describe("プロパティの確認", function() {
        it("instプロパティはLineLoopオブジェクト", function() {
            const vm = new Vue(VglLineLoop);
            assert.isTrue(vm.inst.isLineLoop);
        });
    });
});
