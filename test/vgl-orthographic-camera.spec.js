describe("VglOrthographicCameraコンポーネントのテスト", function() {
    const {VglOrthographicCamera} = VueGL;
    const assert = chai.assert;
    describe("プロパティの確認", function() {
        it("instプロパティはOrthographicCameraオブジェクト", function() {
            const vm = new Vue({
                template: `<vgl-orthographic-camera ref="c" />`,
                components: {VglOrthographicCamera},
                provide: {cameras: Object.create(null)}
            }).$mount();
            assert.isTrue(vm.$refs.c.inst.isOrthographicCamera);
        });
    });
    describe("プロパティのテスト", function() {
        describe("zoomのテスト", function() {
            it("undefined -> 1", function() {
                const vm = new Vue({
                    template: `<vgl-orthographic-camera ref="c" />`,
                    components: {VglOrthographicCamera},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.zoom, 1);
            });
            it("0.5 -> 0.5", function() {
                const vm = new Vue({
                    template: `<vgl-orthographic-camera zoom="0.5" ref="c" />`,
                    components: {VglOrthographicCamera},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.zoom, 0.5);
            });
        });
        describe("nearのテスト", function() {
            it("undefined -> 0.1", function() {
                const vm = new Vue({
                    template: `<vgl-orthographic-camera ref="c" />`,
                    components: {VglOrthographicCamera},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.near, 0.1);
            });
            it("0.3 -> 0.3", function() {
                const vm = new Vue({
                    template: `<vgl-orthographic-camera near="0.3" ref="c" />`,
                    components: {VglOrthographicCamera},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.near, 0.3);
            });
        });
        describe("farのテスト", function() {
            it("undefined -> 2000", function() {
                const vm = new Vue({
                    template: `<vgl-orthographic-camera ref="c" />`,
                    components: {VglOrthographicCamera},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.far, 2000);
            });
            it("100 -> 100", function() {
                const vm = new Vue({
                    template: `<vgl-orthographic-camera far="100" ref="c" />`,
                    components: {VglOrthographicCamera},
                    provide: {cameras: Object.create(null)}
                }).$mount();
                assert.strictEqual(vm.$refs.c.inst.far, 100);
            });
        });
    });
    describe("プロパティの変更のテスト", function() {
        describe("zoomを変更", function() {
            it("1.1 -> 0.8", function(done) {
                const vm = new Vue({
                    template: `<vgl-orthographic-camera :zoom="z" ref="c" />`,
                    components: {VglOrthographicCamera},
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
                    template: `<vgl-orthographic-camera :near="n" ref="c" />`,
                    components: {VglOrthographicCamera},
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
                    template: `<vgl-orthographic-camera :far="f" ref="c" />`,
                    components: {VglOrthographicCamera},
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
    });
});
