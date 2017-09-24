const {VglScene, VglRenderer} = VueGL;
const assert = chai.assert;

describe("VglSceneコンポーネントのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはSceneオブジェクト", function() {
            const vm = new Vue({
                template: `<vgl-scene ref="s" />`,
                components: {VglScene},
                provide: {scenes: Object.create(null)}
            }).$mount();
            assert.isTrue(vm.$refs.s.inst.autoUpdate);
        });
    });
    describe("rendererへの登録", function() {
        it("マウントすると、rendererのscenesに追加される", function() {
            const vm = new Vue({
                template: `<vgl-renderer ref="p"><vgl-scene ref="s" name="a'" /></vgl-renderer>`,
                components: {
                    VglRenderer,
                    VglScene
                }
            }).$mount();
            assert.equal(vm.$refs.p.scenes["a'"], vm.$refs.s.inst);
        });
        it("コンポーネントが破棄されると、rendererのscenesから取り除かれる", function(done) {
            const vm = new Vue({
                template: `<vgl-renderer ref="p"><vgl-scene ref="s" v-if="on" name="a'" /></vgl-renderer>`,
                components: {
                    VglRenderer,
                    VglScene
                },
                data: {on: true}
            }).$mount();
            assert.equal(vm.$refs.p.scenes["a'"], vm.$refs.s.inst);
            vm.on = false;
            vm.$nextTick(() => {
                assert.isUndefined(vm.$refs.p.scenes["a'"]);
                done();
            });
        });
        it("コンポーネントを置換すると、rendererのscenesも置換される", function(done) {
            const vm = new Vue({
                template: `<vgl-renderer ref="p"><vgl-scene ref="s" :key="key" name="a&quot;" /></vgl-renderer>`,
                components: {
                    VglRenderer,
                    VglScene
                },
                data: {key: "first"}
            }).$mount();
            const firstInstance = vm.$refs.s.inst;
            assert.equal(vm.$refs.p.scenes["a\""], firstInstance);
            vm.key = "second";
            vm.$nextTick(() => {
                const secondInstance = vm.$refs.s.inst;
                assert.notEqual(firstInstance, secondInstance);
                assert.equal(vm.$refs.p.scenes["a\""], secondInstance);
                done();
            });
        });
    });
});
