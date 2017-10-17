describe("VglCircleGeometry component", function() {
    const {VglCircleGeometry, VglNamespace} = VueGL;
    const assert = chai.assert;
    describe("Parameters of a instance should be same as the component properties.", function() {
        it("When properties are number.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-circle-geometry ref="geo" :radius="10" :segments="2" :thetaStart="0.4" :thetaLength="2.1" /></vgl-namespace>`,
                components: {VglCircleGeometry, VglNamespace}
            }).$mount();
            assert.strictEqual(vm.$refs.geo.inst.parameters.radius, 10);
            assert.strictEqual(vm.$refs.geo.inst.parameters.segments, 2);
            assert.strictEqual(vm.$refs.geo.inst.parameters.thetaStart, 0.4);
            assert.strictEqual(vm.$refs.geo.inst.parameters.thetaLength, 2.1);
        });
        it("When properties are string.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-circle-geometry ref="geo" radius="100" segments="60" thetaStart="0.1" thetaLength="3.3" /></vgl-namespace>`,
                components: {VglCircleGeometry, VglNamespace}
            }).$mount();
            assert.strictEqual(vm.$refs.geo.inst.parameters.radius, 100);
            assert.strictEqual(vm.$refs.geo.inst.parameters.segments, 60);
            assert.strictEqual(vm.$refs.geo.inst.parameters.thetaStart, 0.1);
            assert.strictEqual(vm.$refs.geo.inst.parameters.thetaLength, 3.3);
        });
        it("When properties are undefined.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-circle-geometry ref="geo" /></vgl-namespace>`,
                components: {VglCircleGeometry, VglNamespace}
            }).$mount();
            assert.isUndefined(vm.$refs.geo.inst.parameters.radius);
            assert.isUndefined(vm.$refs.geo.inst.parameters.segments);
            assert.isUndefined(vm.$refs.geo.inst.parameters.thetaStart);
            assert.isUndefined(vm.$refs.geo.inst.parameters.thetaLength);
        });
    });
    describe("Instance should be recreated when a property changed.", function() {
        it("When the radius property changes.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-circle-geometry ref="geo" :radius="radius" /></vgl-namespace>`,
                components: {VglCircleGeometry, VglNamespace},
                data: {radius: 25}
            }).$mount();
            const before = vm.$refs.geo.inst;
            vm.radius = 11;
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
