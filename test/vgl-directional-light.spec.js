import {VglDirectionalLight} from "../src/index.js";
const assert = chai.assert;

describe("VglDirectionalLightコンポーネントのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはDirectionalLightオブジェクト", function() {
            const vm = new Vue(VglDirectionalLight);
            assert.isTrue(vm.inst.isDirectionalLight);
        });
    });
});
