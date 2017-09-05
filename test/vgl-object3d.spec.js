import {VglObject3d} from "../src/index.js";
const assert = chai.assert;

describe("VglObject3dコンポーネントのテスト", function() {
    describe("親子関係のテスト", function() {
        it("子コンポーネントのインスタンスが親コンポーネントのインスタンスにaddされる", function() {
            const vm = new Vue({
                template: `<vgl-object3d ref="p"><vgl-object3d ref="c" /></vgl-object3d>`,
                components: {VglObject3d}
            }).$mount();
            assert.equal(vm.$refs.c.inst.parent, vm.$refs.p.inst);
            assert.strictEqual(vm.$refs.p.inst.children.indexOf(vm.$refs.c.inst), 0);
        });
    });
/*
    describe("computedのテスト", function() {
        describe("parsedPositionのテスト", function() {
            it("positionがundefinedのとき、Vector3(0, 0, 0)を返す。", function() {
                const vm = {};
                const result = parsedPosition.call(vm);
                assert(result.isVector3);
                assert(new Vector3(0, 0, 0).equals(result));
            });
            it("positionがnullのとき、Vector3(0, 0, 0)を返す。", function() {
                const vm = {position: null};
                const result = parsedPosition.call(vm);
                assert(result.isVector3);
                assert(new Vector3(0, 0, 0).equals(result));
            });
            it("positionが配列のとき、変換されたVector3を返す。", function() {
                const vm = {position: [1.2, 3.8, 4.2]};
                const result = parsedPosition.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2, 3.8, 4.2).equals(result));
            });
            it("positionが短い配列のとき、不足を0で埋める。", function() {
                const vm = {position: [1.2, 3.8]};
                const result = parsedPosition.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2, 3.8, 0).equals(result));
            });
            it("positionが長い配列のとき、先頭の3値をx, y, zとする。", function() {
                const vm = {position: [1.2, 3.8, -4.2, 5.8, -8.2]};
                const result = parsedPosition.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2, 3.8, -4.2).equals(result));
            });
            it("positionが文字列の配列のとき、変換されたVector3を返す。", function() {
                const vm = {position: ["1.2", "3.8", "4.2"]};
                const result = parsedPosition.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2, 3.8, 4.2).equals(result));
            });
            it("positionが空白を含む文字列の配列のとき、変換されたVector3を返す。", function() {
                const vm = {position: [" 1.2", "3.8 ", " 4.2  "]};
                const result = parsedPosition.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2, 3.8, 4.2).equals(result));
            });
            it("positionが数値以外を含む文字列の配列のとき、可能な限り数値に変換する。", function() {
                const vm = {position: [" 1.2e+4<", "3.5e-5' ", " 4.2eq`  "]};
                const result = parsedPosition.call(vm);
                assert(result.isVector3);
                assert(new Vector3(1.2e4, 3.5e-5, 4.2).equals(result));
            });
            it("positionがオブジェクトのとき、プロパティx, y, zをコピーしたVector3を返す。", function() {
                const vm = {position: {x: -1, y: -5, z: 6.8}};
                const result = parsedPosition.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5, 6.8).equals(result));
            });
            it("positionがオブジェクトでプロパティが文字列のときは、数値に変換する。", function() {
                const vm = {position: {x: "-1", y: "-5", z: "6.8"}};
                const result = parsedPosition.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5, 6.8).equals(result));
            });
            it("positionがオブジェクトでプロパティが空白を含む文字列のときは、数値に変換する。", function() {
                const vm = {position: {x: "-1 '", y: "　-5", z: " 6.8'"}};
                const result = parsedPosition.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5, 6.8).equals(result));
            });
            it("positionがオブジェクトでプロパティが数値でない文字列のときは、可能な限り数値に変換する。", function() {
                const vm = {position: {x: "-1.0-5 '", y: "-5e8a", z: " 6.8'"}};
                const result = parsedPosition.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5e8, 6.8).equals(result));
            });
            it("positionが文字列のとき、スペース区切りの配列としてパースする。", function() {
                const vm = {position: "-1.0 -5e8 6.8"};
                const result = parsedPosition.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5e8, 6.8).equals(result));
            });
            it("positionの文字列が重複するスペースを含むとき。", function() {
                const vm = {position: "-1.0  -5e8   6.8"};
                const result = parsedPosition.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5e8, 6.8).equals(result));
            });
            it("positionの文字列が前後にスペースを含むとき。", function() {
                const vm = {position: " -1.0  -5e8   6.8  "};
                const result = parsedPosition.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5e8, 6.8).equals(result));
            });
            it("positionの文字列が数値以外の文字を含むとき。", function() {
                const vm = {position: " -1.0ad<'  -5e8'   6.8x9  "};
                const result = parsedPosition.call(vm);
                assert(result.isVector3);
                assert(new Vector3(-1, -5e8, 6.8).equals(result));
            });
            it("positionが空文字のとき、Vector3(0, 0, 0)を返す。", function() {
                const vm = {position: ""};
                const result = parsedPosition.call(vm);
                assert(result.isVector3);
                assert(new Vector3(0, 0, 0).equals(result));
            });
        });
        describe("parsedRotationのテスト", function() {
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
        describe("parsedScaleのテスト", function() {
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
            it("scaleが0を含むオブジェクトのとき、0は1に置換する。", function() {
                const vm = {scale: {x: 2.1, y: 0, z: 1.2}};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(2.1, 1, 1.2).equals(result));
            });
            it("scaleが0を含む文字列のとき、0は1に置換する。", function() {
                const vm = {scale: "2.1 0  1.2"};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(2.1, 1, 1.2).equals(result));
            });
            it("scaleが数値のとき、全方向同じ倍率にする。", function() {
                const vm = {scale: 7.2};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(7.2, 7.2, 7.2).equals(result));
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
            it("scaleが1要素のみ含む文字列のとき、全方向同じ倍率にする。", function() {
                const vm = {scale: " 7.2e8a'"};
                const result = parsedScale.call(vm);
                assert(result.isVector3);
                assert(new Vector3(7.2e8, 7.2e8, 7.2e8).equals(result));
            });
        });
    });
    */
});
