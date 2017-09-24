const {VglPerspectiveCamera} = VueGL;
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
            it("0.5 -> 0.5", function() {
                const vm = new Vue({
                    template: `<vgl-perspective-camera zoom="0.5" ref="c" />`,
                    components: {VglPerspectiveCamera},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.zoom, 0.5);
            });
        });
        describe("nearのテスト", function() {
            it("undefined -> 0.1", function() {
                const vm = new Vue({
                    template: `<vgl-perspective-camera ref="c" />`,
                    components: {VglPerspectiveCamera},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.near, 0.1);
            });
            it("0.3 -> 0.3", function() {
                const vm = new Vue({
                    template: `<vgl-perspective-camera near="0.3" ref="c" />`,
                    components: {VglPerspectiveCamera},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.near, 0.3);
            });
        });
        describe("farのテスト", function() {
            it("undefined -> 2000", function() {
                const vm = new Vue({
                    template: `<vgl-perspective-camera ref="c" />`,
                    components: {VglPerspectiveCamera},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.far, 2000);
            });
            it("100 -> 100", function() {
                const vm = new Vue({
                    template: `<vgl-perspective-camera far="100" ref="c" />`,
                    components: {VglPerspectiveCamera},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.far, 100);
            });
        });
        describe("fovのテスト", function() {
            it("undefined -> 50", function() {
                const vm = new Vue({
                    template: `<vgl-perspective-camera ref="c" />`,
                    components: {VglPerspectiveCamera},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.fov, 50);
            });
            it("75 -> 75", function() {
                const vm = new Vue({
                    template: `<vgl-perspective-camera fov="75" ref="c" />`,
                    components: {VglPerspectiveCamera},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.fov, 75);
            });
        });
    });
    describe("プロパティの変更のテスト", function() {
        describe("zoomを変更", function() {
            it("1.1 -> 0.8", function(done) {
                const vm = new Vue({
                    template: `<vgl-perspective-camera :zoom="z" ref="c" />`,
                    components: {VglPerspectiveCamera},
                    data: {z: 1.1},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.zoom, 1.1);
                vm.z = 0.8;
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.c.inst.zoom, 0.8);
                    done();
                });
            });
        });
        describe("nearを変更", function() {
            it("0.2 -> 0.3", function(done) {
                const vm = new Vue({
                    template: `<vgl-perspective-camera :near="n" ref="c" />`,
                    components: {VglPerspectiveCamera},
                    data: {n: 0.2},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.near, 0.2);
                vm.n = 0.3;
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.c.inst.near, 0.3);
                    done();
                });
            });
        });
        describe("farを変更", function() {
            it("3000 -> 3500", function(done) {
                const vm = new Vue({
                    template: `<vgl-perspective-camera :far="f" ref="c" />`,
                    components: {VglPerspectiveCamera},
                    data: {f: 3000},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.far, 3000);
                vm.f = 3500;
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.c.inst.far, 3500);
                    done();
                });
            });
        });
        describe("fovを変更", function() {
            it("75 -> 80", function(done) {
                const vm = new Vue({
                    template: `<vgl-perspective-camera :fov="f" ref="c" />`,
                    components: {VglPerspectiveCamera},
                    data: {f: 75},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.fov, 75);
                vm.f = 80;
                vm.$nextTick(() => {
                    assert.strictEqual(vm.$refs.c.inst.fov, 80);
                    done();
                });
            });
        });
    });
});
