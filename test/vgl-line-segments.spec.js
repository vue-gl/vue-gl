const {VglLineSegments} = VueGL;
const assert = chai.assert;

describe("VglLineSegmentsのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはLineSegmentsオブジェクト", function() {
            const vm = new Vue(VglLineSegments);
            assert.isTrue(vm.inst.isLineSegments);
        });
    });
});