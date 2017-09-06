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
        describe.skip("rotationのテスト", function() {
            describe("Non-data", function() {
            it("rotationがundefinedのとき、Euler(0, 0, 0, 'XYZ')を返す。", function() {
                const vm = {};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(0, 0, 0, "XYZ").equals(result));
            });
            it("rotationがnullのとき、Euler(0, 0, 0, 'XYZ')を返す。", function() {
                const vm = {rotation: null};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(0, 0, 0, "XYZ").equals(result));
            });
            });
            describe("配列", function() {
            it("rotationが配列のとき、変換されたEulerを返す。", function() {
                const vm = {rotation: [1.2, 3.8, 4.2, "YXZ"]};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(1.2, 3.8, 4.2, "YXZ").equals(result));
            });
            it("rotationが短い配列のとき、不足を0で埋める。", function() {
                const vm = {rotation: [1.2, 3.8]};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(1.2, 3.8, 0, "XYZ").equals(result));
            });
            it("rotationが長い配列のとき、先頭の3値をx, y, zとする。", function() {
                const vm = {rotation: [1.2, 3.8, -4.2, 5.8, -8.2]};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(1.2, 3.8, -4.2, "XYZ").equals(result));
            });
            it("rotationが文字列の配列のとき、変換されたEulerを返す。", function() {
                const vm = {rotation: ["1.2", "3.8", "4.2", "XYZ"]};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(1.2, 3.8, 4.2, "XYZ").equals(result));
            });
            it("rotationが空白を含む文字列の配列のとき、変換されたEulerを返す。", function() {
                const vm = {rotation: [" 1.2", "3.8 ", " 4.2  ", "XYZ "]};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(1.2, 3.8, 4.2, "XYZ").equals(result));
            });
            it("rotationが数値以外を含む文字列の配列のとき、可能な限り数値に変換する。", function() {
                const vm = {rotation: [" 1.2e+4<", "3.5e-5' ", " 4.2eq`  ", "XYZ"]};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(1.2e4, 3.5e-5, 4.2).equals(result));
            });
            });
            describe("オブジェクト", function() {
            it("rotationがオブジェクトのとき、プロパティx, y, zをコピーしたEulerを返す。", function() {
                const vm = {rotation: {x: -1, y: -5, z: 6.8, order: "XYZ"}};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(-1, -5, 6.8, "XYZ").equals(result));
            });
            it("rotationがオブジェクトでプロパティが文字列のときは、数値に変換する。", function() {
                const vm = {rotation: {x: "-1", y: "-5", z: "6.8", order: "XYZ"}};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(-1, -5, 6.8, "XYZ").equals(result));
            });
            it("rotationがオブジェクトでプロパティが空白を含む文字列のときは、数値に変換する。", function() {
                const vm = {rotation: {x: "-1 '", y: "　-5", z: " 6.8'", order: "XYZ"}};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(-1, -5, 6.8, "XYZ").equals(result));
            });
            it("rotationがオブジェクトでプロパティが数値でない文字列のときは、可能な限り数値に変換する。", function() {
                const vm = {rotation: {x: "-1.0-5 '", y: "-5e8a", z: " 6.8'", order: "XYZ"}};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(-1, -5e8, 6.8, "XYZ").equals(result));
            });
            });
            describe("文字列", function() {
            it("rotationが文字列のとき、スペース区切りの配列としてパースする。", function() {
                const vm = {rotation: "-1.0 -5e8 6.8 XYZ"};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(-1, -5e8, 6.8, "XYZ").equals(result));
            });
            it("rotationの文字列が重複するスペースを含むとき。", function() {
                const vm = {rotation: "-1.0  -5e8   6.8 XZY"};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(-1, -5e8, 6.8, "XZY").equals(result));
            });
            it("rotationの文字列が前後にスペースを含むとき。", function() {
                const vm = {rotation: " -1.0  -5e8   6.8   YZX"};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(-1, -5e8, 6.8, "YZX").equals(result));
            });
            it("rotationの文字列が数値以外の文字を含むとき。", function() {
                const vm = {rotation: " -1.0ad<'  -5e8'   6.8x9  "};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(-1, -5e8, 6.8, "XYZ").equals(result));
            });
            it("rotationの文字列が表す数値の個数が少ないとき。", function() {
                const vm = {rotation: "-1.0  -5e8    "};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(-1, -5e8, 0, "XYZ").equals(result));
            });
            it("rotationが空文字のとき、Euler(0, 0, 0, 'XYZ')を返す。", function() {
                const vm = {rotation: ""};
                const result = parsedRotation.call(vm);
                assert(result.isEuler);
                assert(new Euler(0, 0, 0, "XYZ").equals(result));
            });
            });
        });
        describe.skip("scaleのテスト", function() {
            describe("Non-data", function() {
            it("scaleがundefinedのとき、Vector3(1, 1, 1)を返す。", function() {
                const vm = {};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1, 1, 1).equals(result));
            });
            it("scaleがnullのとき、Vector3(1, 1, 1)を返す。", function() {
                const vm = {scale: null};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1, 1, 1).equals(result));
            });
            });
            describe("配列", function() {
            it("scaleが配列のとき、変換されたVector3を返す。", function() {
                const vm = {scale: [1.2, 3.8, 4.2]};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2, 3.8, 4.2).equals(result));
            });
            it("scaleが短い配列のとき、不足を1で埋める。", function() {
                const vm = {scale: [1.2, 3.8]};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2, 3.8, 1).equals(result));
            });
            it("scaleが長い配列のとき、先頭の3値をx, y, zとする。", function() {
                const vm = {scale: [1.2, 3.8, -4.2, 5.8, -8.2]};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2, 3.8, -4.2).equals(result));
            });
            it("scaleが文字列の配列のとき、変換されたVector3を返す。", function() {
                const vm = {scale: ["1.2", "3.8", "4.2"]};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2, 3.8, 4.2).equals(result));
            });
            it("scaleが空白を含む文字列の配列のとき、変換されたVector3を返す。", function() {
                const vm = {scale: [" 1.2", "3.8 ", " 4.2  "]};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2, 3.8, 4.2).equals(result));
            });
            it("scaleが数値以外を含む文字列の配列のとき、可能な限り数値に変換する。", function() {
                const vm = {scale: [" 1.2e+4<", "3.5e-5' ", " 4.2eq`  "]};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2e4, 3.5e-5, 4.2).equals(result));
            });
            it("scaleがlength:1の配列のとき、全方向同じ倍率にする。", function() {
                const vm = {scale: [7.2]};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(7.2, 7.2, 7.2).equals(result));
            });
            it("scaleがlength:1の文字列の配列のとき、全方向同じ倍率にする。", function() {
                const vm = {scale: [" 7.2'"]};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(7.2, 7.2, 7.2).equals(result));
            });
            });
            describe("オブジェクト", function() {
            it("scaleがオブジェクトのとき、プロパティx, y, zをコピーしたVector3を返す。", function() {
                const vm = {scale: {x: -1, y: -5, z: 6.8}};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5, 6.8).equals(result));
            });
            it("scaleがオブジェクトでプロパティが文字列のときは、数値に変換する。", function() {
                const vm = {scale: {x: "-1", y: "-5", z: "6.8"}};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5, 6.8).equals(result));
            });
            it("scaleがオブジェクトでプロパティが空白を含む文字列のときは、数値に変換する。", function() {
                const vm = {scale: {x: "-1 '", y: "　-5", z: " 6.8'"}};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5, 6.8).equals(result));
            });
            it("scaleがオブジェクトでプロパティが数値でない文字列のときは、可能な限り数値に変換する。", function() {
                const vm = {scale: {x: "-1.0-5 '", y: "-5e8a", z: " 6.8'"}};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5e8, 6.8).equals(result));
            });
            it("scaleが0を含むオブジェクトのとき、0は1に置換する。", function() {
                const vm = {scale: {x: 2.1, y: 0, z: 1.2}};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(2.1, 1, 1.2).equals(result));
            });
            });
            describe("文字列", function() {
            it("scaleが文字列のとき、スペース区切りの配列としてパースする。", function() {
                const vm = {scale: "-1.0 -5e8 6.8"};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5e8, 6.8).equals(result));
            });
            it("scaleの文字列が重複するスペースを含むとき。", function() {
                const vm = {scale: "-1.0  -5e8   6.8"};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5e8, 6.8).equals(result));
            });
            it("scaleの文字列が前後にスペースを含むとき。", function() {
                const vm = {scale: " -1.0  -5e8   6.8  "};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5e8, 6.8).equals(result));
            });
            it("scaleの文字列が数値以外の文字を含むとき。", function() {
                const vm = {scale: " -1.0ad<'  -5e8'   6.8x9  "};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5e8, 6.8).equals(result));
            });
            it("scaleが空文字のとき、Vector3(1, 1, 1)を返す。", function() {
                const vm = {scale: ""};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1, 1, 1).equals(result));
            });
            it("scaleが0を含む配列のとき、0は1に置換する。", function() {
                const vm = {scale: [0, -3, 1.2]};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1, -3, 1.2).equals(result));
            });
            it("scaleが0を含む文字列のとき、0は1に置換する。", function() {
                const vm = {scale: "2.1 0  1.2"};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(2.1, 1, 1.2).equals(result));
            });
            it("scaleが1要素のみ含む文字列のとき、全方向同じ倍率にする。", function() {
                const vm = {scale: " 7.2e8a'"};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(7.2e8, 7.2e8, 7.2e8).equals(result));
            });
            });
            describe("数値", function() {
            it("scaleが数値のとき、全方向同じ倍率にする。", function() {
                const vm = {scale: 7.2};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(7.2, 7.2, 7.2).equals(result));
            });
            });
        });
    });
});
