describe("VglGeometryコンポーネントのテスト", function() {
    const {VglGeometry, VglAssets} = VueGL;
    const {BoxGeometry, SphereGeometry} = THREE;
    const assert = chai.assert;
    describe("プロパティの確認", function() {
        it("instプロパティはGeometryオブジェクト", function() {
            const vm = new Vue(VglGeometry);
            assert.isTrue(vm.inst.isGeometry);
        });
    });
    describe("assetsへの登録", function() {
        it("マウントすると、親assetsのgeometriesに登録される", function() {
            const vm = new Vue({
                template: `<vgl-assets ref="p"><vgl-geometry name="dm'&^>" ref="c" /></vgl-assets>`,
                components: {
                    VglGeometry,
                    VglAssets
                }
            }).$mount();
            assert.equal(vm.$refs.p.assets.geometries["dm'&^>"], vm.$refs.c.inst);
        });
        it("コンポーネントが破棄されると、親assetsのgeometriesから削除される", function(done) {
            const vm = new Vue({
                template: `<vgl-assets ref="p"><vgl-geometry name="n<!--" ref="c" v-if="a" /><vgl-assets /></vgl-assets>`,
                components: {
                    VglGeometry,
                    VglAssets
                },
                data: {a: true}
            }).$mount();
            assert.equal(vm.$refs.p.assets.geometries["n<!--"], vm.$refs.c.inst);
            vm.a = false;
            vm.$nextTick(() => {
                assert.isUndefined(vm.$refs.p.assets.geometries["n<!--"]);
                assert.isEmpty(Object.keys(vm.$refs.p.assets.geometries));
                done();
            });
        });
        it("インスタンスを置換すると、親assetsのgeometriesも置換される", function(done) {
            const vm = new Vue({
                template: `<vgl-assets ref="p"><ex name="'<!--" ref="c" :b="a" /></vgl-assets>`,
                components: {
                    ex: {
                        mixins: [VglGeometry],
                        computed: {
                            inst() {
                                return this.b ? new BoxGeometry(1, 1, 1): new SphereGeometry();
                            }
                        },
                        props: ["b"]
                    },
                    VglAssets
                },
                data: {a: true}
            }).$mount();
            const firstInstance = vm.$refs.c.inst;
            assert.equal(vm.$refs.p.assets.geometries["'<!--"], firstInstance);
            vm.a = false;
            vm.$nextTick(() => {
                const secondInstance = vm.$refs.c.inst;
                assert.notEqual(firstInstance, secondInstance);
                assert.equal(vm.$refs.p.assets.geometries["'<!--"], secondInstance);
                done();
            });
        });
    });
});
