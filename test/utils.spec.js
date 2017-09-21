import {parseVector3, parseEuler, parseSpherical, parseNumber} from "../src/utils.js";
const assert = chai.assert;

describe("Utilsモジュールのテスト", function() {
    describe("parseVector3のテスト", function() {
        describe("数値のパース", function() {
            it("3 -> 3, 3, 3", function() {
                const a = parseVector3(3);
                assert.strictEqual(a.x, 3);
                assert.strictEqual(a.y, 3);
                assert.strictEqual(a.z, 3);
            });
        });
        describe("配列のパース", function() {
            it("[3, 2, 1] -> 3, 2, 1", function() {
                const a = parseVector3([3, 2, 1]);
                assert.strictEqual(a.x, 3);
                assert.strictEqual(a.y, 2);
                assert.strictEqual(a.z, 1);
            });
            it("[\"3\", \"-2\", \"1\"] -> 3, -2, 1", function() {
                const a = parseVector3(["3", "-2", "1"]);
                assert.strictEqual(a.x, 3);
                assert.strictEqual(a.y, -2);
                assert.strictEqual(a.z, 1);
            });
        });
        describe("オブジェクトのパース", function() {
            it("{x: 3, y: 2, z: -1} -> 3, 2, -1", function() {
                const a = parseVector3({x: 3, y: 2, z: -1});
                assert.strictEqual(a.x, 3);
                assert.strictEqual(a.y, 2);
                assert.strictEqual(a.z, -1);
            });
            it("{x: \"-3\", y: \"2\", z: \"-1\"} -> 3, 2, -1", function() {
                const a = parseVector3({x: "-3", y: "2", z: "-1"});
                assert.strictEqual(a.x, -3);
                assert.strictEqual(a.y, 2);
                assert.strictEqual(a.z, -1);
            });
            it("{x: \"-3\", z: \"-1\"} -> 3, -1", function() {
                const a = parseVector3({x: "-3", z: "-1"});
                assert.strictEqual(a.x, -3);
                assert.strictEqual(a.y, 0);
                assert.strictEqual(a.z, -1);
            });
        });
        describe("文字列のパース", function() {
            it("\"x: 3; y: -2; z: -1\" -> 3, -2, -1", function() {
                const a = parseVector3("x: 3; y: -2; z: -1");
                assert.strictEqual(a.x, 3);
                assert.strictEqual(a.y, -2);
                assert.strictEqual(a.z, -1);
            });
            it("\"-3  2 -1.5 \" -> -3, 2, -1.5", function() {
                const a = parseVector3("-3  2 -1.5 ");
                assert.strictEqual(a.x, -3);
                assert.strictEqual(a.y, 2);
                assert.strictEqual(a.z, -1.5);
            });
        });
    });
    describe("parseEulerのテスト", function() {
        describe("配列のパース", function() {
            it("[3, 2, 1, \"YXZ\"] -> 3, 2, 1, \"YXZ\"", function() {
                const a = parseEuler([3, 2, 1, "YXZ"]);
                assert.strictEqual(a.x, 3);
                assert.strictEqual(a.y, 2);
                assert.strictEqual(a.z, 1);
                assert.strictEqual(a.order, "YXZ");
            });
            it("[\"3\", \"-2\", \"1\", \"YZX\"] -> 3, -2, 1, \"YZX\"", function() {
                const a = parseEuler(["3", "-2", "1", "YZX"]);
                assert.strictEqual(a.x, 3);
                assert.strictEqual(a.y, -2);
                assert.strictEqual(a.z, 1);
                assert.strictEqual(a.order, "YZX");
            });
        });
        describe("オブジェクトのパース", function() {
            it("{x: 3, y: 2, z: -1, order: \"ZXY\"} -> 3, 2, -1, \"ZXY\"", function() {
                const a = parseEuler({x: 3, y: 2, z: -1, order: "ZXY"});
                assert.strictEqual(a.x, 3);
                assert.strictEqual(a.y, 2);
                assert.strictEqual(a.z, -1);
                assert.strictEqual(a.order, "ZXY");
            });
            it("{x: \"-3\", y: \"2\", z: \"-1\", order: \"XYZ\"} -> 3, 2, -1, \"XYZ\"", function() {
                const a = parseEuler({x: "-3", y: "2", z: "-1", order: "XYZ"});
                assert.strictEqual(a.x, -3);
                assert.strictEqual(a.y, 2);
                assert.strictEqual(a.z, -1);
                assert.strictEqual(a.order, "XYZ");
            });
            it("{x: \"-3\", z: \"-1\"} -> -3, 0, -1", function() {
                const a = parseEuler({x: "-3", z: "-1"});
                assert.strictEqual(a.x, -3);
                assert.strictEqual(a.y, 0);
                assert.strictEqual(a.z, -1);
                assert.strictEqual(a.order, "XYZ");
            });
        });
        describe("文字列のパース", function() {
            it("\"x: 3; y: -2; z: -1; order: YZX\" -> 3, -2, -1, \"YZX\"", function() {
                const a = parseEuler("x: 3; y: -2; z: -1; order: YZX");
                assert.strictEqual(a.x, 3);
                assert.strictEqual(a.y, -2);
                assert.strictEqual(a.z, -1);
                assert.strictEqual(a.order, "YZX");
            });
            it("\"-3  2 -1.5 XZY \" -> -3, 2, -1.5, XZY", function() {
                const a = parseEuler("-3  2 -1.5 XZY ");
                assert.strictEqual(a.x, -3);
                assert.strictEqual(a.y, 2);
                assert.strictEqual(a.z, -1.5);
                assert.strictEqual(a.order, "XZY");
            });
        });
    });
    describe("parseSphericalのテスト", function() {
        describe("数値のパース", function() {
            it("3 -> 3, 0.000001, 0", function() {
                const a = parseSpherical(3);
                assert.strictEqual(a.radius, 3);
                assert.strictEqual(a.phi, 0.000001);
                assert.strictEqual(a.theta, 0);
            });
        });
        describe("配列のパース", function() {
            it("[3, 0.5, 1] -> 3, 0.5, 1", function() {
                const a = parseSpherical([3, 0.5, 1]);
                assert.strictEqual(a.radius, 3);
                assert.strictEqual(a.phi, 0.5);
                assert.strictEqual(a.theta, 1);
            });
            it("[\"3\", \"1.1\", \"1\"] -> 3, 1.1, 1", function() {
                const a = parseSpherical(["3", "1.1", "1"]);
                assert.strictEqual(a.radius, 3);
                assert.strictEqual(a.phi, 1.1);
                assert.strictEqual(a.theta, 1);
            });
        });
        describe("オブジェクトのパース", function() {
            it("{radius: 3, phi: 2, theta: -1} -> 3, 2, -1", function() {
                const a = parseSpherical({radius: 3, phi: 2, theta: -1});
                assert.strictEqual(a.radius, 3);
                assert.strictEqual(a.phi, 2);
                assert.strictEqual(a.theta, -1);
            });
            it("{radius: \"-3\", phi: \"2\", theta: \"-1\"} -> 3, 2, -1", function() {
                const a = parseSpherical({radius: "-3", phi: "2", theta: "-1"});
                assert.strictEqual(a.radius, -3);
                assert.strictEqual(a.phi, 2);
                assert.strictEqual(a.theta, -1);
            });
            it("{phi: \"1.3\", theta: \"-1\"} -> 1, 1.3, -1", function() {
                const a = parseSpherical({phi: "1.3", theta: "-1"});
                assert.strictEqual(a.radius, 1);
                assert.strictEqual(a.phi, 1.3);
                assert.strictEqual(a.theta, -1);
            });
        });
        describe("文字列のパース", function() {
            it("\"radius: 3; phi: 2; theta: -1\" -> 3, 2, -1", function() {
                const a = parseSpherical("radius: 3; phi: 2; theta: -1");
                assert.strictEqual(a.radius, 3);
                assert.strictEqual(a.phi, 2);
                assert.strictEqual(a.theta, -1);
            });
            it("\"-3  2 -1.5 \" -> -3, 2, -1.5", function() {
                const a = parseSpherical("-3  2 -1.5 ");
                assert.strictEqual(a.radius, -3);
                assert.strictEqual(a.phi, 2);
                assert.strictEqual(a.theta, -1.5);
            });
        });
    });
    describe("parseNumberのテスト", function() {
        describe("文字列のパース", function() {
            it("\"62e3'a\" -> 62e3", function() {
                assert.strictEqual(parseNumber("62e3'a"), 62e3);
            });
        });
        describe("数値のパース(引数を返す)", function() {
            it("23.85 -> 23.85", function() {
                assert.strictEqual(parseNumber(23.85), 23.85);
            });
        });
    });
});
