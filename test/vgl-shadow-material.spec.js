/* globals chai Vue VueGL */

describe("VglShadowMaterial component", function() {
    const {VglShadowMaterial, VglNamespace} = VueGL;
    const assert = chai.assert;
    it("The instance should be a ShadowMaterial object.", function() {
        const vm = new Vue({
            template: `<vgl-namespace><vgl-shadow-material ref="mat" /></vgl-namespace>`,
            components: {VglShadowMaterial, VglNamespace}
        }).$mount();
        assert.isTrue(vm.$refs.mat.inst.isShadowMaterial);
    });
});
