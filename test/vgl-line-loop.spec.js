import {VglLineLoop} from "../src/index.js";
const assert = chai.assert;

describe("VglLineLoopのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはLineLoopオブジェクト", function() {
            const vm = new Vue(VglLineLoop);
            assert.isTrue(vm.inst.isLineLoop);
        });
    });
});
