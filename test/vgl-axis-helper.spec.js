import {VglAxisHelper} from "../src/index.js";
import {AxisHelper} from "../src/three.js";
const assert = chai.assert;

describe("VglAxisHelperのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはAxisHelperオブジェクト", function() {
            const vm = new Vue(VglAxisHelper);
            assert.instanceOf(vm.inst, AxisHelper);
        });
    });
});
