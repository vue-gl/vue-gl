describe("VglRingGeometry component", function() {
    const {VglRingGeometry, VglNamespace} = VueGL;
    const assert = chai.assert;
    describe("Parameters of a instance should be same as the component properties.", function() {
        it("When properties are number.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-ring-geometry ref="geo" :innerRadius="18.5" :outerRadius="62.7" :thetaSegments="31" :phiSegments="13" :thetaStart="0.2" :thetaLength="3.8" /></vgl-namespace>`,
                components: {VglRingGeometry, VglNamespace}
            }).$mount();
            assert.strictEqual(vm.$refs.geo.inst.parameters.innerRadius, 18.5);
            assert.strictEqual(vm.$refs.geo.inst.parameters.outerRadius, 62.7);
            assert.strictEqual(vm.$refs.geo.inst.parameters.thetaSegments, 31);
            assert.strictEqual(vm.$refs.geo.inst.parameters.phiSegments, 13);
            assert.strictEqual(vm.$refs.geo.inst.parameters.thetaStart, 0.2);
            assert.strictEqual(vm.$refs.geo.inst.parameters.thetaLength, 3.8);
        });
        it("When properties are string.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-ring-geometry ref="geo" innerRadius="19.5" outerRadius="63.7" thetaSegments="33" phiSegments="11" thetaStart="0.5" thetaLength="3.6" /></vgl-namespace>`,
                components: {VglRingGeometry, VglNamespace}
            }).$mount();
            assert.strictEqual(vm.$refs.geo.inst.parameters.innerRadius, 19.5);
            assert.strictEqual(vm.$refs.geo.inst.parameters.outerRadius, 63.7);
            assert.strictEqual(vm.$refs.geo.inst.parameters.thetaSegments, 33);
            assert.strictEqual(vm.$refs.geo.inst.parameters.phiSegments, 11);
            assert.strictEqual(vm.$refs.geo.inst.parameters.thetaStart, 0.5);
            assert.strictEqual(vm.$refs.geo.inst.parameters.thetaLength, 3.6);
        });
        it("When properties are undefined.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-ring-geometry ref="geo" /></vgl-namespace>`,
                components: {VglRingGeometry, VglNamespace}
            }).$mount();
            assert.isUndefined(vm.$refs.geo.inst.parameters.innerRadius);
            assert.isUndefined(vm.$refs.geo.inst.parameters.outerRadius);
            assert.isUndefined(vm.$refs.geo.inst.parameters.thetaSegments);
            assert.isUndefined(vm.$refs.geo.inst.parameters.phiSegments);
            assert.isUndefined(vm.$refs.geo.inst.parameters.thetaStart);
            assert.isUndefined(vm.$refs.geo.inst.parameters.thetaLength);
        });
    });
    describe("Instance should be recreated when a property changed.", function() {
        it("When the width property changes.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-ring-geometry ref="geo" :innerRadius="radius" /></vgl-namespace>`,
                components: {VglRingGeometry, VglNamespace},
                data: {radius: 0.5}
            }).$mount();
            const before = vm.$refs.geo.inst;
            vm.radius = 1.03;
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
