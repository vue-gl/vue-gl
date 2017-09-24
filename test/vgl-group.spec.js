const {VglGroup} = VueGL;
const assert = chai.assert;

describe("VglGroupコンポーネントのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはGroupオプジェクト", function() {
            const vm = new Vue(VglGroup);
            assert.equal(vm.inst.type, "Group");
        });
    });
});
