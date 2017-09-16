import {VglObject3d} from "../src/index.js";
import {Line, Mesh} from "../src/three.js";
const assert = chai.assert;

describe("VglObject3dコンポーネントのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはObject3Dオブジェクト", function() {
            const vm = new Vue(VglObject3d);
            assert.isTrue(vm.inst.isObject3D);
        });
    });
    describe("親子関係のテスト", function() {
        describe("インスタンス生成", function() {
            it("子コンポーネントのインスタンスが親コンポーネントのインスタンスにaddされる", function() {
                const vm = new Vue({
                    template: `<vgl-object3d ref="p"><vgl-object3d ref="c" /></vgl-object3d>`,
                    components: {VglObject3d}
                }).$mount();
                assert.equal(vm.$refs.c.inst.parent, vm.$refs.p.inst);
                assert.include(vm.$refs.p.inst.children, vm.$refs.c.inst);
            });
            it("リアクティブなadd", function(done) {
                const vm = new Vue({
                    template: `<vgl-object3d ref="p"><vgl-object3d v-if="a" ref="c" /></vgl-object3d>`,
                    components: {VglObject3d},
                    data: {a: false}
                }).$mount();
                assert.isEmpty(vm.$refs.p.inst.children);
                vm.a = true;
                vm.$nextTick(() => {
                    assert.equal(vm.$refs.c.inst.parent, vm.$refs.p.inst);
                    assert.include(vm.$refs.p.inst.children, vm.$refs.c.inst);
                    done();
                });
            });
            it("Object3D以外のコンポーネントをスキップしてaddされる", function() {
                const vm = new Vue({
                    template: `<vgl-object3d ref="p"><other><vgl-object3d ref="c" /></other></vgl-object3d>`,
                    components: {
                        VglObject3d,
                        Other: {
                            template: `<div><slot /></div>`
                        }
                    }
                }).$mount();
                assert.equal(vm.$refs.c.inst.parent, vm.$refs.p.inst);
                assert.include(vm.$refs.p.inst.children, vm.$refs.c.inst);
            });
            it("スキップしてリアクティブにaddされる", function(done) {
                const vm = new Vue({
                    template: `<vgl-object3d ref="p"><other v-if="b"><vgl-object3d ref="c" /></other></vgl-object3d>`,
                    components: {
                        VglObject3d,
                        Other: {
                            template: `<div><slot /></div>`
                        }
                    },
                    data: {b: false}
                }).$mount();
                assert.isEmpty(vm.$refs.p.inst.children);
                vm.b = true;
                vm.$nextTick(() => {
                    assert.equal(vm.$refs.c.inst.parent, vm.$refs.p.inst);
                    assert.include(vm.$refs.p.inst.children, vm.$refs.c.inst);
                    done();
                });
            });
        });
        describe("インスタンス破棄", function() {
            it("子コンポーネントのインスタンスが親コンポーネントのインスタンスからremoveされる", function(done) {
                const vm = new Vue({
                    template: `<vgl-object3d ref="p"><vgl-object3d v-if="d" ref="c" /><vgl-object3d /></vgl-object3d>`,
                    components: {VglObject3d},
                    data: {d: true}
                }).$mount();
                const childInstance = vm.$refs.c.inst;
                assert.include(vm.$refs.p.inst.children, childInstance);
                vm.d = false;
                vm.$nextTick(() => {
                    assert.notInclude(vm.$refs.p.inst.children, childInstance);
                    done();
                });
            });
            it("Object3D以外のコンポーネントをスキップしてremoveされる", function(done) {
                const vm = new Vue({
                    template: `<vgl-object3d ref="p"><other v-if="e"><vgl-object3d ref="c" /></other><other /></vgl-object3d>`,
                    components: {
                        VglObject3d,
                        Other: {
                            template: `<div><slot /></div>`
                        }
                    },
                    data: {e: true}
                }).$mount();
                const childInstance = vm.$refs.c.inst;
                assert.include(vm.$refs.p.inst.children, childInstance);
                vm.e = false;
                vm.$nextTick(() => {
                    assert.notInclude(vm.$refs.p.inst.children, childInstance);
                    done();
                });
            });
        });
    });
    describe("プロパティのテスト", function() {
        describe("positionのテスト", function() {
            describe("Non-data", function() {
                it("undefined => 0, 0, 0", function() {
                    const vm = new (Vue.extend(VglObject3d))();
                    assert.strictEqual(vm.inst.position.x, 0);
                    assert.strictEqual(vm.inst.position.y, 0);
                    assert.strictEqual(vm.inst.position.z, 0);
                });
                it("null => 0, 0, 0", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: null}
                    });
                    assert.strictEqual(vm.inst.position.x, 0);
                    assert.strictEqual(vm.inst.position.y, 0);
                    assert.strictEqual(vm.inst.position.z, 0);
                });
            });
            describe("配列", function() {
                it("[-2.3, 8, 9.2e-3] => -2.3, 8, 9.2e-3", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: [-2.3, 8, 9.2e-3]}
                    });
                    assert.strictEqual(vm.inst.position.x, -2.3);
                    assert.strictEqual(vm.inst.position.y, 8);
                    assert.strictEqual(vm.inst.position.z, 9.2e-3);
                });
                it("[\"-2.3\", \"72.1\", \"9.2e-3'\"] => -2.3, 72.1, 9.2e-3", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: ["-2.3", "72.1", "9.2e-3"]}
                    });
                    assert.strictEqual(vm.inst.position.x, -2.3);
                    assert.strictEqual(vm.inst.position.y, 72.1);
                    assert.strictEqual(vm.inst.position.z, 9.2e-3);
                });
            });
            describe("オブジェクト", function() {
                it("{x: -1, y: -5, z: 6.8} => -1, -5, 6.8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: {x: -1, y: -5, z: 6.8}}
                    });
                    assert.strictEqual(vm.inst.position.x, -1);
                    assert.strictEqual(vm.inst.position.y, -5);
                    assert.strictEqual(vm.inst.position.z, 6.8);
                });
                it("{x: \"1\", y: \"-5\", z: \"6.9\"} => 1, -5, 6.9", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: {x: "1", y: "-5", z: "6.9"}}
                    });
                    assert.strictEqual(vm.inst.position.x, 1);
                    assert.strictEqual(vm.inst.position.y, -5);
                    assert.strictEqual(vm.inst.position.z, 6.9);
                });
                it("{x: -1, y: -5} => -1, -5, 0", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: {x: -1, y: -5}}
                    });
                    assert.strictEqual(vm.inst.position.x, -1);
                    assert.strictEqual(vm.inst.position.y, -5);
                    assert.strictEqual(vm.inst.position.z, 0);
                });
            });
            describe("文字列", function() {
                it("\"-1.0 -5e8 6.8\" => -1, -5e8, 6.8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: "-1.0 -5e8 6.8"}
                    });
                    assert.strictEqual(vm.inst.position.x, -1);
                    assert.strictEqual(vm.inst.position.y, -5e8);
                    assert.strictEqual(vm.inst.position.z, 6.8);
                });
                it("\"-1.0  -5e8   6.8\" => -1, -5e8, 6.8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: "-1.0  -5e8   6.8"}
                    });
                    assert.strictEqual(vm.inst.position.x, -1);
                    assert.strictEqual(vm.inst.position.y, -5e8);
                    assert.strictEqual(vm.inst.position.z, 6.8);
                });
                it("\" -1.0  -5e8   6.8  \" => -1, -5e8, 6.8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: " -1.0  -5e8   6.8  "}
                    });
                    assert.strictEqual(vm.inst.position.x, -1);
                    assert.strictEqual(vm.inst.position.y, -5e8);
                    assert.strictEqual(vm.inst.position.z, 6.8);
                });
                it("\" -1.0ad<'  -5e8'   6.8x9  \" => -1, -5e8, 6.8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: " -1.0ad<'  -5e8'   6.8x9  "}
                    });
                    assert.strictEqual(vm.inst.position.x, -1);
                    assert.strictEqual(vm.inst.position.y, -5e8);
                    assert.strictEqual(vm.inst.position.z, 6.8);
                });
                it("\"\" => 0, 0, 0", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: ""}
                    });
                    assert.strictEqual(vm.inst.position.x, 0);
                    assert.strictEqual(vm.inst.position.y, 0);
                    assert.strictEqual(vm.inst.position.z, 0);
                });
            });
        });
        describe("rotationのテスト", function() {
            describe("Non-data", function() {
                it("undefined => 0, 0, 0, \"XYZ\"", function() {
                    const vm = new (Vue.extend(VglObject3d))();
                    assert.strictEqual(vm.inst.rotation.x, 0);
                    assert.strictEqual(vm.inst.rotation.y, 0);
                    assert.strictEqual(vm.inst.rotation.z, 0);
                    assert.equal(vm.inst.rotation.order, "XYZ");
                });
                it("null => 0, 0, 0, \"XYZ\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: null}
                    });
                    assert.strictEqual(vm.inst.rotation.x, 0);
                    assert.strictEqual(vm.inst.rotation.y, 0);
                    assert.strictEqual(vm.inst.rotation.z, 0);
                    assert.equal(vm.inst.rotation.order, "XYZ");
                });
            });
            describe("配列", function() {
                it("[-1, 5, 6.8, \"ZYX\"] => -1, 5, 6.8, \"ZYX\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: [-1, 5, 6.8, "ZYX"]}
                    });
                    assert.strictEqual(vm.inst.rotation.x, -1);
                    assert.strictEqual(vm.inst.rotation.y, 5);
                    assert.strictEqual(vm.inst.rotation.z, 6.8);
                    assert.equal(vm.inst.rotation.order, "ZYX");
                });
                it("[\"-1\", \"5\", \"8.99\", \"YZX\"] => -1, 5, 8.99, \"YZX\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: ["-1", "5", "8.99", "YZX"]}
                    });
                    assert.strictEqual(vm.inst.rotation.x, -1);
                    assert.strictEqual(vm.inst.rotation.y, 5);
                    assert.strictEqual(vm.inst.rotation.z, 8.99);
                    assert.equal(vm.inst.rotation.order, "YZX");
                });
            });
            describe("オブジェクト", function() {
                it("{x: -1, y: -5, z: 6.8, order: \"ZYX\"} => -1, -5, 6.8, \"ZYX\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: {x: -1, y: -5, z: 6.8, order: "ZYX"}}
                    });
                    assert.strictEqual(vm.inst.rotation.x, -1);
                    assert.strictEqual(vm.inst.rotation.y, -5);
                    assert.strictEqual(vm.inst.rotation.z, 6.8);
                    assert.equal(vm.inst.rotation.order, "ZYX");
                });
                it("{x: \"3\", y: \"-5\", z: \"1.8\", order: \"XZY\"} => 3, -5, 1.8, \"XZY\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: {x: "3", y: "-5", z: "1.8", order: "XZY"}}
                    });
                    assert.strictEqual(vm.inst.rotation.x, 3);
                    assert.strictEqual(vm.inst.rotation.y, -5);
                    assert.strictEqual(vm.inst.rotation.z, 1.8);
                    assert.equal(vm.inst.rotation.order, "XZY");
                });
                it("{x: 3, z: \"1.8\"} => 3, 0, 1.8, \"XYZ\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: {x: 3, z: "1.8"}}
                    });
                    assert.strictEqual(vm.inst.rotation.x, 3);
                    assert.strictEqual(vm.inst.rotation.y, 0);
                    assert.strictEqual(vm.inst.rotation.z, 1.8);
                    assert.equal(vm.inst.rotation.order, "XYZ");
                });
            });
            describe("文字列", function() {
                it("\"-1.0 -5e8 6.8 XYZ\" => -1, -5e8, 6.8, \"XYZ\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: "-1.0 -5e8 6.8 XYZ"}
                    });
                    assert.strictEqual(vm.inst.rotation.x, -1);
                    assert.strictEqual(vm.inst.rotation.y, -5e8);
                    assert.strictEqual(vm.inst.rotation.z, 6.8);
                    assert.equal(vm.inst.rotation.order, "XYZ");
                });
                it("\"-1.0  -5e8   6.8 XZY\" => -1, -5e8, 6.8, \"XZY\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: "-1.0  -5e8   6.8 XZY"}
                    });
                    assert.strictEqual(vm.inst.rotation.x, -1);
                    assert.strictEqual(vm.inst.rotation.y, -5e8);
                    assert.strictEqual(vm.inst.rotation.z, 6.8);
                    assert.equal(vm.inst.rotation.order, "XZY");
                });
                it("\" -1.0  -5e8   6.8   YZX \" => -1, -5e8, 6.8, \"YZX\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: " -1.0  -5e8   6.8   YZX "}
                    });
                    assert.strictEqual(vm.inst.rotation.x, -1);
                    assert.strictEqual(vm.inst.rotation.y, -5e8);
                    assert.strictEqual(vm.inst.rotation.z, 6.8);
                    assert.equal(vm.inst.rotation.order, "YZX");
                });
                it("\"\" => 0, 0, 0, \"XYZ\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: ""}
                    });
                    assert.strictEqual(vm.inst.rotation.x, 0);
                    assert.strictEqual(vm.inst.rotation.y, 0);
                    assert.strictEqual(vm.inst.rotation.z, 0);
                    assert.equal(vm.inst.rotation.order, "XYZ");
                });
            });
        });
        describe("scaleのテスト", function() {
            describe("Non-data", function() {
                it("undefined => 1, 1, 1", function() {
                    const vm = new (Vue.extend(VglObject3d))();
                    assert.strictEqual(vm.inst.scale.x, 1);
                    assert.strictEqual(vm.inst.scale.y, 1);
                    assert.strictEqual(vm.inst.scale.z, 1);
                });
                it("null => 1, 1, 1", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: null}
                    });
                    assert.strictEqual(vm.inst.scale.x, 1);
                    assert.strictEqual(vm.inst.scale.y, 1);
                    assert.strictEqual(vm.inst.scale.z, 1);
                });
            });
            describe("配列", function() {
                it("[-2.3, 8, 9.2e-3] => -2.3, 8, 9.2e-3", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: [-2.3, 8, 9.2e-3]}
                    });
                    assert.strictEqual(vm.inst.scale.x, -2.3);
                    assert.strictEqual(vm.inst.scale.y, 8);
                    assert.strictEqual(vm.inst.scale.z, 9.2e-3);
                });
                it("[\"-2.3\", \"72.1\", \"9.2e-3'\"] => -2.3, 72.1, 9.2e-3", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: ["-2.3", "72.1", "9.2e-3"]}
                    });
                    assert.strictEqual(vm.inst.scale.x, -2.3);
                    assert.strictEqual(vm.inst.scale.y, 72.1);
                    assert.strictEqual(vm.inst.scale.z, 9.2e-3);
                });
            });
            describe("オブジェクト", function() {
                it("{x: -1, y: -5, z: 6.8} => -1, -5, 6.8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: {x: -1, y: -5, z: 6.8}}
                    });
                    assert.strictEqual(vm.inst.scale.x, -1);
                    assert.strictEqual(vm.inst.scale.y, -5);
                    assert.strictEqual(vm.inst.scale.z, 6.8);
                });
                it("{x: -1, y: -5, z: 6.8} => -1, -5, 6.8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: {x: -1, y: -5, z: 6.8}}
                    });
                    assert.strictEqual(vm.inst.scale.x, -1);
                    assert.strictEqual(vm.inst.scale.y, -5);
                    assert.strictEqual(vm.inst.scale.z, 6.8);
                });
            });
            describe("文字列", function() {
                it("\"-1.0 -5e8 6.8\" => -1, -5e8, 6.8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: "-1.0 -5e8 6.8"}
                    });
                    assert.strictEqual(vm.inst.scale.x, -1);
                    assert.strictEqual(vm.inst.scale.y, -5e8);
                    assert.strictEqual(vm.inst.scale.z, 6.8);
                });
                it("\"-1.0  -5e8   6.8\" => -1, -5e8, 6.8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: "-1.0  -5e8   6.8"}
                    });
                    assert.strictEqual(vm.inst.scale.x, -1);
                    assert.strictEqual(vm.inst.scale.y, -5e8);
                    assert.strictEqual(vm.inst.scale.z, 6.8);
                });
                it("\" -1.0  -5e8   6.8  \" => -1, -5e8, 6.8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: " -1.0  -5e8   6.8  "}
                    });
                    assert.strictEqual(vm.inst.scale.x, -1);
                    assert.strictEqual(vm.inst.scale.y, -5e8);
                    assert.strictEqual(vm.inst.scale.z, 6.8);
                });
                it("\" -1.0ad<'  -5e8'   6.8x9  \" => -1, -5e8, 6.8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: " -1.0ad<'  -5e8'   6.8x9  "}
                    });
                    assert.strictEqual(vm.inst.scale.x, -1);
                    assert.strictEqual(vm.inst.scale.y, -5e8);
                    assert.strictEqual(vm.inst.scale.z, 6.8);
                });
                it("\"\" => 1, 1, 1", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: ""}
                    });
                    assert.strictEqual(vm.inst.scale.x, 1);
                    assert.strictEqual(vm.inst.scale.y, 1);
                    assert.strictEqual(vm.inst.scale.z, 1);
                });
            });
        });
    });
    describe("プロパティの変更のテスト", function() {
        describe("positionの変更", function() {
            it("undefined -> \"1.1 -1.9 8\"", function(done) {
                const vm = new Vue({
                    template: `<div><vgl-object3d v-if="un" key="1" ref="r" /><vgl-object3d v-else position="1.1 -1.9 8" key="1" ref="r" /></div>`,
                    data: {un: true},
                    components: {VglObject3d}
                }).$mount();
                assert.strictEqual(vm.$refs.r.inst.position.x, 0);
                assert.strictEqual(vm.$refs.r.inst.position.y, 0);
                assert.strictEqual(vm.$refs.r.inst.position.z, 0);
                vm.un = false;
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.r.inst.position.x, 1.1);
                    assert.strictEqual(vm.$refs.r.inst.position.y, -1.9);
                    assert.strictEqual(vm.$refs.r.inst.position.z, 8);
                    done();
                });
            });
            it("\"2.1 3 5\" -> \"1.1 -1.9 8\"", function(done) {
                const vm = new Vue({
                    template: `<vgl-object3d :position="pos" ref="r" />`,
                    data: {pos: "2.1 3 5"},
                    components: {VglObject3d}
                }).$mount();
                assert.strictEqual(vm.$refs.r.inst.position.x, 2.1);
                assert.strictEqual(vm.$refs.r.inst.position.y, 3);
                assert.strictEqual(vm.$refs.r.inst.position.z, 5);
                vm.pos = "1.1 -1.9 8";
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.r.inst.position.x, 1.1);
                    assert.strictEqual(vm.$refs.r.inst.position.y, -1.9);
                    assert.strictEqual(vm.$refs.r.inst.position.z, 8);
                    done();
                });
            });
            it("\"2.1 3 5\" -> {x: 1, y: 2.5, z: -8.2}", function(done) {
                const vm = new Vue({
                    template: `<vgl-object3d :position="pos" ref="r" />`,
                    data: {pos: "2.1 3 5"},
                    components: {VglObject3d}
                }).$mount();
                assert.strictEqual(vm.$refs.r.inst.position.x, 2.1);
                assert.strictEqual(vm.$refs.r.inst.position.y, 3);
                assert.strictEqual(vm.$refs.r.inst.position.z, 5);
                vm.pos = {x: 1, y: 2.5, z: -8.2};
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.r.inst.position.x, 1);
                    assert.strictEqual(vm.$refs.r.inst.position.y, 2.5);
                    assert.strictEqual(vm.$refs.r.inst.position.z, -8.2);
                    done();
                });
            });
            it("\"1.1 -1.9 8\" -> undefined", function(done) {
                const vm = new Vue({
                    template: `<div><vgl-object3d v-if="un" key="1" ref="r" /><vgl-object3d v-else position="1.1 -1.9 8" key="1" ref="r" /></div>`,
                    data: {un: false},
                    components: {VglObject3d}
                }).$mount();
                assert.strictEqual(vm.$refs.r.inst.position.x, 1.1);
                assert.strictEqual(vm.$refs.r.inst.position.y, -1.9);
                assert.strictEqual(vm.$refs.r.inst.position.z, 8);
                vm.un = true;
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.r.inst.position.x, 0);
                    assert.strictEqual(vm.$refs.r.inst.position.y, 0);
                    assert.strictEqual(vm.$refs.r.inst.position.z, 0);
                    done();
                });
            });
        });
        describe("rotationの変更", function() {
            it("undefined -> \"1.1 -1.9 8 ZYX\"", function(done) {
                const vm = new Vue({
                    template: `<div><vgl-object3d v-if="un" key="1" ref="r" /><vgl-object3d v-else rotation="1.1 -1.9 8 ZYX" key="1" ref="r" /></div>`,
                    data: {un: true},
                    components: {VglObject3d}
                }).$mount();
                assert.strictEqual(vm.$refs.r.inst.rotation.x, 0);
                assert.strictEqual(vm.$refs.r.inst.rotation.y, 0);
                assert.strictEqual(vm.$refs.r.inst.rotation.z, 0);
                assert.strictEqual(vm.$refs.r.inst.rotation.order, "XYZ");
                vm.un = false;
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.r.inst.rotation.x, 1.1);
                    assert.strictEqual(vm.$refs.r.inst.rotation.y, -1.9);
                    assert.strictEqual(vm.$refs.r.inst.rotation.z, 8);
                    assert.strictEqual(vm.$refs.r.inst.rotation.order, "ZYX");
                    done();
                });
            });
            it("\"2.1 3 5 ZYX\" -> \"1.1 -1.9 8  YZX\"", function(done) {
                const vm = new Vue({
                    template: `<vgl-object3d :rotation="rot" ref="r" />`,
                    data: {rot: "2.1 3 5 ZYX"},
                    components: {VglObject3d}
                }).$mount();
                assert.strictEqual(vm.$refs.r.inst.rotation.x, 2.1);
                assert.strictEqual(vm.$refs.r.inst.rotation.y, 3);
                assert.strictEqual(vm.$refs.r.inst.rotation.z, 5);
                assert.strictEqual(vm.$refs.r.inst.rotation.order, "ZYX");
                vm.rot = "1.1 -1.9 8  YZX";
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.r.inst.rotation.x, 1.1);
                    assert.strictEqual(vm.$refs.r.inst.rotation.y, -1.9);
                    assert.strictEqual(vm.$refs.r.inst.rotation.z, 8);
                    assert.strictEqual(vm.$refs.r.inst.rotation.order, "YZX");
                    done();
                });
            });
            it("\"2.1 3 5  \" -> {x: 1, y: 2.5, z: -8.2, order: \"YXZ\"}", function(done) {
                const vm = new Vue({
                    template: `<vgl-object3d :rotation="rot" ref="r" />`,
                    data: {rot: "2.1 3 5  "},
                    components: {VglObject3d}
                }).$mount();
                assert.strictEqual(vm.$refs.r.inst.rotation.x, 2.1);
                assert.strictEqual(vm.$refs.r.inst.rotation.y, 3);
                assert.strictEqual(vm.$refs.r.inst.rotation.z, 5);
                assert.strictEqual(vm.$refs.r.inst.rotation.order, "XYZ");
                vm.rot = {x: 1, y: 2.5, z: -8.2, order: "YXZ"};
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.r.inst.rotation.x, 1);
                    assert.strictEqual(vm.$refs.r.inst.rotation.y, 2.5);
                    assert.strictEqual(vm.$refs.r.inst.rotation.z, -8.2);
                    assert.strictEqual(vm.$refs.r.inst.rotation.order, "YXZ");
                    done();
                });
            });
            it("\"1.1 -1.9 8\" -> undefined", function(done) {
                const vm = new Vue({
                    template: `<div><vgl-object3d v-if="un" key="1" ref="r" /><vgl-object3d v-else rotation="1.1 -1.9 8 ZYX" key="1" ref="r" /></div>`,
                    data: {un: false},
                    components: {VglObject3d}
                }).$mount();
                assert.strictEqual(vm.$refs.r.inst.rotation.x, 1.1);
                assert.strictEqual(vm.$refs.r.inst.rotation.y, -1.9);
                assert.strictEqual(vm.$refs.r.inst.rotation.z, 8);
                assert.strictEqual(vm.$refs.r.inst.rotation.order, "ZYX");
                vm.un = true;
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.r.inst.rotation.x, 0);
                    assert.strictEqual(vm.$refs.r.inst.rotation.y, 0);
                    assert.strictEqual(vm.$refs.r.inst.rotation.z, 0);
                    assert.strictEqual(vm.$refs.r.inst.rotation.order, "XYZ");
                    done();
                });
            });
        });
        describe("scaleの変更", function() {
            it("undefined -> \"1.1 -1.9 8\"", function(done) {
                const vm = new Vue({
                    template: `<div><vgl-object3d v-if="un" key="1" ref="r" /><vgl-object3d v-else scale="1.1 -1.9 8" key="1" ref="r" /></div>`,
                    data: {un: true},
                    components: {VglObject3d}
                }).$mount();
                assert.strictEqual(vm.$refs.r.inst.scale.x, 1);
                assert.strictEqual(vm.$refs.r.inst.scale.y, 1);
                assert.strictEqual(vm.$refs.r.inst.scale.z, 1);
                vm.un = false;
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.r.inst.scale.x, 1.1);
                    assert.strictEqual(vm.$refs.r.inst.scale.y, -1.9);
                    assert.strictEqual(vm.$refs.r.inst.scale.z, 8);
                    done();
                });
            });
            it("\"2.1 3 5\" -> \"1.1 -1.9 8\"", function(done) {
                const vm = new Vue({
                    template: `<vgl-object3d :scale="scl" ref="r" />`,
                    data: {scl: "2.1 3 5"},
                    components: {VglObject3d}
                }).$mount();
                assert.strictEqual(vm.$refs.r.inst.scale.x, 2.1);
                assert.strictEqual(vm.$refs.r.inst.scale.y, 3);
                assert.strictEqual(vm.$refs.r.inst.scale.z, 5);
                vm.scl = "1.1 -1.9 8";
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.r.inst.scale.x, 1.1);
                    assert.strictEqual(vm.$refs.r.inst.scale.y, -1.9);
                    assert.strictEqual(vm.$refs.r.inst.scale.z, 8);
                    done();
                });
            });
            it("\"2.1 3 5\" -> {x: 1, y: 2.5, z: -8.2}", function(done) {
                const vm = new Vue({
                    template: `<vgl-object3d :scale="scl" ref="r" />`,
                    data: {scl: "2.1 3 5"},
                    components: {VglObject3d}
                }).$mount();
                assert.strictEqual(vm.$refs.r.inst.scale.x, 2.1);
                assert.strictEqual(vm.$refs.r.inst.scale.y, 3);
                assert.strictEqual(vm.$refs.r.inst.scale.z, 5);
                vm.scl = {x: 1, y: 2.5, z: -8.2};
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.r.inst.scale.x, 1);
                    assert.strictEqual(vm.$refs.r.inst.scale.y, 2.5);
                    assert.strictEqual(vm.$refs.r.inst.scale.z, -8.2);
                    done();
                });
            });
            it("\"1.1 -1.9 8\" -> undefined", function(done) {
                const vm = new Vue({
                    template: `<div><vgl-object3d v-if="un" key="1" ref="r" /><vgl-object3d v-else scale="1.1 -1.9 8" key="1" ref="r" /></div>`,
                    data: {un: false},
                    components: {VglObject3d}
                }).$mount();
                assert.strictEqual(vm.$refs.r.inst.scale.x, 1.1);
                assert.strictEqual(vm.$refs.r.inst.scale.y, -1.9);
                assert.strictEqual(vm.$refs.r.inst.scale.z, 8);
                vm.un = true;
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.r.inst.scale.x, 1);
                    assert.strictEqual(vm.$refs.r.inst.scale.y, 1);
                    assert.strictEqual(vm.$refs.r.inst.scale.z, 1);
                    done();
                });
            });
        });
        describe("インスタンスの置換のテスト", function() {
            it("置換後のposition", function() {
                const vm = new (Vue.extend({
                    mixins: [VglObject3d],
                    computed: {
                        inst() {
                            return this.a ? new Line(): new Mesh();
                        }
                    },
                    data() {
                        return {a: false};
                    }
                }))({
                    propsData: {
                        position: "8  7^ 9"
                    }
                });
                assert.isTrue(vm.inst.isMesh);
                assert.strictEqual(vm.inst.position.x, 8);
                assert.strictEqual(vm.inst.position.y, 7);
                assert.strictEqual(vm.inst.position.z, 9);
                vm.a = true;
                vm.$nextTick(() => {
                    assert.isTrue(vm.inst.isLine);
                    assert.strictEqual(vm.inst.position.x, 8);
                    assert.strictEqual(vm.inst.position.y, 7);
                    assert.strictEqual(vm.inst.position.z, 9);
                });
            });
            it("置換後のrotation", function() {
                const vm = new (Vue.extend({
                    mixins: [VglObject3d],
                    computed: {
                        inst() {
                            return this.a ? new Line(): new Mesh();
                        }
                    },
                    data() {
                        return {a: false};
                    }
                }))({
                    propsData: {
                        rotation: "8  7^ 9 ZYX"
                    }
                });
                assert.isTrue(vm.inst.isMesh);
                assert.strictEqual(vm.inst.rotation.x, 8);
                assert.strictEqual(vm.inst.rotation.y, 7);
                assert.strictEqual(vm.inst.rotation.z, 9);
                assert.strictEqual(vm.inst.rotation.order, "ZYX");
                vm.a = true;
                vm.$nextTick(() => {
                    assert.isTrue(vm.inst.isLine);
                    assert.strictEqual(vm.inst.rotation.x, 8);
                    assert.strictEqual(vm.inst.rotation.y, 7);
                    assert.strictEqual(vm.inst.rotation.z, 9);
                    assert.strictEqual(vm.inst.rotation.order, "ZYX");
                });
            });
            it("置換後のscale", function() {
                const vm = new (Vue.extend({
                    mixins: [VglObject3d],
                    computed: {
                        inst() {
                            return this.a ? new Line(): new Mesh();
                        }
                    },
                    data() {
                        return {a: false};
                    }
                }))({
                    propsData: {
                        scale: "8  7^ 9"
                    }
                });
                assert.isTrue(vm.inst.isMesh);
                assert.strictEqual(vm.inst.scale.x, 8);
                assert.strictEqual(vm.inst.scale.y, 7);
                assert.strictEqual(vm.inst.scale.z, 9);
                vm.a = true;
                vm.$nextTick(() => {
                    assert.isTrue(vm.inst.isLine);
                    assert.strictEqual(vm.inst.scale.x, 8);
                    assert.strictEqual(vm.inst.scale.y, 7);
                    assert.strictEqual(vm.inst.scale.z, 9);
                });
            });
        });
    });
});
