import VglAmbientLight from "../src/vgl-ambient-light.js";
const assert = chai.assert;

describe("VglAmbientLightコンポーネントのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはAmbientLightオブジェクト", function() {
            const vm = new Vue(VglAmbientLight);
            assert.isTrue(vm.inst.isAmbientLight);
        });
    });
});
