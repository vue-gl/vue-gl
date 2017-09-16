import {VglPerspectiveCamera} from "../src/index.js";
const assert = chai.assert;

describe("VglPerspectiveCameraコンポーネントのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはPerspectiveCameraオブジェクト", function() {
            const vm = new Vue({
                template: `<vgl-perspective-camera ref="c" />`,
                components: {VglPerspectiveCamera},
                provide: {cameras: Object.create(null)}
            }).$mount();
            assert.isTrue(vm.$refs.c.inst.isPerspectiveCamera);
        });
    });
    describe("プロパティのテスト", function() {
        describe("zoomのテスト", function() {
            it("undefined -> 1", function() {
                const vm = new Vue({
                    template: `<vgl-perspective-camera ref="c" />`,
                    components: {VglPerspectiveCamera},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.zoom, 1);
            });
        });
    });
});
