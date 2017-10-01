describe("VglSpotLightコンポーネントのテスト", function() {
    const {VglSpotLight, VglObject3d} = VueGL;
    const assert = chai.assert;
    describe("プロパティの確認", function() {
        it("instプロパティはSpotLightオブジェクト", function() {
            const vm = new Vue(VglSpotLight);
            assert.isTrue(vm.inst.isSpotLight);
        });
    });
    describe("プロパティのテスト", function() {
        describe("distanceのテスト", function() {
            it("undefined -> 0", function() {
                const vm = new Vue(VglSpotLight);
                assert.strictEqual(vm.inst.distance, 0);
            });
            it("\"2.1\" -> 2.1", function() {
                const vm = new (Vue.extend(VglSpotLight))({
                    propsData: {distance: "2.1"}
                });
                assert.strictEqual(vm.inst.distance, 2.1);
            });
        });
        describe("decayのテスト", function() {
            it("undefined -> 1", function() {
                const vm = new Vue(VglSpotLight);
                assert.strictEqual(vm.inst.decay, 1);
            });
            it("\"2\" -> 2", function() {
                const vm = new (Vue.extend(VglSpotLight))({
                    propsData: {decay: "2"}
                });
                assert.strictEqual(vm.inst.decay, 2);
            });
        });
        describe("angleのテスト", function() {
            it("undefined -> π/3", function() {
                const vm = new Vue(VglSpotLight);
                assert.strictEqual(vm.inst.angle, Math.PI / 3);
            });
            it("\"1.1\" -> 1.1", function() {
                const vm = new (Vue.extend(VglSpotLight))({
                    propsData: {angle: "1.1"}
                });
                assert.strictEqual(vm.inst.angle, 1.1);
            });
        });
        describe("penumbraのテスト", function() {
            it("undefined -> 0", function() {
                const vm = new Vue(VglSpotLight);
                assert.strictEqual(vm.inst.penumbra, 0);
            });
            it("\"0.8\" -> 0.8", function() {
                const vm = new (Vue.extend(VglSpotLight))({
                    propsData: {penumbra: "0.8"}
                });
                assert.strictEqual(vm.inst.penumbra, 0.8);
            });
        });
        describe("targetのテスト", function() {
            it("undefined -> 0, 0, 0", function() {
                const vm = new Vue(VglSpotLight);
                assert.strictEqual(vm.inst.target.position.x, 0);
                assert.strictEqual(vm.inst.target.position.y, 0);
                assert.strictEqual(vm.inst.target.position.z, 0);
            });
            it("\"2 3.1  6\" -> 2, 3.1, 6", function() {
                const vm = new (Vue.extend(VglSpotLight))({
                    propsData: {target: "2 3.1  6"}
                });
                assert.strictEqual(vm.inst.target.position.x, 2);
                assert.strictEqual(vm.inst.target.position.y, 3.1);
                assert.strictEqual(vm.inst.target.position.z, 6);
            });
            it("undefined -> targetオブジェクトはグローバル", function() {
                const vm = new Vue({
                    template: `<vgl-object3d><vgl-spot-light ref="s" /></vgl-object3d>`,
                    components: {
                        VglObject3d,
                        VglSpotLight
                    }
                }).$mount();
                assert.isNull(vm.$refs.s.inst.target.parent);
            });
            it("\"1.1 0 3.01\" -> targetオブジェクトが親オブジェクトに追加される", function() {
                const vm = new Vue({
                    template: `<vgl-object3d ref="o"><vgl-spot-light target="1.1 0 3.01" ref="s" /></vgl-object3d>`,
                    components: {
                        VglObject3d,
                        VglSpotLight
                    }
                }).$mount();
                assert.strictEqual(vm.$refs.s.inst.target.parent, vm.$refs.o.inst);
            });
        });
    });
    describe("プロパティ変更のテスト", function() {
        describe("distanceの変更", function() {
            it("3.5 -> \"1.8\"", function(done) {
                const vm = new (Vue.extend(VglSpotLight))({
                    propsData: {distance: 3.5}
                });
                assert.strictEqual(vm.inst.distance, 3.5);
                vm.distance = "1.8";
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.inst.distance, 1.8);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
        describe("decayの変更", function() {
            it("\"1.5\" -> 2.5", function(done) {
                const vm = new (Vue.extend(VglSpotLight))({
                    propsData: {decay: "1.5"}
                });
                assert.strictEqual(vm.inst.decay, 1.5);
                vm.decay = 2.5;
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.inst.decay, 2.5);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
        describe("angleの変更", function() {
            it("\"0.88\" -> 1.221", function(done) {
                const vm = new (Vue.extend(VglSpotLight))({
                    propsData: {angle: "0.88"}
                });
                assert.strictEqual(vm.inst.angle, 0.88);
                vm.angle = 1.221;
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.inst.angle, 1.221);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
        describe("penumbraの変更", function() {
            it("0.88 -> \"0.77\"", function(done) {
                const vm = new (Vue.extend(VglSpotLight))({
                    propsData: {penumbra: 0.88}
                });
                assert.strictEqual(vm.inst.penumbra, 0.88);
                vm.penumbra = "0.77";
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.inst.penumbra, 0.77);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
        describe("targetの変更", function() {
            it("undefined -> {x: 4, y: 3, z: 2.1}", function(done) {
                const vm = new Vue({
                    template: `<vgl-object3d ref="o"><vgl-spot-light :target="t" ref="s" /></vgl-object3d>`,
                    components: {
                        VglObject3d,
                        VglSpotLight
                    },
                    data: {t: undefined}
                }).$mount();
                assert.strictEqual(vm.$refs.s.inst.target.position.x, 0);
                assert.strictEqual(vm.$refs.s.inst.target.position.y, 0);
                assert.strictEqual(vm.$refs.s.inst.target.position.z, 0);
                assert.isNull(vm.$refs.s.inst.target.parent);
                vm.t = {x: 4, y: 3, z: 2.1};
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.$refs.s.inst.target.position.x, 4);
                        assert.strictEqual(vm.$refs.s.inst.target.position.y, 3);
                        assert.strictEqual(vm.$refs.s.inst.target.position.z, 2.1);
                        assert.strictEqual(vm.$refs.s.inst.target.parent, vm.$refs.o.inst);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
            it("{x: 4.5, y: 3.2, z: 2.1} -> \"2.1 1 0\"", function(done) {
                const vm = new Vue({
                    template: `<vgl-object3d ref="o"><vgl-spot-light :target="t" ref="s" /></vgl-object3d>`,
                    components: {
                        VglObject3d,
                        VglSpotLight
                    },
                    data: {
                        t: {x: 4.5, y: 3.2, z: 2.1}
                    }
                }).$mount();
                assert.strictEqual(vm.$refs.s.inst.target.position.x, 4.5);
                assert.strictEqual(vm.$refs.s.inst.target.position.y, 3.2);
                assert.strictEqual(vm.$refs.s.inst.target.position.z, 2.1);
                assert.strictEqual(vm.$refs.s.inst.target.parent, vm.$refs.o.inst);
                vm.t = "2.1 1 0";
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.$refs.s.inst.target.position.x, 2.1);
                        assert.strictEqual(vm.$refs.s.inst.target.position.y, 1);
                        assert.strictEqual(vm.$refs.s.inst.target.position.z, 0);
                        assert.strictEqual(vm.$refs.s.inst.target.parent, vm.$refs.o.inst);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
    });
    describe("ライフサイクルメソッドのテスト", function() {
        describe("beforeDestroyのテスト", function() {
            it("targetオブジェクトが親オブジェクトからremoveされる", function(done) {
                const vm = new Vue({
                    template: `<vgl-object3d ref="r"><vgl-object3d /><vgl-spot-light v-if="a" ref="s" /></vgl-object3d>`,
                    components: {
                        VglObject3d,
                        VglSpotLight
                    },
                    data: {a: false}
                }).$mount();
                assert.strictEqual(vm.$refs.r.inst.children.length, 1);
                vm.a = true;
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.$refs.r.inst.children.length, 2);
                        const inst = vm.$refs.s.inst;
                        assert.include(vm.$refs.r.inst.children, inst);
                        vm.a = false;
                        vm.$nextTick(() => {
                            try {
                                assert.strictEqual(vm.$refs.r.inst.children.length, 1);
                                assert.notInclude(vm.$refs.r.inst.children, inst);
                                done();
                            } catch(e) {
                                done(e);
                            }
                        });
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
    });
});
