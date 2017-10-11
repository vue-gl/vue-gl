describe("VglSprite component", function() {
    const {VglSprite, VglGeometry, VglMaterial, VglNamespace} = VueGL;
    const assert = chai.assert;
    describe("Creating an object", function() {
        it("The material of an instance should be set to the material that has the corresponding name property.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-material name="u!$ok" ref="mat" /><vgl-sprite material="u!$ok" ref="sprite" /></vgl-namespace>`,
                components: {VglSprite, VglMaterial, VglNamespace}
            }).$mount();
            assert.strictEqual(vm.$refs.sprite.inst.material, vm.$refs.mat.inst);
        });
    });
});
