describe("VglDodecahedronGeometry component", function() {
    const {VglDodecahedronGeometry, VglNamespace} = VueGL;
    const assert = chai.assert;
    describe("Parameters of a instance should be same as the component properties.", function() {
        it("When properties are number.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-dodecahedron-geometry ref="geo" :radius="11.1" :detail="2" /></vgl-namespace>`,
                components: {VglDodecahedronGeometry, VglNamespace}
            }).$mount();
            assert.strictEqual(vm.$refs.geo.inst.parameters.radius, 11.1);
            assert.strictEqual(vm.$refs.geo.inst.parameters.detail, 2);
        });
        it("When properties are string.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-dodecahedron-geometry ref="geo" radius="1.11" detail="2" /></vgl-namespace>`,
                components: {VglDodecahedronGeometry, VglNamespace}
            }).$mount();
            assert.strictEqual(vm.$refs.geo.inst.parameters.radius, 1.11);
            assert.strictEqual(vm.$refs.geo.inst.parameters.detail, 2);
        });
        it("When properties are undefined.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-dodecahedron-geometry ref="geo" /></vgl-namespace>`,
                components: {VglDodecahedronGeometry, VglNamespace}
            }).$mount();
            assert.isUndefined(vm.$refs.geo.inst.parameters.radius);
            assert.isUndefined(vm.$refs.geo.inst.parameters.detail);
        });
    });
    describe("Instance should be recreated when a property changed.", function() {
        it("When the radius property changes.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-dodecahedron-geometry ref="geo" :radius="radius" /></vgl-namespace>`,
                components: {VglDodecahedronGeometry, VglNamespace},
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
