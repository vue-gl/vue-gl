import VglAxisHelper from "../src/vgl-axis-helper.js";
const assert = chai.assert;

describe("VglAxisHelperのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはAxisHelperオブジェクト", function() {
            const vm = new Vue(VglAxisHelper);
            assert.isTrue(vm.inst.isLineSegments);
            assert.sameOrderedMembers(
                Array.prototype.slice.call(vm.inst.geometry.attributes.position.array),
                [
		            0, 0, 0, 1, 0, 0,
		            0, 0, 0, 0, 1, 0,
		            0, 0, 0, 0, 0, 1
	            ]
	        );
        });
    });
});
