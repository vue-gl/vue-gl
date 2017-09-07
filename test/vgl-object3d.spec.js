import {VglObject3d, VglAbstract} from "../src/index.js";
const assert = chai.assert;

describe("VglObject3dコンポーネントのテスト", function() {
    describe("親子関係のテスト", function() {
        describe("インスタンス生成", function() {
            it("子コンポーネントのインスタンスが親コンポーネントのインスタンスにaddされる", function() {
                const vm = new Vue({
                    template: `<vgl-object3d ref="p"><vgl-object3d ref="c" /></vgl-object3d>`,
                    components: {VglObject3d}
                }).$mount();
                assert.equal(vm.$refs.c.inst.parent, vm.$refs.p.inst);
                assert.equal(vm.$refs.p.inst.children[0], vm.$refs.c.inst);
            });
            it("リアクティブなadd", function(done) {
                const vm = new Vue({
                    template: `<vgl-object3d ref="p"><vgl-object3d v-if="a" ref="c" /></vgl-object3d>`,
                    components: {VglObject3d},
                    data: {a: false}
                }).$mount();
                assert.strictEqual(vm.$refs.p.inst.children.length, 0);
                vm.a = true;
                vm.$nextTick(() => {
                    assert.equal(vm.$refs.c.inst.parent, vm.$refs.p.inst);
                    assert.equal(vm.$refs.p.inst.children[0], vm.$refs.c.inst);
                    done();
                });
            });
            it("Object3D以外のコンポーネントをスキップしてaddされる", function() {
                const vm = new Vue({
                    template: `<vgl-object3d ref="p"><vgl-abstract><vgl-object3d ref="c" /></vgl-abstract></vgl-object3d>`,
                    components: {VglObject3d, VglAbstract}
                }).$mount();
                assert.equal(vm.$refs.c.inst.parent, vm.$refs.p.inst);
                assert.equal(vm.$refs.p.inst.children[0], vm.$refs.c.inst);
            });
            it("スキップしてリアクティブにaddされる", function(done) {
                const vm = new Vue({
                    template: `<vgl-object3d ref="p"><vgl-abstract v-if="b"><vgl-object3d ref="c" /></vgl-abstract></vgl-object3d>`,
                    components: {VglObject3d, VglAbstract},
                    data: {b: false}
                }).$mount();
                assert.strictEqual(vm.$refs.p.inst.children.length, 0);
                vm.b = true;
                vm.$nextTick(() => {
                    assert.equal(vm.$refs.c.inst.parent, vm.$refs.p.inst);
                    assert.equal(vm.$refs.p.inst.children[0], vm.$refs.c.inst);
                    done();
                });
            });
        });
        describe("インスタンス破棄", function() {
            it("子コンポーネントのインスタンスが親コンポーネントのインスタンスからremoveされる", function(done) {
                const vm = new Vue({
                    template: `<vgl-object3d ref="p"><vgl-object3d v-if="d" ref="c" /></vgl-object3d>`,
                    components: {VglObject3d},
                    data: {d: true}
                }).$mount();
                assert.equal(vm.$refs.c.inst.parent, vm.$refs.p.inst);
                assert.equal(vm.$refs.p.inst.children[0], vm.$refs.c.inst);
                vm.d = false;
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.p.inst.children.length, 0);
                    done();
                });
            });
            it("Object3D以外のコンポーネントをスキップしてremoveされる", function(done) {
                const vm = new Vue({
                    template: `<vgl-object3d ref="p"><vgl-abstract v-if="e"><vgl-object3d ref="c" /></vgl-abstract></vgl-object3d>`,
                    components: {VglObject3d, VglAbstract},
                    data: {e: true}
                }).$mount();
                assert.equal(vm.$refs.c.inst.parent, vm.$refs.p.inst);
                assert.equal(vm.$refs.p.inst.children[0], vm.$refs.c.inst);
                vm.e = false;
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.p.inst.children.length, 0);
                    done();
                });
            });
        });
    });
    describe("プロパティのテスト", function() {
        describe("positionのテスト", function() {
            describe("Non-data", function() {
                it("undefined => 0, 0, 0", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {}
                    });
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
                it("[1.2, 3.8, 4.2] => 1.2, 3.8, 4.2", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: [1.2, 3.8, 4.2]}
                    });
                    assert.strictEqual(vm.inst.position.x, 1.2);
                    assert.strictEqual(vm.inst.position.y, 3.8);
                    assert.strictEqual(vm.inst.position.z, 4.2);
                });
                it("[1.2, 3.8] => 1.2, 3.8, 0", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: [1.2, 3.8]}
                    });
                    assert.strictEqual(vm.inst.position.x, 1.2);
                    assert.strictEqual(vm.inst.position.y, 3.8);
                    assert.strictEqual(vm.inst.position.z, 0);
                });
                it("[1.2, 3.8, -4.2, 5.8, -8.2] => 1.2, 3.8, -4.2", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: [1.2, 3.8, -4.2, 5.8, -8.2]}
                    });
                    assert.strictEqual(vm.inst.position.x, 1.2);
                    assert.strictEqual(vm.inst.position.y, 3.8);
                    assert.strictEqual(vm.inst.position.z, -4.2);
                });
                it("[\"1.2\", \"3.8\", \"4.2\"] => 1.2, 3.8, 4.2", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: ["1.2", "3.8", "4.2"]}
                    });
                    assert.strictEqual(vm.inst.position.x, 1.2);
                    assert.strictEqual(vm.inst.position.y, 3.8);
                    assert.strictEqual(vm.inst.position.z, 4.2);
                });
                it("[\" 1.2\", \"3.8 \", \" 4.2  \"] => 1.2, 3.8, 4.2", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: [" 1.2", "3.8 ", " 4.2  "]}
                    });
                    assert.strictEqual(vm.inst.position.x, 1.2);
                    assert.strictEqual(vm.inst.position.y, 3.8);
                    assert.strictEqual(vm.inst.position.z, 4.2);
                });
                it("[\" 1.2e+4<\", \"3.5e-5' \", \" 4.2eq`  \"] => 1.2e4, 3.5e-5, 4.2", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: [" 1.2e+4<", "3.5e-5' ", " 4.2eq`  "]}
                    });
                    assert.strictEqual(vm.inst.position.x, 1.2e4);
                    assert.strictEqual(vm.inst.position.y, 3.5e-5);
                    assert.strictEqual(vm.inst.position.z, 4.2);
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
                it("{x: \"-1\", y: \"-5\", z: \"6.8\"} => -1, -5, 6.8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: {x: "-1", y: "-5", z: "6.8"}}
                    });
                    assert.strictEqual(vm.inst.position.x, -1);
                    assert.strictEqual(vm.inst.position.y, -5);
                    assert.strictEqual(vm.inst.position.z, 6.8);
                });
                it("{x: \"-1 '\", y: \"　-5\", z: \" 6.8'\"} => -1, -5, 6.8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: {x: "-1 '", y: "　-5", z: " 6.8'"}}
                    });
                    assert.strictEqual(vm.inst.position.x, -1);
                    assert.strictEqual(vm.inst.position.y, -5);
                    assert.strictEqual(vm.inst.position.z, 6.8);
                });
                it("{x: \"-1.0-5 '\", y: \"-5e8a\", z: \" 6.8'\"} => -1, -5e8, 6.8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {position: {x: "-1.0-5 '", y: "-5e8a", z: " 6.8'"}}
                    });
                    assert.strictEqual(vm.inst.position.x, -1);
                    assert.strictEqual(vm.inst.position.y, -5e8);
                    assert.strictEqual(vm.inst.position.z, 6.8);
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
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {}
                    });
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
                it("[1.2, 3.8, 4.2, \"YXZ\"] => 1.2, 3.8, 4.2, \"YXZ\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: [1.2, 3.8, 4.2, "YXZ"]}
                    });
                    assert.strictEqual(vm.inst.rotation.x, 1.2);
                    assert.strictEqual(vm.inst.rotation.y, 3.8);
                    assert.strictEqual(vm.inst.rotation.z, 4.2);
                    assert.equal(vm.inst.rotation.order, "YXZ");
                }); 
                it("[1.2, 3.8] => 1.2, 3.8, 0, \"XYZ\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: [1.2, 3.8]}
                    });
                    assert.strictEqual(vm.inst.rotation.x, 1.2);
                    assert.strictEqual(vm.inst.rotation.y, 3.8);
                    assert.strictEqual(vm.inst.rotation.z, 0);
                    assert.equal(vm.inst.rotation.order, "XYZ");
                });
                it("[1.2, 3.8, -4.2, 5.8, -8.2] => 1.2, 3.8, -4.2, \"XYZ\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: [1.2, 3.8, -4.2, 5.8, -8.2]}
                    });
                    assert.strictEqual(vm.inst.rotation.x, 1.2);
                    assert.strictEqual(vm.inst.rotation.y, 3.8);
                    assert.strictEqual(vm.inst.rotation.z, -4.2);
                    assert.equal(vm.inst.rotation.order, "XYZ");
                });
                it("[\"1.2\", \"3.8\", \"4.2\", \"XYZ\"] => 1.2, 3.8, 4.2, \"XYZ\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: ["1.2", "3.8", "4.2", "XYZ"]}
                    });
                    assert.strictEqual(vm.inst.rotation.x, 1.2);
                    assert.strictEqual(vm.inst.rotation.y, 3.8);
                    assert.strictEqual(vm.inst.rotation.z, 4.2);
                    assert.equal(vm.inst.rotation.order, "XYZ");
                });
                it("[\" 1.2\", \"3.8 \", \" 4.2  \", \"XYZ \"] => 1.2, 3.8, 4.2, \"XYZ\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: [" 1.2", "3.8 ", " 4.2  ", "XYZ "]}
                    });
                    assert.strictEqual(vm.inst.rotation.x, 1.2);
                    assert.strictEqual(vm.inst.rotation.y, 3.8);
                    assert.strictEqual(vm.inst.rotation.z, 4.2);
                    assert.equal(vm.inst.rotation.order, "XYZ");
                });
                it("[\" 1.2e+4<\", \"3.5e-5' \", \" 4.2eq`  \", \"XYZ\"] => 1.2e4, 3.5e-5, 4.2, \"XYZ\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: [" 1.2e+4<", "3.5e-5' ", " 4.2eq`  ", "XYZ"]}
                    });
                    assert.strictEqual(vm.inst.rotation.x, 1.2e4);
                    assert.strictEqual(vm.inst.rotation.y, 3.5e-5);
                    assert.strictEqual(vm.inst.rotation.z, 4.2);
                    assert.equal(vm.inst.rotation.order, "XYZ");
                });
            });
            describe("オブジェクト", function() {
                it("{x: -1, y: -5, z: 6.8, order: \"XYZ\"} => -1, -5, 6.8, \"XYZ\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: {x: -1, y: -5, z: 6.8, order: "XYZ"}}
                    });
                    assert.strictEqual(vm.inst.rotation.x, -1);
                    assert.strictEqual(vm.inst.rotation.y, -5);
                    assert.strictEqual(vm.inst.rotation.z, 6.8);
                    assert.equal(vm.inst.rotation.order, "XYZ");
                });
                it("{x: \"-1\", y: \"-5\", z: \"6.8\", order: \"XYZ\"} => -1, -5, 6.8, \"XYZ\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: {x: "-1", y: "-5", z: "6.8", order: "XYZ"}}
                    });
                    assert.strictEqual(vm.inst.rotation.x, -1);
                    assert.strictEqual(vm.inst.rotation.y, -5);
                    assert.strictEqual(vm.inst.rotation.z, 6.8);
                    assert.equal(vm.inst.rotation.order, "XYZ");
                });
                it("{x: \"-1 '\", y: \"　-5\", z: \" 6.8'\", order: \"XYZ\"} => -1, -5, 6.8, \"XYZ\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: {x: "-1 '", y: "　-5", z: " 6.8'", order: "XYZ"}}
                    });
                    assert.strictEqual(vm.inst.rotation.x, -1);
                    assert.strictEqual(vm.inst.rotation.y, -5);
                    assert.strictEqual(vm.inst.rotation.z, 6.8);
                    assert.equal(vm.inst.rotation.order, "XYZ");
                });
                it("{x: \"-1.0-5 '\", y: \"-5e8a\", z: \" 6.8'\", order: \"ZYX\"} => -1, -5e8, 6.8, \"ZYX\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: {x: "-1.0-5 '", y: "-5e8a", z: " 6.8'", order: "ZYX"}}
                    });
                    assert.strictEqual(vm.inst.rotation.x, -1);
                    assert.strictEqual(vm.inst.rotation.y, -5e8);
                    assert.strictEqual(vm.inst.rotation.z, 6.8);
                    assert.equal(vm.inst.rotation.order, "ZYX");
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
                it("\" -1.0  -5e8   6.8   YZX\" => -1, -5e8, 6.8, \"YZX\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: " -1.0  -5e8   6.8   YZX"}
                    });
                    assert.strictEqual(vm.inst.rotation.x, -1);
                    assert.strictEqual(vm.inst.rotation.y, -5e8);
                    assert.strictEqual(vm.inst.rotation.z, 6.8);
                    assert.equal(vm.inst.rotation.order, "YZX");
                });
                it("\" -1.0ad<'  -5e8'   6.8x9  \" => -1, -5e8, 6.8, \"XYZ\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: " -1.0ad<'  -5e8'   6.8x9  "}
                    });
                    assert.strictEqual(vm.inst.rotation.x, -1);
                    assert.strictEqual(vm.inst.rotation.y, -5e8);
                    assert.strictEqual(vm.inst.rotation.z, 6.8);
                    assert.equal(vm.inst.rotation.order, "XYZ");
                });
                it("\"-1.0  -5e8    \" => -1, -5e8, 0, \"XYZ\"", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {rotation: "-1.0  -5e8    "}
                    });
                    assert.strictEqual(vm.inst.rotation.x, -1);
                    assert.strictEqual(vm.inst.rotation.y, -5e8);
                    assert.strictEqual(vm.inst.rotation.z, 0);
                    assert.equal(vm.inst.rotation.order, "XYZ");
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
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {}
                    });
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
                it("[1.2, 3.8, 4.2] => 1.2, 3.8, 4.2", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: [1.2, 3.8, 4.2]}
                    });
                    assert.strictEqual(vm.inst.scale.x, 1.2);
                    assert.strictEqual(vm.inst.scale.y, 3.8);
                    assert.strictEqual(vm.inst.scale.z, 4.2);
                });
                it("[1.2, 3.8] => 1.2, 3.8, 1", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: [1.2, 3.8]}
                    });
                    assert.strictEqual(vm.inst.scale.x, 1.2);
                    assert.strictEqual(vm.inst.scale.y, 3.8);
                    assert.strictEqual(vm.inst.scale.z, 1);
                });
                it("[1.2, 3.8, -4.2, 5.8, -8.2] => 1.2, 3.8, -4.2", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: [1.2, 3.8, -4.2, 5.8, -8.2]}
                    });
                    assert.strictEqual(vm.inst.scale.x, 1.2);
                    assert.strictEqual(vm.inst.scale.y, 3.8);
                    assert.strictEqual(vm.inst.scale.z, -4.2);
                });
                it("[\"1.2\", \"3.8\", \"4.2\"] => 1.2, 3.8, 4.2", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: ["1.2", "3.8", "4.2"]}
                    });
                    assert.strictEqual(vm.inst.scale.x, 1.2);
                    assert.strictEqual(vm.inst.scale.y, 3.8);
                    assert.strictEqual(vm.inst.scale.z, 4.2);
                });
                it("[\" 1.2\", \"3.8 \", \" 4.2  \"] => 1.2, 3.8, 4.2", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: [" 1.2", "3.8 ", " 4.2  "]}
                    });
                    assert.strictEqual(vm.inst.scale.x, 1.2);
                    assert.strictEqual(vm.inst.scale.y, 3.8);
                    assert.strictEqual(vm.inst.scale.z, 4.2);
                });
                it("[\" 1.2e+4<\", \"3.5e-5' \", \" 4.2eq`  \"] => 1.2e4, 3.5e-5, 4.2", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: [" 1.2e+4<", "3.5e-5' ", " 4.2eq`  "]}
                    });
                    assert.strictEqual(vm.inst.scale.x, 1.2e4);
                    assert.strictEqual(vm.inst.scale.y, 3.5e-5);
                    assert.strictEqual(vm.inst.scale.z, 4.2);
                });
                it("[7.2] => 7.2, 7.2, 7.2", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: [7.2]}
                    });
                    assert.strictEqual(vm.inst.scale.x, 7.2);
                    assert.strictEqual(vm.inst.scale.y, 7.2);
                    assert.strictEqual(vm.inst.scale.z, 7.2);
                });
                it("[\" 7.2'\"] => 7.2, 7.2, 7.2", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: [" 7.2'"]}
                    });
                    assert.strictEqual(vm.inst.scale.x, 7.2);
                    assert.strictEqual(vm.inst.scale.y, 7.2);
                    assert.strictEqual(vm.inst.scale.z, 7.2);
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
                it("{x: \"-1\", y: \"-5\", z: \"6.8\"} => -1, -5, 6.8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: {x: "-1", y: "-5", z: "6.8"}}
                    });
                    assert.strictEqual(vm.inst.scale.x, -1);
                    assert.strictEqual(vm.inst.scale.y, -5);
                    assert.strictEqual(vm.inst.scale.z, 6.8);
                });
                it("{x: \"-1 '\", y: \"　-5\", z: \" 6.8'\"} => -1, -5, 6.8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: {x: "-1 '", y: "　-5", z: " 6.8'"}}
                    });
                    assert.strictEqual(vm.inst.scale.x, -1);
                    assert.strictEqual(vm.inst.scale.y, -5);
                    assert.strictEqual(vm.inst.scale.z, 6.8);
                });
                it("{x: \"-1.0-5 '\", y: \"-5e8a\", z: \" 6.8'\"} => -1, -5e8, 6.8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: {x: "-1.0-5 '", y: "-5e8a", z: " 6.8'"}}
                    });
                    assert.strictEqual(vm.inst.scale.x, -1);
                    assert.strictEqual(vm.inst.scale.y, -5e8);
                    assert.strictEqual(vm.inst.scale.z, 6.8);
                });
                it("{x: 2.1, y: 0, z: 1.2} => 2.1, 1, 1.2", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: {x: 2.1, y: 0, z: 1.2}}
                    });
                    assert.strictEqual(vm.inst.scale.x, 2.1);
                    assert.strictEqual(vm.inst.scale.y, 1);
                    assert.strictEqual(vm.inst.scale.z, 1.2);
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
                it("[0, -3, 1.2] => 1, -3, 1.2", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: [0, -3, 1.2]}
                    });
                    assert.strictEqual(vm.inst.scale.x, 1);
                    assert.strictEqual(vm.inst.scale.y, -3);
                    assert.strictEqual(vm.inst.scale.z, 1.2);
                });
                it("\"2.1 0  1.2\" => 2.1, 1, 1.2", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: "2.1 0  1.2"}
                    });
                    assert.strictEqual(vm.inst.scale.x, 2.1);
                    assert.strictEqual(vm.inst.scale.y, 1);
                    assert.strictEqual(vm.inst.scale.z, 1.2);
                });
                it("\" 7.2e8a'\" => 7.2e8, 7.2e8, 7.2e8", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: " 7.2e8a'"}
                    });
                    assert.strictEqual(vm.inst.scale.x, 7.2e8);
                    assert.strictEqual(vm.inst.scale.y, 7.2e8);
                    assert.strictEqual(vm.inst.scale.z, 7.2e8);
                });
            });
            describe("数値", function() {
                it("7.2 => 7.2, 7.2, 7.2", function() {
                    const vm = new (Vue.extend(VglObject3d))({
                        propsData: {scale: 7.2}
                    });
                    assert.strictEqual(vm.inst.scale.x, 7.2);
                    assert.strictEqual(vm.inst.scale.y, 7.2);
                    assert.strictEqual(vm.inst.scale.z, 7.2);
                });
            });
        });
    });
});
