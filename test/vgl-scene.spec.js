import {VglScene, VglAbstract} from "../src/index.js";
const assert = chai.assert;

describe("VglSceneコンポーネントのテスト", function() {
    describe("assetsへの登録", function() {
        it("マウントすると、親インスタンスのassetsに追加される", function() {
            const vm = new Vue({
                template: `<vgl-abstract ref="p"><vgl-scene ref="s" name="a'" /></vgl-abstract>`,
                components: {
                    VglAbstract,
                    VglScene
                }
            }).$mount();
            assert.equal(vm.$refs.p.assets.scenes["a'"], vm.$refs.s.inst);
        });
    });
});
