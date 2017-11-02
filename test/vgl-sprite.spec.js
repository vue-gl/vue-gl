describe("VglSprite component", function() {
    const {VglSprite, VglMaterial, VglNamespace} = VueGL;
    const assert = chai.assert;
    const MockedRenderer = {
        mixins: [VglNamespace],
        provide: {vglUpdate: () => {}}
    };
    describe("Creating an object", function() {
        it("The material of an instance should be set to the material that has the corresponding name property.", function() {
            const vm = new Vue({
                template: `<mocked-renderer><vgl-material name="u!$ok" ref="mat" /><vgl-sprite material="u!$ok" ref="sprite" /></mocked-renderer>`,
                components: {VglSprite, VglMaterial, MockedRenderer}
            }).$mount();
            assert.strictEqual(vm.$refs.sprite.inst.material, vm.$refs.mat.inst);
        });
    });
});
