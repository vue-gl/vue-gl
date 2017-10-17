describe("VglMesh component", function() {
    const {VglMesh, VglGeometry, VglMaterial, VglNamespace} = VueGL;
    const assert = chai.assert;
    describe("Creating an object", function() {
        it("The geometry of an instance should be set to the geometry that has the corresponding name property.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-mesh geometry="u!$ok" ref="mesh" /><vgl-geometry name="u!$ok" ref="geo" /></vgl-namespace>`,
                components: {VglMesh, VglGeometry, VglNamespace}
            }).$mount();
            assert.strictEqual(vm.$refs.mesh.inst.geometry, vm.$refs.geo.inst);
        });
        it("The material of an instance should be set to the material that has the corresponding name property.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-material name="u!$ok" ref="mat" /><vgl-mesh material="u!$ok" ref="mesh" /></vgl-namespace>`,
                components: {VglMesh, VglMaterial, VglNamespace}
            }).$mount();
            assert.strictEqual(vm.$refs.mesh.inst.material, vm.$refs.mat.inst);
        });
    });
});
