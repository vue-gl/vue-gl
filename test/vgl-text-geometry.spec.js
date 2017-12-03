describe("VglTextGeometry component", function() {
    const {VglTextGeometry, VglNamespace, VglFont} = VueGL;
    const assert = chai.assert;
    before(function() {
        this.timeout(7000);
    });
    describe("Parameters of a instance should be same as the component properties.", function() {
        it("When properties are number.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-font ref="font" name="font" src="base/node_modules/three/examples/fonts/helvetiker_regular.typeface.json" /><vgl-text-geometry ref="geo" font="font" :size="10" :height="6" :curve-segments="8" :bevel-enabled="true" :bevel-thickness="3" :bevel-size="6" :bevel-segments="4">a</vgl-text-geometry></vgl-namespace>`,
                components: {VglTextGeometry, VglNamespace, VglFont}
            }).$mount();
            vm.$refs.font.$watch("inst", () => {
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.size, 10);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.height, 6);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.curveSegments, 8);
                        assert.isTrue(vm.$refs.geo.inst.parameters.parameters.bevelEnabled);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelThickness, 3);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSize, 6);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSegments, 4);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
        it("When properties are string.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-font ref="font" name="font" src="base/node_modules/three/examples/fonts/helvetiker_regular.typeface.json" /><vgl-text-geometry ref="geo" font="font" size="10" height="6" curve-segments="8" bevel-enabled bevel-thickness="3" bevel-size="6" bevel-segments="4">a</vgl-text-geometry></vgl-namespace>`,
                components: {VglTextGeometry, VglNamespace, VglFont}
            }).$mount();
            vm.$refs.font.$watch("inst", () => {
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.size, 10);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.height, 6);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.curveSegments, 8);
                        assert.isTrue(vm.$refs.geo.inst.parameters.parameters.bevelEnabled);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelThickness, 3);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSize, 6);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSegments, 4);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
        it("When properties are undefined.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-font ref="font" name="font" src="base/node_modules/three/examples/fonts/helvetiker_regular.typeface.json" /><vgl-text-geometry ref="geo" font="font">a</vgl-text-geometry></vgl-namespace>`,
                components: {VglTextGeometry, VglNamespace, VglFont}
            }).$mount();
            vm.$refs.font.$watch("inst", () => {
                vm.$nextTick(() => {
                    try {
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.size, 100);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.height, 50);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.curveSegments, 12);
                        assert.isFalse(vm.$refs.geo.inst.parameters.parameters.bevelEnabled);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelThickness, 10);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSize, 8);
                        assert.strictEqual(vm.$refs.geo.inst.parameters.parameters.bevelSegments, 3);
                        done();
                    } catch(e) {
                        done(e);
                    }
                });
            });
        });
    });
    describe("Instance should be recreated when a property changed.", function() {
        it("When the width property changes.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-font ref="font" name="font" src="base/node_modules/three/examples/fonts/helvetiker_regular.typeface.json" /><vgl-text-geometry ref="geo" font="font" :size="size">a</vgl-text-geometry></vgl-namespace>`,
                components: {VglTextGeometry, VglNamespace, VglFont},
                data: {size: 120}
            }).$mount();
            vm.$refs.font.$watch("inst", () => {
                vm.$nextTick(() => {
                    const before = vm.$refs.geo.inst;
                    vm.size = 110;
                    vm.$nextTick(() => {
                        try {
                            assert.notEqual(before, vm.$refs.geo.inst);
                            done();
                        } catch(e) {
                            done(e);
                        }
                    });
                });
            });
        });
    });
});
