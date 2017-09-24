const {VglAmbientLight} = VueGL;
const assert = chai.assert;

describe("VglAmbientLightコンポーネントのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはAmbientLightオブジェクト", function() {
            const vm = new Vue(VglAmbientLight);
            assert.isTrue(vm.inst.isAmbientLight);
        });
    });
});
