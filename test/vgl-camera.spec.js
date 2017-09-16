import {VglCamera, VglRenderer} from "../src/index.js";
import {Camera, Vector3, Spherical} from "../src/three.js";
const assert = chai.assert;

describe("VglCameraコンポーネントのテスト", function() {
    describe("プロパティの確認", function() {
        it("instプロパティはCameraオブジェクト", function() {
            const vm = new Vue({
                template: `<vgl-camera ref="c" />`,
                components: {VglCamera},
                provide: {cameras: Object.create(null)}
            }).$mount();
            assert.isTrue(vm.$refs.c.inst.isCamera);
        });
    });
    describe("rendererへの登録", function() {
        it("マウントすると、rendererのcamerasに追加される", function() {
            const vm = new Vue({
                template: `<vgl-renderer ref="p"><vgl-camera ref="s" name="a'" /></vgl-renderer>`,
                components: {
                    VglRenderer,
                    VglCamera
                }
            }).$mount();
            assert.equal(vm.$refs.p.cameras["a'"], vm.$refs.s.inst);
        });
        it("コンポーネントが破棄されると、rendererのcamerasから取り除かれる", function(done) {
            const vm = new Vue({
                template: `<vgl-renderer ref="p"><vgl-camera ref="s" v-if="on" name="a'" /></vgl-renderer>`,
                components: {
                    VglRenderer,
                    VglCamera
                },
                data: {on: true}
            }).$mount();
            assert.equal(vm.$refs.p.cameras["a'"], vm.$refs.s.inst);
            vm.on = false;
            vm.$nextTick(() => {
                assert.isUndefined(vm.$refs.p.cameras["a'"]);
                done();
            });
        });
        it("コンポーネントを置換すると、rendererのcamerasも置換される", function(done) {
            const vm = new Vue({
                template: `<vgl-renderer ref="p"><vgl-camera ref="s" :key="key" name="a&quot;" /></vgl-renderer>`,
                components: {
                    VglRenderer,
                    VglCamera
                },
                data: {key: "first"}
            }).$mount();
            const firstInstance = vm.$refs.s.inst;
            assert.equal(vm.$refs.p.cameras["a\""], firstInstance);
            vm.key = "second";
            vm.$nextTick(() => {
                const secondInstance = vm.$refs.s.inst;
                assert.notEqual(firstInstance, secondInstance);
                assert.equal(vm.$refs.p.cameras["a\""], secondInstance);
                done();
            });
        });
    });
    describe("プロパティのテスト", function() {
        describe("orbitPositionとorbitTargetのテスト", function() {
            describe("orbitPosition only", function() {
                it("原点をターゲットとしたposition", function() {
                    const vm = new Vue({
                        template: `<vgl-camera orbitPosition="12 1 3" ref="c" />`,
                        components: {VglCamera},
                        provide: {cameras: Object.create(null)}
                    }).$mount();
                    const expected = new Vector3().setFromSpherical(new Spherical(12, 1, 3));
                    assert.strictEqual(vm.$refs.c.inst.position.x, expected.x);
                    assert.strictEqual(vm.$refs.c.inst.position.y, expected.y);
                    assert.strictEqual(vm.$refs.c.inst.position.z, expected.z);
                });
                it("lookAt(0, 0, 0)", function() {
                    const vm = new Vue({
                        template: `<vgl-camera orbitPosition="10 1 3" ref="c" />`,
                        components: {VglCamera},
                        provide: {cameras: Object.create(null)}
                    }).$mount();
                    const expected = new Camera();
                    expected.position.setFromSpherical(new Spherical(10, 1, 3));
                    expected.lookAt(new Vector3());
                    assert.strictEqual(vm.$refs.c.inst.rotation.x, expected.rotation.x);
                    assert.strictEqual(vm.$refs.c.inst.rotation.y, expected.rotation.y);
                    assert.strictEqual(vm.$refs.c.inst.rotation.z, expected.rotation.z);
                    assert.strictEqual(vm.$refs.c.inst.rotation.order, expected.rotation.order);
                });
            });
            describe("orbitTarget only", function() {
                it("\"1 2 3\" -> lookAt(1, 2, 3)", function() {
                    const vm = new Vue({
                        template: `<vgl-camera orbitTarget="1 2 3" ref="c" />`,
                        components: {VglCamera},
                        provide: {cameras: Object.create(null)}
                    }).$mount();
                    const expected = new Camera();
                    expected.lookAt(new Vector3(1, 2, 3));
                    assert.strictEqual(vm.$refs.c.inst.rotation.x, expected.rotation.x);
                    assert.strictEqual(vm.$refs.c.inst.rotation.y, expected.rotation.y);
                    assert.strictEqual(vm.$refs.c.inst.rotation.z, expected.rotation.z);
                    assert.strictEqual(vm.$refs.c.inst.rotation.order, expected.rotation.order);
                });
                it("\"1 2 3\" -> lookAt(1, 2, 3) with position", function() {
                    const vm = new Vue({
                        template: `<vgl-camera orbitTarget="1 2 3" position="3 4 5" ref="c" />`,
                        components: {VglCamera},
                        provide: {cameras: Object.create(null)}
                    }).$mount();
                    const expected = new Camera();
                    expected.position.set(3, 4, 5);
                    expected.lookAt(new Vector3(1, 2, 3));
                    assert.strictEqual(vm.$refs.c.inst.position.x, 3);
                    assert.strictEqual(vm.$refs.c.inst.position.y, 4);
                    assert.strictEqual(vm.$refs.c.inst.position.z, 5);
                    assert.strictEqual(vm.$refs.c.inst.rotation.x, expected.rotation.x);
                    assert.strictEqual(vm.$refs.c.inst.rotation.y, expected.rotation.y);
                    assert.strictEqual(vm.$refs.c.inst.rotation.z, expected.rotation.z);
                    assert.strictEqual(vm.$refs.c.inst.rotation.order, expected.rotation.order);
                });
            });
            describe("With orbitPosition and orbitTarget", function() {
                it("targetを原点にしたposition", function() {
                    const vm = new Vue({
                        template: `<vgl-camera orbitTarget="1 2 3" orbitPosition="2 1 5" ref="c" />`,
                        components: {VglCamera},
                        provide: {cameras: Object.create(null)}
                    }).$mount();
                    const expected = new Vector3(1, 2, 3);
                    expected.add(new Vector3().setFromSpherical(new Spherical(2, 1, 5)));
                    assert.strictEqual(vm.$refs.c.inst.position.x, expected.x);
                    assert.strictEqual(vm.$refs.c.inst.position.y, expected.y);
                    assert.strictEqual(vm.$refs.c.inst.position.z, expected.z);
                });
                it("lookAt orbitTarget", function() {
                    const vm = new Vue({
                        template: `<vgl-camera orbitTarget="1 2 3" orbitPosition="2 1 5" ref="c" />`,
                        components: {VglCamera},
                        provide: {cameras: Object.create(null)}
                    }).$mount();
                    const expected = new Camera();
                    expected.position.copy(new Vector3().setFromSpherical(new Spherical(2, 1, 5)).add(new Vector3(1, 2, 3)));
                    expected.lookAt(new Vector3(1, 2, 3));
                    console.log(expected);
                    assert.strictEqual(vm.$refs.c.inst.rotation.x, expected.rotation.x);
                    assert.strictEqual(vm.$refs.c.inst.rotation.y, expected.rotation.y);
                    assert.strictEqual(vm.$refs.c.inst.rotation.z, expected.rotation.z);
                    assert.strictEqual(vm.$refs.c.inst.rotation.order, expected.rotation.order);
                });
            });
            describe("Without orbitPosition nor orbitTarget", function() {
                it("undefined -> position, rotationを継承", function() {
                    const vm = new Vue({
                        template: `<vgl-camera position="1 2 3" rotation="2 3 4 YZX" ref="c" />`,
                        components: {VglCamera},
                        provide: {cameras: Object.create(null)}
                    }).$mount();
                    assert.strictEqual(vm.$refs.c.inst.position.x, 1);
                    assert.strictEqual(vm.$refs.c.inst.position.y, 2);
                    assert.strictEqual(vm.$refs.c.inst.position.z, 3);
                    assert.strictEqual(vm.$refs.c.inst.rotation.x, 2);
                    assert.strictEqual(vm.$refs.c.inst.rotation.y, 3);
                    assert.strictEqual(vm.$refs.c.inst.rotation.z, 4);
                    assert.strictEqual(vm.$refs.c.inst.rotation.order, "YZX");
                });
            });
        });
    });
});
